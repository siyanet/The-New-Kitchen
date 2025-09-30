# tenants/models.py

from django.db import models
from django_tenants.models import TenantMixin, DomainMixin
import uuid

class Client(TenantMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    logo = models.ImageField(upload_to='restaurant_logos/', null=True, blank=True)
    phone_number = models.CharField(max_length=20)
    email = models.EmailField()
    opening_time = models.TimeField()
    closing_time = models.TimeField()
    is_active = models.BooleanField(default=True)
    paid_until = models.DateField()
    on_trial = models.BooleanField()
    auto_create_schema = True
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Tenant Client (Restaurant)"
        verbose_name_plural = "Tenant Clients (Restaurants)"

    def __str__(self):
        return self.name

class Domain(DomainMixin):
    pass




