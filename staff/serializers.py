from rest_framework import serializers
from .models import Staff,Kitchen,Waiter
from restaurant.models import Branch
from restaurant.serializers import BranchSerializer
import uuid
from items.serializers import CategorySerializer
from django.db import transaction
from users.serializers import CustomUserSerializer,CustomUserCreateSerializer
import qrcode
import base64
from items.models import Category
from io import BytesIO
class StaffSerializer(serializers.ModelSerializer):
    user = CustomUserCreateSerializer()
    user_detail = CustomUserSerializer(source = 'user' ,read_only = True)
    branch  = BranchSerializer(read_only = True)
    branch_id = serializers.UUIDField(write_only = True)
    class Meta:
        model = Staff
        fields = ['id', 'user',  'branch_id', 'branch', 'permissions', 'user_detail', 'created_at', 'updated_at']
        read_only_fields = ['id','created_at', 'updated_at','user_detail']
      
    def create(self, validated_data):
        with transaction.atomic():
            request = self.context.get('request')
            user = request.user if request else None
            user_data = validated_data.pop('user')
            # Create the user within a transaction
            user = CustomUserCreateSerializer().create(user_data)
            branch_id = validated_data.pop('branch_id')
            branch = Branch.objects.get(id=branch_id)
           
            # Create the Staff instance
            staff = Staff.objects.create(user=user, branch= branch, **validated_data)
        return staff
    
    def update(self, instance, validated_data):
        with transaction.atomic():
            user_data = validated_data.pop('user', None)
            if user_data:
                # Update the user within a transaction
                for attr, value in user_data.items():
                    setattr(instance.user, attr, value)
                instance.user.save()
            
            # Update the Staff instance
            for attr, value in validated_data.items():
                setattr(instance, attr, value)
            instance.save()
        return instance



class KitchenSerializer(serializers.ModelSerializer):
    staff = StaffSerializer()  # Expecting staff to be nested, which includes user info
    categories = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        many=True
    )# Multiple categories related to kitchen
    
    categories_detail = CategorySerializer(source='categories', many=True, read_only=True)  # For read (GET) operations

    class Meta:
        model = Kitchen
        fields = ['id', 'staff', 'categories_detail', 'categories', 'created_at', 'updated_at']
        read_only_fields = ['id','categories_detail', 'created_at', 'updated_at']

    def create(self, validated_data):
        with transaction.atomic():
        # Extract the related data
            categories_data = validated_data.pop('categories', [])
            staff_data = validated_data.pop('staff')
            if 'user' in staff_data:
                staff_data['user']['role'] = 'kitchen' 
            # Create staff instance using nested serializer
            staff_serializer = StaffSerializer(data=staff_data, context=self.context)
            staff_serializer.is_valid(raise_exception=True)
            staff = staff_serializer.save()

            # Create the kitchen instance
            kitchen = Kitchen.objects.create(staff=staff, **validated_data)

            # Set many-to-many categories
            # kitchen.categories.set(categories_data)
            # kitchen.categories.set([item['id'] for item in categories_data])
            
            
            # category_ids = [item.get('id') for item in categories_data if 'id' in item]
            kitchen.categories.set(categories_data)
            kitchen.save()

        return kitchen

    def update(self, instance, validated_data):
        staff_data = validated_data.pop('staff', None)
        categories_data = validated_data.pop('categories', None)

        if staff_data:
            user_data = staff_data.pop('user', None)
            if user_data:
                for attr, value in user_data.items():
                    setattr(instance.staff.user, attr, value)
                instance.staff.user.save()  # Save user updates

            # Update the staff instance
            for attr, value in staff_data.items():
                setattr(instance.staff, attr, value)
            instance.staff.save()

        if categories_data:
            instance.categories.set(categories_data)  # Update many-to-many relation with categories

        # Update the kitchen instance itself
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance
    
    
    
    
class WaiterSerializer(serializers.ModelSerializer):
    staff = StaffSerializer()  # Staff is included as a nested serializer
    qr_image = serializers.SerializerMethodField()
    class Meta:
        model = Waiter
        fields = ['id', 'staff','qr_image', 'qr_token', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at','qr_token','qr_image']
        
    def get_qr_image(self, obj):
        if not obj.qr_token:
            return None

        qr = qrcode.make(obj.qr_token)
        buffered = BytesIO()
        qr.save(buffered, format="PNG")
        img_base64 = base64.b64encode(buffered.getvalue()).decode()

        return f"data:image/png;base64,{img_base64}"
    
    def create(self, validated_data):
        staff_data = validated_data.pop('staff')  # Extract the staff data
        staff_data['user']['role'] = 'waiter'
        # Create staff instance
        staff_serializer = StaffSerializer(data=staff_data,context = self.context)
        staff_serializer.is_valid(raise_exception=True)
        staff = staff_serializer.save()

        # Generate a unique QR token
        qr_token = str(uuid.uuid4())

        # Create the waiter instance
        waiter = Waiter.objects.create(staff=staff, qr_token=qr_token, **validated_data)

        return waiter

    def update(self, instance, validated_data):
        staff_data = validated_data.pop('staff', None)

        # Update staff information if it exists in the request data
        if staff_data:
            staff_serializer = StaffSerializer(instance=instance.staff, data=staff_data)
            staff_serializer.is_valid(raise_exception=True)
            staff_serializer.save()

        # Update the waiter instance
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance
