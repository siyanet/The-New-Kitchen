from django.urls import path,include

from rest_framework.routers import DefaultRouter
from .views import BranchViewSet

router = DefaultRouter()
router.register(r'branches', BranchViewSet, basename='branch')


urlpatterns = [
    # path('create/', CreateRestaurantWithOwnerView.as_view(), name='restaurant-create'),
     path('', include(router.urls)),
]
