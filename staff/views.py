from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Staff,Kitchen,Waiter
from rest_framework.permissions import IsAuthenticated
from .serializers import StaffSerializer, WaiterSerializer, KitchenSerializer
from users.permissions import IsRestaurantOwner
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token


# Create your views here.


class TeamMemberStaffViewSet(viewsets.ModelViewSet):
    serializer_class = StaffSerializer
    permission_classes = [permissions.IsAuthenticated, IsRestaurantOwner]

    def get_queryset(self):
        return Staff.objects.filter(
            restaurant=self.request.user.restaurant,
            role='team_member'
        )

    def perform_create(self, serializer):
        serializer.save(
            restaurant=self.request.user.restaurant,
            role='team_member'
        )
        
        
        
        
        
class KitchenViewSet(viewsets.ModelViewSet):
    queryset = Kitchen.objects.all()
    serializer_class = KitchenSerializer
    permission_classes = [IsAuthenticated,IsRestaurantOwner]  

 
 
class WaiterViewSet(viewsets.ModelViewSet):
    queryset = Waiter.objects.all()
    serializer_class = WaiterSerializer
    permission_classes = [IsAuthenticated]  # Customize the permission as needed


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
        token, created = Token.objects.get_or_create(user=user)

        return Response({
            "token": token.key,
            "user": {
                "id": user.id,
                "full_name": user.full_name,
                "email": user.email,
            }
        }, status=status.HTTP_200_OK)