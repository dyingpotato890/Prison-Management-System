from flask import Flask, request, jsonify
from flask_cors import CORS
from Utilities.login import Login
from Utilities.connector import Connector

app = Flask(__name__)
CORS(app)

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

@app.route('/prisoners', methods=['GET'])
def get_prisoners():
    db = Connector()
    try:
        db.cursor.execute("SELECT * FROM prisoner")
        prisoners = db.cursor.fetchall()

        prisoner_list = []
        for prisoner in prisoners:
            prisoner_list.append({
                "prisoner_id": prisoner[0],
                "aadhar_number": prisoner[1],
                "crime_id": prisoner[2],
                "enter_date": prisoner[3],
                "release_date": prisoner[4],
            })

        return jsonify(prisoner_list)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    finally:
        if db.conn.is_connected():
            db.cursor.close()
            db.conn.close()

if __name__ == "__main__":
    app.run(debug = True)
