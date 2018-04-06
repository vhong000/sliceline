from django.conf.urls import include, url
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()

router.register(r'restaurants', RestaurantViewSet, base_name='restaurants')

urlpatterns = [
    url(r'^', include(router.urls)),
]
