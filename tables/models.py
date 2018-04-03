# Create your models here.
from django.db import models

class restaurant(models.Model):
    rest_id    = models.AutoField(primary_key=True)
    name       = models.CharField(max_length=40)
    address    = models.CharField(max_length=30)
    city       = models.CharField(max_length=10)
    state      = models.CharField(max_length=5)
    zipcode    = models.CharField(max_length=5)
    phone      = models.CharField(max_length=10)


class employees(models.Model):
    emp_id     = models.AutoField(primary_key=True)
    password   = models.CharField(max_length=25)
    emp_fname  = models.CharField(max_length=25)
    emp_lname  = models.CharField(max_length=25)
    address    = models.CharField(max_length=30)
    city       = models.CharField(max_length=10)
    state      = models.CharField(max_length=5)
    zipcode    = models.CharField(max_length=5)
    phone      = models.CharField(max_length=10)
    ssn        = models.CharField(max_length=9)
    birthday   = models.DateField()
    salary     = models.DecimalField(decimal_places=2,max_digits=5)
    date_hired = models.DateTimeField()
    num_compliment = models.IntegerField()
    num_complaint = models.IntegerField()
    last_order = models.DateTimeField()
    email = models.CharField(max_length=100,default='DEFAULT VALUE')

#Table for the customer
class customer(models.Model):
    user_id     = models.CharField(max_length=60,primary_key=True)
    password    = models.CharField(max_length=25)
    user_fname  = models.CharField(max_length=25)
    user_lname  = models.CharField(max_length=25)
    address     = models.CharField(max_length=30)
    city        = models.CharField(max_length=10)
    state       = models.CharField(max_length=5)
    zipcode     = models.CharField(max_length=5)
    phone       = models.CharField(max_length=10)
    birthday    = models.DateField()
    memb_since  = models.DateTimeField()
    wallet      = models.DecimalField(decimal_places=2,max_digits=5)
    VIP         = models.BooleanField()
    warning     = models.IntegerField()
    order_count = models.IntegerField()
    num_complaints  = models.IntegerField()
    last_order  = models.DateTimeField()
    email = models.CharField(max_length=100,default='DEFAULT VALUE')


#Table for chef
class chef(models.Model):
    chef_id   = models.AutoField(primary_key=True)
    emp_id    = models.ForeignKey(employees,on_delete=models.CASCADE)
    store      = models.ForeignKey(restaurant,on_delete=models.CASCADE)
    menu_name = models.CharField(max_length=10)
    warning   = models.IntegerField()

#Table for delivery guy
class delivery(models.Model):
    deliver_id = models.AutoField(primary_key=True)
    emp_id     = models.ForeignKey(employees,on_delete=models.CASCADE)
    store      = models.ForeignKey(restaurant,on_delete=models.CASCADE)
    status     = models.BooleanField()
    warning    = models.IntegerField()

#Table for menu
class menu(models.Model):
    menu_id     = models.AutoField(primary_key=True)
    chef_id     = models.ForeignKey(chef,on_delete=models.CASCADE)
    price       = models.DecimalField(decimal_places=2,max_digits=5)
    description = models.CharField(max_length=100)
    rating      = models.IntegerField()
    picture     = models.CharField(max_length=1000)

#Table for ordering
class order(models.Model):
    order_id     = models.AutoField(primary_key=True)
    rest_id      = models.ForeignKey(restaurant,on_delete=models.CASCADE)
    menu_id      = models.ForeignKey(menu,on_delete=models.CASCADE)
    total        = models.IntegerField()

#Table for the customer_review
class customer_review(models.Model):
    review_id       = models.AutoField(primary_key=True)
    user_id         = models.ForeignKey(customer,on_delete=models.CASCADE)
    emp_id          = models.ForeignKey(employees,on_delete=models.CASCADE)
    order_number    = models.ForeignKey(order,on_delete=models.CASCADE)
    pizza_rating    = models.IntegerField()
    store_rating    = models.IntegerField()
    delivery_rating = models.IntegerField()

#Table for the delivery_review
class delivery_review(models.Model):
    review_id       = models.AutoField(primary_key=True)
    emp_id          = models.ForeignKey(employees,on_delete=models.CASCADE)
    user_id         = models.ForeignKey(customer,on_delete=models.CASCADE)
    customer_rating = models.CharField(max_length=100)

#Table for checkout
class checkout(models.Model):
    user_id = models.ForeignKey(customer, on_delete=models.CASCADE)
    item    = models.CharField(max_length=50)
    total   = models.DecimalField(decimal_places=2,max_digits=5)

#Table for complaints
class complaints(models.Model):
    comp_id    = models.AutoField(primary_key=True)
    user_id         = models.ForeignKey(customer,on_delete=models.CASCADE)
    emp_id          = models.ForeignKey(employees,on_delete=models.CASCADE)
    complaint_text       = models.CharField(max_length=1000)
    approval        = models.BooleanField()

#Table for compliment
class compliments(models.Model):
    comp_id   = models.AutoField(primary_key=True)
    user_id         = models.ForeignKey(customer,on_delete=models.CASCADE)
    emp_id          = models.ForeignKey(employees,on_delete=models.CASCADE)
    compliment_text      = models.CharField(max_length=1000)
    approval        = models.BooleanField()





