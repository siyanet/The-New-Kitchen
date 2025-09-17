from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer, UserSerializer as BaseUserSerializer
from .models import CustomUser
from djoser.serializers import TokenCreateSerializer
from rest_framework import serializers 


class CustomUserCreateSerializer(BaseUserCreateSerializer):
    role = serializers.CharField(default='customer') 
    class Meta(BaseUserCreateSerializer.Meta):
        model = CustomUser
        fields = ('id', 'email', 'full_name', 'phone_number', 'password','role')
        extra_kwargs = {
            'password': {'write_only': True},
        }


class CustomUserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        model = CustomUser
        fields = ('id', 'email', 'full_name', 'phone_number', 'role')


class CustomTokenObtainPairSerializer(TokenCreateSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Include basic user info in the token
        token['user_id'] = str(user.id)
        token['email'] = user.email
        token['full_name'] = user.full_name
        token['phone_number'] = user.phone_number
        token['role'] = user.role

        return token