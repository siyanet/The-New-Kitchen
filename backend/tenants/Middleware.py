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
# from urllib import request
# from django.utils.deprecation import MiddlewareMixin
# from django.http import Http404
# from django.db import connection
# from .models import Client as Tenant
# from .tenant_context import set_current_tenant
# from .db_routers import set_current_tenant_db

# class TenantMiddleware(MiddlewareMixin):
#     def process_request(self, request):
#         path_parts = request.path.strip("/").split("/")
#         tenant = None
#         import logging
#         logger = logging.getLogger(__name__)
#         logger.info(f"Tenant middleware fired, path={request.path}, tenant={tenant}")


#         # Expecting URLs like /t/<tenant>/
#         if len(path_parts) > 1 and path_parts[0] == "t":
#             tenant_slug = path_parts[1]
#             tenant = Tenant.objects.filter(schema_name=tenant_slug).first()

#             if not tenant:
#                 raise Http404("Tenant not found")

#             # ✅ Store tenant object and db/schema name
#             set_current_tenant(tenant)
#             set_current_tenant_db(tenant.schema_name)

#             # ✅ Switch DB schema (important for schema-based tenancy)
#             connection.set_schema(tenant.schema_name)

#         else:
#             # Default to public
#             set_current_tenant(None)
#             set_current_tenant_db("default")
#             connection.set_schema("public")

#         # Attach tenant to request for convenience
#         request.tenant = tenant


# tenants/middleware.py
import logging
from django.utils.deprecation import MiddlewareMixin
from django.http import Http404
from django.db import connection
from django.urls import get_resolver
from .models import Client as Tenant
from .tenant_context import set_current_tenant
from .db_routers import set_current_tenant_db

logger = logging.getLogger(__name__)

# class TenantMiddleware(MiddlewareMixin):
#     """
#     Path-based tenant middleware for django-tenants.
#     Expects URLs like /t/<tenant_slug>/...
#     """

#     def process_request(self, request):
#         path_parts = request.path.strip("/").split("/")
#         tenant = None

#         # Only handle path-based tenants
#         if len(path_parts) > 1 and path_parts[0] == "t":
#             tenant_slug = path_parts[1]

#             # ✅ Ensure we're in the public schema to query tenants
#             connection.set_schema("public")

#             all_tenants = list(Tenant.objects.all())
#             logger.info(f"All tenants in public schema: {all_tenants}")

#             # Find tenant by schema_name
#             tenant = Tenant.objects.filter(schema_name=tenant_slug).first()

#             if not tenant:
#                 logger.warning(f"Tenant '{tenant_slug}' not found!")
#                 raise Http404("Tenant not found")

#             # ✅ Switch DB connection to tenant schema
#             connection.set_schema(tenant.schema_name)

#             # ✅ Store tenant for request and DB router
#             set_current_tenant(tenant)
#             set_current_tenant_db(tenant.schema_name)

#             logger.info(f"Tenant middleware fired: path={request.path}, tenant={tenant.schema_name}")

#         else:
#             # Public schema fallback
#             connection.set_schema("public")
#             set_current_tenant(None)
#             set_current_tenant_db("default")
#             tenant = None
#             logger.info(f"Tenant middleware fired: path={request.path}, public schema used")

#         # Attach tenant object to request for convenience
#         request.tenant = tenant


# class TenantMiddleware(MiddlewareMixin):
#     """
#     Path-based tenant middleware for django-tenants.
#     Expects URLs like /t/<tenant_slug>/...
#     """

#     def process_request(self, request):
#         path_parts = request.path.strip("/").split("/")
#         tenant = None

#         # Only handle path-based tenants
#         if len(path_parts) > 1 and path_parts[0] == "t":
#             tenant_slug = path_parts[1]

#             # ✅ Ensure we're in the public schema to query tenants
#             connection.set_schema_to_public()

#             all_tenants = list(Tenant.objects.all())
#             logger.info(f"All tenants in public schema: {all_tenants}")

#             # Find tenant by schema_name
#             tenant = Tenant.objects.filter(schema_name=tenant_slug).first()

#             if not tenant:
#                 logger.warning(f"Tenant '{tenant_slug}' not found!")
#                 raise Http404("Tenant not found")

#             # ✅ Switch DB connection to tenant schema
#             connection.set_tenant(tenant)

#             # ✅ Store tenant for request and DB router
#             set_current_tenant(tenant)
#             set_current_tenant_db(tenant.schema_name)

#             # Strip the tenant prefix from the path for URL routing
#             new_path = '/' + '/'.join(path_parts[2:])
#             if not new_path:
#                 new_path = '/'
            
#             # Update the request path so URL routing works correctly
#             request.path = new_path
#             request.path_info = new_path

#             logger.info(f"Tenant middleware fired: original_path={request.path}, tenant={tenant.schema_name}, new_path={new_path}")

#         else:
#             # Public schema fallback
#             connection.set_schema_to_public()
#             set_current_tenant(None)
#             set_current_tenant_db("default")
#             tenant = None
#             logger.info(f"Tenant middleware fired: path={request.path}, public schema used")

#         # Attach tenant object to request for convenience
#         request.tenant = tenant


# class TenantMiddleware(MiddlewareMixin):
#     """
#     Path-based tenant middleware for django-tenants.
#     Expects URLs like /t/<tenant_slug>/...
#     """

#     def process_request(self, request):
#         path_parts = request.path.strip("/").split("/")
#         tenant = None

#         # Only handle path-based tenants
#         if len(path_parts) > 1 and path_parts[0] == "t":
#             tenant_slug = path_parts[1]

#             # ✅ Ensure we're in the public schema to query tenants
#             connection.set_schema("public")

#             all_tenants = list(Tenant.objects.all())
#             logger.info(f"All tenants in public schema: {all_tenants}")

#             # Find tenant by schema_name
#             tenant = Tenant.objects.filter(schema_name=tenant_slug).first()

#             if not tenant:
#                 logger.warning(f"Tenant '{tenant_slug}' not found!")
#                 raise Http404("Tenant not found")

#             # ✅ Switch DB connection to tenant schema
#             connection.set_schema(tenant.schema_name)

#             # ✅ Store tenant for request and DB router
#             set_current_tenant(tenant)
#             set_current_tenant_db(tenant.schema_name)

#             # Log available URLs for debugging
#             self._log_available_urls(request, tenant_slug)

#             logger.info(f"Tenant middleware fired: path={request.path}, tenant={tenant.schema_name}")

#         else:
#             # Public schema fallback
#             connection.set_schema("public")
#             set_current_tenant(None)
#             set_current_tenant_db("default")
#             tenant = None
#             logger.info(f"Tenant middleware fired: path={request.path}, public schema used")

#         # Attach tenant object to request for convenience
#         request.tenant = tenant

#     def _log_available_urls(self, request, tenant_slug):
#         """Log all available URL patterns for debugging"""
#         try:
#             resolver = get_resolver()
#             url_patterns = self._get_url_patterns(resolver)
            
#             logger.info(f"Available URL patterns for tenant '{tenant_slug}':")
#             for pattern in url_patterns:
#                 logger.info(f"  - {pattern}")
                
#             # Also log the specific path we're looking for
#             new_path = '/' + '/'.join(request.path.strip("/").split("/")[2:])
#             logger.info(f"Looking for path: {new_path}")
            
#         except Exception as e:
#             logger.warning(f"Could not retrieve URL patterns: {e}")

#     def _get_url_patterns(self, resolver, prefix=''):
#         """Recursively extract all URL patterns"""
#         patterns = []
#         for pattern in resolver.url_patterns:
#             if hasattr(pattern, 'url_patterns'):
#                 # This is an include - recurse into it
#                 patterns.extend(self._get_url_patterns(pattern, prefix + str(pattern.pattern)))
#             else:
#                 patterns.append(prefix + str(pattern.pattern))
#         return patterns



class TenantMiddleware(MiddlewareMixin):
    """
    Path-based tenant middleware for django-tenants.
    URLs like /t/<tenant_slug>/...
    """

    def process_request(self, request):
        path_parts = request.path.strip("/").split("/")
        tenant = None

        if len(path_parts) > 1 and path_parts[0] == "t":
            tenant_slug = path_parts[1]

            # Switch to public schema to query tenants
            connection.set_schema("public")
            tenant = Tenant.objects.filter(schema_name=tenant_slug).first()

            if not tenant:
                logger.warning(f"Tenant '{tenant_slug}' not found!")
                raise Http404("Tenant not found")

            # Switch DB connection to tenant schema
            connection.set_schema(tenant.schema_name)

            # Store tenant on request
            request.tenant = tenant

            new_path = "/" + "/".join(path_parts[2:])
            request.path_info = new_path  # Important for Django URL resolver
            logger.info(
                f"Tenant middleware fired: original_path={request.path}, "
                f"rewritten_path={new_path}, tenant={tenant.schema_name}"
            )

        else:
            # Public schema fallback
            connection.set_schema("public")
            request.tenant = None
            logger.info(f"Tenant middleware fired: path={request.path}, public schema used")