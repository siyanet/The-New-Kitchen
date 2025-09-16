
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet,MenuViewSet,DiscountViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'menus', MenuViewSet, basename='menu')
router.register(r'discounts', DiscountViewSet, basename='discount')

urlpatterns = [
    path('', include(router.urls)),
]
