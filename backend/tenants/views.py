# # tenants/views.py
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from .serializers import TenantRegistrationSerializer

# class TenantRegistrationView(APIView):
#     def post(self, request, *args, **kwargs):
#         serializer = TenantRegistrationSerializer(data=request.data)
#         if serializer.is_valid():
#             tenant = serializer.save()
#             return Response({
#                 "message": "Tenant created successfully",
#                 "tenant_id": tenant.id,
#                 "schema": tenant.schema_name,
#                 'domain': tenant.domain
#             }, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django_tenants.utils import tenant_context
from .serializers import TenantRegistrationSerializer
from users.models import CustomUser
from users.serializers import CustomUserCreateSerializer, CustomUserSerializer
from djoser.conf import settings as djoser_settings
from djoser.utils import login_user
from .models import Domain,Client
from .serializers import TenantSerializer
from rest_framework.permissions import AllowAny
class TenantRegistrationView(APIView):
    def post(self, request, *args, **kwargs):
        # First create the tenant
        tenant_serializer = TenantRegistrationSerializer(data=request.data)
        if not tenant_serializer.is_valid():
            return Response(tenant_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        tenant = tenant_serializer.save()
        
        # Then create the owner user within the tenant's schema
        with tenant_context(tenant):
            owner_data = {
                'email': request.data.get('owner_email'),
                'password': request.data.get('owner_password'),
                'full_name': request.data.get('owner_name'),
                'phone_number': request.data.get('owner_phone', ''),
                'role': 'owner',
                'is_staff': True
            }
            
            # Use Djoser's serializer for user creation
            user_serializer = CustomUserCreateSerializer(data=owner_data)
            if not user_serializer.is_valid():
                # If user creation fails, delete the tenant we just created
                tenant.delete(force_drop=True)
                return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            owner = user_serializer.save()
            
            
            # Prepare response data
            response_data = {
                "message": "Tenant and owner created successfully",
                "tenant": {
                    "id": str(tenant.id),
                    "name": tenant.name,
                    "schema_name": tenant.schema_name,
                    "domain": tenant.domains.first().domain
                },
                "owner": CustomUserSerializer(owner).data,
             
            }
            
            return Response(response_data, status=status.HTTP_201_CREATED)
        
        
        
        
class TenantInfoView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        tenant = request.tenant
        if tenant and isinstance(tenant, Client):
            serializer = TenantSerializer(tenant)
            return Response({'tenant': serializer.data})
        return Response({"detail": "Tenant not found"}, status=404)

