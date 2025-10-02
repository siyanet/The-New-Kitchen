# tenant_middleware.py
# from .models import Tenant
# from .tenant_context import set_current_tenant
# class TenantMiddleware:
#     def __init__(self, get_response):
#         self.get_response = get_response

#     def __call__(self, request):
#         hostname = request.get_host().split(':')[0]
#         tenant = Tenant.objects.filter(domain=hostname).first()
#         if not tenant:
#             raise Http404("Tenant not found")

#         set_current_tenant(tenant)  # You’ll need a tenant context helper
#         response = self.get_response(request)
#         return response

# class TenantMiddleware:
#     def __init__(self, get_response):
#         self.get_response = get_response

#     def __call__(self, request):
#         hostname = request.get_host().split(':')[0]
#         tenant = None

#         if 'localhost' in hostname or 'render.com' in hostname:
#             # get tenant from path: /t/<tenant>/
#             path_parts = request.path.strip('/').split('/')
#             if len(path_parts) > 1 and path_parts[0] == 't':
#                 tenant_name = path_parts[1]
#                 tenant = Tenant.objects.filter(name=tenant_name).first()
#         else:
#             tenant = Tenant.objects.filter(domain=hostname).first()

#         if not tenant:
#             raise Http404("Tenant not found")

#         set_current_tenant(tenant)
#         response = self.get_response(request)
#         return response



# tenants/middleware.py
from urllib import request
from django.utils.deprecation import MiddlewareMixin
from django.http import Http404
from django.db import connection
from .models import Tenant
from .tenant_context import set_current_tenant
from .db_routers import set_current_tenant_db

class TenantMiddleware(MiddlewareMixin):
    def process_request(self, request):
        path_parts = request.path.strip("/").split("/")
        tenant = None
        import logging
        logger = logging.getLogger(__name__)
        logger.info(f"Tenant middleware fired, path={request.path}, tenant={tenant}")


        # Expecting URLs like /t/<tenant>/
        if len(path_parts) > 1 and path_parts[0] == "t":
            tenant_slug = path_parts[1]
            tenant = Tenant.objects.filter(schema_name=tenant_slug).first()

            if not tenant:
                raise Http404("Tenant not found")

            # ✅ Store tenant object and db/schema name
            set_current_tenant(tenant)
            set_current_tenant_db(tenant.schema_name)

            # ✅ Switch DB schema (important for schema-based tenancy)
            connection.set_schema(tenant.schema_name)

        else:
            # Default to public
            set_current_tenant(None)
            set_current_tenant_db("default")
            connection.set_schema("public")

        # Attach tenant to request for convenience
        request.tenant = tenant
