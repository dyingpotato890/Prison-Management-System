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
        db.cursor.execute("""
            SELECT 
                prisoner_id, 
                aadhar_number, 
                crime_id, 
                enter_date, 
                release_date 
            FROM 
                prisoner
        """)
        prisoners = db.cursor.fetchall()

        prisoner_list = []
        for prisoner in prisoners:
            prisoner_list.append({
                "prisoner_id": prisoner[0],
                "aadhar_number": prisoner[1],
                "crime_id": prisoner[2],
                "enter_date": str(prisoner[3]),
                "release_date": str(prisoner[4])
            })

        return jsonify(prisoner_list)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        if db.conn.is_connected():
            db.cursor.close()
            db.conn.close()

@app.route('/prisoner_details/<int:prisoner_id>', methods=['GET'])
def get_prisoner_details(prisoner_id):
    db = Connector()
    try:
        db.cursor.execute("""
            SELECT 
                p.prisoner_id, 
                pd.name, 
                pd.age, 
                pd.number_of_convictions, 
                p.aadhar_number, 
                p.crime_id, 
                p.enter_date, 
                p.release_date 
            FROM 
                prisoner p 
            JOIN 
                prisoner_details pd ON p.aadhar_number = pd.aadhar_number
            WHERE 
                p.prisoner_id = %s
        """, (prisoner_id,))
        prisoner_details = db.cursor.fetchone()

        if prisoner_details:
            return jsonify({
                "prisoner_id": prisoner_details[0],
                "name": prisoner_details[1],
                "age": prisoner_details[2],
                "convictions": prisoner_details[3],
                "aadhar_number": prisoner_details[4],
                "crime_id": prisoner_details[5],
                "enter_date": str(prisoner_details[6]),
                "release_date": str(prisoner_details[7])
            })
        else:
            return jsonify({"error": "Prisoner not found"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        if db.conn.is_connected():
            db.cursor.close()
            db.conn.close()

if __name__ == "__main__":
    app.run(debug = True)