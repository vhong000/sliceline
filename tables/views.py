from django.shortcuts import render
from rest_framework import viewsets
from tables.serializers import RestaurantSerializer
from .models import *

class RestaurantViewSet(viewsets.ModelViewSet):
    
    queryset = Restaurant.objects.all().order_by('rest_id')
    serializer_class = RestaurantSerializer

# Create your views here.
