import hashlib,sqlite3
from django.utils import timezone
from django.db import connection, transaction
from rest_framework.response import Response
from .models import *
from .serializers import *
import json
from django.core.serializers.json import DjangoJSONEncoder



#Employees sign up function to insert into the DB
def employeeSignUp(username,lastname,password,address,city,state,zipcode,phone,ssn,birthday,email,access_code,store_id):
    cursor = connection.cursor()
    date = timezone.now()
    #hash the password to insert into the db
    hash_object = hashlib.sha256(password.encode('utf-8'))
    hex_dig = hash_object.hexdigest()
    cursor.execute("""select email from tables_employees where email=%s""", [email])
    row = cursor.fetchone()
    if (row):
        redirect_message = {'error': "email already exist"}
        return Response(redirect_message, status=409)
    else:
        cursor.execute("""select types from tables_access where access_code=%s""", [access_code])
        row = cursor.fetchone()
        type = row[0]
        cursor.execute("""INSERT INTO tables_account (types, email)"""
                   """VALUES (%s,%s)""", [type, email])
        transaction.commit()
        cursor.execute("""insert into tables_employees
                  (password, emp_fname, emp_lname, address, city, state, zipcode, phone, ssn, birthday,email,date_hired)"""
                  """VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)""",
                   [hex_dig,username,lastname,address,city,state,zipcode,phone,ssn,birthday,email,date])
    #need a wait function for manager approval before inserting to DB
        transaction.commit()
        cursor.execute("""SELECT emp_id FROM tables_employees WHERE email=%s""",[email])
        row = cursor.fetchone()
        id = row[0]
        name = username+' '+lastname
    #check what employee it is chef/delivery
        checkAccess(access_code,id,store_id,name)
        cursor.close()
        return Response("Signup successful",status=200)


#Customer sign up function to insert into the DB
def customerSignUp(username,lastname,password,address,city,state,zipcode,phone,birthday,email,store_id):
    cursor = connection.cursor()
    date = timezone.now()
    hash_object = hashlib.sha256(password.encode('utf-8'))
    hex_dig = hash_object.hexdigest()
    #need to catch known email
    cursor.execute("""select email from tables_customer where email=%s""",[email])
    row = cursor.fetchone()
    if(row):
        redirect_message = {'error':"email already exist"}
        return Response(redirect_message,status= 409)
    else:
        cursor.execute("""insert into tables_customer
                  (password, user_fname, user_lname, address, city, state, zipcode, phone, birthday,email,memb_since,approve)"""
                  """VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)""",
                   [hex_dig,username,lastname,address,city,state,zipcode,phone,birthday,email,date,0])
        if(checkBlackList(email)):
            cursor.close()
            return Response("You are blacklisted",status=404)
        else:
        #need a wait function for manager approval before inserting to DB
            transaction.commit()
            cursor.execute("""INSERT INTO tables_account (types, email)"""
                        """VALUES (%s,%s)""",["customer",email])
            transaction.commit()
            cursor.execute("""select user_id from tables_customer WHERE email=%s""",[email])
            row = cursor.fetchone()
            user_id = row[0]
            # print(store_id)
            list = ''.join(str(e)+',' for e in store_id)
            list = list[:-1]
            cursor.execute("""insert into tables_customer_restaurant (rest_id, user_id_id,VIP)"""
                           """VALUES (%s,%s,%s)""",[list,user_id,0])
            transaction.commit()
            cursor.close()
            return Response("Sign up successful",status=200)

#checks for a given email if it is blacklisted
def checkBlackList(email):
    cursor = connection.cursor()
    cursor.execute("""select email from tables_black_list WHERE email=%s""",[email])
    row = cursor.fetchone()
    if(row):
        return True
    else:
        return False
    cursor.close()


# use this help functions when checking out
#black list a user given email
def blackListed(email):
    cursor = connection.cursor()
    cursor.execute("""insert into tables_black_list(email)"""
                   """VALUES (%s)""",[email])
    transaction.commit()
    cursor.close()

#promotes a customer to VIP
def vipPromotion(user_id,store):
    cursor = connection.cursor()
    cursor.execute("""select VIP from tables_customer_restaurant WHERE user_id_id=%s""",[user_id])
    row = cursor.fetchone()
    rest = row[0][0]
    if (rest == '0'):
        rest = ""
    rest = rest+','+store
    cursor.execute("""update tables_customer_restaurant set VIP =%s WHERE user_id_id= %s""",[rest,user_id])
    transaction.commit()
    cursor.close()
    return Response("vip promotion",status=200)

#demotes the user to visitor and delete his account
def visitorDemotion(user_id,store):
    cursor = connection.cursor()
    cursor.execute("""select VIP from tables_customer_restaurant WHERE user_id_id=%s""",[user_id])
    row = cursor.fetchone()
    rest = row[0]
    rest = rest.split(',')
    print(rest)
    if(store in rest):
        print("if statement")
        rest.remove(store)
        joined = ",".join(rest)
        print(joined)
        cursor.execute("""update tables_customer_restaurant set VIP =%s""",[joined,user_id])
        transaction.commit()
        cursor.close()
        return Response("Not vip anymore",status=200)
    else:
        print("else statement")
        cursor.execute("""select rest_id from tables_customer_restaurant WHERE user_id_id=%s""",[user_id])
        row = cursor.fetchone()
        rest = row[0]
        rest = rest.split(',')
        rest.remove(store)
        joined = ",".join(rest)
        cursor.execute("""update tables_customer_restaurant set rest_id=%s where user_id_id=%s""",[joined,user_id])
        transaction.commit()
        cursor.close()
        return Response("You are not a customer anymore", status=200)
# check the primary key for the store id


#place order
def Ordering(total,address,store_id,menu_id):
    cursor = connection.cursor()
    print("called Order")
    list = ''.join(str(e) + ',' for e in menu_id)
    list = list[:-1]
    # print(list)
    cursor.execute("""INSERT INTO tables_order (total,menu_id,address,status,rest_id_id)"""
                   """VALUES (%s,%s,%s,%s,%s)""",[total,list,address,0,store_id])
    transaction.commit()
    cursor.execute("""SELECT order_id FROM tables_order ORDER BY order_id DESC """)
    row = cursor.fetchone()
    order = row[0]
    context = {
        "message": "Order placed",
        "order": order
    }
    cursor.close()
    return Response(context, status=200)




#checkout process
#gets called after the user has made the review
def checkOut(user_id,store):
    cursor = connection.cursor()
    #if it is a customer
    if(user_id):
        cursor.execute("""select user_id_id, count(*)
                        FROM tables_delivery_review WHERE user_id_id=%s""",[user_id])
        row = cursor.fetchone()
        number = int(row[0])
        if( number >= 3):
            cursor.execute("""select sum(customer_rating), count(*)
                          FROM tables_delivery_review WHERE user_id_id=%s""",[user_id])
            row = cursor.fetchone()
            sum = int(row[0])
            average = float(sum/number)
            if(average > 4):
                vipPromotion(user_id,store)
            elif(average > 1 and average < 2 ):
                visitorDemotion(user_id,store)
            elif(average < 1):
                cursor.execute("""select email from tables_customer WHERE user_id=%s""",[user_id])
                row = cursor.fetchone()
                email = row[0]
                blackListed(email)
                visitorDemotion(user_id,store)
            # procced checkout still thinking
            else:
                return "still not done"
        else:
            # proceed checkout still thinking, customer hasnt made more than 3 orders
            return "continue to checkout"


#Checks if the email belongs to a customer or employee
def checkEmail(email):
    cursor = connection.cursor()
    cursor.execute("""SELECT types FROM tables_account WHERE email=%s""",[email])
    row = cursor.fetchone()
    if(row == None):
        return False
    else:
        type = row[0]
        if (type == "customer"):
            return True
        else:
            return False
    cursor.close()

#Authenticate the login
def login(email,password):
    cursor = connection.cursor()
    hash_object = hashlib.sha256(password.encode('utf-8'))
    hex_dig = hash_object.hexdigest()
    if (checkEmail(email)):
        cursor.execute("""select email from tables_customer where email=%s""", [email])
        row = cursor.fetchone()
        if (not row):
            redirect_message = {'error': "email or password doesn't exist"}
            return Response(redirect_message, status=404)
        else:
            cursor.execute("""select password,user_id,user_fname,wallet from tables_customer WHERE email=%s""",[email])
            row = cursor.fetchall()
            hash_password = row[0][0]
            user_id = row[0][1]
            name = row[0][2]
            wallet = row[0][3]
            cursor.execute("""select VIP from tables_customer_restaurant WHERE user_id_id=%s""",[user_id])
            row = cursor.fetchall()
            status = row[0][0]
            cursor.execute("""select rest_id from tables_customer_restaurant WHERE user_id_id=%s""",[user_id])
            row = cursor.fetchall()
            list = row[0][0]
            returned_dict = {
                'user_id': user_id,
                'name': name,
                'VIP': status,
                'wallet': wallet,
                'rest':list
                }
            if (hex_dig == hash_password):
                print('logged in as customer')
                return Response(returned_dict, status=200)
            else:
                print('incorrect customer')
                requested_user = {'error': "email or password doesn't exist"}
                return Response(requested_user, status=404)
            # return  user_id
    else:
        cursor.execute("""select email from tables_employees where email=%s""", [email])
        row = cursor.fetchone()
        if (not row):
            redirect_message = {'error': "email or password doesn't exist"}
            return Response(redirect_message, status=404)
        else:
            cursor.execute("""select password,emp_id,emp_fname from tables_employees WHERE email=%s""",[email])
            row = cursor.fetchall()
            hash_password = row[0][0]
            emp_id  = row[0][1]
            name = row[0][2]
            cursor.execute("""select types from tables_account WHERE email=%s""",[email])
            row = cursor.fetchone()
            status = row[0]
            cursor.execute("""select store_id from tables_chef where emp_id_id=%s""",[emp_id])
            row = cursor.fetchone()
            if(row):
                chef = row[0]
                id = chef
            else:
                cursor.execute("""select store_id from tables_delivery where emp_id_id=%s""", [emp_id])
                row = cursor.fetchone()
                delivery = row[0]
                id = delivery
            returned_dict = {
                'emp_id':emp_id,
                'name':name,
                'status':status,
                'rest_id': id
            }
            if (hex_dig == hash_password):
                print('logged in as employeed')
                return Response(returned_dict, status= 200)
            else:
                print('incorrect employee')
                requested_user = {'error': "email or password doesn't exist"}
                return Response(requested_user, status = 404)

    cursor.close()

#CHEF FUNCTIONS

#show menu
# This funciton fectches all of the menu given a store_id
def listMenu(store_id):
    cursor = connection.cursor()
    #grabs all of the chef from that store_id
    cursor.execute("""select chef_id from tables_chef WHERE store_id=%s""",[store_id])
    row = cursor.fetchall()
    chef = []
    # extracting the query and putting it in a array
    for i in range(len(row)):
        chef.append(row[i][0])
    list = []
    # looping to get all of the menu for each chef
    for chef in chef:
        cursor.execute("""select price,description,rating,picture from tables_menu WHERE chef_id_id=%s""",[chef])
        row = cursor.fetchall()
        for i in range(len(row)):
            list.append(row[i])
        # query = Menu.objects.filter(chef_id=chef)
        # if(query):
        #     list.append(query)
    print(list)
    # list = MenuSerializer(query,context={'request': request})
    #returns an array containing menu's value array (2D)
    return list

#chef creates a menu
def createMenu(chef_id,price,description,picture,crust,toppings,appetizers,drinks,name):
    cursor = connection.cursor()
    cursor.execute("""INSERT INTO tables_menu (price, description, rating, picture, chef_id_id,crust,toppings,appetizers,drinks,name)"""
                    """VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)""",[price,description,0,picture,chef_id,crust,toppings,appetizers,drinks,name])
    transaction.commit()
    cursor.close()
    return Response("Menu created",status=200)

#chef changes the price on a menu
def updateMenu(menu_id,price,description,rating,picture,appetizers,crust,drinks,name,toppings):
    cursor = connection.cursor()
    cursor.execute("""UPDATE tables_menu set price =%s, description=%s,rating=%s,picture=%s,appetizers=%s,
                  crust=%s, drinks=%s,name=%s, toppings=%s 
                  WHERE tables_menu.menu_id=%s""",
                   [price,description,rating,picture,appetizers,crust,drinks,name,toppings,menu_id])
    transaction.commit()
    cursor.execute("""select * from tables_menu WHERE menu_id=%s""",[menu_id])
    row = cursor.fetchall()
    context = {
        'price':row[0][0],
        'description':row[0][1],
        'rating':row[0][2],
        'picture':row[0][3],
        'pk':row[0][4],
        'appetizer':row[0][5],
        'crust': row[0][6],
        'drinks':row[0][7],
        'name':row[0][8],
        'toppings':row[0][9]

    }
    cursor.close()
    return Response(context, status=200)

def removeMenu(menu_id):
    cursor = connection.cursor()
    cursor.execute("""delete from tables_menu WHERE menu_id=%s""",[menu_id])
    transaction.commit()
    cursor.close()
    return Response("deleted menu",status=200)

def listOfChef(store_id):
    cursor = connection.cursor()
    cursor.execute("""select chef_id from tables_chef WHERE store_id=%s""",[store_id])
    row = cursor.fetchall()
    chef = []
    for i in row:
        chef.append(i[0])
    cursor.close()
    return chef

#MANAGER FUNCTIONS

#fectches all of the order with status = not delivered
#thinking on how to procced
# def orderStatus():
#     cursor = connection.cursor()
#     cursor.execute("""select * from order where status = %s""",[0])
#     row = cursor.fetchall()
#     list = []
#     for i in row:

#approves a customer registration
def customerApproval(user_id,aproval,store):
    cursor = connection.cursor()
    cursor.execute("""update tables_customer set approve=%s WHERE user_id=%s""",[aproval,user_id])
    transaction.commit()
    cursor.execute("""select approve from tables_customer WHERE user_id=%s""",[user_id])
    row = cursor.fetchone()
    approve = row[0]
    print(approve)
    if(approve):
        cursor.close()
        return Response("Approve by manager", status=200)
    else:
        cursor.close()
        print("calling demotion on user: ",user_id)
        return visitorDemotion(user_id,store)

def removeWarning(status,status_id):
    cursor = connection.cursor()
    if(status == "chef"):
        cursor.execute("""select warning from tables_chef WHERE chef_id=%s""",[status_id])
        row = cursor.fetchone()
        remove = row[0]
        cursor.execute("""update tables_chef set warning=%s WHERE chef_id=%s""",[int(remove)-1,status_id])
        transaction.commit()
        cursor.close()
        return Response("delete warning for chef",status=200)
    else:
        cursor.execute("""select warning from tables_delivery WHERE deli_id=%s""", [status_id])
        row = cursor.fetchone()
        remove = row[0]
        cursor.execute("""update tables_delivery set warning=%s WHERE deli_id=%s""", [int(remove)-1,status_id])
        transaction.commit()
        cursor.close()
        return Response("delete warning for delivery", status=200)

# def listOfUnapproveCustomer():
#     cursor = connection.cursor()
#     cursor.execute("""select * from tables_customer WHERE approve=%s""",[0])
#     row = cursor.fetchall()
#     cursor.close()
#     return row

#pays of cook/delivery
def employeeSalary(emp_id,salary):
    cursor = connection.cursor()
    cursor.execute("""update tables_employees set salary=%s WHERE emp_id=%s""",[salary,emp_id])
    transaction.commit()
    cursor.execute("""select emp_fname,salary from tables_employees WHERE emp_id=%s""",[emp_id])
    row = cursor.fetchall()
    print(row)
    context = {
        "name":row[0][0],
        "salary":row[0][1]
    }
    cursor.close()
    return Response(context,status=200)


#pass the order to the delivery guy
def chooseDelivery(emp_id,order_id):
    cursor = connection.cursor()
    cursor.execute("""update tables_delivery set current_order=%s, status=%s where emp_id_id=%s""",[order_id,1,emp_id])
    transaction.commit()
    cursor.close()
    return Response("Order assigned to delivery guy", status=200)

# USE IN SIGNUP
#validate the access code and assign to the corresponding job(chef/delivery)
def checkAccess(access_code,id,store_id,name):
    cursor = connection.cursor()
    cursor.execute("""SELECT types FROM tables_access WHERE access_code=%s""",[access_code])
    row = cursor.fetchone()
    employer = row[0]
    if(employer == "chef"):
        cursor.execute("""INSERT INTO tables_chef (menu_name, warning, emp_id_id, store_id,full_name)"""
                       """VALUES (%s,%s,%s,%s,%s)""",["",0,id,store_id,name])
        transaction.commit()
    elif(employer == 'delivery'):
        cursor.execute("""INSERT INTO tables_delivery (status, warning, emp_id_id, store_id,full_name)"""
                       """VALUES (%s,%s,%s,%s,%s)""", [0, 0, id, store_id],name)
        transaction.commit()
    elif(employer=='manager'):
        cursor.execute("""INSERT INTO tables_manager (emp_id_id, store_id,full_name)"""
                       """VALUES (%s,%s,%s,%s,%s)""", [id, store_id,name])
        transaction.commit()
    else:
        return Response("Invalid access code",status=404)
    cursor.close()

#show restaurant given id
def showRestaurant(store_id):
    cursor = connection.cursor()
    cursor.execute("""SELECT name,address,city,state,zipcode,phone,logo
                  FROM tables_restaurant where rest_id=%s""",[store_id])
    row = cursor.fetchone()
    restaurant=row[0]
    # for i in row:
    #     list_of_restaurant.append(i)
    return Response(restaurant,status=200)
    cursor.close()


#Will need a how menu function
#Function to be done: Place order, Review, Delivery, Manager

print("ran")
# a = "manager"
# hash_object = hashlib.sha256(a.encode('utf-8'))
# hex_dig = hash_object.hexdigest()
# print(hex_dig)
# showRestaurant()
# employeeSignUp('andrii','luchko','123','CCNY','harlem','NY','11013','123-231-0123','23456875','11/12/1996',"test@gmail.com","f59ac0828b9a32293b348e398a0efd342b1e4377a687f3a9055ee2871dff35e4","2")
# print(login('test@gmail.com','123'))
# createMenu('1',12,"cheese pie","no picture")
# updatePrices("12.99",'1')
print("done")
