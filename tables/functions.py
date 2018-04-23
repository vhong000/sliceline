import hashlib,sqlite3
from django.utils import timezone
from django.db import connection, transaction
from rest_framework.response import Response



#Employees sign up function to insert into the DB
def employeeSignUp(username,lastname,password,address,city,state,zipcode,phone,ssn,birthday,email,access_code,store_id):
    cursor = connection.cursor()
    date = timezone.now()
    hash_object = hashlib.sha256(password.encode('utf-8'))
    hex_dig = hash_object.hexdigest()
    cursor.execute("""insert into tables_employees 
                  (password, emp_fname, emp_lname, address, city, state, zipcode, phone, ssn, birthday,email,date_hired)"""
                  """VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)""",
                   [hex_dig,username,lastname,address,city,state,zipcode,phone,ssn,birthday,email,date])
    #need a wait function for manager approval before inserting to DB
    transaction.commit()
    cursor.execute("""select types from tables_access where access_code=%s""",[access_code])
    row = cursor.fetchone()
    type= row[0]
    cursor.execute("""INSERT INTO tables_account (types, email)"""
                   """VALUES (%s,%s)""", [type, email])
    transaction.commit()
    cursor.execute("""SELECT emp_id FROM tables_employees WHERE email=%s""",[email])
    row = cursor.fetchone()
    id = row[0]
    checkAccess(access_code,id,store_id)
    cursor.close()
    return "Signup successful"


#Customer sign up function to insert into the DB
def customerSignUp(username,lastname,password,address,city,state,zipcode,phone,birthday,email):
    cursor = connection.cursor()
    date = timezone.now()
    hash_object = hashlib.sha256(password.encode('utf-8'))
    hex_dig = hash_object.hexdigest()
    cursor.execute("""insert into tables_customer 
                  (password, user_fname, user_lname, address, city, state, zipcode, phone, birthday,email,memb_since)"""
                  """VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)""",
                   [hex_dig,username,lastname,address,city,state,zipcode,phone,birthday,email,date])
    if(checkBlackList(email)):
        return "You are blacklisted"
    else:
    #need a wait function for manager approval before inserting to DB
        transaction.commit()
        cursor.execute("""INSERT INTO tables_account (types, email)"""
                        """VALUES (%s,%s)""",["customer",email])
        transaction.commit()
        cursor.close()
        return "Signup successful"

def checkBlackList(email):
    cursor = connection.cursor()
    cursor.execute("""select email from tables_black_list WHERE email=%s""",[email])
    row = cursor.fetchone()
    email_db = row[0]
    if(email == email_db):
        return True
    cursor.close()


# use this help function when checking out
def blackListed(email):
    cursor = connection.cursor()
    cursor.execute("""insert into tables_black_list(email)"""
                   """VALUES (%s)""",[email])
    transaction.commit()
    cursor.close()

def vipPromotion(user_id):
    cursor = connection.cursor()
    cursor.execute("""update Customer set VIP =%s WHERE user_id= %s""",["1",user_id])
    transaction.commit()
    cursor.close()


# Don't know what to do with it atm
def visitorDemotion(user_id):
    cursor = connection.cursor()
    cursor.execute("""delete from tables_checkout  WHERE user_id= %s""",[user_id])
    transaction.commit()
    cursor.execute("""delete from tables_complaints  WHERE user_id= %s""", [user_id])
    transaction.commit()
    cursor.execute("""delete from tables_compliments  WHERE user_id= %s""", [user_id])
    transaction.commit()
    cursor.execute("""delete from tables_customer_restaurant  WHERE user_id= %s""", [user_id])
    transaction.commit()
    cursor.execute("""delete from tables_customer_review  WHERE user_id= %s""", [user_id])
    transaction.commit()
    cursor.execute("""delete from tables_customer  WHERE user_id= %s""",[user_id])
    transaction.commit()
    cursor.close()

def checkOut(user_id):
    cursor = connection.cursor()
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
            if(average >4):
                vipPromotion(user_id)
            elif(average > 1 and average < 2 ):
                visitorDemotion(user_id)
            elif(average < 1):
                cursor.execute("""select email from tables_customer WHERE user_id=%s""",[user_id])
                row = cursor.fetchone()
                email = row[0]
                blackListed(email)
            # procced checkout still thinking
            return "still not done"
        else:
            # proceed checkout still thinking
            return "still not done"


#Checks if the email belongs to a customer or employee
def checkEmail(email):
    cursor = connection.cursor()
    cursor.execute("""SELECT types FROM tables_account WHERE email=%s""",[email])
    row = cursor.fetchone()
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
        cursor.execute("""select password from tables_customer WHERE email=%s""",[email])
        row = cursor.fetchone()
        hash_password = row[0]
        cursor.execute("""select user_id from tables_customer WHERE email=%s""",[email])
        row = cursor.fetchone()
        user_id = row[0]
        cursor.execute("""select user_fname from tables_customer WHERE email=%s""", [email])
        row = cursor.fetchone()
        name = row[0]
        cursor.execute("""select VIP from tables_customer WHERE email=%s""", [email])
        row = cursor.fetchone()
        vip = row[0]
        if(vip == 1):
            status = 'VIP'
            returned_dict = {
                'user_id': user_id,
                'name': name,
                'status': status
            }
        else:
            status = 'Customer'
            returned_dict = {
                'user_id': user_id,
                'name':name,
                'status': status
            }
        if (hex_dig == hash_password):
            return Response(returned_dict, status=200)
        else:
            requested_user = {'error': 'invalid credentials'}
            return Response(requested_user, status=404)
            # return  user_id
    else:
        cursor.execute("""select password from tables_employees WHERE email=%s""",[email])
        row = cursor.fetchone()
        hash_password = row[0]
        cursor.execute("""select emp_id from tables_employees WHERE email=%s""",[email])
        row = cursor.fetchone()
        emp_id  = row[0]
        cursor.execute("""select emp_fname from tables_employees WHERE email=%s""",[email])
        row = cursor.fetchone()
        name = row[0]
        cursor.execute("""select types from tables_account WHERE email=%s""",[email])
        row = cursor.fetchone()
        status = row[0]
        returned_dict = {
            'emp_id':emp_id,
            'name':name,
            'status':status
        }
        if (hex_dig == hash_password):
            return Response(returned_dict, status= 200)
        else:
            requested_user = {'error': 'invalid credentials'}
            return Response(requested_user, status = 404)

    cursor.close()

#chef creates a menu
def createMenu(chef_id,price,description,picture):
    cursor = connection.cursor()
    cursor.execute("""INSERT INTO tables_menu (price, description, rating, picture, chef_id_id)""" 
                    """VALUES (?,?,?,?,?)""",[price,description,0,picture,chef_id])
    transaction.commit()
    cursor.close()

#chef changes the price on a menu
def updatePrices(price,menu_id):
    cursor = connection.cursor()
    cursor.execute("""UPDATE tables_menu set price = ? WHERE tables_menu.menu_id= ?""",
                   [price,menu_id])
    transaction.commit()
    cursor.close()

#validate the access code and assign to the corresponding job(chef/delivery)
def checkAccess(access_code,id,store_id):
    cursor = connection.cursor()
    cursor.execute("""SELECT types FROM tables_access WHERE access_code=%s""",[access_code])
    row = cursor.fetchone()
    employer = row[0]
    if(employer == "chef"):
        cursor.execute("""INSERT INTO tables_chef (menu_name, warning, emp_id_id, store_id)"""
                       """VALUES (%s,%s,%s,%s)""",["",0,id,store_id])
        transaction.commit()
    elif(employer == 'delivery'):
        cursor.execute("""INSERT INTO tables_delivery (status, warning, emp_id_id, store_id)"""
                       """VALUES (%s,%s,%s,%s)""", [0, 0, id, store_id])
        transaction.commit()
    else:
        return "Invalid access code"
    cursor.close()

def showRestaurant():
    cursor = connection.cursor()
    cursor.execute("""SELECT name,address,city,state,zipcode,phone,logo 
                  FROM tables_restaurant""" )
    row = cursor.fetchall()
    list_of_restaurant=[]
    for i in row:
        list_of_restaurant.append(i)
    return list_of_restaurant
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

