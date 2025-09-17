from django.urls import path
from .views import get_authenticated_user

urlpatterns = [
    path('me/', get_authenticated_user, name='user-detail'),
]
