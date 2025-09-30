import uuid
from django.db import models
from users.models import CustomUser
from restaurant.models import  Branch
from items.models import Category 
from django.core.exceptions import ValidationError
from django.contrib.auth.models import Permission

class Staff(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='staff_profile')
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name='staffs')
    # role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    permissions = models.ManyToManyField(Permission, blank=True, related_name='staff_members')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.full_name} - {self.role}"


class Waiter(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    staff = models.OneToOneField(Staff, on_delete=models.CASCADE, limit_choices_to={'role': 'waiter'}, related_name='waiter_profile')
    qr_token = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Waiter: {self.staff.user.full_name}"


class Kitchen(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    staff = models.OneToOneField(Staff, on_delete=models.CASCADE, limit_choices_to={'user.role': 'kitchen'}, related_name='kitchen_profile')
    categories = models.ManyToManyField(Category, related_name='kitchen_profiles')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    

    def __str__(self):
        return f"Kitchen: {self.staff.user.full_name}"
