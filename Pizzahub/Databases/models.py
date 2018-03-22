from django.db import models


# Create your models here.
#models are database tables, and each variable are the columns
# class Album(models.Model):
#     artist = models.CharField(max_length=25)
#     album_title = models.CharField(max_length=50)
#     genre = models.CharField(max_length=10)
#     album_logo = models.CharField(max_length=1000) #this will link a url containing the logo
#
#     def get_absolute_url(self):
#         return reverse('music:details',kwargs={'pk':self.pk})
#
# class Song(models.Model):
#     album = models.ForeignKey(Album, on_delete=models.CASCADE)
#     file_type = models.CharField(max_length=10)
#     song_title = models.CharField(max_length=40)
#     is_favorite = models.BooleanField(default=False)
#
#     def __str__(self):
#         return self.song_title
#Table for the employees
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
    salary     = models.DecimalField(decimal_places=5,max_digits=2)
    date_hired = models.DateTimeField()
    compliment = models.IntegerField()
    complaints = models.IntegerField()
    last_order = models.DateTimeField()


class users(models.Model):
    user_id = models.CharField(primary_key=True)
    password = models.CharField(max_length=25)
    user_fname = models.CharField(max_length=25)
    user_lname = models.CharField(max_length=25)
    address = models.CharField(max_length=30)
    city = models.CharField(max_length=10)
    state = models.CharField(max_length=5)
    zipcode = models.CharField(max_length=5)
    phone = models.CharField(max_length=10)
    birthday = models.DateField()
    memb_since = models.DateTimeField()
    wallet = models.IntegerField()
    VIP = models.BooleanField()
    warning    = models.IntegerField()
    order_count = models.IntegerField()
    complaints = models.IntegerField()
    last_order = models.DateTimeField()

class rating(models.Model):
    user_id = models.ForeignKey('users',on_delete=models.CASCADE)
    menu_id= models.CharField(max_length=10)
    pizza_item= models.CharField(max_length=10)
    rating = models.IntegerField()


