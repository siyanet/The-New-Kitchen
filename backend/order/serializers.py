from rest_framework import serializers
from .models import Order, OrderItem,Payment,Rating
from items.models import Menu,Extra,Portion
from staff.models import Waiter,Staff
from restaurant.serializers import  BranchSerializer
from restaurant.models import Branch
from items.serializers import MenuSerializer
from users.serializers import CustomUserSerializer

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Sum, Count
from django.db.models.functions import TruncDate
from django.utils import timezone
from datetime import timedelta
from .models import Order, OrderItem

from items.models import Menu










# class OrderItemSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = OrderItem
#         fields = ['id', 'menu_item', 'quantity']


# class OrderItemSerializer(serializers.ModelSerializer):
#     menu_item_name = serializers.ReadOnlyField(source='menu_item.name')
#     extras = serializers.PrimaryKeyRelatedField(
#         queryset=Extra.objects.all(),
#         many=True,
#         required=False
#     )
#     class Meta:
#         model = OrderItem
#         fields = ['id', 'menu_item', 'extras', 'menu_item_name', 'quantity']

class OrderItemSerializer(serializers.ModelSerializer):
    portion = serializers.PrimaryKeyRelatedField(queryset=Portion.objects.all())
    menu = MenuSerializer(source = 'portion.menu',read_only = True)
    portion_size = serializers.ReadOnlyField(source='portion.size')
    portion_price = serializers.ReadOnlyField(source='portion.price')
    extras = serializers.PrimaryKeyRelatedField(
        queryset=Extra.objects.all(),
        many=True,
        required=False
    )
    extras_name = serializers.SerializerMethodField()
    class Meta:
        model = OrderItem
        fields = ['id', 'portion', 'extras',  'portion_size', 'portion_price', 'quantity','extras_name','menu']
        
        
    def get_extras_name(self, obj):
        return [extra.name for extra in obj.extras.all()]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    branch = BranchSerializer(read_only=True)
    total_price = serializers.SerializerMethodField()
    branch_id = serializers.UUIDField(write_only=True)
    customer_name = serializers.SerializerMethodField()
    waiter_name = serializers.SerializerMethodField()
    # status = serializers.CharField(read_only=True)
    def get_total_price(self, obj):
        return sum(item.price for item in obj.items.all())
    
    class Meta:
        model = Order
        fields = ['id', "total_price",'customer_name','waiter_name', 'customer', 'branch', 'branch_id', 'waiter', 'status', 'is_paid', 'created_at', 'items']
        read_only_fields = [ 'created_at', 'id', 'is_paid','customer_name',"waiter_name"]
    
    
    def get_customer_name(self, obj):
        return getattr(obj.customer, "full_name", None) or getattr(obj.customer, "name", None) or str(obj.customer)

    def get_waiter_name(self, obj):
        return getattr(obj.waiter, "full_name", None) or getattr(obj.waiter, "name", None) or str(obj.waiter)

  
    
    def create(self, validated_data):
        items_data = validated_data.pop('items')
        branch_id = validated_data.pop('branch_id')

        try:
            branch = Branch.objects.get(id=branch_id)
        except Branch.DoesNotExist:
            raise serializers.ValidationError("Branch not found in this tenant.")

        user = self.context['request'].user
        try:
            staff = user.staff_profile
            if staff.user.role == 'waiter':
                waiter = Waiter.objects.get(staff=staff)
                validated_data['waiter'] = waiter
        except Staff.DoesNotExist:
            validated_data['customer'] = user

        order = Order.objects.create(branch=branch, **validated_data)

        for item_data in items_data:
            extras = item_data.pop('extras', [])
            order_item = OrderItem.objects.create(order=order, **item_data)
            order_item.extras.set(extras)

        return order

    
    
    
class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'order', 'chapa_tx_ref', 'amount', 'status', 'created_at']
        read_only_fields = ['status', 'created_at']


class RatingSerializer(serializers.ModelSerializer):
    customer = CustomUserSerializer(read_only=True)  # Only visible on GET
    menu = MenuSerializer(read_only=True)      # Nested menu object on GET
    menu_id = serializers.PrimaryKeyRelatedField(
        queryset=Menu.objects.all(),
        source='menu',
        write_only=True
    )

    class Meta:
        model = Rating
        fields = ['id', 'customer', 'menu', 'menu_id', 'rating', 'comment', 'created_at']
        read_only_fields = ['id', 'customer', 'menu', 'created_at']


class SubmitRatingSerializer(serializers.Serializer):
    order_id = serializers.UUIDField()
    rating = serializers.IntegerField(min_value=1, max_value=5)
    comment = serializers.CharField(required=False, allow_blank=True)

    def validate(self, data):
        user = self.context['request'].user
        try:
            order = Order.objects.get(id=data['order_id'], customer=user)
        except Order.DoesNotExist:
            raise serializers.ValidationError("You can only rate completed orders you placed.")
        data['order'] = order
        return data

    def create(self, validated_data):
        order = validated_data['order']
        customer = self.context['request'].user
        rating_value = validated_data['rating']
        comment = validated_data.get('comment', '')

        for item in order.items.all():
            Rating.objects.update_or_create(
                customer=customer,
                menu=item.portion.menu,
                defaults={
                    'rating': rating_value,
                    'comment': comment,
                }
            )
        return {"message": "Rating submitted for all menu items in this order."}
    
    
    
    
 