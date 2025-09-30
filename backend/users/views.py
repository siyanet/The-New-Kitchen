from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import CustomUserSerializer  # your existing serializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_authenticated_user(request):
    serializer = CustomUserSerializer(request.user)
    return Response(serializer.data, status=status.HTTP_200_OK)
