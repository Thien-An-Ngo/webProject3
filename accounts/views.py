from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

# Create your views here.
def login(request):
    return render(request, "accounts/login.html")

def register(request):
    return render(request, "accounts/register.html")

def logout(request):
    return HttpResponseRedirect(reverse("login"))
