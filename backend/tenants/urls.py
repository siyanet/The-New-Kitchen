# # core/urls.py
from django.urls import path
from .views import TenantRegistrationView,TenantInfoView

urlpatterns = [
    path('register/', TenantRegistrationView.as_view(), name='register-tenant'),
     path('tenant-info/', TenantInfoView.as_view(), name='tenant-info'),
]
