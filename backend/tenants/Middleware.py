# tenant_middleware.py
from .models import Tenant
from .tenant_context import set_current_tenant
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

class TenantMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        hostname = request.get_host().split(':')[0]
        tenant = None

        if 'localhost' in hostname or 'render.com' in hostname:
            # get tenant from path: /t/<tenant>/
            path_parts = request.path.strip('/').split('/')
            if len(path_parts) > 1 and path_parts[0] == 't':
                tenant_name = path_parts[1]
                tenant = Tenant.objects.filter(name=tenant_name).first()
        else:
            tenant = Tenant.objects.filter(domain=hostname).first()

        if not tenant:
            raise Http404("Tenant not found")

        set_current_tenant(tenant)
        response = self.get_response(request)
        return response

