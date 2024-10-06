from flask import Flask, request, jsonify
from flask_cors import CORS
from Utilities.login import Login
from Utilities.connector import Connector
from Utilities.prisoner import Prisoner
from Utilities.crime import Crime
from Utilities.staff import Staff
from Utilities.visitor import Visitor


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

@app.route('/add_prisoner', methods=['POST'])
def add_prisoner():
    p=Prisoner()
    data = request.get_json()
    aadhar_number = data.get('aadhar_number')
    crime_id = data.get('crime_id')
    enter_date = data.get('enter_date')
    release_date = data.get('release_date')
    if p.insertPrisoner(aadhar_number,crime_id,enter_date,release_date):
        return jsonify({"message": "Prisoner added successfully"})
    else:
        return jsonify({"message": "Failed to add prisoner"}), 500 

@app.route('/add_prisoner_details', methods=['POST'])
def add_prisoner_details():
    p=Prisoner()
    data = request.get_json()
    aadhar_number = data.get('aadhar_number')
    name = data.get('name')
    age = data.get('age')
    noOfConvictions = data.get('noOfConvictions')
    if p.insertPrisonerDetails(aadhar_number,name,age,noOfConvictions):
        return jsonify({"message": "Prisoner details added successfully"})
    else:
        return jsonify({"message": "Failed to add prisoner details"}), 500
if __name__ == "__main__":
    app.run(debug = True)