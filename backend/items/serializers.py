
from rest_framework import serializers
from .models import Category,Menu,Discount

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        read_only_fields = ('id', 'restaurant')
        
        
class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at', 'restaurant')
        
        

class DiscountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discount
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at', 'restaurant')