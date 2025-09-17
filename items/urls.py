
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet,MenuViewSet,DiscountViewSet,ExtraViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'menus', MenuViewSet, basename='menu')
router.register(r'discounts', DiscountViewSet, basename='discount')
router.register(r'extras', ExtraViewSet,basename="extra")

urlpatterns = [
    path('', include(router.urls)),
]
