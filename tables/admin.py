from django.contrib import admin
from .models import *
# Register your models here.

# admin.site.register(Access)
# admin.site.register(Account)
# admin.site.register(Checkout)
# admin.site.register(Chef)
# admin.site.register(Complaints)
# admin.site.register(Compliments)
# admin.site.register(Customer)
# admin.site.register(Customer_review)
# admin.site.register(Delivery)
# admin.site.register(Delivery_review)
# admin.site.register(Employees)
# admin.site.register(Menu)
# admin.site.register(Order)

class RestaurantAdmin(admin.ModelAdmin):
    list_display = ['name', 'address', 'city', 'state', 'zipcode', 'phone']
admin.site.register(Restaurant, RestaurantAdmin)

class AccessAdmin(admin.ModelAdmin):
    list_display = ['access_code','types']
admin.site.register(Access, AccessAdmin)

class CheckoutAdmin(admin.ModelAdmin):
    list_display = ['item','total','user_id_id']
admin.site.register(Checkout,CheckoutAdmin)

class AccountAdmin(admin.ModelAdmin):
    list_display = ['types','email']
admin.site.register(Account,AccountAdmin)

class ChefAdmin(admin.ModelAdmin):
    list_display = ['full_name','warning','emp_id_id','store_id']
admin.site.register(Chef,ChefAdmin)

class ComplaintsAdmin(admin.ModelAdmin):
    list_display = ['complaint_text','approval','emp_id_id','user_id_id']
admin.site.register(Complaints,ComplaintsAdmin)

class ComplimentAdmin(admin.ModelAdmin):
    list_display = ['compliment_text','approval','emp_id_id','user_id_id']
admin.site.register(Compliments,ComplimentAdmin)

class CustomerAdmin(admin.ModelAdmin):
    list_display = ['password','user_fname','user_lname','address','city','state',
                    'zipcode','birthday','phone','email','memb_since','wallet',
                    'warning','order_count','num_complaints','last_order']
admin.site.register(Customer,CustomerAdmin)

class Customer_reviewAdmin(admin.ModelAdmin):
    list_display = ['pizza_rating','store_rating','delivery_rating','emp_id_id',
                    'order_number_id','user_id_id']
admin.site.register(Customer_review,Customer_reviewAdmin)

class DeliveryAdmin(admin.ModelAdmin):
    list_display = ['status','warning','emp_id_id','store_id']
admin.site.register(Delivery,DeliveryAdmin)

class Delivery_reviewAdmin(admin.ModelAdmin):
    list_display = ['customer_rating','emp_id_id','user_id_id']
admin.site.register(Delivery_review,Delivery_reviewAdmin)

class EmployeesAdmin(admin.ModelAdmin):
    list_display = ['password','emp_fname','emp_lname','address','city','state',
                    'zipcode','birthday','phone','email','ssn','date_hired','salary',
                    'num_compliment','num_complaint','last_order']
admin.site.register(Employees,EmployeesAdmin)

class MenuAdmin(admin.ModelAdmin):
    list_display = ['price','description','rating','picture','chef_id_id']
admin.site.register(Menu,MenuAdmin)

class OrderAdmin(admin.ModelAdmin):
    list_display = ['total','menu_id_id','rest_id_id']
admin.site.register(Order,OrderAdmin)

class IngredientsAdmin(admin.ModelAdmin):
    list_display = ['name','type','price']
admin.site.register(Create_pizza,IngredientsAdmin)

