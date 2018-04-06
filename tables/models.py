# Create your models here.
from django.db import models

class Restaurant(models.Model):
    rest_id    = models.AutoField(primary_key=True)
    name       = models.CharField(max_length=40)
    address    = models.CharField(max_length=30)
    city       = models.CharField(max_length=10)
    state      = models.CharField(max_length=5)
    zipcode    = models.CharField(max_length=5)
    phone      = models.CharField(max_length=15)
    logo       = models.CharField(max_length=100)


class Employees(models.Model):
    emp_id     = models.AutoField(primary_key=True)
    password   = models.CharField(max_length=64)
    emp_fname  = models.CharField(max_length=25)
    emp_lname  = models.CharField(max_length=25)
    address    = models.CharField(max_length=30)
    city       = models.CharField(max_length=10)
    state      = models.CharField(max_length=5)
    zipcode    = models.CharField(max_length=5)
    phone      = models.CharField(max_length=15)
    ssn        = models.CharField(max_length=9)
    birthday   = models.DateField()
    salary     = models.DecimalField(decimal_places=2,max_digits=5,null=True)
    date_hired = models.DateTimeField(null=True)
    num_compliment = models.IntegerField(null=True)
    num_complaint = models.IntegerField(null=True)
    last_order = models.DateTimeField(null=True)
    email = models.CharField(max_length=100)

#Table for the customer
class Customer(models.Model):
    user_id     = models.AutoField(primary_key=True)
    password    = models.CharField(max_length=64)
    user_fname  = models.CharField(max_length=25)
    user_lname  = models.CharField(max_length=25)
    address     = models.CharField(max_length=30)
    city        = models.CharField(max_length=10)
    state       = models.CharField(max_length=5)
    zipcode     = models.CharField(max_length=5)
    phone       = models.CharField(max_length=15)
    birthday    = models.DateField()
    memb_since  = models.DateTimeField(null=True)
    wallet      = models.DecimalField(decimal_places=2,max_digits=5,null=True)
    VIP         = models.IntegerField(null=True)
    warning     = models.IntegerField(null=True)
    order_count = models.IntegerField(null=True)
    num_complaints  = models.IntegerField(null=True)
    last_order  = models.DateTimeField(null=True)
    email = models.CharField(max_length=100,)


#Table for chef
class Chef(models.Model):
    chef_id    = models.AutoField(primary_key=True)
    emp_id    = models.ForeignKey(Employees,on_delete=models.CASCADE)
    store      = models.ForeignKey(Restaurant,on_delete=models.CASCADE)
    menu_name = models.CharField(max_length=10,null=True)
    warning   = models.IntegerField(null=True)

#Table for delivery guy
class Delivery(models.Model):
    deli_id    = models.AutoField(primary_key=True)
    emp_id     = models.ForeignKey(Employees,on_delete=models.CASCADE)
    store      = models.ForeignKey(Restaurant,on_delete=models.CASCADE)
    status     = models.IntegerField(null=True)
    warning    = models.IntegerField(null=True)

#Table for menu
class Menu(models.Model):
    menu_id     = models.AutoField(primary_key=True)
    chef_id     = models.ForeignKey(Chef,on_delete=models.CASCADE)
    price       = models.DecimalField(decimal_places=2,max_digits=5)
    description = models.CharField(max_length=100)
    rating      = models.IntegerField(null=True)
    picture     = models.CharField(max_length=1000,null=True)

#Table for ordering
class Order(models.Model):
    order_id     = models.AutoField(primary_key=True)
    rest_id      = models.ForeignKey(Restaurant,on_delete=models.CASCADE)
    menu_id      = models.ForeignKey(Menu,on_delete=models.CASCADE)
    total        = models.IntegerField()

#Table for the customer_review
class Customer_review(models.Model):
    review_id       = models.AutoField(primary_key=True)
    user_id         = models.ForeignKey(Customer,on_delete=models.CASCADE)
    emp_id          = models.ForeignKey(Employees,on_delete=models.CASCADE)
    order_number    = models.ForeignKey(Order,on_delete=models.CASCADE)
    pizza_rating    = models.IntegerField()
    store_rating    = models.IntegerField()
    delivery_rating = models.IntegerField()

#Table for the delivery_review
class Delivery_review(models.Model):
    review_id       = models.AutoField(primary_key=True)
    emp_id          = models.ForeignKey(Employees,on_delete=models.CASCADE)
    user_id         = models.ForeignKey(Customer,on_delete=models.CASCADE)
    customer_rating = models.CharField(max_length=100)

#Table for checkout
class Checkout(models.Model):
    checkout_id       = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(Customer, on_delete=models.CASCADE)
    item    = models.CharField(max_length=50)
    total   = models.DecimalField(decimal_places=2,max_digits=5)

#Table for complaints
class Complaints(models.Model):
    complaint_id    = models.AutoField(primary_key=True)
    user_id         = models.ForeignKey(Customer,on_delete=models.CASCADE)
    emp_id          = models.ForeignKey(Employees,on_delete=models.CASCADE)
    complaint_text       = models.CharField(max_length=1000)
    approval        = models.BooleanField()

#Table for compliment
class Compliments(models.Model):
    compliments_id  = models.AutoField(primary_key=True)
    user_id         = models.ForeignKey(Customer,on_delete=models.CASCADE)
    emp_id          = models.ForeignKey(Employees,on_delete=models.CASCADE)
    compliment_text      = models.CharField(max_length=1000)
    approval        = models.BooleanField()


class Account(models.Model):
    acc_id = models.AutoField(primary_key=True)
    types  = models.CharField(max_length=10)
    email  = models.CharField(max_length=100)

class Access(models.Model):
    access_id = models.AutoField(primary_key=True)
    access_code = models.CharField(max_length=64)
    types = models.CharField(max_length=20)




