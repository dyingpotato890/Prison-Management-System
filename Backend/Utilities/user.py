from Utilities.connector import Connector
from flask_login import UserMixin
import hashlib

class User(UserMixin):
    def __init__(self, id, password):
        self.id = id
        self.password = password

    @staticmethod
    def hashPassword(password: str) -> str:
        h = hashlib.new("sha256")
        h.update(bytes(password, 'utf-8'))
        return h.hexdigest()
    
    @staticmethod
    def get(user_id):
        db = Connector()
        db.cursor.execute("SELECT * FROM LOGIN_DETAILS WHERE STAFF_ID = %s", (user_id,))
        user_data = db.cursor.fetchone()
        db.conn.close()
        if user_data:
            return User(user_data[0], user_data[1])
        return None
