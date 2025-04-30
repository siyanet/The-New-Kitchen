from rest_framework import serializers
from .models import Staff,Kitchen,Waiter
import uuid
from items.serializers import CategorySerializer
from django.db import transaction
from users.serializers import CustomUserSerializer,CustomUserCreateSerializer

class StaffSerializer(serializers.ModelSerializer):
    user = CustomUserCreateSerializer()
    user_detail = CustomUserSerializer(source = 'user' ,read_only = True)

    class Meta:
        model = Staff
        fields = ['id', 'user', 'restaurant', 'branch', 'role', 'permissions', 'user_detail', 'created_at', 'updated_at']
        read_only_fields = ['id','restaurant', 'created_at', 'updated_at','user_detail','role']

    def create(self, validated_data):
        with transaction.atomic():
            user_data = validated_data.pop('user')
            # Create the user within a transaction
            user = CustomUserCreateSerializer().create(user_data)
            validated_data['role'] = 'team_member'
            # Create the Staff instance
            staff = Staff.objects.create(user=user, **validated_data)
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
    categories = CategorySerializer(many=True)  # Multiple categories related to kitchen

    class Meta:
        model = Kitchen
        fields = ['id', 'staff', 'categories', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def create(self, validated_data):
        staff_data = validated_data.pop('staff')  # Extract the staff data (which includes user)
        categories_data = validated_data.pop('categories', [])

        # First, handle creating the user from the staff data
        user_data = staff_data.pop('user')  # Extract user data from staff
        user_serializer = CustomUserCreateSerializer(data=user_data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()  # Create the user

        # Now create the staff, linking the created user
        staff_data['user'] = user
        staff_serializer = StaffSerializer(data=staff_data)
        staff_serializer.is_valid(raise_exception=True)
        staff = staff_serializer.save()  # Create the staff instance

        # Now create the kitchen
        kitchen = Kitchen.objects.create(staff=staff, **validated_data)

        # Set many-to-many relationship (categories)
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

    class Meta:
        model = Waiter
        fields = ['id', 'staff', 'qr_token', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def create(self, validated_data):
        staff_data = validated_data.pop('staff')  # Extract the staff data
        # Create staff instance
        staff_serializer = StaffSerializer(data=staff_data)
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
