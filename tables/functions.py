# import MySQLdb
# import _mysql
# db = MySQLdb.connect("127.0.0.1", "root", "23173099", "kkdata6")
# cursor = db.cursor()
from django.conf import settings
settings.configure()
import hashlib,uuid,sqlite3
conn = sqlite3.connect("/home/cng000/Documents/CSC322/sliceline/db.sqlite3")
cursor = conn.cursor()
from django.utils import timezone

def employeeSignUp(username,lastname,password,address,city,state,zipcode,phone,ssn,birthday,email):
    hash_object = hashlib.sha256(password.encode('utf-8'))
    hex_dig = hash_object.hexdigest()
    cursor.execute("""insert into tables_employees 
                  (password, emp_fname, emp_lname, address, city, state, zipcode, phone, ssn, birthday,email)"""
                  """VALUES (?,?,?,?,?,?,?,?,?,?,?)""",
                   [hex_dig,username,lastname,address,city,state,zipcode,phone,ssn,birthday,email])
    conn.commit()
    cursor.execute("""INSERT INTO tables_account (type, email)"""
                   """VALUES (?,?)""", ["employees", email])


def customerSignUp(username,lastname,password,address,city,state,zipcode,phone,birthday,email):
    date = timezone.now()
    hash_object = hashlib.sha256(password.encode('utf-8'))
    hex_dig = hash_object.hexdigest()
    cursor.execute("""insert into tables_customer 
                  (password, user_fname, user_lname, address, city, state, zipcode, phone, birthday,email,memb_since)"""
                  """VALUES (?,?,?,?,?,?,?,?,?,?,?)""",
                   [hex_dig,username,lastname,address,city,state,zipcode,phone,birthday,email,date])
    conn.commit()
    cursor.execute("""INSERT INTO tables_account (type, email)"""
                   """VALUES (?,?)""",["customer",email])
    conn.commit()


def checkEmail(email):
    cursor.execute("""SELECT type FROM tables_account WHERE email=?""",[email])
    row = cursor.fetchone()
    type = row[0]
    if (type == "customer"):
        return True
    else:
        return False

def login(email,password):
    hash_object = hashlib.sha256(password.encode('utf-8'))
    hex_dig = hash_object.hexdigest()
    if (checkEmail(email)):
        cursor.execute("""select password from tables_customer WHERE email=?""",[email])
        row = cursor.fetchone()
        hash_password = row[0]
    else:
        cursor.execute("""select password from tables_employees WHERE email=?""", [email])
        row = cursor.fetchone()
        hash_password = row[0]

    if(hex_dig == hash_password):
        return True


print("ran")
# customerSignUp('andrii','luchko','123','CCNY','harlem','NY','11013','123-231-0123','11/12/1996',"test@gmail.com")
print("done")
print(login('test@gmail.com','123'))
# print(login('test@gmail.com','123'))
conn.close()
