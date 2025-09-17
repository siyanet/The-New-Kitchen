from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Staff,Kitchen,Waiter
from rest_framework.permissions import IsAuthenticated
from .serializers import StaffSerializer, WaiterSerializer, KitchenSerializer
from restaurant.views import IsOwnerRoleOrReadOnly
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.tokens import RefreshToken

# Create your views here.


class TeamMemberStaffViewSet(viewsets.ModelViewSet):
    serializer_class = StaffSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerRoleOrReadOnly]

    def get_queryset(self):
        return Staff.objects.filter(
            role='team_member'
        )

    def perform_create(self, serializer):
        serializer.save(
          
            role='team_member'
        )
        
        
        
        
        
class KitchenViewSet(viewsets.ModelViewSet):
    queryset = Kitchen.objects.all()
    serializer_class = KitchenSerializer
    permission_classes = [IsAuthenticated,IsOwnerRoleOrReadOnly]  

 
 
class WaiterViewSet(viewsets.ModelViewSet):
    queryset = Waiter.objects.all()
    serializer_class = WaiterSerializer
    permission_classes = [IsAuthenticated,IsOwnerRoleOrReadOnly]  # Customize the permission as needed


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
class QRTokenLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        qr_token = request.data.get('qr_token')

        if not qr_token:
            return Response({"error": "QR token is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            waiter = Waiter.objects.get(qr_token=qr_token)
        except Waiter.DoesNotExist:
            return Response({"error": "Invalid QR token."}, status=status.HTTP_400_BAD_REQUEST)

        # Retrieve the user associated with the waiter
        user = waiter.staff.user
        
        # Generate or retrieve the token for the user
        tokens = get_tokens_for_user(user)

        return Response({
            "access": tokens["access"],
            "refresh": tokens["refresh"],
            "user": {
                "id": user.id,
                "full_name": user.full_name,
                "email": user.email,
            }
        }, status=status.HTTP_200_OK)