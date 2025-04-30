
from rest_framework import generics, parsers
from .models import Restaurant
from .serializers import RestaurantSerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Branch
from .serializers import BranchSerializer


from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsOwnerOrReadOnly(BasePermission):
    """
    Everyone can view, but only the owner can edit/delete/create their own branches.
    """

    def has_permission(self, request, view):
        # Allow all for safe methods
        if request.method in SAFE_METHODS:
            return True
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request
        if request.method in SAFE_METHODS:
            return True
        # Write permissions only for restaurant owner
        return obj.restaurants.owner == request.user

class CreateRestaurantWithOwnerView(generics.CreateAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]



class BranchViewSet(viewsets.ModelViewSet):
    serializer_class = BranchSerializer
    permission_classes = {IsOwnerOrReadOnly}

    def get_queryset(self):
        # Public can see all branches
        if self.request.user.is_anonymous or self.request.method in ('GET', 'HEAD', 'OPTIONS'):
            return Branch.objects.all()

        # Owner sees only their branches
        return Branch.objects.filter(restaurants__owner=self.request.user)

    def perform_create(self, serializer):
        restaurant = self.request.user.restaurants.first()
        serializer.save(restaurant=restaurant)
