import pymysql
from db_creds import DataHOST
from db_creds import DataDATABASE
from db_creds import DataPASSWORD
from db_creds import DataUSERNAME
from db_creds import DataPORT

def connect_to_mysql():
    mysql_user = DataUSERNAME
    mysql_password = DataPASSWORD
    mysql_database = DataDATABASE
    mysql_host = DataHOST
    mysql_port = DataPORT
    try:
        mysql_connection = pymysql.connect(
            host=mysql_host,  
            port=mysql_port,
            user=mysql_user,
            password=mysql_password,
            database=mysql_database
        )
        if mysql_connection.open:
            print(f"Connected to MySQL database")
            return mysql_connection
        else:
            print("Failed to connect to MySQL database")
            return None
    except Exception as e:
        print(f"Error: {str(e)}")
        return None

def close_mysql_connection(mysql_connection):
    if mysql_connection:
        mysql_connection.close()














