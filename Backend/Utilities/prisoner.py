
from Utilities.connector import Connector

class Prisoner:
    #Prisoner related funtions

    def __init__(self) -> None:
        self.db=Connector()
    def insertPrisonerDetails(self,aadhar_number:str,name:str,age:int,noOfConvictions:int) -> bool:
        try:
            self.db.cursor.execute(f"INSERT INTO PRISONER_DETAILS VALUES('{aadhar_number}','{name}',{age},{noOfConvictions});")
            self.db.conn.commit()
            return True
        except:
            return False
    def insertPrisoner(self,aadhar_number:str,crime_id:int,enter_date:str,release_date:str) -> bool:
        try:
            self.db.cursor.execute(f"INSERT INTO PRISONER(AADHAR_NUMBER,CRIME_ID,ENTER_DATE,RELEASE_DATE) VALUES({aadhar_number},{crime_id},'{enter_date}','{release_date}');")
            self.db.conn.commit()
            return True
        except:
            return False
    def viewPrisoners(self,order_by='PRISONER_ID',order='DESC'):
        self.cursor.execute(f"SELECT * FROM PRISONER ORDER BY {order_by} {order};")
        row_headers=[x[0] for x in self.cursor.description]
        prisoners=self.db.cursor.fetchall()
        prisoner_list=[]
        for p in prisoners:
            prisoner_list.append(dict(zip(row_headers,p)))
        return prisoner_list
    def viewPrisonerDetails(self,aadhar_number:str): # returns a dictionary containing details of the prisoner
        self.db.cursor.execute(f"SELECT * FROM PRISONER_DETAILS WHERE AADHAR_NUMBER='{aadhar_number}';")
        row_headers=[x[0] for x in self.cursor.description]
        prisoner=self.db.cursor.fetchall()
        for p in prisoner:
            return (dict(zip(row_headers,p)))
