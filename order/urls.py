# in orders/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OrderViewSet,DashboardViewSet, chapa_callback, RatingViewSet, ChapaPaymentInitView,SubmitRatingView

router = DefaultRouter()
router.register(r'orders', OrderViewSet, basename='order')
router.register(r'ratings', RatingViewSet, basename='rating')
router.register(r'dashboard', DashboardViewSet, basename='dashboard')

urlpatterns = [
    path('', include(router.urls)),
    path('payment/callback/', chapa_callback, name='chapa-callback'),
    path('payment/initiate/', ChapaPaymentInitView.as_view(), name='initiate-payment'),
    path('ratings/submit/', SubmitRatingView.as_view(), name='submit-rating'),
]
