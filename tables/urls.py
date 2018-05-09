from django.conf.urls import include, url
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()

router.register(r'restaurants', RestaurantViewSet, base_name='restaurants')
router.register(r'customer', CustomerViewSet, base_name='customer')
router.register(r'employees', EmployeesViewSet, base_name='employees')
router.register(r'access', AccessViewSet, base_name='access')
router.register(r'account', AccountViewSet, base_name='account')
router.register(r'checkout', CheckoutViewSet, base_name='checkout')
router.register(r'chef/create', CreateMenuViewSet, base_name='chef_create')
router.register(r'chef', ChefViewSet, base_name='chef')
router.register(r'complaints', ComplaintsViewSet, base_name='complaints')
router.register(r'compliments', ComplimentsViewSet, base_name='compliments')
router.register(r'delivery', DeliveryViewSet, base_name='delivery')
router.register(r'delivery_review', Delivery_reviewViewSet, base_name='delivery_review')
router.register(r'order', OrderViewSet, base_name='order')
router.register(r'login',LoginViewSet,base_name='login')
router.register(r'employSignup',ESignupViewSet,base_name='employSignup')
router.register(r'custSignup',CSignupViewSet,base_name='custSignup')
router.register(r'menu/update',UpdateMenuViewSet,base_name='menu_update')
router.register(r'menu', MenuViewSet, base_name='menu')
router.register(r'manager/approval',ApprovalViewSet,base_name='approval')
router.register(r'ingredient',IngredientViewSet,base_name='create_pizza')


urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^menu/chef/(?P<chef>\d+)/$',ListMenu), #this gets all the predefined menu from given chef
    url(r'^restaurants/chef/(?P<store>\d+)/$', Store_chef), #this gets all the chefs from given store
    url(r'^manager/list$',listOfUnapproveCustomer), #gets all of the unapprove customer

]
