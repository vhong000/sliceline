from .models import *
from rest_framework import serializers

class RestaurantSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Restaurant
        fields = ('rest_id', 'name', 'address', 'city', 'state', 'zipcode', 'phone', 'logo')
