from django.contrib import admin

from .models import Topping, Dish

# Register your models here.
admin.site.register(Topping)
admin.site.register(Dish)
