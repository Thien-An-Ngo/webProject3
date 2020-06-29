from django.db import models

# Create your models here.
class Topping(models.Model):
    name = models.CharField(max_length=32)

class Dish(models.Model):
    name = models.CharField(max_length=32)
    dishType = models.CharField(max_length=32)
    prizeSmall = models.FloatField(max_length=8, blank=True, null=True)
    prizeLarge = models.FloatField(max_length=8, blank=True, null=True)
