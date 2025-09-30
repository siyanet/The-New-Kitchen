# tenants/serializers.py
from rest_framework import serializers
from .models import Client, Domain
from django.utils.text import slugify


class TenantRegistrationSerializer(serializers.ModelSerializer):
    # Accept a domain as a write-only field from the request data.


    class Meta:
        model = Client
        # Include all the fields you want your tenant to register with.
        fields = [
            "name", "description", "logo", "phone_number", "email",
            "opening_time", "closing_time", "paid_until", "on_trial"
        ]

    def create(self, validated_data):
     
        schema_name = slugify(validated_data['name']).replace('-', '_')[:63]
        
        # Generate domain name (name + base domain)
        domain_name = f"{slugify(validated_data['name']).replace('-', '')}.thekitchenethio.localhost"
        # Create the tenant client (this creates the tenant's schema, etc.).
        tenant = Client.objects.create(
            schema_name=schema_name,
            **validated_data
        )
        
        # Create domain record
        Domain.objects.create(
            domain=domain_name,
            tenant=tenant,
            is_primary=True
        )
        return tenant
    
    
    
class TenantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = [
            'id', 'name', 'description', 'logo', 'phone_number', 'email',
            'opening_time', 'closing_time', 'is_active', 'paid_until', 
            'on_trial', 'created_at', 'updated_at'
        ]