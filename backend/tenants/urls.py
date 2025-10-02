# # core/urls.py
from django.urls import path
from .views import TenantRegistrationView,TenantInfoView, debug_schemas

urlpatterns = [
    path('register/', TenantRegistrationView.as_view(), name='register-tenant'),
     path('tenant-info/', TenantInfoView.as_view(), name='tenant-info'),
     path("debug-schemas/", debug_schemas),

]
