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

class 1

