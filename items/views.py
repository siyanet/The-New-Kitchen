from django.shortcuts import render

# Create your views here.
# categories/views.py

from rest_framework import viewsets
from .models import Category,Menu,Discount
from .serializers import CategorySerializer,MenuSerializer,DiscountSerializer
from restaurant.views import IsOwnerOrReadOnly

class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    permission_classes = [IsOwnerOrReadOnly]

    def get_queryset(self):
        if self.request.user.is_anonymous or self.request.method in ('GET', 'HEAD', 'OPTIONS'):
            return Category.objects.all()
        return Category.objects.filter(restaurant__owner=self.request.user)

    def perform_create(self, serializer):
        restaurant = self.request.user.restaurants.first()
        serializer.save(restaurant=restaurant)


class MenuViewSet(viewsets.ModelViewSet):
    serializer_class = MenuSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def get_queryset(self):
        if self.request.user.is_anonymous or self.request.method in ('GET', 'HEAD', 'OPTIONS'):
            return Menu.objects.all()
        return Menu.objects.filter(restaurant__owner=self.request.user)

    def perform_create(self, serializer):
        restaurant = self.request.user.restaurants.first()
        serializer.save(restaurant=restaurant)
        
        
        
class DiscountViewSet(viewsets.ModelViewSet):
    serializer_class = DiscountSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def get_queryset(self):
        if self.request.user.is_anonymous or self.request.method in ('GET', 'HEAD', 'OPTIONS'):
            return Discount.objects.all()
        return Discount.objects.filter(restaurant__owner=self.request.user)

    def perform_create(self, serializer):
        restaurant = self.request.user.restaurants.first()
        serializer.save(restaurant=restaurant)