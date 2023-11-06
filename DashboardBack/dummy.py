import pymysql
mysql_connection_report = pymysql.connect(
    host='icon-database-reports.ceb1yyq6lq4z.eu-west-1.rds.amazonaws.com',  
    port=3306,
    user='pranaysanghvi',
    password='dmBNDvdQckCnN7/',
    database='icon_db_reports'
)
cursor = mysql_connection_report.cursor()
cursor.execute('show tables;')
values = cursor.fetchall()
cursor.close()
print(values)
