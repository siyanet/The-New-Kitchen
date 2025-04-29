
from rest_framework import generics, parsers
from .models import Restaurant
from .serializers import RestaurantSerializer

class CreateRestaurantWithOwnerView(generics.CreateAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]
