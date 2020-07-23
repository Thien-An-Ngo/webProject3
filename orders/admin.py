from django.contrib import admin

from .models import Topping, Dish, Pizza, Customer, Cart, Product

# Register your models here.
admin.site.register(Topping)
admin.site.register(Dish)
admin.site.register(Pizza)
admin.site.register(Customer)
admin.site.register(Cart)
admin.site.register(Product)
