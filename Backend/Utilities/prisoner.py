
import mysql.connector as mysql
class Prisoner:
    #Prisoner related funtions

    def __init__(self,host:str,user:str,password:str) -> None:
        self.conn = mysql.connect(
            host = host,
            user = user,
            password = password,
            charset = 'utf8'
        )
        self.cur=self.conn.cursor()
    def insertPrisonerDetails(self,aadhar_number:str,name:str,age:int,noOfConvictions:int) -> bool:
        try:
            self.cur.execute(f"INSERT INTO PRISONER_DETAILS VALUES('{aadhar_number}','{name}',{age},{noOfConvictions});")
            self.conn.commit()
            return True
        except:
            return False
    def insertPrisoner(self,aadhar_number:str,crime_id:int,enter_date:str,release_date:str) -> bool:
        try:
            self.cur.execute(f"INSERT INTO PRISONER(AADHAR_NUMBER,CRIME_ID,ENTER_DATE,RELEASE_DATE) VALUES({aadhar_number},{crime_id},'{enter_date}','{release_date}');")
            self.conn.commit()
            return True
        except:
            return False
    def viewPrisoners(self,order_by='PRISONER_ID',order='DESC'):
        self.cur.execute(f"SELECT * FROM PRISONER ORDER BY {order_by} {order};")
        row_headers=[x[0] for x in self.cur.description]
        prisoners=self.cur.fetchall()
        prisoner_list=[]
        for p in prisoners:
            prisoner_list.append(dict(zip(row_headers,p)))
        return prisoner_list
    def viewPrisonerDetails(self,aadhar_number:str): # returns a dictionary containing details of the prisoner
        self.cur.execute(f"SELECT * FROM PRISONER_DETAILS WHERE AADHAR_NUMBER='{aadhar_number}';")
        row_headers=[x[0] for x in self.cur.description]
        prisoner=self.cur.fetchall()
        prisoner_details=(dict(zip(row_headers,p)))
        return prisoner_details