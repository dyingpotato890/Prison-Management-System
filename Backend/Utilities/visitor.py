from connector import Connector
class Visitor:
    #Visitor related funtions

    def __init__(self) -> None:
        self.db=Connector()
    def add_visitor(self,visitor_name,phone_number,prisoner_id,date,time):
        self.db.cursor.execute(f"INSERT INTO VISITOR_DETAILS VALUES('{visitor_name}','{phone_number}',{prisoner_id},'{date}','{time}');")
        self.db.conn.commit()
        self.db.conn.close()
    def viewVisitors(self,order_by='DATE,TIME',order='DESC'): #returns a list of dictionaries
        self.db.cursor.execute(f"SELECT * FROM VISITOR_DETAILS ORDER BY {order_by} {order};")
        row_headers=[x[0] for x in self.db.cursor.description]
        visitor=self.db.cursor.fetchall()
        visitor_list=[]
        for v in visitor:
            visitor_list.append(dict(zip(row_headers,v)))
        self.db.conn.close()
        return visitor_list
