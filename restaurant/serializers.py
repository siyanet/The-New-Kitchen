from rest_framework import serializers
from .models import Branch  




# class RestaurantSerializer(serializers.ModelSerializer):
#     owner = CustomUserSerializer(read_only=True)
#     owner_data = CustomUserCreateSerializer(write_only=True)

#     class Meta:
#         model = Restaurant
#         fields = ['id', 'name', 'description', 'logo', 'owner', 'owner_data', 'opening_time', 'closing_time', 'email']

#     def create(self, validated_data):
#         owner_data = validated_data.pop('owner_data')
#         owner_data['role'] = 'owner'

#         with transaction.atomic():
#             owner = CustomUserCreateSerializer().create(owner_data)
#             restaurant = Restaurant.objects.create(owner=owner, **validated_data)



class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at')
