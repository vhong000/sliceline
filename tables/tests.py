from django.test import TestCase
from django.db import connection, transaction

from django.conf import settings
settings.configure()
# Create your tests here.

def employeeSignUp(username,lastname,password,address,city,state,zipcode,phone,ssn,birthday,email):
    cursor = connection.cursor()
    cursor.execute("""insert into tables_employees 
                  (password, emp_fname, emp_lname, address, city, state, zipcode, phone, ssn, birthday)"""
                  """VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)""",
                   [password,username,lastname,address,city,state,zipcode,phone,ssn,birthday,email])
    transaction.commit()
    cursor.close()

def customerSignUp(username,lastname,password,address,city,state,zipcode,phone,birthday,email):
    cursor = connection.cursor()
    cursor.execute("""insert into tables_customer 
                  (password, user_fname, user_lname, address, city, state, zipcode, phone, birthday)"""
                  """VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)""",
                   [password,username,lastname,address,city,state,zipcode,phone,birthday,email])
    transaction.commit()
    cursor.close()

customerSignUp('carlos','ng','123','CCNY','harlem','NY','11013','123-231-0123','11/12/1996',"sahdf@gmail.com")
