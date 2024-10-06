import mysql.connector as mysql
import csv

class Tables:
    sql_commands = [
        "CREATE TABLE IF NOT EXISTS CRIME (CRIME_ID INT PRIMARY KEY, DESCRIPTION VARCHAR(150));",
        "CREATE TABLE IF NOT EXISTS PRISONER (PRISONER_ID INT PRIMARY KEY, AADHAR_NUMBER VARCHAR(20), CRIME_ID INT, ENTER_DATE DATE, RELEASE_DATE DATE, FOREIGN KEY (CRIME_ID) REFERENCES CRIME(CRIME_ID));",
        "CREATE TABLE IF NOT EXISTS PRISONER_DETAILS (AADHAR_NUMBER VARCHAR(20) PRIMARY KEY, NAME VARCHAR(50), AGE INT, NUMBER_OF_CONVICTIONS INT);",
        "CREATE TABLE IF NOT EXISTS STAFF (STAFF_ID INT PRIMARY KEY, NAME VARCHAR(50), AGE INT, PHONE_NUMBER VARCHAR(20), ROLE VARCHAR(50));",
        "CREATE TABLE IF NOT EXISTS LOGIN_DETAILS (STAFF_ID INT PRIMARY KEY, PASSWORD VARCHAR(255), FOREIGN KEY (STAFF_ID) REFERENCES STAFF(STAFF_ID));",
        "CREATE TABLE IF NOT EXISTS VISITOR_DETAILS (VISITOR_NAME VARCHAR(50), PHONE_NUMBER INT, PRISONER_ID INT, DATE DATE, TIME TIME, PRIMARY KEY (VISITOR_NAME, PRISONER_ID, DATE, TIME), FOREIGN KEY (PRISONER_ID) REFERENCES PRISONER(PRISONER_ID));",
        "CREATE TABLE IF NOT EXISTS CELLS (CELL_NUMBER INT PRIMARY KEY, VACANT CHAR(1), PRISONER_ID INT, FOREIGN KEY (PRISONER_ID) REFERENCES PRISONER(PRISONER_ID));",
        "CREATE TABLE IF NOT EXISTS JOBS (JOBID INT PRIMARY KEY, JOB_DESC VARCHAR(100), WORK_START TIME, WORK_END TIME);",
        "CREATE TABLE IF NOT EXISTS WORK (PRISONER_ID INT, JOBID INT, HOURS_WORKED DECIMAL(5,2), PRIMARY KEY (PRISONER_ID, JOBID), FOREIGN KEY (PRISONER_ID) REFERENCES PRISONER(PRISONER_ID), FOREIGN KEY (JOBID) REFERENCES JOBS(JOBID));"
    ]

    table_names = [
        "CRIME",
        "PRISONER",
        "PRISONER_DETAILS",
        "STAFF",
        "LOGIN_DETAILS",
        "VISITOR_DETAILS",
        "CELLS",
        "JOBS",
    ]

    def __init__(self):
        host = input("Enter Your MySQL Host Name: ")
        user = input("Enter Your MySQL Username: ")
        password = input("Enter Your MySQL Password: ")
        
        self.conn = mysql.connect(
            host = host,
            user = user,
            password = password,
            charset = 'utf8'
        )
        self.cur = self.conn.cursor()

        self.createDatabase()

        self.createTables()
        self.insertValues()

    def createDatabase(self):
        try:
            #TODO: Suggest a better name, i ain't typing allat everytime.
            self.cur.execute("CREATE DATABASE IF NOT EXISTS PRISON_MANAGEMENT_SYSTEM;")
            self.cur.execute("USE PRISON_MANAGEMENT_SYSTEM;") 
        except:
            pass

    # TO CREATE ALL THE TABLES
    def createTables(self):
        try:
            for command in self.sql_commands:
                self.cur.execute(command)
            self.conn.commit()
        except mysql.Error as err:
            print(f"Error: {err}")

    # TO INSERT VALUES INTO THE TABLES
    def insertValues(self):
        for table in self.table_names:
            with open(f"../Table_Data/{table}.csv", "r") as file:
                csvreader = csv.reader(file)
                columns = next(csvreader)  # Extract the column headers
                
                # Dynamically create the INSERT INTO statement based on columns (ps: this is chatgpt stuff, i couldnt figure this out)
                column_names = ", ".join(columns)
                values = ", ".join(["%s"] * len(columns))  # placeholders for values
                
                insert_query = f"INSERT INTO {table} ({column_names}) VALUES ({values})"
                
                for row in csvreader:
                    try:
                        self.cur.execute(insert_query, row)  # Insert each row into the table
                    except:
                        pass
            
            self.conn.commit()

Tables()
print("Database Created/Checked")