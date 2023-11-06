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
            print(f"Connected to MySQL database '{mysql_database}' through SSH tunnel")
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












# ssh_host = SshHOST
# ssh_port = SshPORT
# ssh_username = SshUSERNAME
# ssh_key_path = SshKEYPATH

# # MySQL database configuration
# mysql_port = DataPORT
# mysql_host = DataHOST
# mysql_user = DataUSERNAME
# mysql_password = DataPASSWORD
# mysql_database = DataDATABASE




# # Establish an SSH tunnel using paramiko
# ssh_key = paramiko.RSAKey(filename=ssh_key_path)
# tunnel = SSHTunnelForwarder(
#     (ssh_host, ssh_port),
#     ssh_username=ssh_username,
#     ssh_pkey=ssh_key,
#     remote_bind_address=(mysql_host, mysql_port)
# )

# try:
#     tunnel.start()  # Start the SSH tunnel

#     # Connect to the MySQL database through the SSH tunnel
#     mysql_connection = pymysql.connect(
#         host='127.0.0.1',  # Use localhost since we are tunneling
#         port=tunnel.local_bind_port,
#         user=mysql_user,
#         password=mysql_password,
#         database=mysql_database
#     )

#     if mysql_connection.open:
#         print(f"Connected to MySQL database '{mysql_database}' through SSH tunnel")

#         # Perform MySQL queries and operations here
#         cursor = mysql_connection.cursor()
#         cursor.execute("SELECT * FROM client_userclient limit 1")
#         for row in cursor.fetchall():
#             print(row)

#         cursor.close()
#         mysql_connection.close()
#     else:
#         print("Failed to connect to MySQL database")

# finally:
#     tunnel.stop()  # Stop the SSH tunnel when done