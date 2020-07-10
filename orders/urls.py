from django.urls import path

from . import views, forms
from .forms import UserLoginForm

urlpatterns = [
    path("", views.index, name="index"),
    path("cart/", views.cart, name="cart")
]
