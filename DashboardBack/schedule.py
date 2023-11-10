import os
import shutil
import time
import io
from datetime import date
import pandas as pd
import httpx
import requests
from database import close_mysql_connection,connect_to_mysql
from databaseReport import new_close_mysql_connection,new_connect_to_mysql
import asyncio

async def queryFunction(query):
    values = []
    mysql_connection = None
    try:
        mysql_connection = connect_to_mysql()
    except Exception as e:
        print("error While connecting to mysql icon db")
    if mysql_connection:
        try:
            cursor = mysql_connection.cursor()
            cursor.execute(query)
            values = cursor.fetchall()
            cursor.close()
            close_mysql_connection(mysql_connection)
        except Exception as e:
            print("Getting error while fetching the query ",e)
    return values

async def queryFunction_report(query):
    values = []
    mysql_connection_report = None
    try:
        mysql_connection_report = new_connect_to_mysql()
    except Exception as e:
        print("Error while connecting to MySQL reports icon db", e)
        return values  

    if mysql_connection_report:
        try:
            cursor = mysql_connection_report.cursor()
            cursor.execute(query)
            values = cursor.fetchall()
        except Exception as e:
            print("Error while executing the query", e)
        finally:
            cursor.close()
            try:
                mysql_connection_report.commit()
            except Exception as e:
                print("Error while committing changes", e)
            finally:
                new_close_mysql_connection(mysql_connection_report)

    return values

async def database_sceduling():
    # take all the months that exist .
    value=[]
    query=f"""select date from excel_month_exist eme ;"""
    try: 
        value = await queryFunction_report(query)
        print(value)
    except Exception as e:
        print("error inside query function",e)
    #  loop over them 
    for month in value:
        print(month)
        # find out all the emails of that month
        # get new data for those emails 
        #insert them int he database .


asyncio.run(database_sceduling())