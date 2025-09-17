from django.shortcuts import render

# Create your views here.
# categories/views.py

from rest_framework import viewsets
from .models import Category,Menu,Discount,Extra
from .serializers import CategorySerializer,MenuSerializer,DiscountSerializer,ExtraSerializer
from restaurant.views import IsOwnerRoleOrReadOnly
from rest_framework.permissions import IsAuthenticated

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsOwnerRoleOrReadOnly]

        
class MenuViewSet(viewsets.ModelViewSet):
    queryset = Menu.objects.all().prefetch_related('portions', 'discounts')
    serializer_class = MenuSerializer
    permission_classes = [ IsOwnerRoleOrReadOnly]

class ExtraViewSet(viewsets.ModelViewSet):
    queryset = Extra.objects.all()
    serializer_class = ExtraSerializer
    permission_classes = [IsOwnerRoleOrReadOnly]


      
class DiscountViewSet(viewsets.ModelViewSet):
    queryset = Discount.objects.all()
    serializer_class = DiscountSerializer
    permission_classes = [IsOwnerRoleOrReadOnly]