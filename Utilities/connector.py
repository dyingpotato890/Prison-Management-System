import mysql.connector as mysql

class Connector:
    def __init__(self) -> None:
        self.conn = mysql.connect(
            host = 'localhost',
            user = 'root',
            password = '',
            database = 'PRISON_MANAGEMENT_SYSTEM',
            charset = 'utf8'
        )

        self.cursor = self.conn.cursor()

'''
For this to work just import Connector class using

        from connector import Connector

Then create an instance of the Connector class:
            
        db = Connector()

And any command that you'd want to execute will look like,

    db.cursor.execute(<command>)
    db.cursor.fetchall()
    db.conn.commit()
    db.conn.close()

etc...
'''