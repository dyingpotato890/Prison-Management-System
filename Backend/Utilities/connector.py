import psycopg2 as pg2
import os

url=os.environ.get('DB_URL')
class Connector:
    def __init__(self) -> None:
        self.conn = pg2.connect(url)
        

        self.cursor = self.conn.cursor()

'''
For this to work just import Connector class using

        from connector import Connector

Then create an instance of the Connector class:
            
        db = Connector()

And any command that you'd want to execute will look like,

    (self.)db.cursor.execute(<command>)
    (self.)db.cursor.fetchall()
    (self.)db.conn.commit()
    (self.)db.conn.close()

etc...
'''