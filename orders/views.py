import traceback

from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from django.contrib.auth.models import User
from .models import Topping, Dish, Pizza, Order, Order_Entry

# Create your views here.
def index(request):
    subs = Dish.objects.filter(dishType="Sub").values()
    pastas = Dish.objects.filter(dishType="Pasta")
    salads = Dish.objects.filter(dishType="Salad")
    dinnerPlatters = Dish.objects.filter(dishType="Dinner Platter")
    content = {
        "menu": {
            "toppings": Topping.objects.all(),
            "subs": subs,
            "pastas": pastas,
            "salads": salads,
            "dinnerPlatters": dinnerPlatters
        }
    }
    return render(request, "orders/index.html", content)

def cart(request):
    if request.method == "GET":
        return render(request, "orders/cart.html")

def addToCart(request, dish):
    try:
        product = {}
        username = request.user
        user = User.objects.get(username=username)
        user_id = User.objects.get(username=username).pk
        current_order = Order.objects.filter(customer=user, completed=False)
        if not current_order:
            current_order = Order(customer=user, completed=False)
            current_order.save()
        else:
            current_order = Order.objects.get(customer=user, completed=False)
        if dish == 0:
            pizzaType = request.POST["pizzaType"]
            size = request.POST["pizzaSize"]
            special = request.POST.get('pizzaSpecial', False)
            if special != False:
                special = True
            note = ""
            tops = ""
            if special:
                note = f"Special Pizza of Today"
                price = Pizza.objects.get(pizzaType=pizzaType, size=size).specialPrice
            else:
                firstTop = request.POST["firstTop"]
                if firstTop == "noValue":
                    note = f"{pizzaType} {size} without Toppings"
                    price = Pizza.objects.get(pizzaType=pizzaType, size=size).standartPrice
                else:
                    firstTop = Topping.objects.get(pk=firstTop)
                    note = f"{pizzaType} {size} with: {firstTop.name}"
                    price = Pizza.objects.get(pizzaType=pizzaType, size=size).oneTopPrice
                secondTop = request.POST["secondTop"]
                print(f"second: {secondTop}")
                if secondTop == "noValue":
                    secondTop = ""
                else:
                    secondTop = Topping.objects.get(pk=secondTop)
                    note = f"{pizzaType} {size} with: {firstTop.name} and {secondTop.name}"
                    price = Pizza.objects.get(pizzaType=pizzaType, size=size).twoTopPrice
                thirdTop = request.POST["thirdTop"]
                if thirdTop == "noValue":
                    thirdTop = ""
                else:
                    thirdTop = Topping.objects.get(pk=thirdTop)
                    note = f"{pizzaType} {size} with: {firstTop.name}, {secondTop.name} and {thirdTop.name}"
                    price = Pizza.objects.get(pizzaType=pizzaType, size=size).threeTopPrice
            print(f"Note: {note}")
            product = {
                "dishType": f"{pizzaType}",
                "note": note,
                "price": price
            }
        elif dish == 1:
            dishID = request.POST["dishID"]
            dishSize = request.POST["dishSize"]
            dish = Dish.objects.get(pk=dishID)
            extraCheese = request.POST.get('extraCheese', False)
            if extraCheese != False:
                extraCheese = True
            if dishSize == "small":
                dishPrice = dish.priceSmall
            elif dishSize == "large":
                dishPrice = dish.priceLarge
            note = f"{dish.name} {dish.dishType} {dishSize}"
            if dish.dishType == "sub":
                if extraCheese:
                    dishPrice = dishPrice + 0.5
                    note = f"{dish.name} {dish.dishType} {dishSize} with extra Cheese"
            product = {
                "dishType": dish.dishType,
                "note": note,
                "price": dishPrice
            }
        # print(f"product: {product}")
        # print(f"product: {product}, dishType: {product['dishType']}, note: {product['note']}, price: {product['price']}")
        order_entry = Order_Entry(order=current_order, dishType=product['dishType'], note=product['note'], price=product['price'])
        order_entry.save()
        return HttpResponseRedirect(reverse("index"))
    except KeyError:
        return HttpResponseRedirect(reverse("index"))

def orderAddress(request):
    if request.method == "GET":
        return render(request, "orders/orderAddress.html")
    elif request.method == "POST":
        # try:
            username = request.user
            user = User.objects.get(username=username)
            city = request.POST["cityInput"]
            post_code = request.POST["postCodeInput"]
            street = request.POST["streetInput"]
            new_customer = Customer(user=user, city=city, post_code=post_code, street=street)
            print(f"new_customer: {new_customer}")
            new_customer.save()
            return HttpResponseRedirect(reverse("index"))
        # except KeyError:
        #     return
