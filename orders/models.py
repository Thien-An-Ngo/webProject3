from django.db import models

# Create your models here.
class Pizza(models.Model):
    name = models.CharField(max_length=32)
    priceSmall = models.FloatField()
    priceLarge = models.FloatField()

class Topping(models.Model):
    name = models.CharField(max_length=32)
    pizzas = models.ManyToManyField(Pizza, blank=True, related_name="toppings")
