from django.urls import path

from . import views, forms

urlpatterns = [
    path("", views.index, name="index"),
    path("addToCart/<int:dish>", views.addToCart, name="addToCart"),
    path("cart", views.cart, name="cart")
]
