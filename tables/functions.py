# import MySQLdb
# import _mysql
# db = MySQLdb.connect("127.0.0.1", "root", "23173099", "kkdata6")
# cursor = db.cursor()
from django.conf import settings
settings.configure()
import hashlib,uuid,sqlite3
conn = sqlite3.connect("../db.sqlite3")
cursor = conn.cursor()
from django.utils import timezone

#Employees sign up function to insert into the DB
def employeeSignUp(username,lastname,password,address,city,state,zipcode,phone,ssn,birthday,email,access_code,store_id):
    date = timezone.now()
    hash_object = hashlib.sha256(password.encode('utf-8'))
    hex_dig = hash_object.hexdigest()
    cursor.execute("""insert into tables_employees 
                  (password, emp_fname, emp_lname, address, city, state, zipcode, phone, ssn, birthday,email,date_hired)"""
                  """VALUES (?,?,?,?,?,?,?,?,?,?,?,?)""",
                   [hex_dig,username,lastname,address,city,state,zipcode,phone,ssn,birthday,email,date])
    #need a wait function for manager approval before inserting to DB
    conn.commit()
    cursor.execute("""INSERT INTO tables_account (types, email)"""
                   """VALUES (?,?)""", ["employees", email])
    conn.commit()
    cursor.execute("""SELECT emp_id FROM main.tables_employees WHERE email=?""",[email])
    row = cursor.fetchone()
    id = row[0]
    checkAccess(access_code,id,store_id)


#Customer sign up function to insert into the DB
def customerSignUp(username,lastname,password,address,city,state,zipcode,phone,birthday,email):
    date = timezone.now()
    hash_object = hashlib.sha256(password.encode('utf-8'))
    hex_dig = hash_object.hexdigest()
    cursor.execute("""insert into tables_customer 
                  (password, user_fname, user_lname, address, city, state, zipcode, phone, birthday,email,memb_since)"""
                  """VALUES (?,?,?,?,?,?,?,?,?,?,?)""",
                   [hex_dig,username,lastname,address,city,state,zipcode,phone,birthday,email,date])
    #need a wait function for manager approval before inserting to DB
    conn.commit()
    cursor.execute("""INSERT INTO tables_account (types, email)"""
                   """VALUES (?,?)""",["customer",email])
    conn.commit()

#Checks if the email belongs to a customer or employee
def checkEmail(email):
    cursor.execute("""SELECT types FROM tables_account WHERE email=?""",[email])
    row = cursor.fetchone()
    type = row[0]
    if (type == "customer"):
        return True
    else:
        return False

#Authenticate the login
def login(email,password):
    hash_object = hashlib.sha256(password.encode('utf-8'))
    hex_dig = hash_object.hexdigest()
    if (checkEmail(email)):
        cursor.execute("""select password from tables_customer WHERE email=?""",[email])
        row = cursor.fetchone()
        hash_password = row[0]
        cursor.execute("""select user_id from main.tables_customer WHERE email=?""",[email])
        row = cursor.fetchone()
        # user_id = row[0]
        # return  user_id
    else:
        cursor.execute("""select password from tables_employees WHERE email=?""",[email])
        row = cursor.fetchone()
        hash_password = row[0]
        cursor.execute("""select emp_id from main.tables_employees WHERE email=?""",[email])
        row = cursor.fetchone()
        # emp_id  = row[0]
        # return emp_id
        #will need to return the user/employee id

    if(hex_dig == hash_password):
        return True

#chef creates a menu
def createMenu(chef_id,price,description,picture):
    cursor.execute("""INSERT INTO main.tables_menu (price, description, rating, picture, chef_id_id)""" 
                    """VALUES (?,?,?,?,?)""",[price,description,0,picture,chef_id])
    conn.commit()
#chef changes the price on a menu
def updatePrices(price,menu_id):
    cursor.execute("""UPDATE main.tables_menu set price = ? WHERE main.tables_menu.menu_id= ?""",
                   [price,menu_id])
    conn.commit()

#validate the access code and assign to the corresponding job(chef/delivery)
def checkAccess(access_code,id,store_id):
    hash_object = hashlib.sha256(access_code.encode('utf-8'))
    hex_dig = hash_object.hexdigest()
    cursor.execute("""SELECT types FROM tables_access WHERE access_code=?""",[hex_dig])
    row = cursor.fetchone()
    employer = row[0]
    if(employer == "chef"):
        cursor.execute("""INSERT INTO main.tables_chef (menu_name, warning, emp_id_id, store_id)"""
                       """VALUES (?,?,?,?)""",["",0,id,store_id])
        conn.commit()
    else:
        cursor.execute("""INSERT INTO tables_delivery (status, warning, emp_id_id, store_id)"""
                       """VALUES (?,?,?,?)""", [0, 0, id, store_id])
        conn.commit()

def showRestaurant():
    cursor.execute("""SELECT name,address,city,state,zipcode,phone,logo 
                  FROM tables_restaurant""" )
    row = cursor.fetchall()
    # print(row[0]
    list_of_restaurant=[]
    for i in row:
        list_of_restaurant.append(i)
    return list_of_restaurant


#Will need a how menu function
#Function to be done: Place order, Review, Delivery, Manager

print("ran")
showRestaurant()
employeeSignUp('andrii','luchko','123','CCNY','harlem','NY','11013','123-231-0123','23456875','11/12/1996',"test@gmail.com","f59ac0828b9a32293b348e398a0efd342b1e4377a687f3a9055ee2871dff35e4","2")
# print(login('test@gmail.com','123'))
# createMenu('1',12,"cheese pie","no picture")
# updatePrices("12.99",'1')
print("done")
conn.close()
