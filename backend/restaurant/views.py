
# from rest_framework import generics, parsers

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Branch
from .serializers import BranchSerializer


from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated

class IsOwnerRoleOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow users with the 'owner' role to create branches.
    """

    def has_permission(self, request, view):
        # Allow safe methods (GET, HEAD, OPTIONS) for any authenticated user
        if request.method in permissions.SAFE_METHODS:
            return True

        # Only allow 'owner' role to create (POST)
        if request.method == 'POST':
            return request.user and request.user.role == 'owner'

        # Allow other methods (PUT, DELETE) only for 'owner' as well
        return request.user and request.user.role == 'owner'




class BranchViewSet(viewsets.ModelViewSet):
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer
    permission_classes = [IsAuthenticated,IsOwnerRoleOrReadOnly]