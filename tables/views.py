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

class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Create_pizza.objects.all().order_by('ingredient_id')
    serializer_class = IngredientSerializer

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
        return customerSignUp(first_name,last_name,password,address,city,state,zip,phone,birthday,email,store_id)

class UpdateMenuViewSet(viewsets.ModelViewSet):
    def put(self, request):
        menu_id = request.data.get('pk')
        price = request.data.get('price')
        description = request.data.get('description')
        rating = request.data.get('rating')
        picture = request.data.get('picture')
        appetizers = request.data.get('appetizers')
        crust = request.data.get('crust')
        drinks = request.data.get('drinks')
        name = request.data.get('name')
        toppings = request.data.get('toppings')
        return updateMenu(menu_id,price,description,rating,picture,appetizers,crust,drinks,name,toppings)

class AssignDeliveryViewSet(viewsets.ModelViewSet):
    def put(self,request):
        emp_id = request.data.get('emp_id')
        order = request.data.get('order')
        return chooseDelivery(emp_id,order)

class DeleteMenuViewSet(viewsets.ModelViewSet):
    def delete(self,request):
        menu_id = request.data.get('menu_id')
        return removeMenu(menu_id)

class ReviewViewSet(viewsets.ModelViewSet):
    def create(self, request):
        pizza = request.data.get('pizza')
        store = request.data.get('store')
        delivery = request.data.get('delivery')
        emp_id = request.data.get('emp_id')
        order = request.data.get('order')
        user_id = request.data.get('user_id')
        return customerReview(pizza, store, delivery, emp_id, order, user_id)

class DeliveryReviewViewSet(viewsets.ModelViewSet):
    def create(self,request):
        rating = request.data.get('rating')
        emp_id = request.data.get('emp_id')
        user_id= request.data.get('user_id')
        store = request.data.get('store')
        return deliveryReview(rating, emp_id, user_id, store)

#manager
class ApprovalViewSet(viewsets.ModelViewSet):
    def put(self,request):
        approval = request.data.get('approval')
        user_id = request.data.get('user_id')
        store = request.data.get('store')
        return customerApproval(user_id,approval,store)

#chef
class CreateMenuViewSet(viewsets.ModelViewSet):
    def create(self, request):
        chef_id = request.data.get('chef_id')
        price = request.data.get('price')
        description = request.data.get('description')
        picture = request.data.get('picture')
        crust   = request.data.get('crust')
        toppings = request.data.get('toppings')
        appetizers = request.data.get('appetizers')
        drinks = request.data.get('drinks')
        name = request.data.get('name')
        return createMenu(chef_id,price,description,picture,crust,toppings,appetizers,drinks,name)

class PlaceOrderViewSet(viewsets.ModelViewSet):
    def create(self,request):
        total = request.data.get('total')
        address = request.data.get('address')
        store_id = request.data.get('store_id')
        menu_id = request.data.get('menu_id')
        print("this is: "+menu_id)
        # return HttpResponse("Hello")
        return Ordering(total,address,store_id,menu_id)


#manager
class SalaryViewSet(viewsets.ModelViewSet):
    def put(self,request):
        emp_id = request.data.get('emp_id')
        salary = request.data.get('salary')
        return employeeSalary(emp_id,salary)

#manager
class removeWarningViewSet(viewsets.ModelViewSet):
    def put(self,request):
        status = request.data.get("status")
        status_id = request.data.get("status_id")
        return removeWarning(status,status_id)

class vipViewSet(viewsets.ModelViewSet):
    def put(self,request):
        user_id = request.data.get('user_id')
        store = request.data.get('store')
        return vipPromotion(user_id,store)


##GET FUNCTIONS!!
def ListMenu(request,chef=None):
    instance = get_list_or_404(Menu,chef_id=chef)
    r = serializers.serialize("json", instance)
    return HttpResponse(r,content_type='application/json')

def Store_chef(request,store=None):
    chef = get_list_or_404(Chef,store_id=store)
    r = serializers.serialize("json", chef)
    return HttpResponse(r,content_type='application/json')

def Ingredients(request):
    ingredient = get_list_or_404(Create_pizza)
    r = serializers.serialize("json",ingredient)
    return HttpResponse(r,content_type='application/json')

#mangaer
def listOfUnapproveCustomer(request):
    unapprove = get_list_or_404(Customer,approve=0)
    r = serializers.serialize("json",unapprove)
    return HttpResponse(r,content_type='application/json')

#manager
def allDelivery(request,store=None):
    delivery = get_list_or_404(Delivery,store_id=store)
    r = serializers.serialize("json",delivery)
    return HttpResponse(r,content_type='application/json')

#manager
def allCook(request,store= None):
    chef = get_list_or_404(Chef,store_id=store)
    r = serializers.serialize("json",chef)
    return HttpResponse(r, content_type='application/json')

def allOrder(request,store=None):
    order = get_list_or_404(Order,rest_id_id=store,status=0)
    r = serializers.serialize("json",order)
    return HttpResponse(r,content_type='application/json')

