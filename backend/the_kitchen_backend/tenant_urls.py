from django.urls import path, include

urlpatterns = [
    path("api/auth/", include("djoser.urls")),
    path("api/auth/", include("djoser.urls.jwt")),
    path("api/users/", include("users.urls")),
    path("api/restaurant/", include("restaurant.urls")),
    path("api/items/", include("items.urls")),
    path("api/staffs/", include("staff.urls")),
    path("api/orders/", include("order.urls")),
    path("api/tenant/", include("tenants.urls")),
    
]
