from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(Access)
admin.site.register(Checkout)
admin.site.register(Chef)
admin.site.register(Complaints)
admin.site.register(Compliments)
admin.site.register(Customer)
admin.site.register(Customer_review)
admin.site.register(Delivery)
admin.site.register(Delivery_review)
admin.site.register(Employees)
admin.site.register(Menu)
admin.site.register(Order)

class RestaurantAdmin(admin.ModelAdmin):
    list_display = ['name', 'address', 'city', 'state', 'zipcode', 'phone']
admin.site.register(Restaurant, RestaurantAdmin)
