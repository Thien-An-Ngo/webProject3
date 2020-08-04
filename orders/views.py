import traceback
from datetime import datetime

from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from django.contrib.auth.models import User
from .models import Topping, Dish, Pizza, Order, Order_Entry

# Create your views here.
def index(request):
    user = User.objects.get(username=request.user)
    content = {}
    subs = Dish.objects.filter(dishType="Sub").values()
    pastas = Dish.objects.filter(dishType="Pasta")
    salads = Dish.objects.filter(dishType="Salad")
    dinnerPlatters = Dish.objects.filter(dishType="Dinner Platter")
    current_order = Order.objects.filter(customer=user, completed=False)
    if not current_order:
        content = {
            "menu": {
                "open_order": False,
                "toppings": Topping.objects.all(),
                "subs": subs,
                "pastas": pastas,
                "salads": salads,
                "dinnerPlatters": dinnerPlatters
            }
        }
    else:
        current_order = Order.objects.get(customer=user, completed=False)
        regPizzaCount = Order_Entry.objects.filter(order=current_order, dishType="Regular Pizza").count()
        sicPizzaCount = Order_Entry.objects.filter(order=current_order, dishType="Sicilian Pizza").count()
        subCount = Order_Entry.objects.filter(order=current_order, dishType="Sub").count()
        pastaCount = Order_Entry.objects.filter(order=current_order, dishType="Pasta").count()
        saladCount = Order_Entry.objects.filter(order=current_order, dishType="Salad").count()
        platterCount = Order_Entry.objects.filter(order=current_order, dishType="Dinner Platters").count()
        content = {
            "menu": {
                "open_order": True,
                "toppings": Topping.objects.all(),
                "subs": subs,
                "pastas": pastas,
                "salads": salads,
                "dinnerPlatters": dinnerPlatters,
                "regPizzaCount": regPizzaCount,
                "sicPizzaCount": sicPizzaCount
            }
        }
    return render(request, "orders/index.html", content)

def cart(request):
    if request.method == "GET":
        cart = {}
        username = request.user
        user = User.objects.get(username=username)
        current_order = Order.objects.filter(customer=user, completed=False)
        if not current_order:
            cart = {"error": "You haven't ordered anything yet"}
        else:
            current_order = Order.objects.get(customer=user, completed=False)
            orders = Order_Entry.objects.filter(order=current_order).all()
            orders.reverse()
            cart = {
                'orders': orders
            }
        print(f"orders: {orders}")
        return render(request, "orders/cart.html", cart)

def deleteOrderEntry(request, order_entry_pk):
    username = request.user
    user = User.objects.get(username=username)
    this_order_entry = Order_Entry.objects.filter(pk=order_entry_pk)
    if this_order_entry:
        this_order_entry = Order_Entry.objects.get(pk=order_entry_pk)
        this_order = this_order_entry.order
        current_order = Order.objects.get(customer=user, completed=False)
        if this_order == current_order:
            Order_Entry.objects.filter(pk=order_entry_pk).delete()
            return HttpResponseRedirect(reverse('cart'))
        else:
            return HttpResponseRedirect(reverse('cart'))
    else:
        return HttpResponseRedirect(reverse('cart'))

def addToCart(request, dish):
    try:
        product = {}
        username = request.user
        user = User.objects.get(username=username)
        user_id = user.pk
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
    username = request.user
    user = User.objects.get(username=username)
    city = request.POST["cityInput"]
    post_code = request.POST["postCodeInput"]
    street = request.POST["streetInput"]
    current_order = Order.objects.filter(customer=user, completed=False)
    if current_order:
        current_order = Order.objects.get(customer=user, completed=False)
        order_entries = Order_Entry.objects.filter(order=current_order)
        if not order_entries:
            return HttpResponseRedirect(reverse("index"))
        else:
            try:
                current_order.city = city
                current_order.post_code = post_code
                current_order.street = street
                currentDatetime = datetime.now().strftime("%Y-%m-%d %H:%M")
                current_order.order_datetime = currentDatetime
                current_order.completed = True
                current_order.save()
                current_order = Order(customer=user, completed=False)
                current_order.save()
                return HttpResponseRedirect(reverse("cart"))
            except KeyError:
                return HttpResponseRedirect(reverse("cart"))

def ordersPlaced(request):
    orders = Order.objects.filter(is_sent=False).order_by('order_datetime')
    return render(request, "orders/ordersPlaced.html", {'orders': orders})
