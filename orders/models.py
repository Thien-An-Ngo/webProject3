from django.db import models

from django.contrib.auth.models import User
# Create your models here.
class Topping(models.Model):
    name = models.CharField(max_length=32)

class Dish(models.Model):
    name = models.CharField(max_length=32)
    dishType = models.CharField(max_length=32)
    prizeSmall = models.FloatField(max_length=8, null=True)
    prizeLarge = models.FloatField(max_length=8, null=True)

class Pizza(models.Model):
    pizzaType = models.CharField(max_length=16)
    size = models.CharField(max_length=16)
    standartPrice = models.FloatField(null=False)
    oneTopPrice = models.FloatField(null=False)
    twoTopPrice = models.FloatField(null=False)
    threeTopPrice = models.FloatField(null=False)
    specialPrice = models.FloatField(null=False)

class Customer(models.Model):
    user_id = models.OneToOneField(User, unique=True, on_delete=models.CASCADE,)
    city = models.CharField(max_length=64)
    post_code = models.IntegerField()
    street = models.CharField(max_length=64)

class Cart(models.Model):
    customer_id = models.ForeignKey(Customer, on_delete=models.CASCADE)
    order_date = models.DateField(blank=True)

class Product(models.Model):
    cart_id = models.ForeignKey(Cart, on_delete=models.CASCADE)
    prize = models.FloatField(null=True)
    dishType = models.CharField(max_length=32)
    extra_information = models.TextField(blank=True)
