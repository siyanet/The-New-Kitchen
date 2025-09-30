
from rest_framework import serializers
from .models import Category,Menu,Discount, Extra, Portion
from datetime import date
from decimal import Decimal
class CategorySerializer(serializers.ModelSerializer):
    menu_count = serializers.IntegerField(source='menus.count', read_only=True)
    class Meta:
        model = Category
        fields = '__all__'
        read_only_fields = ('id',)
        


class PortionSerializer(serializers.ModelSerializer):
    discounted_price = serializers.SerializerMethodField()
    

    class Meta:
        model = Portion
        fields = ['id', 'size', 'price', 'discounted_price']

    def get_discounted_price(self, obj):
        today = date.today()
        discounts = obj.menu.discounts.filter(start_date__lte=today, end_date__gte=today)
        if discounts.exists():
            discount = discounts.first()
            discounted = obj.price - (obj.price * discount.percentage / Decimal('100.0'))
            return round(discounted, 2)
        return None



   
class MenuSerializer(serializers.ModelSerializer):
    portions = PortionSerializer(many=True, read_only=True)
    average_rating = serializers.FloatField(read_only=True)
    # Prices to be passed in menu creation
    small_price = serializers.DecimalField(max_digits=8, decimal_places=2, write_only=True)
    medium_price = serializers.DecimalField(max_digits=8, decimal_places=2, write_only=True)
    large_price = serializers.DecimalField(max_digits=8, decimal_places=2, write_only=True)

    class Meta:
        model = Menu
        fields = [
            'id', 'category', 'name', 'description', 'image',
            'is_available', 'created_at', 'updated_at','average_rating',
            'portions', 'small_price', 'medium_price', 'large_price'
        ]

    def create(self, validated_data):
        small_price = validated_data.pop('small_price')
        medium_price = validated_data.pop('medium_price')
        large_price = validated_data.pop('large_price')

        menu = Menu.objects.create(**validated_data)

        Portion.objects.create(menu=menu, size='small', price=small_price)
        Portion.objects.create(menu=menu, size='medium', price=medium_price)
        Portion.objects.create(menu=menu, size='large', price=large_price)

        return menu

class ExtraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Extra
        fields = ['id', 'name', 'price']





  

class DiscountSerializer(serializers.ModelSerializer):
    menu = MenuSerializer(source = "menu_item", read_only=True)
    
    class Meta:
        model = Discount
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at')