from django.urls import path
from .views import CreateRestaurantWithOwnerView

urlpatterns = [
    path('create/', CreateRestaurantWithOwnerView.as_view(), name='restaurant-create'),
]
