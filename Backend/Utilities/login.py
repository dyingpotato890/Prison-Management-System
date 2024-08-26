from flask import Flask, request, jsonify
from flask_cors import CORS
from connector import Connector
import hashlib

app = Flask(__name__)
CORS(app)

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

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    login_obj = Login()
    if login_obj.checkPass(username, password):
        return jsonify({"message": "Login Successful"})
    else:
        return jsonify({"message": "Login Failed"}), 401

if __name__ == "__main__":
    app.run(debug=True)