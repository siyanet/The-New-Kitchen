
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TeamMemberStaffViewSet,KitchenViewSet,WaiterViewSet,QRTokenLoginView

router = DefaultRouter()
router.register(r'team_members', TeamMemberStaffViewSet, basename='teammember')
router.register(r'kitchens', KitchenViewSet)
router.register(r'waiters', WaiterViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/login/qr-token/', QRTokenLoginView.as_view(), name='qr-token-login'),
]
