from Utilities.connector import Connector
import hashlib

class Login:
    def __init__(self):
        self.db = Connector()

    def hashPassword(self, password: str) -> str:
        h = hashlib.new("sha256")
        h.update(bytes(password, 'utf-8'))
        return h.hexdigest()

    def checkPass(self, username: str, password: str) -> bool:
        hashP = self.hashPassword(password)
        self.db.cursor.execute("SELECT PASSWORD FROM LOGIN_DETAILS WHERE STAFF_ID = %s", (username,))
        result = self.db.cursor.fetchone()

        if result:
            actualPass = result[0]
            return actualPass == hashP
        return False