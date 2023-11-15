from fastapi import FastAPI,UploadFile, File , Form, Body, Request
from fastapi.middleware.cors import CORSMiddleware
from database import close_mysql_connection,connect_to_mysql
from fastapi import HTTPException
from datetime import date
from fastapi import BackgroundTasks
import time
import pandas as pd
import io
from pydantic import BaseModel
import httpx
import requests
from databaseReport import new_close_mysql_connection,new_connect_to_mysql
import shutil
import os
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
conn = None 
tunnel = 1
# mysql_connection = connect_to_mysql()
tunnel_report = 1
# mysql_connection_report = new_connect_to_mysql()


app = FastAPI()

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
            raise HTTPException(status_code=500, detail="Internal Server Error")
    return values

# async def queryFunction_report(query):
#     values = []
#     mysql_connection_report = None
#     try:
#         mysql_connection_report = new_connect_to_mysql()
#     except Exception as e:
#         print("error While connecting to mysql reports icon db",e)
#     if mysql_connection_report:
#         try:
#             cursor = mysql_connection_report.cursor()
#             cursor.execute(query)
#             values = cursor.fetchall()
#             cursor.close()
#             mysql_connection_report.commit()
#             new_close_mysql_connection(mysql_connection_report)
#         except Exception as e:
#             print("Getting error while fetching the query ",e)
#             raise HTTPException(status_code=500, detail="Internal Server Error")
#     return values

async def queryFunction_report(query):
    values = []
    mysql_connection_report = None
    try:
        mysql_connection_report = new_connect_to_mysql()
    except Exception as e:
        print("Error while connecting to MySQL reports icon db", e)
        # Log the error or handle it appropriately
        return values  # Return an empty list to indicate failure

    if mysql_connection_report:
        try:
            cursor = mysql_connection_report.cursor()
            cursor.execute(query)
            values = cursor.fetchall()
        except Exception as e:
            print("Error while executing the query", e)
            raise HTTPException(status_code=500, detail="Internal Server Error")
        finally:
            # Ensure the cursor is closed
            cursor.close()

            # Ensure the connection is closed
            try:
                mysql_connection_report.commit()
            except Exception as e:
                print("Error while committing changes", e)
            finally:
                new_close_mysql_connection(mysql_connection_report)

    return values


origins = [
    "*"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Endpoint to check if api is working
@app.get("/api/")
def hello():
    return {"Hello":"world"}

# Endpoint to get client_userClient Table;
# @app.get("/api/client_userClient")
# def client_userClient():
#     if tunnel:
#         mysql_connection = connect_to_mysql()
#         if mysql_connection:
#             try:
#                 cursor = mysql_connection.cursor()
#                 headers = ['*']
#                 query = "SELECT {} FROM client_userclient limit 1".format(*headers)
#                 cursor.execute(query)
#                 values = cursor.fetchall()
#                 cursor.close()
#                 return {
#                     "status_code":200,
#                     "data":{
#                         "headers": headers,
#                         "values":values
#                     }
#                 }
#             except Exception as e:
#                 print("Getting Unique error while fethcing query",e)
#                 raise HTTPException(status_code=500, detail={
#                     "status_code":500,
#                     "message":'something went wrong: ' + str(e)
#                 })
#     return []


@app.get("/api/getUserByMonth")
async def get_user_by_month(start: date, end: date):
    if tunnel:
        value1 = []
        value2 = []
        value3 = []
        
        query_date_range = f"'{start}' AND '{end}'"
        
        query1 = f"""
            SELECT DATE_FORMAT(date_joined, '%Y-%m') AS month, COUNT(*) AS total_contractors_signed_up 
            FROM autho_user au 
            WHERE date_joined BETWEEN {query_date_range} 
            GROUP BY DATE_FORMAT(date_joined, '%Y-%m') 
            ORDER BY DATE_FORMAT(date_joined, '%Y-%m') ASC;
        """
        
        query2 = f"""
            SELECT
            DATE_FORMAT(au.date_joined,'%Y-%m') as date_joined ,
            COUNT(*) AS TotalActiveContractors
            FROM
                autho_user au
            LEFT JOIN
                client_userclient cu ON au.id = cu.user_id
            WHERE
                date_joined between {query_date_range}
                AND cu.company_type IN (1, 2)
                AND cu.status IN (8, 10)
            GROUP BY
                DATE_FORMAT(au.date_joined,'%Y-%m')
            ORDER BY
                DATE_FORMAT(au.date_joined,'%Y-%m'); 
        """
        
        query3 = f"""
            SELECT
                DATE_FORMAT(au.date_joined,'%Y-%m') as date_joined ,
                COUNT(*) AS TotalPendingActivations
            FROM
                autho_user au
            LEFT JOIN
                client_userclient cu ON au.id = cu.user_id
            WHERE
                date_joined between {query_date_range}
                AND cu.company_type IN (1, 2)
                AND cu.status = 9
            GROUP BY
                DATE_FORMAT(au.date_joined,'%Y-%m')
            ORDER BY
                DATE_FORMAT(au.date_joined,'%Y-%m');
        """
        # query1 = f"""
        #     SELECT DATE_FORMAT(date_joined, '%Y-%m') AS month, COUNT(*) AS total_contractors_signed_up 
        #     FROM autho_user au 
        #     WHERE DATE_FORMAT(date_joined, '%Y')='2023' AND date_joined BETWEEN {query_date_range} 
        #     GROUP BY DATE_FORMAT(date_joined, '%Y-%m') 
        #     ORDER BY DATE_FORMAT(date_joined, '%Y-%m') ASC;
        # """
        
        # query2 = f"""
        #     SELECT DATE_FORMAT(date_joined, '%Y-%m') AS month, COUNT(*) AS total_contractors_signed_up 
        #     FROM autho_user au 
        #     WHERE DATE_FORMAT(date_joined, '%Y')='2023' AND is_active = 1 AND date_joined BETWEEN {query_date_range} 
        #     GROUP BY DATE_FORMAT(date_joined, '%Y-%m') 
        #     ORDER BY DATE_FORMAT(date_joined, '%Y-%m') ASC;
        # """
        
        # query3 = f"""
        #     SELECT DATE_FORMAT(date_joined, '%Y-%m') AS month, COUNT(*) AS total_contractors_signed_up 
        #     FROM autho_user au 
        #     WHERE DATE_FORMAT(date_joined, '%Y')='2023' AND is_active = 0 AND date_joined BETWEEN {query_date_range} 
        #     GROUP BY DATE_FORMAT(date_joined, '%Y-%m') 
        #     ORDER BY DATE_FORMAT(date_joined, '%Y-%m') ASC;
        # """
        
        # Assuming queryFunction is an asynchronous function
        value1 = await queryFunction(query1)
        value2 = await queryFunction(query2)
        value3 = await queryFunction(query3)

        return {
            "all": value1,
            "active": value2,
            "pending": value3
        }
    else:
        print("No tunnel")
        return []
    
#  cumm graph
@app.get("/api/getUserByMonthCummOne")
async def get_user_by_month_cumm_one( end: date ):
    if tunnel:
        value1 = []
        value2 = []
        value3 = []
        query_date_range = f"'{end}'"
        query1 = f"""SELECT
                        YEAR(NOW()) AS YearToDate,
                        SUM(1) AS TotalSignups,
                        SUM(CASE WHEN cu.status IN (8, 10) THEN 1 ELSE 0 END) AS TotalActive,
                        SUM(CASE WHEN cu.status = 9 THEN 1 ELSE 0 END) AS TotalPending
                    FROM
                        autho_user au
                    LEFT JOIN
                        client_userclient cu ON au.id = cu.user_id
                    WHERE
                        YEAR(au.date_joined) = YEAR(NOW()) and 
                        date_joined < {query_date_range}
                        AND cu.company_type IN (1, 2);"""
        value1 = await queryFunction(query1)
        return {
            "all": value1,
        }
    else:
        print("No tunnel")
        return []
    
#  user by month table
@app.get("/api/getUserByMonthTables")
async def get_user_by_month_tables(start:date,end:date):
    if tunnel:
        value1 = []
        # value2 = []
        # value3 = []
        query_date_range = f"'{start}' AND '{end}'";
        query1 = f"""SELECT first_name, last_name, date_joined, CASE WHEN (cc.company IS NULL OR cc.company = '') THEN 'Not present' ELSE cc.company END AS company, CASE WHEN cc.company_type = 1 THEN 'PAYE Member' WHEN cc.company_type = 2 THEN 'Director Member' WHEN cc.company_type = 3 THEN 'PLC' ELSE 'Unknown' END AS company_type,  YEAR(date_joined) AS year , au.email ,is_active FROM autho_user au LEFT JOIN client_userclient AS cc ON au.id = cc.user_id WHERE date_joined BETWEEN {query_date_range} AND YEAR(date_joined) = 2023 ORDER BY date_joined DESC;"""
        # query2 = "SELECT first_name, last_name, date_joined, CASE WHEN (cc.company IS NULL OR cc.company = '') THEN 'Not Present' ELSE cc.company END AS company, CASE WHEN cc.company_type = 1 THEN 'PAYE Member' WHEN cc.company_type = 2 THEN 'Director Member' WHEN cc.company_type = 3 THEN 'PLC' ELSE 'Unknown' END AS company_type, ca.name AS 'Agency' , YEAR(date_joined) AS year FROM autho_user au LEFT JOIN client_userclient AS cc ON au.id = cc.user_id LEFT JOIN client_agency AS ca ON cc.account_manager_id = ca.agency_manager_id WHERE is_active = 0 AND YEAR(date_joined) = 2023 ORDER BY date_joined DESC ;"
        # query3 = "SELECT first_name, last_name, date_joined, CASE WHEN (cc.company IS NULL OR cc.company = '') THEN 'Not Present' ELSE cc.company END AS company, CASE WHEN cc.company_type = 1 THEN 'PAYE Member' WHEN cc.company_type = 2 THEN 'Director Member' WHEN cc.company_type = 3 THEN 'PLC' ELSE 'Unknown' END AS company_type, ca.name AS 'Agency', YEAR(date_joined) AS year FROM autho_user au LEFT JOIN client_userclient AS cc ON au.id = cc.user_id LEFT JOIN client_agency AS ca ON cc.account_manager_id = ca.agency_manager_id WHERE is_active = 1 AND YEAR(date_joined) = 2023 ORDER BY date_joined DESC  ;"
        # query1 = "SELECT first_name, last_name, date_joined, CASE WHEN (cc.company IS NULL OR cc.company = '') THEN 'Not present' ELSE cc.company END AS company, CASE WHEN cc.company_type = 1 THEN 'PAYE Member' WHEN cc.company_type = 2 THEN 'Director Member' WHEN cc.company_type = 3 THEN 'PLC' ELSE 'Unknown' END AS company_type, ca.name AS 'Agency' FROM autho_user au LEFT JOIN client_userclient AS cc ON au.id = cc.user_id LEFT JOIN client_agency AS ca ON cc.account_manager_id = ca.agency_manager_id ORDER BY date_joined DESC;"
        # query2 = "SELECT first_name, last_name, date_joined, CASE WHEN (cc.company IS NULL OR cc.company = '') THEN 'Not Present' ELSE cc.company END AS company, CASE WHEN cc.company_type = 1 THEN 'PAYE Member' WHEN cc.company_type = 2 THEN 'Director Member' WHEN cc.company_type = 3 THEN 'PLC' ELSE 'Unknown' END AS company_type, ca.name AS 'Agency' FROM autho_user au LEFT JOIN client_userclient AS cc ON au.id = cc.user_id LEFT JOIN client_agency AS ca ON cc.account_manager_id = ca.agency_manager_id WHERE is_active = 0 ORDER BY date_joined DESC ;"
        # query3 = "SELECT first_name, last_name, date_joined, CASE WHEN (cc.company IS NULL OR cc.company = '') THEN 'Not Present' ELSE cc.company END AS company, CASE WHEN cc.company_type = 1 THEN 'PAYE Member' WHEN cc.company_type = 2 THEN 'Director Member' WHEN cc.company_type = 3 THEN 'PLC' ELSE 'Unknown' END AS company_type, ca.name AS 'Agency' FROM autho_user au LEFT JOIN client_userclient AS cc ON au.id = cc.user_id LEFT JOIN client_agency AS ca ON cc.account_manager_id = ca.agency_manager_id WHERE is_active = 1 ORDER BY date_joined DESC  ;"
        # Assuming queryFunction is an asynchronous function
        value1 = await queryFunction(query1)
        # value2 = await queryFunction(query2)
        # value3 = await queryFunction(query3)
        return {
            "all": value1,
            # "active": value2,
            # "pending": value3
        }
    else:
        print("No tunnel")
        return []

#  Bar With Total Written on it
@app.get("/api/getTotalNewJoinersPerMonth")
async def get_total_new_joiners_per_mont(start:date , end :date):
    if tunnel:
        value=[]
        query_date_range = f"'{start}' AND '{end}'"
        query=f"""select DATE_FORMAT(date_joined, '%Y-%m') AS month, count(*) as count from autho_user au LEFT JOIN client_userclient as cc ON au.id = cc.user_id where cc.company_type NOT LIKE '3' AND date_joined BETWEEN {query_date_range} group by DATE_FORMAT(date_joined, '%Y-%m') order by DATE_FORMAT(date_joined, '%Y-%m');"""
        # query=f"""select month(date_joined), monthname(date_joined) as month, count(*) as count from autho_user au LEFT JOIN client_userclient as cc ON au.id = cc.user_id where DATE_FORMAT(date_joined, '%Y')='2023' and cc.company_type NOT LIKE '3' AND date_joined BETWEEN {query_date_range} group by month(date_joined), monthname(date_joined) order by month(date_joined)"""
        try:
            value =await queryFunction(query);
            print(value,"Hello this")
        except Exception as e:
            print("error inside query function",e)
        return {
                "data":value,
            };
    else:
        print("No tunnel");
        return [];
    
#  total new joiners table
@app.get("/api/getTotalNewJoinersPerMontTable")
async def get_total_new_joiners_per_mont_table(start:date,end:date):
    if tunnel:
        value=[]
        query_date_range = f"'{start}' AND '{end}'"
        query=f"""SELECT first_name, last_name, date_joined, monthname(date_joined) as month , CASE WHEN (cc.company IS NULL OR cc.company = '') THEN 'Not present' ELSE cc.company END AS company, CASE WHEN cc.company_type = 1 THEN 'PAYE Member' WHEN cc.company_type = 2 THEN 'Director Member' WHEN cc.company_type = 3 THEN 'PLC' ELSE 'Unknown' END AS company_type from autho_user au LEFT JOIN client_userclient as cc ON au.id = cc.user_id  where  cc.company_type NOT LIKE '3' and date_joined BETWEEN {query_date_range} order by month(date_joined) desc"""
        # query=f"""select first_name, last_name, date_joined, monthname(date_joined) as month , CASE WHEN (cc.company IS NULL OR cc.company = '') THEN 'Not present' ELSE cc.company END AS company, CASE WHEN cc.company_type = 1 THEN 'PAYE Member' WHEN cc.company_type = 2 THEN 'Director Member' WHEN cc.company_type = 3 THEN 'PLC' ELSE 'Unknown' END AS company_type , ca.name AS 'Agency' from autho_user au LEFT JOIN client_userclient as cc ON au.id = cc.user_id LEFT JOIN client_agency AS ca ON cc.account_manager_id = ca.agency_manager_id where DATE_FORMAT(date_joined, '%Y')='2023' and cc.company_type NOT LIKE '3' and date_joined BETWEEN {query_date_range} order by month(date_joined)"""
        try:
            value =await queryFunction(query);
        except Exception as e:
            print("error inside query function",e)
        return {
                "data":value,
            };
    else:
        print("No tunnel");
        return [];

#  Pie Chart for all documents received vs at least one document missing.
@app.get("/api/getAllDocumentRecieved")
async def get_all_document_recieved( start:date , end:date ):
    if tunnel:
        value1=[]
        value2=[]
        query_date_range = f"'{start}' AND '{end}'"
        query1=f"""SELECT COUNT(client_id) as total_contractors_with_all_docs from (select GROUP_CONCAT(DISTINCT dd.doc_type) as docs,client_id  from documents_document dd INNER JOIN client_userclient cu ON dd.client_id = cu.id left join autho_user au on cu.user_id = au.id where date_joined between {query_date_range} and company_type not like '3' GROUP BY client_id HAVING
docs LIKE '%,12,%' OR (docs LIKE '%,5,%' AND docs LIKE '%,6,%') AND 
docs like '%,7,%' AND docs like '%,28,%' AND docs like '%,25,%'
ORDER BY client_id ASC) x;"""
        query2=f"""WITH ExcludedClients AS (SELECT client_id FROM (SELECT GROUP_CONCAT(DISTINCT dd.doc_type) as docs, client_id FROM documents_document dd INNER JOIN client_userclient cu ON dd.client_id = cu.id LEFT JOIN autho_user au ON cu.user_id = au.id WHERE date_joined between {query_date_range} AND company_type NOT LIKE '3' GROUP BY client_id HAVING docs LIKE '%,12,%' OR (docs LIKE '%,5,%' AND docs LIKE '%,6,%') AND docs LIKE '%,7,%' AND docs LIKE '%,28,%' AND docs LIKE '%,25,%' ORDER BY client_id ASC) x) SELECT COUNT(*) AS row_count FROM (SELECT cc.id as client_id, first_name, last_name, date_joined, monthname(date_joined) as month, CASE WHEN (cc.company IS NULL OR cc.company = '') THEN 'Not present' ELSE cc.company END AS company, CASE WHEN cc.company_type = 1 THEN 'PAYE Member' WHEN cc.company_type = 2 THEN 'Director Member' WHEN cc.company_type = 3 THEN 'PLC' ELSE 'Unknown' END AS company_type FROM autho_user au LEFT JOIN client_userclient as cc ON au.id = cc.user_id WHERE cc.company_type NOT LIKE '3' AND date_joined between {query_date_range} AND cc.id NOT IN (SELECT client_id FROM ExcludedClients)) main_query ORDER BY MONTH(date_joined) DESC;"""
        # query1=f"""SELECT COUNT(DISTINCT client_id) AS num_clients_with_all_docs FROM documents_document as dd LEFT Join client_userclient as cuc on dd.client_id = cuc.id Left join autho_user as au on cuc.user_id = au.id WHERE doc_type IN (11, 14, 17, 25, 29) AND date_joined BETWEEN {query_date_range};"""
        # query2=f"""SELECT COUNT(DISTINCT client_id) -  (COUNT(DISTINCT CASE WHEN doc_type IN (11, 14, 17, 25, 29) THEN client_id END)) AS num_clients_without_all_docs FROM documents_document as dd LEFT Join client_userclient as cuc on dd.client_id = cuc.id Left join autho_user as au on cuc.user_id = au.id WHERE date_joined BETWEEN {query_date_range};"""
        # query1="SELECT COUNT(DISTINCT client_id) AS num_clients_with_all_docs FROM documents_document WHERE doc_type IN (11, 14, 17, 25, 29);"
        # query2="SELECT COUNT(DISTINCT client_id) -  (COUNT(DISTINCT CASE WHEN doc_type IN (11, 14, 17, 25, 29) THEN client_id END)) AS num_clients_without_all_docs FROM documents_document;"
        try:
            value1 =await queryFunction(query1);
            value2 =await queryFunction(query2);
        except Exception as e:
            print("error inside query function",e)
        return {
                "allDocs":value1,
                "AtleasOneMiss":value2
            };
    else:
        print("No tunnel");
        return [];

#table one for document recieved
@app.get("/api/getAllDocumentRecievedTableOne")
async def get_all_document_recieved_table_one(start:date,end:date):
    if tunnel:
        value1=[]
        query_date_range = f"'{start}' AND '{end}'"
        query1=f""" SELECT client_id,first_name,last_name,email,date_joined,company,company_type from (select GROUP_CONCAT(DISTINCT dd.doc_type) as docs, first_name , last_name , email , date_joined , CASE WHEN (company IS NULL OR company = '') THEN 'Not present' ELSE company END AS company ,CASE WHEN company_type = 1 THEN 'PAYE Member' WHEN company_type = 2 THEN 'Director Member' WHEN company_type = 3 THEN 'PLC' ELSE 'Unknown' END AS company_type ,client_id  from documents_document dd INNER JOIN client_userclient cu ON dd.client_id = cu.id left join autho_user au on cu.user_id = au.id where date_joined between {query_date_range} and company_type not like '3' GROUP BY client_id HAVING
docs LIKE '%,12,%' OR (docs LIKE '%,5,%' AND docs LIKE '%,6,%') AND 
docs like '%,7,%' AND docs like '%,28,%' AND docs like '%,25,%'
ORDER BY client_id ASC) x;"""
        try:
            value1 =await queryFunction(query1);
        except Exception as e:
            print("error inside query function",e)
        return {
                "table1":value1
            };
    else:
        print("No tunnel");
        return [];

#Circle With % written on it
@app.get("/api/getPercWithAllDocRec")
async def get_perc_with_all_doc_rec(start:date,end:date):
    if tunnel:
        value=[]
        query_date_range = f"'{start}' AND '{end}'"
        query = f"""SELECT (AllDocs.total_contractors_with_all_docs / TotalUsers.total_users) * 100 AS percentage
FROM (SELECT COUNT(client_id) as total_contractors_with_all_docs FROM (SELECT GROUP_CONCAT(DISTINCT dd.doc_type) as docs,client_id  FROM documents_document dd INNER JOIN client_userclient cu ON dd.client_id = cu.id LEFT JOIN autho_user au ON cu.user_id = au.id WHERE date_joined BETWEEN {query_date_range} AND company_type NOT LIKE '3' GROUP BY client_id HAVING docs LIKE '%,12,%' OR (docs LIKE '%,5,%' AND docs LIKE '%,6,%') AND docs LIKE '%,7,%' AND docs LIKE '%,28,%' AND docs LIKE '%,25,%' ORDER BY client_id ASC) x) AS AllDocs, (SELECT COUNT(*) AS total_users FROM autho_user au LEFT JOIN client_userclient as cc ON au.id = cc.user_id WHERE cc.company_type NOT LIKE '3' AND date_joined BETWEEN {query_date_range}) AS TotalUsers;
"""
    #     query=f"""SELECT
    # (
    #     (
    #         (SELECT COUNT(client_id) FROM (
    #             SELECT GROUP_CONCAT(DISTINCT dd.doc_type) AS docs, client_id
    #             FROM documents_document dd
    #             INNER JOIN client_userclient cu ON dd.client_id = cu.id
    #             LEFT JOIN autho_user au ON cu.user_id = au.id
    #             WHERE date_joined BETWEEN {query_date_range} and cc.company_type not like '3'
    #             GROUP BY client_id
    #             HAVING docs LIKE '%,12,%' OR (docs LIKE '%,5,%' AND docs LIKE '%,6,%')
    #             AND docs LIKE '%,7,%' AND docs LIKE '%,28,%' AND docs LIKE '%,25,%'
    #             ORDER BY client_id ASC
    #         ) x) * 100.0
    #     ) / 
    #     (SELECT SUM(total_contractors_signed_up) FROM (
    #         SELECT DATE_FORMAT(date_joined, '%Y-%m') AS month, COUNT(*) AS total_contractors_signed_up
    #         FROM autho_user au
    #         WHERE date_joined between {query_date_range} and cc.company_type not like '3'
    #         GROUP BY DATE_FORMAT(date_joined, '%Y-%m')
    #         ORDER BY DATE_FORMAT(date_joined, '%Y-%m') DESC
    #     ) AS contractor_data)
    # ) AS percentage_of_total;"""
        # query=f"""SELECT ROUND((COUNT(DISTINCT CASE WHEN doc_type IN (11, 14, 17, 25, 29) THEN client_id END) / COUNT(DISTINCT client_id)) * 100,2) AS percentage_clients_with_all_docs FROM documents_document"""
        try:
            value =await queryFunction(query);
        except Exception as e:
            print("error inside query function",e)
        return {
                "percentage":value,
            };
    else:
        print("No tunnel");
        return [];


#Bar chart for missing docs
@app.get("/api/getMissingDocsBar")
async def get_missing_docs_bar(start:date,end:date):
    if tunnel:
        value1=[]
        value2=[]
        value3=[]
        value4=[]
        value5=[]
        value6=[]
        query_date_range = f"'{start}' AND '{end}'"
        query1=f"""SELECT COUNT(DISTINCT client_id) AS num_clients_without_doc_12_or_with_5_and_6 FROM documents_document as dd LEFT JOIN client_userclient AS cuc ON dd.client_id = cuc.id LEFT JOIN autho_user AS au ON cuc.user_id = au.id WHERE ( (doc_type <> 12) OR ( client_id IN ( SELECT DISTINCT client_id FROM documents_document WHERE doc_type = 5 ) AND client_id IN ( SELECT DISTINCT client_id FROM documents_document WHERE doc_type = 6 ) ) ) AND doc_type IN (5, 6, 12) and date_joined between {query_date_range};"""
        query2=f"""SELECT COUNT(DISTINCT client_id) AS num_clients_without_doc_25 FROM documents_document as dd LEFT JOIN client_userclient AS cuc ON dd.client_id = cuc.id LEFT JOIN autho_user AS au ON cuc.user_id = au.id WHERE date_joined between {query_date_range} and  doc_type IN (11, 14, 17, 29) AND client_id NOT IN ( SELECT DISTINCT client_id FROM documents_document WHERE doc_type = 28 );"""
        query3=f"""SELECT COUNT(DISTINCT client_id) AS num_clients_without_doc_25 FROM documents_document as dd LEFT JOIN client_userclient AS cuc ON dd.client_id = cuc.id LEFT JOIN autho_user AS au ON cuc.user_id = au.id WHERE date_joined between {query_date_range} and  doc_type IN (11, 14, 17, 29) AND client_id NOT IN ( SELECT DISTINCT client_id FROM documents_document WHERE doc_type = 25 );"""
        query4=f"""SELECT COUNT(DISTINCT client_id) AS num_clients_without_doc_25 FROM documents_document as dd LEFT JOIN client_userclient AS cuc ON dd.client_id = cuc.id LEFT JOIN autho_user AS au ON cuc.user_id = au.id WHERE date_joined between {query_date_range} and  doc_type IN (11, 14, 17, 29) AND client_id NOT IN ( SELECT DISTINCT client_id FROM documents_document WHERE doc_type = 7 );"""
        query5=f"""SELECT  count(Distinct au.id) from autho_user as au inner join client_userclient as cuc on au.id = cuc.user_id inner join client_clientprofile as ccp on ccp.client_id = cuc.id where pps_number IS NULL or pps_number = '' and date_joined between {query_date_range};"""
        # query6 = f"""SELECT count(Distinct au.id) from autho_user as au inner join client_userclient as cuc on au.id = cuc.user_id inner join client_clientbank as ccb on ccb.client_id = cuc.id where bank_id IS NULL Or bank_id = '' and date_joined between {query_date_range};"""
        try:
            value1 =await queryFunction(query1);
            value2 =await queryFunction(query2);
            value3 =await queryFunction(query3);
            value4 =await queryFunction(query4);
            value5 =await queryFunction(query5);
            # value6 =await queryFunction(query6);
        except Exception as e:
            print("error inside query function",e)
        return {
                "IDPal":value1,
                "B10":value2,
                "tc":value3,
                "Agency":value4,
                "PPS":value5
                # "BankDetails":value6
            };
    else:
        print("No tunnel");
        return [];

#idpal
@app.get("/api/getMissingDocsBarTableIDPal")
async def get_missing_docs_bar_table_idpal(start:date,end:date):
    if tunnel:
        value1=[]
        query_date_range = f"'{start}' AND '{end}'"
        query1=f"""SELECT DISTINCT client_id ,first_name,last_name,email,date_joined,CASE WHEN (company IS NULL OR company = '') THEN 'Not present' ELSE company END AS company, CASE WHEN company_type = 1 THEN 'PAYE Member' WHEN company_type = 2 THEN 'Director Member' WHEN company_type = 3 THEN 'PLC' ELSE 'Unknown' END AS company_type FROM documents_document as dd LEFT JOIN client_userclient AS cuc ON dd.client_id = cuc.id LEFT JOIN autho_user AS au ON cuc.user_id = au.id WHERE ( (doc_type <> 12) OR ( client_id IN ( SELECT DISTINCT client_id FROM documents_document WHERE doc_type = 5 ) AND client_id IN ( SELECT DISTINCT client_id FROM documents_document WHERE doc_type = 6 ) ) ) AND doc_type IN (5, 6, 12) and date_joined between {query_date_range} order by date_joined desc"""
        try:
            value1 =await queryFunction(query1);
        except Exception as e:
            print("error inside query function",e)
        return {
                "data":value1,
            };
    else:
        print("No tunnel");
        return [];

# b10
@app.get("/api/getMissingDocsBarTableb10")
async def get_missing_docs_bar_table_b10(start:date,end:date):
    if tunnel:
        value1=[]
        query_date_range = f"'{start}' AND '{end}'"
        query1=f"""SELECT DISTINCT client_id ,first_name,last_name,email,date_joined,CASE WHEN (company IS NULL OR company = '') THEN 'Not present' ELSE company END AS company, CASE WHEN company_type = 1 THEN 'PAYE Member' WHEN company_type = 2 THEN 'Director Member' WHEN company_type = 3 THEN 'PLC' ELSE 'Unknown' END AS company_type FROM documents_document as dd LEFT JOIN client_userclient AS cuc ON dd.client_id = cuc.id LEFT JOIN autho_user AS au ON cuc.user_id = au.id WHERE date_joined between {query_date_range} and  doc_type IN (11, 14, 17, 29) AND client_id NOT IN ( SELECT DISTINCT client_id FROM documents_document WHERE doc_type = 28 ) order by date_joined desc;"""
        try:
            value1 =await queryFunction(query1);
        except Exception as e:
            print("error inside query function",e)
        return {
                "data":value1,
            };
    else:
        print("No tunnel");
        return [];

#pps
@app.get("/api/getMissingDocsBarTablepps")
async def get_missing_docs_bar_table_pps(start:date,end:date):
    if tunnel:
        value1=[]
        query_date_range = f"'{start}' AND '{end}'"
        query1=f"""SELECT  Distinct au.id , first_name,last_name,email,date_joined,CASE WHEN (company IS NULL OR company = '') THEN 'Not present' ELSE company END AS company, CASE WHEN company_type = 1 THEN 'PAYE Member' WHEN company_type = 2 THEN 'Director Member' WHEN company_type = 3 THEN 'PLC' ELSE 'Unknown' END AS company_type from autho_user as au inner join client_userclient as cuc on au.id = cuc.user_id inner join client_clientprofile as ccp on ccp.client_id = cuc.id where pps_number IS NULL or pps_number = '' and date_joined between {query_date_range} order by date_joined desc;"""
        try:
            value1 =await queryFunction(query1);
        except Exception as e:
            print("error inside query function",e)
        return {
                "data":value1,
            };
    else:
        print("No tunnel");
        return [];

#tandc
@app.get("/api/getMissingDocsBarTabletandc")
async def get_missing_docs_bar_table_tandc(start:date,end:date):
    if tunnel:
        value1=[]
        query_date_range = f"'{start}' AND '{end}'"
        query1=f"""SELECT DISTINCT client_id ,first_name,last_name,email,date_joined,CASE WHEN (company IS NULL OR company = '') THEN 'Not present' ELSE company END AS company, CASE WHEN company_type = 1 THEN 'PAYE Member' WHEN company_type = 2 THEN 'Director Member' WHEN company_type = 3 THEN 'PLC' ELSE 'Unknown' END AS company_type FROM documents_document as dd LEFT JOIN client_userclient AS cuc ON dd.client_id = cuc.id LEFT JOIN autho_user AS au ON cuc.user_id = au.id WHERE date_joined between {query_date_range} and  doc_type IN (11, 14, 17, 29) AND client_id NOT IN ( SELECT DISTINCT client_id FROM documents_document WHERE doc_type = 25 ) order by date_joined desc;"""
        try:
            value1 =await queryFunction(query1);
        except Exception as e:
            print("error inside query function",e)
        return {
                "data":value1,
            };
    else:
        print("No tunnel");
        return [];
    
#agency    
@app.get("/api/getMissingDocsBarTableagency")
async def get_missing_docs_bar_table_agency(start:date,end:date):
    if tunnel:
        value1=[]
        query_date_range = f"'{start}' AND '{end}'"
        query1=f"""SELECT DISTINCT client_id ,first_name,last_name,email,date_joined,CASE WHEN (company IS NULL OR company = '') THEN 'Not present' ELSE company END AS company, CASE WHEN company_type = 1 THEN 'PAYE Member' WHEN company_type = 2 THEN 'Director Member' WHEN company_type = 3 THEN 'PLC' ELSE 'Unknown' END AS company_type FROM documents_document as dd LEFT JOIN client_userclient AS cuc ON dd.client_id = cuc.id LEFT JOIN autho_user AS au ON cuc.user_id = au.id WHERE date_joined between {query_date_range} and  doc_type IN (11, 14, 17, 29) AND client_id NOT IN ( SELECT DISTINCT client_id FROM documents_document WHERE doc_type = 7 ) order by date_joined desc;"""
        try:
            value1 =await queryFunction(query1);
        except Exception as e:
            print("error inside query function",e)
        return {
                "data":value1,
            };
    else:
        print("No tunnel");
        return [];

#bar chart for total unique contractors paid per month
@app.get("/api/getTotalUniqueContratorPaidPerMonth")
async def get_total_unique_contrator_paid_per_month(start:date,end:date):
    if tunnel:
        value=[]
        query_date_range = f"'{start}' AND '{end}'"
        query=f"""SELECT DATE_FORMAT(invoice_date, '%Y-%m') AS month, COUNT(distinct client_id) AS unique_contractor_paid FROM    reconciliation_reconciliation rr  left join client_userclient as cuc on rr.client_id = cuc.id WHERE invoice_date  between {query_date_range} AND cuc.company_type NOT LIKE 3 AND rr.status LIKE 3  GROUP BY DATE_FORMAT(invoice_date, '%Y-%m') ORDER BY DATE_FORMAT(invoice_date, '%Y-%m') ASC;"""
        try:
            value =await queryFunction(query);
        except Exception as e:
            print("error inside query function",e)
        return {
                "data":value,
            };
    else:
        print("No tunnel");
        return [];

@app.get("/api/getTotalUniqueContratorPaidPerMonthTable")
async def get_total_unique_contrator_paid_per_month_table(start:date,end:date):
    if tunnel:
        value=[]
        query_date_range = f"'{start}' AND '{end}'"
        query=f"""SELECT distinct rr.client_id ,first_name, last_name,email,date_joined, CASE WHEN (company IS NULL OR company = '') THEN 'Not present' ELSE company END AS company ,CASE WHEN company_type = 1 THEN 'PAYE Member' WHEN company_type = 2 THEN 'Director Member' WHEN company_type = 3 THEN 'PLC' ELSE 'Unknown' END AS company_type , DATE_FORMAT(invoice_date, '%Y-%m') AS month  FROM    reconciliation_reconciliation rr left join client_userclient as cuc on rr.client_id = cuc.id Left join autho_user as au on cuc.user_id = au.id  WHERE cuc.company_type NOT LIKE 3 AND rr.status LIKE 3 and invoice_date between {query_date_range} ORDER BY DATE_FORMAT(invoice_date, '%Y-%m') desc;"""
        try:
            value =await queryFunction(query);
        except Exception as e:
            print("error inside query function",e)
        return {
                "data":value,
            };
    else:
        print("No tunnel");
        return [];

#Bar chart for total management fees each month
@app.get("/api/getTotalManagementFeesDeducted")
async def get_total_management_fees_deducted(start:date,end:date):
    if tunnel:
        value=[]
        query_date_range = f"'{start}' AND '{end}'"
        query=f"""SELECT DATE_FORMAT(invoice_date, '%Y-%m') AS month_year, DATE_FORMAT(invoice_date, '%M %Y') AS month_name, SUM(management_fee) AS management_fee FROM reconciliation_reconciliation rr left join client_userclient as cuc on rr.client_id = cuc.id WHERE rr.status LIKE 3 and invoice_date between {query_date_range} AND company_type NOT LIKE 3 GROUP BY DATE_FORMAT(invoice_date, '%Y-%m'), DATE_FORMAT(invoice_date, '%M %Y') ORDER BY DATE_FORMAT(invoice_date, '%Y-%m') ASC;"""
        try:
            value =await queryFunction(query);
        except Exception as e:
            print("error inside query function",e)
        return {
                "data":value,
            };
    else:
        print("No tunnel");
        return [];



    # if tunnel:
    #     value1=[]
    #     value2=[]
    #     query1=""
    #     query2=""
    #     try:
    #         value1 =await queryFunction(query1);
    #         value2 =await queryFunction(query2);
    #     except Exception as e:
    #         print("error inside query function",e)
    #     return {
    #             "data1":value1,
    #             "data2":value2
    #         };
    # else:
    #     print("No tunnel");
    #     return [];


#table two for document missing
@app.get("/api/getAllDocumentRecievedTableTwo")
async def get_all_document_recieved_table_two(start:date,end:date):
    if tunnel:
        value1=[]
        query_date_range = f"'{start}' AND '{end}'"
        query1=f""" WITH ExcludedClients AS (SELECT client_id FROM (SELECT GROUP_CONCAT(DISTINCT dd.doc_type) as docs, client_id FROM documents_document dd INNER JOIN client_userclient cu ON dd.client_id = cu.id LEFT JOIN autho_user au ON cu.user_id = au.id WHERE date_joined between {query_date_range} AND company_type NOT LIKE '3' GROUP BY client_id HAVING docs LIKE '%,12,%' OR (docs LIKE '%,5,%' AND docs LIKE '%,6,%') AND docs LIKE '%,7,%' AND docs LIKE '%,28,%' AND docs LIKE '%,25,%' ORDER BY client_id ASC) x) SELECT cc.id as client_id, first_name, last_name, date_joined, monthname(date_joined) as month, CASE WHEN (cc.company IS NULL OR cc.company = '') THEN 'Not present' ELSE cc.company END AS company, CASE WHEN cc.company_type = 1 THEN 'PAYE Member' WHEN cc.company_type = 2 THEN 'Director Member' WHEN cc.company_type = 3 THEN 'PLC' ELSE 'Unknown' END AS company_type,email FROM autho_user au LEFT JOIN client_userclient as cc ON au.id = cc.user_id WHERE cc.company_type NOT LIKE '3' AND date_joined between {query_date_range} AND cc.id NOT IN (SELECT client_id FROM ExcludedClients) ORDER BY MONTH(date_joined) DESC;"""
        try:
            value1 =await queryFunction(query1);
        except Exception as e:
            print("error inside query function",e)
        return {
                "table2":value1
            };
    else:
        print("No tunnel");
        return [];


#Circle for Total contractor with no management fees dedecuted
@app.get("/api/getTotalContractorWithNoManagementFeesDeducted")
async def get_total_contractor_with_no_management_fees_deducted(start:date,end:date):
    if tunnel:
        value=[]
        query_date_range = f"'{start}' AND '{end}'"
        query=f"""select count(cu.id) from autho_user au left join client_userclient cu on au.id = cu.user_id where date_joined between {query_date_range} and cu.id and company_type not like '3' and cu.id not in 
(SELECT client_id FROM reconciliation_reconciliation where status LIKE '3' and invoice_date between {query_date_range}  GROUP BY client_id HAVING SUM(management_fee) > 0) ;"""
        try:
            value =await queryFunction(query);
        except Exception as e:
            print("error inside query function",e)
        return {
                "data":value,
            };
    else:
        print("No tunnel");
        return [];
    
@app.get("/api/getTotalContractorWithNoManagementFeesDeductedTable")
async def get_total_contractor_with_no_management_fees_deducted_table(start:date,end:date):
    if tunnel:
        value=[]
        query_date_range = f"'{start}' AND '{end}'"
        query=f"""select cu.id , first_name , last_name , email ,  date_joined ,CASE WHEN (company IS NULL OR company = '') THEN 'Not present' ELSE company END AS company, CASE WHEN company_type = 1 THEN 'PAYE Member' WHEN company_type = 2 THEN 'Director Member' WHEN company_type = 3 THEN 'PLC' ELSE 'Unknown' END AS company_type from autho_user au left join client_userclient cu on au.id = cu.user_id where  date_joined between {query_date_range} and cu.id and company_type not like '3' and cu.id not in 
(SELECT client_id FROM reconciliation_reconciliation where status LIKE '3' and  invoice_date between {query_date_range}  GROUP BY client_id HAVING SUM(management_fee) > 0) ;
"""
        try:
            value =await queryFunction(query);
        except Exception as e:
            print("error inside query function",e)
        return {
                "data":value,
            };
    else:
        print("No tunnel");
        return [];




#Bar graph for Total Contractor not paid
@app.get("/api/getTotalContractorNotPaid")
async def get_total_contractor_not_paid(start:date,end:date):
    if tunnel:
        value=[]
        query_date_range = f"'{start}' AND '{end}'"
        query=f""" SELECT DATE_FORMAT(date_joined, '%Y-%m') AS month,count(DISTINCT cu.id)
    FROM autho_user au
    LEFT JOIN client_userclient cu ON au.id = cu.user_id
    LEFT JOIN reconciliation_reconciliation rr ON cu.id = rr.client_id
    WHERE date_joined between {query_date_range} AND invoice_date IS NULL and company_type not like '3' group by DATE_FORMAT(date_joined, '%Y-%m')"""
        try:
            value =await queryFunction(query);
        except Exception as e:
            print("error inside query function",e)
        return {
                "data":value
            };
    else:
        print("No tunnel");
        return [];

#Bar graph for Total Contractor not paid
@app.get("/api/getTotalContractorNotPaidTable")
async def get_total_contractor_not_paid_table(start:date,end:date):
    if tunnel:
        value=[]
        query_date_range = f"'{start}' AND '{end}'"
        query=f"""  SELECT DISTINCT cu.id,first_name,last_name,email,date_joined , CASE WHEN (company IS NULL OR company = '') THEN 'Not present' ELSE company END AS company ,CASE WHEN company_type = 1 THEN 'PAYE Member' WHEN company_type = 2 THEN 'Director Member' WHEN company_type = 3 THEN 'PLC' ELSE 'Unknown' END AS company_type 
    FROM autho_user au
    LEFT JOIN client_userclient cu ON au.id = cu.user_id
    LEFT JOIN reconciliation_reconciliation rr ON cu.id = rr.client_id
    WHERE date_joined between {query_date_range} AND invoice_date IS NULL and company_type not like '3'; """
        try:
            value =await queryFunction(query);
        except Exception as e:
            print("error inside query function",e)
        return {
                "data":value,
            };
    else:
        print("No tunnel");
        return [];

#Pie chart for contractors start date within 2 months
@app.get("/api/getContractorStartDateWithinTwoMon")
async def get_contractor_start_date_with_in_two_mon():
    if tunnel:
        # query_date_range = f"'{start}' AND '{end}'"
        value1=[]
        value2=[]
        query1=f"""SELECT COUNT(*) AS total_first_names
FROM (    SELECT DISTINCT cu.id,first_name,last_name,email,date_joined , CASE WHEN (company IS NULL OR company = '') THEN 'Not present' ELSE company END AS company ,CASE WHEN company_type = 1 THEN 'PAYE Member' WHEN company_type = 2 THEN 'Director Member' WHEN company_type = 3 THEN 'PLC' ELSE 'Unknown' END AS company_type 
    FROM autho_user au
    LEFT JOIN client_userclient cu ON au.id = cu.user_id
    LEFT JOIN reconciliation_reconciliation rr ON cu.id = rr.client_id
    WHERE date_joined <= DATE_SUB(CURDATE(), INTERVAL 2 MONTH) and year(date_joined) = year(CURDATE()) AND invoice_date IS NULL and company_type not like '3'
) AS subquery;"""
        query2= f"""SELECT COUNT(*) AS total_first_names
FROM (    SELECT DISTINCT cu.id,first_name,last_name,email,date_joined , CASE WHEN (company IS NULL OR company = '') THEN 'Not present' ELSE company END AS company ,CASE WHEN company_type = 1 THEN 'PAYE Member' WHEN company_type = 2 THEN 'Director Member' WHEN company_type = 3 THEN 'PLC' ELSE 'Unknown' END AS company_type 
    FROM autho_user au
    LEFT JOIN client_userclient cu ON au.id = cu.user_id
    LEFT JOIN reconciliation_reconciliation rr ON cu.id = rr.client_id
    WHERE date_joined > DATE_SUB(CURDATE(), INTERVAL 2 MONTH) AND invoice_date IS NULL and company_type not like '3'
) AS subquery;"""
        try:
            value1 =await queryFunction(query1);
            value2 =await queryFunction(query2);
        except Exception as e:
            print("error inside query function",e)
        return {
                "data1":value1,
                "data2":value2
            };
    else:
        print("No tunnel");
        return [];
    
# @app.get("/api/getContractorStartDateWithinTwoMonTableOne")
# async def get_contractor_start_date_with_in_two_mon_table_one():
#     if tunnel:
#         # query_date_range = f"'{start}' AND '{end}'"
#         value1=[]
#         query1=f"""select  first_name , last_name , email , date_joined , company , company_type from client_userclient cu left join autho_user au on  au.id = cu.user_id  limit 10;"""
#         try:
#             value1 =await queryFunction(query1);
#         except Exception as e:
#             print("error inside query function",e)
#         return {
#                 "data":value1
#             };
#     else:
#         print("No tunnel");
#         return [];
    
# @app.get("/api/getContractorStartDateWithinTwoMonTabletwo")
# async def get_contractor_start_date_with_in_two_mon_table_two():
#     if tunnel:
#         # query_date_range = f"'{start}' AND '{end}'"
#         value1=[]
#         query1=f"""select  first_name , last_name , email , date_joined , company , company_type from client_userclient cu left join autho_user au on  au.id = cu.user_id  limit 10;"""
#         try:
#             value1 =await queryFunction(query1);
#         except Exception as e:
#             print("error inside query function",e)
#         return {
#                 "data":value1,
#             };
#     else:
#         print("No tunnel");
#         return [];

# value for contractors with no invoice send and start date before 2 months.
@app.get("/api/getContractorWithNoInvoiceSendAndStartDateBeforeTwo")
async def get_contractor_with_no_invoice_send_and_start_date_before_two():
    if tunnel:
        # query_date_range = f"'{start}' AND '{end}'"
        value = []
        query1=f"""
SELECT COUNT(*) AS total_first_names
FROM (
    SELECT DISTINCT cu.id
    FROM autho_user au
    LEFT JOIN client_userclient cu ON au.id = cu.user_id
    LEFT JOIN reconciliation_reconciliation rr ON cu.id = rr.client_id
    WHERE date_joined > DATE_SUB(CURDATE(), INTERVAL 2 MONTH) AND invoice_date IS NULL and company_type not like '3'
) AS subquery;
"""
        try:
            value = await queryFunction(query1);
        except Exception as e:
            print("error inside query function",e)
        return {
                "date":value,
            };
    else:
        print("No tunnel");
        return [];

# table for contactors with no invoice send and start date before 2 months.
@app.get("/api/getContractorWithNoInvoiceSendAndStartDateBeforeTwoTable")
async def get_contractor_with_no_invoice_send_and_start_date_before_two_table():
    if tunnel:
        # query_date_range = f"'{start}' AND '{end}'"
        value=[]
        query=f"""select distinct cu.id , first_name , last_name,email,date_joined , CASE WHEN (company IS NULL OR company = '') THEN 'Not present' ELSE company END AS company ,CASE WHEN company_type = 1 THEN 'PAYE Member' WHEN company_type = 2 THEN 'Director Member' WHEN company_type = 3 THEN 'PLC' ELSE 'Unknown' END AS company_type  FROM autho_user au
 LEFT JOIN client_userclient cu ON au.id = cu.user_id
 LEFT JOIN reconciliation_reconciliation rr ON cu.id = rr.client_id
 WHERE date_joined > DATE_SUB(CURDATE(), INTERVAL 2 MONTH) AND invoice_date IS NULL and company_type not like '3' order by first_name;"""
        try:
            value =await queryFunction(query);
        except Exception as e:
            print("error inside query function",e)
        return {
                "data":value,
            };
    else:
        print("No tunnel");
        return [];
    
# Excel file ->
# async def upload_excel_find_count(file :UploadFile = File(...) , startDate: date = Form(...) , endDate : date = Form(...) ):
@app.post("/api/upload-excel/findCount")
async def upload_excel_find_count(file :UploadFile = File(...) ):
    try:
        file_content = file.file.read()
        file_io = io.BytesIO(file_content)
        df = pd.read_excel(file_io)
        df_dict = df.to_dict(orient="records")
        email_given = []
        countEmails = 0
        for data in df_dict :
            email_given.append(data['Email']);
            countEmails+=1;
        if tunnel:
            # query_date_range = f"'{startDate}' AND '{endDate}'"
            value=[]
            result = ", ".join(["'{}'".format(item) for item in email_given])
            query=f"""  select 
                            count(*)
                        FROM autho_user
                        LEFT JOIN client_userclient cu ON autho_user.id = cu.user_id
                        WHERE 
                            email IN ({result}) """
            try:
                value =await queryFunction(query);
            except Exception as e:
                print("error inside query function",e)
            return {
                        "present_emails":value,
                        "total_emails":countEmails
            }
        else:
            print("No tunnel");
            return [];
    except Exception as e:
        print("You got some error :error: ",e)
# @app.post("/api/upload-excel/")
# async def upload_excel(file :UploadFile = File(...) , startDate: date = Form(...) , endDate : date = Form(...) ):
#     try:
#         file_content = file.file.read()
#         # print("Start Date:", startDate)
#         # print("End Date:", endDate)
#         # print("file",file.filename)
#         file_io = io.BytesIO(file_content)
#         df = pd.read_excel(file_io)
#         # print(df)
#         # print(type(df))
#         df_dict = df.to_dict(orient="records")
#         # print(df_dict)
#         # print(type(df_dict))
#         email_given = []
#         for data in df_dict :
#             email_given.append(data['Email'])
#         if tunnel:
#             query_date_range = f"'{startDate}' AND '{endDate}'"
#             value=[]
#             result = ", ".join(["'{}'".format(item) for item in email_given])
#             query=f"""  select 
#                             email
#                         FROM autho_user
#                         LEFT JOIN client_userclient cu ON autho_user.id = cu.user_id
#                         WHERE 
#                             email IN ({result}) AND 
#                             cu.company_type IN (1, 2) AND
#                             cu.status in (10,8);"""
#             try:
#                 value =await queryFunction(query);
#             except Exception as e:
#                 print("error inside query function",e)
#             valueA = []
#             valueP = []
#             for data in value :
#                 for dataT in data:
#                     valueP.append(dataT.lower())
#             set_one = set(email_given);
#             set_two = set(valueP);
#             emailNot = set_one - set_two;
#             valueA = list(emailNot);
#             print(len(valueA))
#             print(len(valueP))
#             print(len(email_given))
#             return {
#                         "present_emails":valueP,
#                         "not_present_emails":valueA
#             }
#         else:
#             print("No tunnel");
#             return [];
#     except Exception as e:
#         print("You got some error :error: ",e)
        
# #With company type
# @app.get("/api/companyType")
# async def companyType():
#     if tunnel:
#         # query_date_range = f"'{start}' AND '{end}'"
#         value=[]
#         query=f""" """
#         try:
#             value =await queryFunction(query);
#         except Exception as e:
#             print("error inside query function",e)
#         return {
#                 "data":value,
#             };
#     else:
#         print("No tunnel");
#         return [];
    
# async def upload_excel_companyType_count(file :UploadFile = File(...) , startDate: date = Form(...) , endDate : date = Form(...) ):
@app.post("/api/upload-excel/companyTypeCount")
async def upload_excel_companyType_count(file :UploadFile = File(...) ):
    try:
        file_content = file.file.read()
        file_io = io.BytesIO(file_content)
        df = pd.read_excel(file_io)
        df_dict = df.to_dict(orient="records")
        email_given = []
        countEmails = 0
        for data in df_dict :
            email_given.append(data['Email']);
            countEmails+=1;
        if tunnel:
            # query_date_range = f"'{startDate}' AND '{endDate}'"
            value=[]
            result = ", ".join(["'{}'".format(item) for item in email_given])
            query=f"""  select 
                            company_type,count(*)
                        FROM autho_user
                        LEFT JOIN client_userclient cu ON autho_user.id = cu.user_id
                        WHERE 
                            email IN ({result}) 
                        group by company_type"""
            try:
                value =await queryFunction(query);
            except Exception as e:
                print("error inside query function",e)
            return {
                        "data":value
            }
        else:
            print("No tunnel");
            return [];
    except Exception as e:
        print("You got some error :error: ",e)
    
# async def upload_excel_status_of_company(file :UploadFile = File(...) , startDate: date = Form(...) , endDate : date = Form(...) ):
@app.post("/api/upload-excel/statusOfCompanyTotal")
async def upload_excel_status_of_company(file :UploadFile = File(...)):
    try:
        file_content = file.file.read()
        file_io = io.BytesIO(file_content)
        df = pd.read_excel(file_io)
        df_dict = df.to_dict(orient="records")
        email_given = []
        countEmails = 0
        for data in df_dict :
            email_given.append(data['Email']);
            countEmails+=1;
        if tunnel:
            # query_date_range = f"'{startDate}' AND '{endDate}'"
            value=[]
            result = ", ".join(["'{}'".format(item) for item in email_given])
            query=f"""  select 
                            status,count(*)
                        FROM autho_user
                        LEFT JOIN client_userclient cu ON autho_user.id = cu.user_id
                        WHERE 
                            email IN ({result}) AND company_type IN (1,2) 
                        group by status"""
            try:
                value =await queryFunction(query);
            except Exception as e:
                print("error inside query function",e)
            return {
                        "data":value
            }
        else:
            print("No tunnel");
            return [];
    except Exception as e:
        print("You got some error :error: ",e)

@app.post("/api/upload-excel/rlaStatus")
async def upload_excel_rla_status(file :UploadFile = File(...) , startDate: date = Form(...) , endDate : date = Form(...) ):
    try:
        file_content = file.file.read()
        file_io = io.BytesIO(file_content)
        df = pd.read_excel(file_io)
        df_dict = df.to_dict(orient="records")
        email_given = []
        countEmails = 0
        for data in df_dict :
            email_given.append(data['Email']);
            countEmails+=1;
        if tunnel:
            query_date_range = f"'{startDate}' AND '{endDate}'"
            print(query_date_range)
            value=[]
            result = ", ".join(["'{}'".format(item) for item in email_given])
            query=f"""select rr.status,count(DISTINCT email)
                      FROM autho_user
                      LEFT JOIN client_userclient cu ON autho_user.id = cu.user_id
                      LEFT JOIN reconciliation_reconciliation rr  on cu.id  = rr.client_id 
                      WHERE 
                            email IN ({result}) 
                            AND company_type in (1,2) 
                            AND invoice_date between {query_date_range}
                        group by rr.status;"""
            try:
                value =await queryFunction(query);
                print(value)
            except Exception as e:
                print("error inside query function",e)
            return {
                        "data":value
            }
        else:
            print("No tunnel");
            return [];
    except Exception as e:
        print("You got some error :error: ",e)


@app.post("/api/upload-excel/gridTotalEmails")
async def upload_excel_grid_total_emails(file :UploadFile = File(...)):
    try:
        file_content = file.file.read()
        file_io = io.BytesIO(file_content)
        df = pd.read_excel(file_io)
        df_dict = df.to_dict(orient="records")
        email_given = []
        countEmails = 0
        for data in df_dict :
            email_given.append(data['Email']);
            countEmails+=1;
        if tunnel:
            value=[]
            result = ", ".join(["'{}'".format(item) for item in email_given])
            query=f"""select 
                            autho_user.id,
                            first_name,
                            last_name,
                            email,
                            date_joined, 
                            CASE WHEN (company IS NULL OR company = '') THEN 'Not present' ELSE company END AS company ,
                            CASE WHEN company_type = 1 THEN 'PAYE Member' WHEN company_type = 2 THEN 'Director Member' WHEN company_type = 3 THEN 'PLC' ELSE 'Unknown' END AS company_type
                      FROM autho_user
                      LEFT JOIN client_userclient cu ON autho_user.id = cu.user_id
                      WHERE 
                            email IN ({result})
                      order by first_name"""
            try:
                value =await queryFunction(query);
            except Exception as e:
                print("error inside query function",e)
            return {
                        "data":value
            }
        else:
            print("No tunnel");
            return [];
    except Exception as e:
        print("You got some error :error: ",e)
@app.post("/api/upload-excel/gridAbseneEmails")
async def upload_excel_grid_absent_emails(file :UploadFile = File(...)):
    try:
        file_content = file.file.read()
        # print("Start Date:", startDate)
        # print("End Date:", endDate)
        # print("file",file.filename)
        file_io = io.BytesIO(file_content)
        df = pd.read_excel(file_io)
        # print(df)
        # print(type(df))
        df_dict = df.to_dict(orient="records")
        # print(df_dict)
        # print(type(df_dict))
        email_given = []
        for data in df_dict :
            email_given.append(data['Email'])
        if tunnel:
            value=[]
            result = ", ".join(["'{}'".format(item) for item in email_given])
            query=f"""  select 
                            email
                        FROM autho_user
                        LEFT JOIN client_userclient cu ON autho_user.id = cu.user_id
                        WHERE 
                            email IN ({result});"""
            try:
                value =await queryFunction(query);
            except Exception as e:
                print("error inside query function",e)
            valueA = []
            valueP = []
            for data in value :
                for dataT in data:
                    valueP.append(dataT.lower())
            set_one = set(email_given);
            set_two = set(valueP);
            emailNot = set_one - set_two;
            valueA = list(emailNot);
            print(len(valueA))
            print(len(valueP))
            print(len(email_given))
            valueA.sort()
            return {
                        "not_present_emails":valueA
            }
        else:
            print("No tunnel");
            return [];
    except Exception as e:
        print("You got some error :error: ",e)
@app.post("/api/upload-excel/gridPaye")
async def upload_excel_grid_paye(file :UploadFile = File(...)):
    try:
        file_content = file.file.read()
        file_io = io.BytesIO(file_content)
        df = pd.read_excel(file_io)
        df_dict = df.to_dict(orient="records")
        email_given = []
        countEmails = 0
        for data in df_dict :
            email_given.append(data['Email']);
            countEmails+=1;
        if tunnel:
            value=[]
            result = ", ".join(["'{}'".format(item) for item in email_given])
            query=f"""select 
                            autho_user.id,
                            first_name,
                            last_name,
                            email,
                            date_joined, 
                            CASE WHEN (company IS NULL OR company = '') THEN 'Not present' ELSE company END AS company ,
                            CASE WHEN company_type = 1 THEN 'PAYE Member' WHEN company_type = 2 THEN 'Director Member' WHEN company_type = 3 THEN 'PLC' ELSE 'Unknown' END AS company_type
                        FROM autho_user
                        LEFT JOIN client_userclient cu ON autho_user.id = cu.user_id
                        WHERE 
                            email IN ({result}) And company_type =  1
                        order by first_name"""
            try:
                value =await queryFunction(query);
            except Exception as e:
                print("error inside query function",e)
            return {
                        "data":value
            }
        else:
            print("No tunnel");
            return [];
    except Exception as e:
        print("You got some error :error: ",e)
@app.post("/api/upload-excel/gridDirector")
async def upload_excel_grid_director(file :UploadFile = File(...)):
    try:
        file_content = file.file.read()
        file_io = io.BytesIO(file_content)
        df = pd.read_excel(file_io)
        df_dict = df.to_dict(orient="records")
        email_given = []
        countEmails = 0
        for data in df_dict :
            email_given.append(data['Email']);
            countEmails+=1;
        if tunnel:
            value=[]
            result = ", ".join(["'{}'".format(item) for item in email_given])
            query=f"""select 
                            autho_user.id,
                            first_name,
                            last_name,
                            email,
                            date_joined, 
                            CASE WHEN (company IS NULL OR company = '') THEN 'Not present' ELSE company END AS company ,
                            CASE WHEN company_type = 1 THEN 'PAYE Member' WHEN company_type = 2 THEN 'Director Member' WHEN company_type = 3 THEN 'PLC' ELSE 'Unknown' END AS company_type
                        FROM autho_user
                        LEFT JOIN client_userclient cu ON autho_user.id = cu.user_id
                        WHERE 
                            email IN ({result}) And company_type =  2
                        order by first_name"""
            try:
                value =await queryFunction(query);
            except Exception as e:
                print("error inside query function",e)
            return {
                        "data":value
            }
        else:
            print("No tunnel");
            return [];
    except Exception as e:
        print("You got some error :error: ",e)
@app.post("/api/upload-excel/gridPlc")
async def upload_excel_grid_plc(file :UploadFile = File(...)):
    try:
        file_content = file.file.read()
        file_io = io.BytesIO(file_content)
        df = pd.read_excel(file_io)
        df_dict = df.to_dict(orient="records")
        email_given = []
        countEmails = 0
        for data in df_dict :
            email_given.append(data['Email']);
            countEmails+=1;
        if tunnel:
            value=[]
            result = ", ".join(["'{}'".format(item) for item in email_given])
            query=f"""select 
                            autho_user.id,
                            first_name,
                            last_name,
                            email,
                            date_joined, 
                            CASE WHEN (company IS NULL OR company = '') THEN 'Not present' ELSE company END AS company ,
                            CASE WHEN company_type = 1 THEN 'PAYE Member' WHEN company_type = 2 THEN 'Director Member' WHEN company_type = 3 THEN 'PLC' ELSE 'Unknown' END AS company_type
                        FROM autho_user
                        LEFT JOIN client_userclient cu ON autho_user.id = cu.user_id
                        WHERE 
                            email IN ({result}) And company_type =  3
                        order by first_name"""
            try:
                value =await queryFunction(query);
            except Exception as e:
                print("error inside query function",e)
            return {
                        "data":value
            }
        else:
            print("No tunnel");
            return [];
    except Exception as e:
        print("You got some error :error: ",e)
@app.post("/api/upload-excel/gridActive")
async def upload_excel_grid_active(file :UploadFile = File(...)):
    try:
        file_content = file.file.read()
        file_io = io.BytesIO(file_content)
        df = pd.read_excel(file_io)
        df_dict = df.to_dict(orient="records")
        email_given = []
        countEmails = 0
        for data in df_dict :
            email_given.append(data['Email']);
            countEmails+=1;
        if tunnel:
            value=[]
            result = ", ".join(["'{}'".format(item) for item in email_given])
            query=f"""select 
                            autho_user.id,
                            first_name,
                            last_name,
                            email,
                            date_joined, 
                            CASE WHEN (company IS NULL OR company = '') THEN 'Not present' ELSE company END AS company ,
                            CASE WHEN company_type = 1 THEN 'PAYE Member' WHEN company_type = 2 THEN 'Director Member' WHEN company_type = 3 THEN 'PLC' ELSE 'Unknown' END AS company_type
                        FROM autho_user
                        LEFT JOIN client_userclient cu ON autho_user.id = cu.user_id
                        WHERE 
                            email IN ({result}) AND company_type IN (1,2) AND cu.status = 10
                        order by first_name"""
            try:
                value =await queryFunction(query);
            except Exception as e:
                print("error inside query function",e)
            return {
                        "data":value
            }
        else:
            print("No tunnel");
            return [];
    except Exception as e:
        print("You got some error :error: ",e)
@app.post("/api/upload-excel/gridLimitedActive")
async def upload_excel_grid_limited_active(file :UploadFile = File(...)):
    try:
        file_content = file.file.read()
        file_io = io.BytesIO(file_content)
        df = pd.read_excel(file_io)
        df_dict = df.to_dict(orient="records")
        email_given = []
        countEmails = 0
        for data in df_dict :
            email_given.append(data['Email']);
            countEmails+=1;
        if tunnel:
            value=[]
            result = ", ".join(["'{}'".format(item) for item in email_given])
            query=f"""select 
                            autho_user.id,
                            first_name,
                            last_name,
                            email,
                            date_joined, 
                            CASE WHEN (company IS NULL OR company = '') THEN 'Not present' ELSE company END AS company ,
                            CASE WHEN company_type = 1 THEN 'PAYE Member' WHEN company_type = 2 THEN 'Director Member' WHEN company_type = 3 THEN 'PLC' ELSE 'Unknown' END AS company_type
                        FROM autho_user
                        LEFT JOIN client_userclient cu ON autho_user.id = cu.user_id
                        WHERE 
                            email IN ({result}) AND company_type IN (1,2) AND cu.status = 8
                        order by first_name"""
            try:
                value =await queryFunction(query);
            except Exception as e:
                print("error inside query function",e)
            return {
                        "data":value
            }
        else:
            print("No tunnel");
            return [];
    except Exception as e:
        print("You got some error :error: ",e)
@app.post("/api/upload-excel/gridLimitedInactive")
async def upload_excel_grid_limited_inactive(file :UploadFile = File(...)):
    try:
        file_content = file.file.read()
        file_io = io.BytesIO(file_content)
        df = pd.read_excel(file_io)
        df_dict = df.to_dict(orient="records")
        email_given = []
        countEmails = 0
        for data in df_dict :
            email_given.append(data['Email']);
            countEmails+=1;
        if tunnel:
            value=[]
            result = ", ".join(["'{}'".format(item) for item in email_given])
            query=f"""select 
                            autho_user.id,
                            first_name,
                            last_name,
                            email,
                            date_joined, 
                            CASE WHEN (company IS NULL OR company = '') THEN 'Not present' ELSE company END AS company ,
                            CASE WHEN company_type = 1 THEN 'PAYE Member' WHEN company_type = 2 THEN 'Director Member' WHEN company_type = 3 THEN 'PLC' ELSE 'Unknown' END AS company_type
                        FROM autho_user
                        LEFT JOIN client_userclient cu ON autho_user.id = cu.user_id
                        WHERE 
                            email IN ({result}) AND company_type IN (1,2) AND cu.status = 6
                        order by first_name"""
            try:
                value =await queryFunction(query);
            except Exception as e:
                print("error inside query function",e)
            return {
                        "data":value
            }
        else:
            print("No tunnel");
            return [];
    except Exception as e:
        print("You got some error :error: ",e)
@app.post("/api/upload-excel/gridInactive")
async def upload_excel_grid_inactive(file :UploadFile = File(...)):
    try:
        file_content = file.file.read()
        file_io = io.BytesIO(file_content)
        df = pd.read_excel(file_io)
        df_dict = df.to_dict(orient="records")
        email_given = []
        countEmails = 0
        for data in df_dict :
            email_given.append(data['Email']);
            countEmails+=1;
        if tunnel:
            value=[]
            result = ", ".join(["'{}'".format(item) for item in email_given])
            query=f"""select 
                            autho_user.id,
                            first_name,
                            last_name,
                            email,
                            date_joined, 
                            CASE WHEN (company IS NULL OR company = '') THEN 'Not present' ELSE company END AS company ,
                            CASE WHEN company_type = 1 THEN 'PAYE Member' WHEN company_type = 2 THEN 'Director Member' WHEN company_type = 3 THEN 'PLC' ELSE 'Unknown' END AS company_type
                        FROM autho_user
                        LEFT JOIN client_userclient cu ON autho_user.id = cu.user_id
                        WHERE 
                            email IN ({result}) AND company_type IN (1,2) AND cu.status = 0
                        order by first_name"""
            try:
                value =await queryFunction(query);
            except Exception as e:
                print("error inside query function",e)
            return {
                        "data":value
            }
        else:
            print("No tunnel");
            return [];
    except Exception as e:
        print("You got some error :error: ",e)
@app.post("/api/upload-excel/gridPending")
async def upload_excel_grid_pending(file :UploadFile = File(...)):
    try:
        file_content = file.file.read()
        file_io = io.BytesIO(file_content)
        df = pd.read_excel(file_io)
        df_dict = df.to_dict(orient="records")
        email_given = []
        countEmails = 0
        for data in df_dict :
            email_given.append(data['Email']);
            countEmails+=1;
        if tunnel:
            value=[]
            result = ", ".join(["'{}'".format(item) for item in email_given])
            query=f"""select 
                            autho_user.id,
                            first_name,
                            last_name,
                            email,
                            date_joined, 
                            CASE WHEN (company IS NULL OR company = '') THEN 'Not present' ELSE company END AS company ,
                            CASE WHEN company_type = 1 THEN 'PAYE Member' WHEN company_type = 2 THEN 'Director Member' WHEN company_type = 3 THEN 'PLC' ELSE 'Unknown' END AS company_type
                        FROM autho_user
                        LEFT JOIN client_userclient cu ON autho_user.id = cu.user_id
                        WHERE 
                            email IN ({result}) AND company_type IN (1,2) AND cu.status = 9
                        order by first_name"""
            try:
                value =await queryFunction(query);
            except Exception as e:
                print("error inside query function",e)
            return {
                        "data":value
            }
        else:
            print("No tunnel");
            return [];
    except Exception as e:
        print("You got some error :error: ",e)
@app.post("/api/upload-excel/gridFour")
async def upload_excel_grid_four(file :UploadFile = File(...), startDate: date = Form(...) , endDate : date = Form(...)):
    try:
        file_content = file.file.read()
        file_io = io.BytesIO(file_content)
        df = pd.read_excel(file_io)
        df_dict = df.to_dict(orient="records")
        email_given = []
        countEmails = 0
        for data in df_dict :
            email_given.append(data['Email']);
            countEmails+=1;
        if tunnel:
            query_date_range = f"'{startDate}' AND '{endDate}'" 
            print(query_date_range)
            value=[]
            result = ", ".join(["'{}'".format(item) for item in email_given])
            query=f"""select 
                            autho_user.id,
                            first_name,
                            last_name,
                            email,
                            date_joined, 
                            CASE WHEN (company IS NULL OR company = '') THEN 'Not present' ELSE company END AS company ,
                            CASE WHEN company_type = 1 THEN 'PAYE Member' WHEN company_type = 2 THEN 'Director Member' WHEN company_type = 3 THEN 'PLC' ELSE 'Unknown' END AS company_type
                      FROM autho_user
                      LEFT JOIN client_userclient cu ON autho_user.id = cu.user_id
                      LEFT JOIN reconciliation_reconciliation rr  on cu.id  = rr.client_id 
                      WHERE 
                            email IN ({result}) 
                            AND company_type in (1,2) 
                            AND invoice_date between {query_date_range}
                            AND rr.status = 4
                       order by first_name"""
            try:
                value =await queryFunction(query);
            except Exception as e:
                print("error inside query function",e)
            return {
                        "data":value
            }
        else:
            print("No tunnel");
            return [];
    except Exception as e:
        print("You got some error :error: ",e)
@app.post("/api/upload-excel/gridThree")
async def upload_excel_grid_three(file :UploadFile = File(...), startDate: date = Form(...) , endDate : date = Form(...)):
    try:
        file_content = file.file.read()
        file_io = io.BytesIO(file_content)
        df = pd.read_excel(file_io)
        df_dict = df.to_dict(orient="records")
        email_given = []
        countEmails = 0
        for data in df_dict :
            email_given.append(data['Email']);
            countEmails+=1;
        if tunnel:
            query_date_range = f"'{startDate}' AND '{endDate}'"
            value=[]
            result = ", ".join(["'{}'".format(item) for item in email_given])
            query=f"""select 
                            autho_user.id,
                            first_name,
                            last_name,
                            email,
                            date_joined, 
                            CASE WHEN (company IS NULL OR company = '') THEN 'Not present' ELSE company END AS company ,
                            CASE WHEN company_type = 1 THEN 'PAYE Member' WHEN company_type = 2 THEN 'Director Member' WHEN company_type = 3 THEN 'PLC' ELSE 'Unknown' END AS company_type
                      FROM autho_user
                      LEFT JOIN client_userclient cu ON autho_user.id = cu.user_id
                      LEFT JOIN reconciliation_reconciliation rr  on cu.id  = rr.client_id 
                      WHERE 
                            email IN ({result}) 
                            AND company_type in (1,2) 
                            AND invoice_date between {query_date_range}
                            AND rr.status = 3
                       group by 
                            autho_user.id,
                            first_name,
                            last_name,
                            email,
                            date_joined, 
                            company ,
                            company_type
                        order by first_name
                       """
            try:
                value =await queryFunction(query);
            except Exception as e:
                print("error inside query function",e)
            return {
                        "data":value
            }
        else:
            print("No tunnel");
            return [];
    except Exception as e:
        print("You got some error :error: ",e)
@app.post("/api/upload-excel/gridOne")
async def upload_excel_grid_one(file :UploadFile = File(...), startDate: date = Form(...) , endDate : date = Form(...)):
    try:
        file_content = file.file.read()
        file_io = io.BytesIO(file_content)
        df = pd.read_excel(file_io)
        df_dict = df.to_dict(orient="records")
        email_given = []
        countEmails = 0
        for data in df_dict :
            email_given.append(data['Email']);
            countEmails+=1;
        if tunnel:
            query_date_range = f"'{startDate}' AND '{endDate}'"
            value=[]
            result = ", ".join(["'{}'".format(item) for item in email_given])
            query=f"""select 
                            autho_user.id,
                            first_name,
                            last_name,
                            email,
                            date_joined, 
                            CASE WHEN (company IS NULL OR company = '') THEN 'Not present' ELSE company END AS company ,
                            CASE WHEN company_type = 1 THEN 'PAYE Member' WHEN company_type = 2 THEN 'Director Member' WHEN company_type = 3 THEN 'PLC' ELSE 'Unknown' END AS company_type
                      FROM autho_user
                      LEFT JOIN client_userclient cu ON autho_user.id = cu.user_id
                      LEFT JOIN reconciliation_reconciliation rr  on cu.id  = rr.client_id 
                      WHERE 
                            email IN ({result}) 
                            AND company_type in (1,2) 
                            AND invoice_date between {query_date_range}
                            AND rr.status = 1
                       order by first_name"""
            try:
                value =await queryFunction(query);
            except Exception as e:
                print("error inside query function",e)
            return {
                        "data":value
            }
        else:
            print("No tunnel");
            return [];
    except Exception as e:
        print("You got some error :error: ",e)


@app.post("/api/upload-excel/findDataTosave")
async def find_data_to_save(file :UploadFile = File(...), startDate: date = Form(...) , endDate : date = Form(...)):
    try:
        file_content = file.file.read()
        file_io = io.BytesIO(file_content)
        df = pd.read_excel(file_io)
        df_dict = df.to_dict(orient="records")
        email_given = []
        countEmails = 0
        for data in df_dict :
            email_given.append(data['Email'])
            countEmails+=1
        # print(email_given)
        if tunnel:
            query_date_range = f"'{startDate}' AND '{endDate}'"
            value=[]
            result = ", ".join(["'{}'".format(item) for item in email_given])
            # print(result)
            query=f"""select 
                            email,
                            first_name,
                            last_name,
                            date_joined, 
                            cu.status,
                            company_type,
                            company ,
                            rr.status
                      FROM autho_user
                      LEFT JOIN client_userclient cu ON autho_user.id = cu.user_id
                      LEFT JOIN reconciliation_reconciliation rr  on cu.id  = rr.client_id 
                      WHERE 
                            email IN ({result}) and rr.invoice_date between {query_date_range}
                      group by email
                       order by first_name"""
            try:
                value =await queryFunction(query)
                # print(value)
                # print()
                # print()
                # print(type(value))
                # print()
                # print()
                # print(email_given)
                # print()
                # print()
                # print(type(email_given))
                email_to_remove =[]
                for tup in value :
                    email_to_remove.append(tup[0].lower())
                # print(email_to_remove)
                # print(type(email_to_remove))
                emails_not_present = [x for x in email_given if x not in email_to_remove]
                # print(emails_not_present)
                # print(type(emails_not_present))
                email_for_query =  ", ".join(["'{}'".format(item) for item in emails_not_present])
                # print(type(result))
                # print(type(email_for_query))
                # print(email_for_query)
                query2 = f""" select         
                            distinct email,
                            first_name,
                            last_name,
                            date_joined, 
                            cu.status,
                            company_type,
                            company ,
						    CASE
						        WHEN rr.status IS NOT NULL THEN NULL
						        ELSE NULL
						    END AS rr_status
                      FROM autho_user
                      LEFT JOIN client_userclient cu ON autho_user.id = cu.user_id
                      LEFT JOIN reconciliation_reconciliation rr  on cu.id  = rr.client_id 
                      WHERE 
                            email IN ({email_for_query}) 
                      group by email,rr.status
                       order by first_name"""
                value2 = await queryFunction(query2)
                # print(value2)
            except Exception as e:
                print("error inside query function",e)
            return {
                        "data1":value,
                        "data2":value2
            }
        else:
            print("No tunnel")
            return []
    except Exception as e:
        print("You got some error :error: ",e)



@app.get("/api/checkingWorking")
async def get_total_new_joiners_per_mont():
    if tunnel_report:
        value=[]
        query=f"""select * from month_exist"""
        try:
            value =await queryFunction_report(query)
            print(value,"Hello this")
        except Exception as e:
            print("error inside query function",e)
        return {
                "data":value,
            }
    else:
        print("No tunnel_report")
        return []
    
@app.post("/api/checkIfItIsPresentMonth")
async def get_total_new_joiners_per_mont( file: UploadFile = File(...) ,monthStartDate : date = Form(...) ,monthAndYear: str = Form(...)):
    if tunnel_report:
        value=[]
        message = "Excel Already Exist"
        date = monthStartDate.strftime("%Y-%m-%d")
        errorMessage = "No error"
        query=f"""SELECT count(*) FROM excel_month_exist WHERE date = "{date}" """
        try:
            value = await queryFunction_report(query)
            print(value)
            print(value[0][0]==0)
            if value[0][0] == 0 :
                valueNew = []
                message = "Excel does not exist in db , entering the month in database"
                queryNew =f"""INSERT INTO excel_month_exist (date,file_path) value("{date}","/home/ubuntu/var/54.228.253.219/DashboardBack/uploads/{monthAndYear}");"""
                # print(f"""INSERT INTO month_exist value("{date}")""")
                # Save the file to a server location
                try:
                    valueNew = await queryFunction_report(queryNew)

                    upload_dir = "/home/ubuntu/var/54.228.253.219/DashboardBack/uploads"
                    dest = os.path.join(upload_dir,f"{monthAndYear}.xlsx")
                    print(dest)
                    with open(dest,"wb") as buffer:
                        shutil.copyfileobj(file.file,buffer)

                except Exception as e:
                    print("error in entering the month of excel or uploading file in server - ",e)
                    errorMessage =  e
                # print(valueNew)
        except Exception as e:
            print("error inside query function",e)
            errorMessage = e
        return { 
                "data":value,
                "Message":message,
                "ErrorMessage":errorMessage
            }
    else:
        print("No tunnel_report")
        return []

@app.post("/api/checkIfItIsPresentMonthByDate")
async def get_total_new_joiners_per_mont_by_date( month : str = Form(...) , year : str = Form(...)):
    if tunnel_report:
        value=[]
        message = "Excel Already Exist"
        monthStartDate = year+"-"+month+"-01"
        print(monthStartDate)
        errorMessage = "No error"
        query=f"""SELECT count(*) FROM excel_month_exist WHERE date = "{monthStartDate}" """
        try: 
            print(date)
            value = await queryFunction_report(query)
            print(value)
            print(value[0][0]==0)
            if value[0][0] == 0 :
                message = "Excel Not present"
        except Exception as e:
            print("error inside query function",e)
            errorMessage = e
        return { 
                "data":value,
                "Message":message,
                "ErrorMessage":errorMessage
            }
    else:
        print("No tunnel_report")
        return []
    
@app.post("/api/addDataToExcelDataTable")
async def add_data_to_excel_data_table(file: UploadFile = File(...),startDate: date = Form(...),endDate: date = Form(...)):
    if tunnel_report:
        data = ""
        api_url = "http://54.228.253.219/api/upload-excel/findDataTosave"
        startD = startDate.strftime("%Y-%m-%d")
        endD = endDate.strftime("%Y-%m-%d")
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    api_url,
                    data={"startDate": startD, "endDate": endD },
                    files={"file": (file.filename, file.file)}
                )
                response.raise_for_status()
                data = response.json()
        except httpx.RequestError as e:
            return {"error": f"Failed to find the data in the db: {str(e)}"}
        
        message = "No error"
        # We got the data here = data
        # print(data)
        table_name = "excel_data_input"
        insert_statements = []
        insert_statements2 = []
        try:
            for row in data["data1"]:
                try:
                    email, first_name, last_name, registration_date, field1, field2, field3, field4 = row
                    date_joined = registration_date.split('T')[0]
                    sql = f"INSERT INTO {table_name} (email, first_name, last_name, date_joined, company_status, company_type , company_name, reconciliation_status, date_month_excel_date,month_of_updated_data) VALUES ("
                    sql += f"""'{email}', "{first_name}", "{last_name}", '{date_joined}', {field1}, {field2}, """
                    if field3 is None:
                        sql += "NULL, "
                    else:
                        sql += f"'{field3}', "
                    sql += f"'{field4}','{startDate}','{startDate}');"
                    await queryFunction_report(sql)
                except Exception as e:
                    print("Error while inserting not null email")
                    message = e
            for row in data["data2"]:
                try:
                    email, first_name, last_name, registration_date, field1, field2, field3, field4 = row
                    date_joined = registration_date.split('T')[0]
                    sql1 = f"INSERT INTO {table_name} (email, first_name, last_name, date_joined, company_status, company_type , company_name, reconciliation_status, date_month_excel_date,month_of_updated_data) VALUES ("
                    sql1 += f"""'{email}', "{first_name}", "{last_name}", '{date_joined}', {field1}, {field2}, """
                    if field3 is None:
                        sql1 += "NULL, "
                    else:
                        sql1 += f"'{field3}', "
                    if field4 is None:
                        sql1 += "Null, "
                    else:
                        sql1 += f"'{field4}',"
                    sql1 += f"'{startDate}','{startDate}');"
                    await queryFunction_report(sql1)
                except Exception as e:
                    print("Error while inserting null email values ")
                    message = e 
        except Exception as e:
            print("error while addding null valued emails")
            errorMessage = e
        dataAbsentEmails = ""
        table_name_absent_emails = "excel_absent_emails"
        api_url_absent_emails = "http://54.228.253.219/api/upload-excel/gridAbseneEmails"
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    api_url_absent_emails,
                    files={"file": (file.filename, file.file)}
                )
                response.raise_for_status()
                dataAbsentEmails = response.json()
                # dataAbsentEmails = {'not_present_emails':['zantro20@gmail.com','paliwalunique@gmail.com']}
                if dataAbsentEmails and  len(dataAbsentEmails["not_present_emails"]) != 0:
                    print(dataAbsentEmails)
                    for row in dataAbsentEmails["not_present_emails"]:
                      try:
                        email = row
                        sql = f"INSERT INTO {table_name_absent_emails} (email, date_month_excel_date) VALUES ("
                        sql += f"""'{email}', '{startDate}' );"""
                        await queryFunction_report(sql)
                      except Exception as e:
                        print("Error while in absent table")
                        message = e
        except httpx.RequestError as e:
            return {"error": f"Failed to find the data in the db: {str(e)}"}
        return { 
                "Message":message
            }
    else:
        print("No tunnel_report")
        return []

@app.post("/api/salesForceGraphCompanyTypes")
async def sales_force_graph_company_types( month : str = Form(...) , year : str = Form(...)):
    if tunnel_report:
        value=[]
        message = "No Error"
        monthStartDate = year+"-"+month+"-01"
        print(monthStartDate)
        query=f"""SELECT  CASE WHEN company_type = 1 THEN 'PAYE Member' WHEN company_type = 2 THEN 'Director Member' WHEN company_type = 3 THEN 'PLC' ELSE 'Unknown' END AS company_type , count(company_type) as count  FROM  excel_data_input edi WHERE  month_of_updated_data  = '{monthStartDate}' GROUP BY company_type ;"""
        try: 
            value = await queryFunction_report(query)
            print(value)
        except Exception as e:
            print("error inside query function",e)
            message = e
        return { 
                "data":value,
                "Message":message,
            }
    else:
        print("No tunnel_report")
        return []
    
@app.post("/api/salesForceGraphEmailsPresentAbsent")
async def sales_force_graph_emails_present_absent( month : str = Form(...) , year : str = Form(...)):
    if tunnel_report:
        value=[]
        message1 = "No Error while fetching present emails"
        message2 = "No error while fetching absent emails"
        monthStartDate = year+"-"+month+"-01"
        print(monthStartDate)
        # for present emails
        query=f"""SELECT count(*) FROM  excel_data_input edi WHERE  month_of_updated_data = '{monthStartDate}';"""
        try: 
            value = await queryFunction_report(query)
            print(value)
        except Exception as e:
            print("error inside query function",e)
            message1 = e
        # for absent emails
        queryAbsent=f"""SELECT  count(*) FROM excel_absent_emails eae  WHERE  date_month_excel_date  = '{monthStartDate}';"""
        try: 
            valueAbsent = await queryFunction_report(queryAbsent)
            print(valueAbsent)
        except Exception as e:
            print("error inside query function",e)
            message2 = e
        return { 
                "data":{"presentEmails":value,"absentEmails":valueAbsent},
                "Message":{"first":message1 , "second":message2},
            }
    else:
        print("No tunnel_report")
        return []

@app.post("/api/salesForceGraphActivePassiveContractors")
async def sales_force_graph_active_passive_contractors( month : str = Form(...) , year : str = Form(...)  ,dateStart : date = Form(...) , dateEnd : date = Form(...)):
    if tunnel_report:
        value=[]
        message = "No Error"
        monthStartDate = year+"-"+month+"-01"
        query_date_range = f"'{dateStart}' AND '{dateEnd}'"
        print(monthStartDate)
        query=f"""SELECT company_status , month_of_updated_data ,count(*) FROM  excel_data_input edi WHERE  date_month_excel_date  = '{monthStartDate}' AND company_type NOT LIKE '3' AND month_of_updated_data between {query_date_range} GROUP BY company_status ,month_of_updated_data order by month_of_updated_data , company_status;"""
        try: 
            value = await queryFunction_report(query)
            print(value)
        except Exception as e:
            print("error inside query function",e)
            message = e
        return { 
                "data":value,
                "Message":message,
            }
    else:
        print("No tunnel_report")
        return []
    
@app.post("/api/salesForceGraphRlaStatus")
async def sales_force_graph_rla_status( month : str = Form(...) , year : str = Form(...)  ,dateStart : date = Form(...) , dateEnd : date = Form(...)):
    if tunnel_report:
        value=[]
        message = "No Error"
        monthStartDate = year+"-"+month+"-01"
        query_date_range = f"'{dateStart}' AND '{dateEnd}'"
        print(monthStartDate)
        query=f"""SELECT reconciliation_status ,month_of_updated_data , count(*) from excel_data_input edi  WHERE date_month_excel_date = '{monthStartDate}' AND reconciliation_status IS NOT NULL AND month_of_updated_data between {query_date_range} Group by reconciliation_status ,month_of_updated_data order by month_of_updated_data,reconciliation_status"""
        try: 
            value = await queryFunction_report(query)
            print(value)
        except Exception as e:
            print("error inside query function",e)
            message = e
        return { 
                "data":value,
                "Message":message,
            }
    else:
        print("No tunnel_report")
        return []
    
@app.post("/api/salesForceTableCompanyTypes")
async def sales_force_table_company_types( month : str = Form(...) , year : str = Form(...)):
    if tunnel_report:
        value1=[]
        value2=[]
        value3=[]
        message = "No Error"
        monthStartDate = year+"-"+month+"-01"
        print(monthStartDate)
        query1=f"""SELECT  first_name ,last_name ,email,date_joined ,CASE WHEN (company_name IS NULL OR company_name = '') THEN 'Not present' ELSE company_name END AS company_name, CASE WHEN company_type = 1 THEN 'PAYE Member' WHEN company_type = 2 THEN 'Director Member' WHEN company_type = 3 THEN 'PLC' ELSE 'Unknown' END AS company_type  FROM  excel_data_input edi WHERE  month_of_updated_data  = '{monthStartDate}'  and company_type = 1 ;"""
        query2=f"""SELECT  first_name ,last_name ,email,date_joined ,CASE WHEN (company_name IS NULL OR company_name = '') THEN 'Not present' ELSE company_name END AS company_name, CASE WHEN company_type = 1 THEN 'PAYE Member' WHEN company_type = 2 THEN 'Director Member' WHEN company_type = 3 THEN 'PLC' ELSE 'Unknown' END AS company_type  FROM  excel_data_input edi WHERE  month_of_updated_data  = '{monthStartDate}' and company_type = 2  ;"""
        query3=f"""SELECT  first_name ,last_name ,email,date_joined ,CASE WHEN (company_name IS NULL OR company_name = '') THEN 'Not present' ELSE company_name END AS company_name, CASE WHEN company_type = 1 THEN 'PAYE Member' WHEN company_type = 2 THEN 'Director Member' WHEN company_type = 3 THEN 'PLC' ELSE 'Unknown' END AS company_type  FROM  excel_data_input edi WHERE  month_of_updated_data  = '{monthStartDate}'  and company_type = 3;"""
        try: 
            value1 = await queryFunction_report(query1)
            value2 = await queryFunction_report(query2)
            value3 = await queryFunction_report(query3)
        except Exception as e:
            print("error inside query function",e)
            message = e
        return { 
                "data1":value1,
                "data2":value2,
                "data3":value3,
                "Message":message,
            }
    else:
        print("No tunnel_report")
        return []
    
@app.post("/api/salesForceTableEmailsPresent")
async def sales_force_table_present_absent( month : str = Form(...) , year : str = Form(...)):
    if tunnel_report:
        value=[]
        message1 = "No Error while fetching present emails"
        monthStartDate = year+"-"+month+"-01"
        print(monthStartDate)
        # for present emails
        query=f"""SELECT  first_name ,last_name ,email,date_joined ,CASE WHEN (company_name IS NULL OR company_name = '') THEN 'Not present' ELSE company_name END AS company_name, CASE WHEN company_type = 1 THEN 'PAYE Member' WHEN company_type = 2 THEN 'Director Member' WHEN company_type = 3 THEN 'PLC' ELSE 'Unknown' END AS company_type  FROM  excel_data_input edi WHERE  month_of_updated_data  = '{monthStartDate}'  ;"""
        try: 
            value = await queryFunction_report(query)
            print(value)
        except Exception as e:
            print("error inside query function",e)
            message1 = e
        return { 
                "data":value,
                "Message":message1
            }
    else:
        print("No tunnel_report")
        return []

@app.post("/api/salesForceTableEmailsAbsent")
async def sales_force_table_emails_absent( month : str = Form(...) , year : str = Form(...)):
    if tunnel_report:
        value=[]
        message1 = "No Error while fetching present emails"
        monthStartDate = year+"-"+month+"-01"
        print(monthStartDate)
        # for absent emails
        queryAbsent=f"""SELECT  email FROM excel_absent_emails eae  WHERE  date_month_excel_date  = '{monthStartDate}';"""
        try: 
            valueAbsent = await queryFunction_report(queryAbsent)
            print(valueAbsent)
        except Exception as e:
            print("error inside query function",e)
            message1 = e
        return { 
                "data":valueAbsent,
                "Message":message1 
            }
    else:
        print("No tunnel_report")
        return []

@app.post("/api/salesForceTableActivePassiveContractors")
async def sales_force_table_active_passive_contractors( month : str = Form(...) , year : str = Form(...) , dateToQuery : date = Form(...)):
    if tunnel_report:
        value=[]
        message = "No Error"
        monthStartDate = year+"-"+month+"-01"
        print(monthStartDate)
        query=f""" SELECT  first_name ,last_name ,email,date_joined ,CASE WHEN (company_name IS NULL OR company_name = '') THEN 'Not present' ELSE company_name END AS company_name, CASE WHEN company_type = 1 THEN 'PAYE Member' WHEN company_type = 2 THEN 'Director Member' WHEN company_type = 3 THEN 'PLC' ELSE 'Unknown' END AS company_type , company_status ,month_of_updated_data  FROM  excel_data_input WHERE  date_month_excel_date  = '{monthStartDate}' and  month_of_updated_data  = '{dateToQuery}' ;"""
        try: 
            value = await queryFunction_report(query)
            print(value)
        except Exception as e:
            print("error inside query function",e)
            message = e
        return { 
                "data":value,
                "Message":message,
            }
    else:
        print("No tunnel_report")
        return []
    
@app.post("/api/salesForceTableRlaStatus")
async def sales_force_table_rla_status( month : str = Form(...) , year : str = Form(...) , dateToQuery : date = Form(...)):
    if tunnel_report:
        value=[]
        message = "No Error"
        monthStartDate = year+"-"+month+"-01"
        print(monthStartDate)        
        query=f"""SELECT  first_name ,last_name ,email,date_joined ,CASE WHEN (company_name IS NULL OR company_name = '') THEN 'Not present' ELSE company_name END AS company_name, CASE WHEN company_type = 1 THEN 'PAYE Member' WHEN company_type = 2 THEN 'Director Member' WHEN company_type = 3 THEN 'PLC' ELSE 'Unknown' END AS company_type ,reconciliation_status  FROM  excel_data_input WHERE date_month_excel_date = '{monthStartDate}' AND reconciliation_status IS NOT NULL and month_of_updated_data  = '{dateToQuery}' ;"""
        try: 
            value = await queryFunction_report(query)
            print(value)
        except Exception as e:
            print("error inside query function",e)
            message = e
        return { 
                "data":value,
                "Message":message,
            }
    else:
        print("No tunnel_report")
        return []
    
    
@app.post("/api/getAExcelFromServer")
async def get_a_excel_from_server(dateInput: str = Form(...)):
    if tunnel_report:
        message = "No Error"
        monthStartDate = dateInput
        print(monthStartDate)
        query = f"""SELECT file_path  FROM excel_month_exist eme WHERE date = '{monthStartDate}' """
        try:
            data = await queryFunction_report(query)
            file_path = data[0][0]+".xlsx"
            print(file_path)
            if file_path:
                # Assuming file_path is a string containing the file path
                return FileResponse(path=file_path, filename=f"{monthStartDate}_report.xlsx")
            else:
                message = "File path not found in the database for the given date."
        except Exception as e:
            print("Error inside query function", e)
            message = str(e)
    else:
        print("No tunnel_report")
        message = "No tunnel_report"
    raise HTTPException(status_code=404, detail=message)
    
@app.post("/api/getTheExcelPresentListByYear")
async def get_the_excel_present_list_by_year( year:str = Form(...)):
    if tunnel_report:
        value=[]
        message = "No Error"
        print(year)
        query=f"""SELECT date FROM excel_month_exist eme WHERE year(date) = {year}  ORDER BY date;"""
        try: 
            value = await queryFunction_report(query)
            print(value)
        except Exception as e:
            print("error inside query function",e)
            message = e
        return { 
                "data":value,
                "Message":message,
            }
    else:
        print("No tunnel_report")
        return []
    



   

