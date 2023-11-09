import pymysql
from newDb_creds import DataHOST
from newDb_creds import DataDATABASE
from newDb_creds import DataPASSWORD
from newDb_creds import DataUSERNAME
from newDb_creds import DataPORT

def new_connect_to_mysql():
    mysql_user = DataUSERNAME
    mysql_password = DataPASSWORD
    mysql_database = DataDATABASE
    mysql_port = DataPORT
    mysql_host = DataHOST
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

def new_close_mysql_connection(mysql_connection):
    if mysql_connection:
        mysql_connection.close()











# # SSH configuration
# # ssh_host = '159.65.125.228'
# # ssh_port = 22
# # ssh_username = 'pranaysanghvi'
# # ssh_key_path = 'icon'

# # MySQL database configuration
# # mysql_host = '127.0.0.1'
# # mysql_port = 3306
# # mysql_user = 'pranaysanghvi'
# # mysql_password = 'dmBNDvdQckCnN7/'
# # mysql_database = 'icon_db'












