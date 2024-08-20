
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