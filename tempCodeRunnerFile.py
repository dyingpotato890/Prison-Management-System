import mysql.connector as mysql
from mysql.connector.locales.eng import client_error

class Tables:
    def __init__(self):
        '''host = input("Enter Your MySQL Host Name: ")
        user = input("Enter Your MySQL Username: ")
        password = input("Enter Your MySQL Password: ")'''
        
        self.conn = mysql.connect(
            host = 'localhost',
            user = 'root',
            password = '',
            database = 'PRISON_MANAGEMENT_SYSTEM',
            charset = 'utf8'
        )
        self.cur = self.conn.cursor()

        self.createDatabase()
        self.conn.database = 'PRISON_MANAGEMENT_SYSTEM'
        self.createTables()
        self.__del__()

    def createDatabase(self):
        try:
            self.cur.execute("CREATE DATABASE IF NOT EXISTS PRISON_MANAGEMENT_SYSTEM;")
        except:
            pass

    # TO CREATE ALL THE TABLES
    def createTables(self):
        try:
            self.cur.execute("SELECT * FROM PRISON")
            # Fetch the results if needed, e.g.:
            results = self.cur.fetchall()
            print(results)
        except:
            pass
    
    # TO CLOSE ALL CONNECTIONS 
    def __del__(self):
        if self.cur:
            self.cur.close()
        if self.conn:
            self.conn.close()

tables = Tables()
