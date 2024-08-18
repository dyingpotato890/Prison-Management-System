import hashlib
import mysql.connector as mysql

class password:
    def __init__(self):     
        self.conn = mysql.connect(
            host = 'localhost',
            user = 'root',
            password = '',
            database = 'PRISON_MANAGEMENT_SYSTEM',
            charset = 'utf8'
        )
        self.cur = self.conn.cursor()

        self.updatePass()

    def hash_password(self, password: str) -> str:
        h = hashlib.new("sha256")
        h.update(bytes(password,'utf-8'))
        return h.hexdigest()
    
    def updatePass(self):
        self.cur.execute("SELECT STAFF_ID, PASSWORD FROM LOGIN_DETAILS;")
        rows = self.cur.fetchall()

        for staff_id, password in rows:
            hashed_password = self.hash_password(password)
            self.cur.execute("UPDATE LOGIN_DETAILS SET password = %s WHERE STAFF_ID = %s", (hashed_password, staff_id))

        self.conn.commit()

        print("Passwords have been hashed and updated successfully.")
        
password()