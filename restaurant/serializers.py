from rest_framework import serializers
from django.db import transaction
from .models import Restaurant,Branch
from users.serializers import CustomUserCreateSerializer, CustomUserSerializer  # assume you renamed your read serializer

from rest_framework.permissions import BasePermission

class IsOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.restaurant.owner == request.user



class RestaurantSerializer(serializers.ModelSerializer):
    owner = CustomUserSerializer(read_only=True)
    owner_data = CustomUserCreateSerializer(write_only=True)

    class Meta:
        model = Restaurant
        fields = ['id', 'name', 'description', 'logo', 'owner', 'owner_data', 'opening_time', 'closing_time', 'email']

    def create(self, validated_data):
        owner_data = validated_data.pop('owner_data')
        owner_data['role'] = 'owner'

        with transaction.atomic():
            owner = CustomUserCreateSerializer().create(owner_data)
            restaurant = Restaurant.objects.create(owner=owner, **validated_data)

        return restaurant
    
    

class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at', 'restaurant')
