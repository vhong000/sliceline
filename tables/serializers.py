from .models import *
from rest_framework import serializers

class RestaurantSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Restaurant
        fields = ('rest_id', 'name', 'address', 'city', 'state', 'zipcode', 'phone', 'logo','latitude','longitude')

class CustomerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Customer
        fields = ('password', 'user_fname', 'user_lname', 'address', 'city', 'state', 'zipcode', 'phone', 'birthday', 'email', 'memb_since')


class EmployeesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Employees
        fields = ('password', 'emp_fname', 'emp_lname', 'address', 'city', 'state', 'zipcode', 'phone', 'ssn', 'birthday','email','date_hired')

class AccessSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Access
        fields = ('access_code','types')

class AccountSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Account
        fields = ('types','email')

class CheckoutSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Checkout
        fields = ('item','total','checkout_id')

class ChefSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Chef
        fields = ('menu_name','warning','emp_id_id','store_id')

class ComplaintsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Complaints
        fields = ('complaint_text','approval','emp_id_id','user_id_id')

class ComplimentsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Compliments
        fields = ('compliment_text','approval','emp_id_id','user_id_id')

class Customer_reviewSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Customer_review
        fields = ('pizza_rating','store_rating','delivery_rating','emp_id_id','order_number_id','user_id_id')

class DeliverySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Delivery
        fields = ('status','warning','emp_id_id','store_id')

class Delivery_reviewSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Delivery_review
        fields = ('customer_rating','user_id_id','emp_id_id')

class MenuSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Menu
        fields = '__all__'

class ListMenuSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Menu
        fields = '__all__'

class IngredientSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Create_pizza
        fields = '__all__'

class OrderSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Order
        fields = ('total','menu_id_id','rest_id_id')


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Login
        fields = '__all__'

    # def get(self, validated_data):
    #     info = Login.objects.get(**validated_data)
    #     return info