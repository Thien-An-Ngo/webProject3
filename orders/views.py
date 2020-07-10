from django.http import HttpResponse
from django.shortcuts import render

from .models import Topping, Dish

# Create your views here.
def index(request):
    subs = Dish.objects.filter(dishType="Sub").values()
    pastas = Dish.objects.filter(dishType="Pasta")
    salads = Dish.objects.filter(dishType="Salad")
    dinnerPlatters = Dish.objects.filter(dishType="Dinner Platter")
    hurzel = "Hallöchen"
    content = {
        "menu": {
            "hurzel": hurzel,
            "toppings": Topping.objects.all(),
            "subs": subs,
            "pastas": pastas,
            "salads": salads,
            "dinnerPlatters": dinnerPlatters
        }
    }
    # print(f"subs: {subs}")
    # print(f"menu: {menu}")
    # print("type: ")
    # print(type(subs))
    return render(request, "orders/index.html", content)

def cart(request):
    user = {
        "name": request.user
    }
    return render(request, "orders/cart.html")
