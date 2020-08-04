from django.db import models

from django.contrib.auth.models import User
# Create your models here.
class Topping(models.Model):
    name = models.CharField(max_length=32)

class Dish(models.Model):
    name = models.CharField(max_length=32)
    dishType = models.CharField(max_length=32)
    priceSmall = models.FloatField(max_length=8, null=True)
    priceLarge = models.FloatField(max_length=8, null=True)

class Pizza(models.Model):
    pizzaType = models.CharField(max_length=16)
    size = models.CharField(max_length=16)
    standartPrice = models.FloatField(null=False)
    oneTopPrice = models.FloatField(null=False)
    twoTopPrice = models.FloatField(null=False)
    threeTopPrice = models.FloatField(null=False)
    specialPrice = models.FloatField(null=False)

class Order(models.Model):
    customer = models.ForeignKey(User, on_delete=models.CASCADE,)
    city = models.CharField(max_length=64, blank=True)
    post_code = models.IntegerField(null=True, blank=True)
    street = models.CharField(max_length=64, blank=True)
    order_datetime = models.DateTimeField(null=True, blank=True)
    completed = models.BooleanField()
    is_sent = models.BooleanField()

class Order_Entry(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    dishType = models.CharField(max_length=32)
    note = models.TextField(blank=True)
    price = models.FloatField(null=True)
