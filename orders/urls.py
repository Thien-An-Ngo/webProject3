from django.urls import path

from . import views, forms

urlpatterns = [
    path("", views.index, name="index"),
    path("add-to-cart/<int:dish>", views.addToCart, name="addToCart"),
    path("cart", views.cart, name="cart"),
    path("delete-order-entry/<int:order_entry_pk>", views.deleteOrderEntry, name="deleteOrderEntry"),
    path("order-address", views.orderAddress, name="orderAddress"),
    path("orders-placed", views.ordersPlaced, name="ordersPlaced")
]
