from django.contrib import admin

from .models import Topping, Dish, Pizza, Order, Order_Entry

# Register your models here.
admin.site.register(Topping)
admin.site.register(Dish)
admin.site.register(Pizza)
admin.site.register(Order)
admin.site.register(Order_Entry)
