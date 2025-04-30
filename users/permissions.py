
from rest_framework import permissions

class IsRestaurantOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.restaurant.owner == request.user




class IsRestaurantOwner(permissions.BasePermission):
    """
    Allows access only to users who are the owner of the restaurant.
    """

    def has_permission(self, request, view):
        return request.user and request.user.role == 'owner'

    def has_object_permission(self, request, view, obj):
        return obj.restaurant.owner == request.user
