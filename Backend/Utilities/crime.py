from Utilities.connector import Connector
class Crime:
    #Crime related functions

    def __init__(self) -> None:
        self.db = Connector()

    def insertCrime(self,crime_id:int,description:str) -> bool:
        try:
            self.db.cursor.execute(f"INSERT INTO CRIME(CRIME_ID,DESCRIPTION) VALUES('{crime_id}','{description}');")
            self.db.conn.commit()
            return True
        except:
            return False
        
    def viewCrimes(self,order_by='CRIME_ID',order='DESC'):
        self.db.cursor.execute(f"SELECT * FROM CRIME ORDER BY {order_by} {order};")
        row_headers=[x[0] for x in self.db.cursor.description]
        crimes=self.db.cursor.fetchall()
        crime_list=[]
        for c in crimes:
            crime_list.append(dict(zip(row_headers,c)))
        return crime_list
    def viewCrimeDetails(self,crime_id:int): # returns a dictionary containing details of the crime
        self.db.cursor.execute(f"SELECT * FROM CRIME WHERE CRIME_ID={crime_id};")
        row_headers=[x[0] for x in self.db.cursor.description]
        crime=self.db.cursor.fetchall()
        for c in crime:
            return (dict(zip(row_headers,c)))
    def deleteCrime(self,crime_id:int) -> bool:
        try:
            self.db.cursor.execute(f"DELETE FROM CRIME WHERE CRIME_ID={crime_id};")
            self.db.conn.commit()
            return True
        except:
            return False