"""
URL configuration for the_kitchen_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
     path('api/tenant/', include('tenants.urls')),
     path('t/<str:ignored>/', include([
        path('api/auth/', include('djoser.urls')),
        path('api/auth/', include('djoser.urls.jwt')), 
        path('api/users/', include('users.urls')),
        path('api/restaurant/', include('restaurant.urls')),
        path('api/items/', include('items.urls')),
        path('api/staffs/', include('staff.urls')),
        path('api/orders/', include('order.urls')),
       
    ])),
    # path('api/auth/', include('djoser.urls')),
    # path('api/auth/', include('djoser.urls.jwt')), 
    # path('api/users/',include('users.urls')),
    # path('api/restaurant/', include('restaurant.urls')),
    # path('api/items/', include('items.urls')),
    # path('api/staffs/',include("staff.urls")),
    # path('api/orders/',include("order.urls")),
    # path('api/tenant/', include('tenants.urls')),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)