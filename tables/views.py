from django.shortcuts import render, get_object_or_404,get_list_or_404
from rest_framework import viewsets, filters, generics
from tables.serializers import *
from tables.functions import *
from .models import *
from rest_framework import status
from django.forms.models import model_to_dict
from rest_framework.response import Response
import json
from django.core import serializers
from django.db.models.query import QuerySet
from django.utils.functional import curry
from django.http import JsonResponse
from django.http import HttpResponse
from django.views.generic import DetailView

class RestaurantViewSet(viewsets.ModelViewSet):

    queryset = Restaurant.objects.all().order_by('rest_id')
    serializer_class = RestaurantSerializer

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all().order_by('user_id')
    serializer_class = CustomerSerializer

class EmployeesViewSet(viewsets.ModelViewSet):
    queryset = Employees.objects.all().order_by('emp_id')
    serializer_class = EmployeesSerializer

class AccessViewSet(viewsets.ModelViewSet):
    queryset = Access.objects.all().order_by('access_id')
    serializer_class = AccessSerializer

class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all().order_by('acc_id')
    serializer_class = AccountSerializer

class CheckoutViewSet(viewsets.ModelViewSet):
    queryset = Checkout.objects.all().order_by('user_id_id')
    serializer_class = CheckoutSerializer

class ChefViewSet(viewsets.ModelViewSet):
    queryset = Chef.objects.all().order_by('chef_id')
    serializer_class = ChefSerializer

class ComplaintsViewSet(viewsets.ModelViewSet):
    queryset = Complaints.objects.all().order_by('complaint_id')
    serializer_class = CheckoutSerializer

class ComplimentsViewSet(viewsets.ModelViewSet):
    queryset = Compliments.objects.all().order_by('compliments_id')
    serializer_class = ComplimentsSerializer

class Customer_reviewViewSet(viewsets.ModelViewSet):
    queryset = Customer_review.objects.all().order_by('review_id')
    serializer_class = Customer_reviewSerializer

class DeliveryViewSet(viewsets.ModelViewSet):
    queryset = Delivery.objects.all().order_by('deli_id')
    serializer_class = DeliverySerializer

class Delivery_reviewViewSet(viewsets.ModelViewSet):
    queryset = Delivery_review.objects.all().order_by('review_id')
    serializer_class = Delivery_reviewSerializer

class MenuViewSet(viewsets.ModelViewSet):
    queryset = Menu.objects.all().order_by('menu_id')
    serializer_class = MenuSerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by('order_id')
    serializer_class = OrderSerializer

class LoginViewSet(viewsets.ModelViewSet):
    def create(self,request):
        email = request.data.get('email')
        password = request.data.get('password')
        return login(email,password)

class ESignupViewSet(viewsets.ModelViewSet):
    def create(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        phone = request.data.get('phone')
        birthday = request.data.get('birthday')
        address  = request.data.get('address')
        city  = request.data.get('city')
        state  = request.data.get('state')
        zip  = request.data.get('zipcode')
        ssn  = request.data.get('ssn')
        access  = request.data.get('access_code')
        store_id = request.data.get('store_id')
        return employeeSignUp(first_name,last_name,password,address,city,state,zip,phone,ssn,birthday,email,access,store_id)


class CSignupViewSet(viewsets.ModelViewSet):
    def create(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        phone = request.data.get('phone')
        birthday = request.data.get('birthday')
        address  = request.data.get('address')
        city  = request.data.get('city')
        state  = request.data.get('state')
        zip  = request.data.get('zipcode')
        store_id = request.data.get('store_id')
        # print(store_id)
        # return Response("showing store_id")
        return customerSignUp(first_name,last_name,password,address,city,state,zip,phone,birthday,email,store_id)

class ListOfUnapproveCustomerViewSet(viewsets.ModelViewSet):
    def create(self,request):
        # store = request.data.get('store_id')
        # return Response(MenuSerializer(listMenu(store),context={'request': request}).data,status=200)
        return Response(listOfUnapproveCustomer())
##GET FUNCTIONS!!

def ListMenu(request,chef=None):
    instance = get_list_or_404(Menu,chef_id=chef)
    print(instance)
    r = serializers.serialize("json", instance)
    return HttpResponse(r,content_type='application/json')


