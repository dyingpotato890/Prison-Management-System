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
    
@app.route('/visitors', methods=['GET'])
def get_visitors():
    db = Connector()
    try:
        db.cursor.execute("""SELECT * FROM visitor_details""")
        visitors = db.cursor.fetchall()

        visitor_list = []
        for visitor in visitors:
            visitor_list.append({
                "visitor_name": visitor[0],
                "phone_number": visitor[1],
                "prisoner_id": visitor[2],
                "date": str(visitor[3]),
                "time": str(visitor[4])
            })

        return jsonify(visitor_list)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        if db.conn.is_connected():
            db.cursor.close()
            db.conn.close()

@app.route('/add_prisoner', methods=['POST'])
def add_prisoner():
    db = Connector()
    p = Prisoner()
    data = request.get_json()

    name = data.get('name')
    age = data.get('age')
    aadhar = data.get('aadhar')
    crime_id = data.get('crimeId')
    entry_date = data.get('entryDate')
    release_date = data.get('releaseDate')

    try:
        db.cursor.execute("SELECT NUMBER_OF_CONVICTIONS FROM PRISONER_DETAILS WHERE AADHAR_NUMBER = %s", (aadhar,))
        result = db.cursor.fetchone()

        if result:
            number_of_convictions = result[0] + 1
            db.cursor.execute("""
                UPDATE PRISONER_DETAILS
                SET NUMBER_OF_CONVICTIONS = %s
                WHERE AADHAR_NUMBER = %s
            """, (number_of_convictions, aadhar))
            db.conn.commit()
        else:
            p.insertPrisonerDetails(aadhar, name, age, 1)

        db.cursor.execute("SELECT PRISONER_ID FROM PRISONER ORDER BY PRISONER_ID DESC LIMIT 1")
        lastPID = db.cursor.fetchone()
        if lastPID is not None:
            lastPID = lastPID[0] + 1
        else:
            lastPID = 1

        p.insertPrisoner(lastPID, aadhar, crime_id, entry_date, release_date)

        return jsonify({"message": "Prisoner added/updated successfully!"}), 200
    
    except Exception as e:
        print(f"Error adding prisoner: {e}")
        return jsonify({"message": "Failed to add prisoner"}), 500

    finally:
        if db.conn.is_connected():
            db.cursor.close()
            db.conn.close()

@app.route('/delete-prisoner', methods=['DELETE'])
def delete_prisoner():
    try:
        db = Connector()
        p = Prisoner()

        data = request.get_json()
        aadhar_number = data.get('aadharNumber')

        if not aadhar_number:
            return jsonify({'message': 'Aadhar Number is required'}), 400

        check = p.deletePrisoner(aadhar_number)
        if check:
            return jsonify({'message': 'Prisoner deleted successfully!'}), 200
        else:
            return jsonify({'message': 'Prisoner not found'}), 404
        
    except Exception as e:
        print(f"Error adding prisoner: {e}")
        return jsonify({"message": "Failed to add prisoner"}), 500

    finally:
        if db.conn.is_connected():
            db.cursor.close()
            db.conn.close()

@app.route('/delete-prisoner-details', methods=['DELETE'])
def delete_prisoner_details():
    try:
        db = Connector()
        p = Prisoner()

        data = request.get_json()
        aadhar_number = data.get('aadharNumber')

        if not aadhar_number:
            return jsonify({'message': 'Aadhar Number is required'}), 400

        check = p.deletePrisoner(aadhar_number)
        if check:
            p.deletePrisonerDetails(aadhar_number)
            return jsonify({'message': 'Prisoner deleted successfully!'}), 200
        else:
            return jsonify({'message': 'Prisoner not found'}), 404
        
    except Exception as e:
        print(f"Error adding prisoner: {e}")
        return jsonify({"message": "Failed to add prisoner"}), 500

    finally:
        if db.conn.is_connected():
            db.cursor.close()
            db.conn.close()

@app.route('/add_visitor', methods=['POST'])
def add_visitor():
    db = Connector()
    visitor = Visitor()

    data = request.get_json()
    name = data.get('name')
    phone_number = data.get('phoneNumber')
    prisoner_id = data.get('prisonerId')
    date = data.get('date')
    time = data.get('time')

    if not all([name, phone_number, prisoner_id, date, time]):
        return jsonify({"message": "All fields are required."}), 400

    try:
        success = visitor.add_visitor(name, phone_number, prisoner_id, date, time)
        if success:
            return jsonify({"message": "Visitor added successfully!"}), 201
        else:
            return jsonify({"message": "Failed to add visitor."}), 500

    except Exception as e:
        print(f"Error adding visitor: {e}")
        return jsonify({"message": "Failed to add visitor"}), 500

    finally:
        if db.conn.is_connected():
            db.cursor.close()
            db.conn.close()

@app.route('/delete_visitor', methods=['DELETE'])
def delete_visitor():
    db = Connector()
    visitor = Visitor()
    data = request.get_json()

    visitor_name = data.get('visitorName')
    prisoner_id = data.get('prisonerId')
    date = data.get('date')
    time = data.get('time')

    if not visitor_name or not prisoner_id or not date or not time:
        return jsonify({'message': 'All fields are required'}), 400

    try:
        check = visitor.delete_visitor(visitor_name, prisoner_id, date, time)
        db.conn.commit()

        if not check:
            return jsonify({'message': 'Visitor not found'}), 404
        
        return jsonify({'message': 'Visitor deleted successfully!'}), 200

    except Exception as e:
        print(f"Error deleting visitor: {e}")
        return jsonify({"message": "Failed to delete visitor"}), 500

    finally:
        if db.conn.is_connected():
            db.cursor.close()
            db.conn.close()

@app.route('/staff', methods=['GET'])
def get_staff():
    staff=Staff()
    try:
        staff_list=staff.view_staff()
        return jsonify(staff_list)
    except Exception as e:
        print(f"Error getting staff: {e}")
        return jsonify({"error": str(e)}), 500
    

if __name__ == "__main__":
    app.run(debug = True)