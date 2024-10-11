from Utilities.connector import Connector
from Utilities.user import User
class Staff:
    def __init__(self) -> None:
        self.db=Connector()

    def add_staff(self,staff_id,staff_name,age,phone_number,role):
        self.db.cursor.execute(f"INSERT INTO STAFF VALUES({staff_id},'{staff_name}',{age},'{phone_number}','{role}');")
        self.db.conn.commit()
        self.db.conn.close()

    def remove_staff(self,staff_id):
        self.db.cursor.execute(f"DELETE FROM STAFF WHERE STAFF_ID={staff_id};")
        if self.db.cursor.rowcount==0:
            return False
        self.db.conn.commit()
        self.db.conn.close()
        return True

    def view_staff(self,order_by='STAFF_ID'):
        self.db.cursor.execute(f"SELECT * FROM STAFF ORDER BY {order_by};")
        row_headers=['staff_id','name','age','phone_number','role']
        staff=self.db.cursor.fetchall()
        staff_list=[]
        for s in staff:
            staff_list.append(dict(zip(row_headers,s)))
        self.db.conn.close()
        return staff_list
    def add_user(self,staff_id,password):
        hashedpass=User.hashPassword(password)
        self.db.cursor.execute(f"SELECT * FROM STAFF WHERE STAFF_ID={staff_id};")
        if not self.db.cursor.fetchone():
            return False
        self.db.cursor.execute(f"INSERT INTO LOGIN_DETAILS VALUES('{staff_id}','{hashedpass}');")
        self.db.conn.commit()
        self.db.conn.close()
        return True
    def remove_user(self,staff_id):
        self.db.cursor.execute(f"DELETE FROM LOGIN_DETAILS WHERE STAFF_ID={staff_id};")
        if self.db.cursor.rowcount==0:
            return False
        self.db.conn.commit()
        self.db.conn.close()
        return True