from django.contrib import admin

from .models import Pizza, Topping

# Register your models here.
class ToppingInline(admin.StackedInline):
    model = Topping.pizzas.through
    extra = 1

class PizzaAdmin(admin.ModelAdmin):


admin.site.register(Pizza)
admin.site.register(Topping)
