from Utilities.connector import Connector
class Staff:
    #Staff related funtions

    def __init__(self) -> None:
        self.db=Connector()
    def add_staff(self,staff_id,staff_name,age,phone_number,role):
        self.db.cursor.execute(f"INSERT INTO STAFF VALUES({staff_id},'{staff_name}',{age},'{phone_number}','{role}');")
        self.db.conn.commit()
        self.db.conn.close()
    def remove_staff(self,staff_id):
        self.db.cursor.execute(f"DELETE FROM STAFF WHERE STAFF_ID={staff_id};")
        self.db.conn.commit()
        self.db.conn.close()
    def view_staff(self,order_by='STAFF_ID'):
        self.db.cursor.execute("SELECT * FROM STAFF ORDER BY {order_by};")
        row_headers=[x[0] for x in db.cursor.description]
        staff=self.db.cursor.fetchall()
        staff_list=[]
        for s in staff:
            staff_list.append(dict(zip(row_headers,s)))
        self.db.conn.close()
        return staff