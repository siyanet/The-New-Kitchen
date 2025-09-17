from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
import uuid
from django.conf import settings
# Create your models here.


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Users must have an email")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    
    ROLE_CHOICES = (
    ('owner', 'Owner'),
    ('chef', 'Chef'),
    ('waiter', 'Waiter'),
    ('team_member', 'Team Member'),
    ('customer', 'Customer'),
)
    
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=20, blank=True)
    full_name = models.CharField(max_length=100)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES,default="Customer")
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name']

    def __str__(self):
        return self.email
    
    
    
# from django_tenants.utils import get_tenant_model

# Client = get_tenant_model()

# class UserTenantRole(models.Model):
#     ROLE_CHOICES = (
#     ('owner', 'Owner'),
#     ('chef', 'Chef'),
#     ('waiter', 'Waiter'),
#     ('team_member', 'Team Member'),
#     ('customer', 'Customer'),
# )


#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='tenant_roles')
#     role = models.CharField(max_length=20, choices=ROLE_CHOICES)
#     is_active = models.BooleanField(default=True)
#     created_at = models.DateTimeField(auto_now_add=True)

#     class Meta:
#         unique_together = ('user', 'tenant')  # Ensure only one role per tenant for a user

#     def __str__(self):
#         return f"{self.user.email} - {self.tenant.name} ({self.role})"
