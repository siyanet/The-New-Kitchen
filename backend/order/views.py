from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings
from django.shortcuts import get_object_or_404
import requests
import uuid
from rest_framework.permissions import IsAuthenticated
from .models import Order, Payment
from .serializers import OrderSerializer,SubmitRatingSerializer
from items.models import Menu
from rest_framework.viewsets import ModelViewSet
from django.http import HttpRequest
from rest_framework import viewsets, permissions
from .models import Order, Rating
from .serializers import OrderSerializer,RatingSerializer
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Sum, Count
from django.db.models.functions import TruncDate
from django.utils import timezone
from datetime import timedelta
from .models import Order, OrderItem
from restaurant.models import Branch

from items.models import Menu


class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        # If user is an owner, show all orders
        if user.role == 'owner':
            return Order.objects.all().order_by('-created_at')

        # If the user is a waiter, show their assigned orders
        if hasattr(user, 'staff_profile') and hasattr(user.staff_profile, 'waiter_profile'):
            return Order.objects.filter(waiter=user.staff_profile.waiter_profile).order_by('-created_at')

        # If the user is a customer, show their orders
        if hasattr(user, 'orders'):
            return Order.objects.filter(customer=user).order_by('-created_at')

        # If the user is kitchen staff, show orders that contain menus from their categories
        if hasattr(user, 'staff') and hasattr(user.staff, 'kitchen_profile'):
            kitchen = user.staff.kitchen_profile
            kitchen_categories = kitchen.categories.all()
            menu_items = Menu.objects.filter(category__in=kitchen_categories)
            return Order.objects.filter(items__menu_item__in=menu_items).distinct().order_by('-created_at')

        # Default: return no orders
        return Order.objects.none()

    def perform_create(self, serializer):
        serializer.save()




class ChapaPaymentInitView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        order_id = request.data.get("order_id")
        if not order_id:
            return Response({"error": "order_id is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Secure tenant-aware order access
        order = get_object_or_404(Order, id=order_id)

        # Only allow the customer or waiter assigned to this order
        if request.user != order.customer and getattr(request.user, 'waiter', None) != order.waiter:
            return Response({"error": "Permission denied for this order."}, status=status.HTTP_403_FORBIDDEN)

        total_amount = sum([item.portion.price + sum(extra.price for extra in item.extras.all())for item in order.items.all()])

        tx_ref = f"chapa-{uuid.uuid4()}"

        payload = {
            "amount": str(total_amount),
            "currency": "ETB",
            "first_name": order.customer.full_name if order.customer else "Guest",
            # "last_name": order.customer.last_name if order.customer else "User",
            "tx_ref": tx_ref,
            # "callback_url": f"{settings.FRONTEND_BASE_URL}/api/orders/payment/callback/",
            # "return_url": f"{settings.FRONTEND_BASE_URL}/",
        }

        headers = {
            "Authorization": f"Bearer {settings.CHAPA_SECRET_KEY}"
        }

        chapa_response = requests.post(
            "https://api.chapa.co/v1/transaction/initialize",
            data=payload,
            headers=headers
        )

        if chapa_response.status_code == 200:
            Payment.objects.create(order=order, chapa_tx_ref=tx_ref, amount=total_amount)
            return Response(chapa_response.json(), status=status.HTTP_200_OK)
        else:
            try:
                error_json = chapa_response.json()
            except Exception:
                error_json = {"detail": chapa_response.text}
    
            return Response({
                "error": "Payment initialization failed",
                "detail": error_json
            }, status=status.HTTP_400_BAD_REQUEST)


class ChapaPaymentInitView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request: HttpRequest):
        order_id = request.data.get("order_id")
        if not order_id:
            return Response({"error": "order_id is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Secure tenant-aware order access
        order = get_object_or_404(Order, id=order_id)

        # Only allow the customer or waiter assigned to this order
        if request.user != order.customer and getattr(request.user, 'waiter', None) != order.waiter:
            return Response({"error": "Permission denied for this order."}, status=status.HTTP_403_FORBIDDEN)

        total_amount = sum([
            item.portion.price + sum(extra.price for extra in item.extras.all())
            for item in order.items.all()
        ])

        tx_ref = f"chapa-{uuid.uuid4()}"

        # Extract subdomain from the request's host: e.g. subdomain.thekitchenethio.localhost:8000
        host = request.get_host()
        subdomain = host.split(".")[0] if "localhost" in host and "." in host else "default"

        # Define dynamic URLs
        callback_url = f"http://{subdomain}.thekitchenethio.localhost:8000/api/orders/payment/callback/"
        return_url = f"http://localhost:5173/thekitchenethio/{subdomain}/CustomerOrderView"

        payload = {
            "amount": str(total_amount),
            "currency": "ETB",
            "first_name": order.customer.full_name if order.customer else "Guest",
            "tx_ref": tx_ref,
            "callback_url": callback_url,
            "return_url": return_url,
        }

        headers = {
            "Authorization": f"Bearer {settings.CHAPA_SECRET_KEY}"
        }

        try:
            chapa_response = requests.post(
                "https://api.chapa.co/v1/transaction/initialize",
                data=payload,
                headers=headers
            )
            chapa_response.raise_for_status()
        except requests.exceptions.HTTPError:
            try:
                error_json = chapa_response.json()
            except Exception:
                error_json = {"detail": chapa_response.text}
            return Response({
                "error": "Payment initialization failed",
                "detail": error_json
            }, status=status.HTTP_400_BAD_REQUEST)

        # Create the payment record
        Payment.objects.create(order=order, chapa_tx_ref=tx_ref, amount=total_amount)

        return Response(chapa_response.json(), status=status.HTTP_200_OK)


@api_view(['GET'])
def chapa_callback(request):
    # Accept both 'tx_ref' and 'trx_ref'
    tx_ref = request.GET.get('tx_ref') or request.GET.get('trx_ref')

    if not tx_ref:
        return Response({"error": "Missing transaction reference"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        payment = Payment.objects.get(chapa_tx_ref=tx_ref)
    except Payment.DoesNotExist:
        return Response({"error": "Invalid transaction reference."}, status=status.HTTP_404_NOT_FOUND)

    # Update order status
    order = payment.order
    order.is_paid = True
    order.status = 'confirmed'
    order.save()

    return Response({"message": "Payment successful, order confirmed."}, status=status.HTTP_200_OK)

class SubmitRatingView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = SubmitRatingSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": "Rating submitted successfully."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class RatingViewSet(ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    permission_classes = [IsAuthenticated]

   
    
class DashboardViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def get_branch(self, request):
        branch_id = request.query_params.get("branch_id")
        if branch_id:
            try:
                return Branch.objects.get(id=branch_id)
            except Branch.DoesNotExist:
                return None
        return None

    @action(detail=False, methods=['get'], url_path='best-sellers')
    def best_sellers(self, request):
        branch = self.get_branch(request)
        top_n = int(request.query_params.get("limit", 5))

        order_items = OrderItem.objects.all()
        if branch:
            order_items = order_items.filter(order__branch=branch)

        best_sellers = (
            order_items
            .values("portion__menu__id", "portion__menu__name")
            .annotate(total_sold=Sum("quantity"))
            .order_by("-total_sold")[:top_n]
        )
        return Response(best_sellers)

    @action(detail=False, methods=['get'], url_path='total-revenue')
    def total_revenue(self, request):
        branch = self.get_branch(request)
        order_items = OrderItem.objects.all()
        if branch:
            order_items = order_items.filter(order__branch=branch)

        total = order_items.aggregate(revenue=Sum("portion__price"))["revenue"] or 0
        return Response({"total_revenue": total})
    
    @action(detail=False, methods=['get'], url_path='total-revenue-last-30-days')
    def total_revenue_last_30_days(self, request):
        branch = self.get_branch(request)
        thirty_days_ago = timezone.now() - timedelta(days=30)

        order_items = OrderItem.objects.filter(order__created_at__gte=thirty_days_ago)
        if branch:
            order_items = order_items.filter(order__branch=branch)

        total = order_items.aggregate(revenue=Sum("portion__price"))["revenue"] or 0
        return Response({"total_revenue_last_30_days": total})
    
    
    
    @action(detail=False, methods=['get'], url_path='orders-last-7-days')
    def orders_last_7_days(self, request):
        today = timezone.now().date()
        seven_days_ago = today - timedelta(days=6)

        branch = self.get_branch(request)

        orders = Order.objects.filter(created_at__date__gte=seven_days_ago)
        if branch:
            orders = orders.filter(branch=branch)

        daily = (
            orders
            .annotate(date=TruncDate("created_at"))
            .values("date")
            .annotate(order_count=Count("id"))
            .order_by("date")
        )
        return Response(daily)

    @action(detail=False, methods=['get'], url_path='status-breakdown')
    def status_breakdown(self, request):
        branch = self.get_branch(request)
        orders = Order.objects.all()
        if branch:
            orders = orders.filter(branch=branch)

        status_summary = (
            orders
            .values("status")
            .annotate(count=Count("id"))
            .order_by("-count")
        )
        return Response(status_summary)