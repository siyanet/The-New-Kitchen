from django.db import models
from django.conf import settings
import uuid
from staff.models import Waiter
from items.models import Menu,Extra,Portion
from restaurant.models import Branch


class OrderStatus:
    PENDING = 'pending'
    CONFIRMED = 'confirmed'
    COMPLETED = 'completed'
    CANCELLED = 'cancelled'
    SERVED = 'served'
    PICKED_UP = 'pickedup'

    CHOICES = [
        (PENDING, 'Pending'),
        (CONFIRMED, 'Confirmed'),
        (COMPLETED, 'Completed'),
        (CANCELLED, 'Cancelled'),
        (SERVED, 'Served'),
        (PICKED_UP, 'Picked Up'),
    ]


class Order(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    customer = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL,related_name = 'orders')
    waiter = models.ForeignKey(Waiter, null=True, blank=True, on_delete=models.SET_NULL)
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=OrderStatus.CHOICES, default=OrderStatus.PENDING)
    is_paid = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.pk:  # Only on creation
            if self.waiter and not self.customer:
                self.status = 'confirmed'
            elif self.customer and self.is_paid:
                self.status = 'confirmed'
            else:
                self.status = 'pending'
        super().save(*args, **kwargs)


    def __str__(self):
        return f"Order #{self.id}"


# class OrderItem(models.Model):
#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
#     menu_item = models.ForeignKey(Menu, on_delete=models.CASCADE)
#     quantity = models.PositiveIntegerField(default=1)
#     extras = models.ManyToManyField(Extra, blank=True, related_name='order_items')  # NEW FIELD

        
        
#     def __str__(self):
#         return f"{self.quantity}x {self.menu_item.name} (Order #{self.order.id})"



class OrderItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    portion = models.ForeignKey(Portion, on_delete=models.CASCADE, related_name='order_items')
    quantity = models.PositiveIntegerField(default=1)
    extras = models.ManyToManyField(Extra, blank=True, related_name='order_items')

    def __str__(self):
        return f"{self.quantity}x {self.portion.menu.name} - {self.portion.size} (Order #{self.order.id})"

    @property
    def price(self):
        total = self.portion.price * self.quantity
        extras_total = sum(extra.price for extra in self.extras.all())
        return total + extras_total



class Payment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name='payment')
    chapa_tx_ref = models.CharField(max_length=100, unique=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, default='pending')  # 'pending', 'success', 'failed'
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment for Order #{self.order.id} - {self.status}"


class Rating(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    customer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='ratings')
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE, related_name='ratings')
    rating = models.PositiveIntegerField()  # 1 to 5
    comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('customer', 'menu')  # one rating per menu per customer

    def __str__(self):
        return f"{self.customer} rated {self.menu} - {self.rating}"