from flask import Flask, request, jsonify, session, redirect
from flask_cors import CORS
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from Utilities.user import Login, User
from Utilities.connector import Connector
from Utilities.prisoner import Prisoner
from Utilities.crime import Crime
from Utilities.staff import Staff
from Utilities.visitor import Visitor
from Utilities.cell import Cells

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY']='192b9bdd22ab9ed4d12e236c78afcb9a393ec15f71bbf5dc987d54727423bcbf'


login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(user_id):
    return User.get(user_id)

@login_manager.unauthorized_handler
def unauthorized():
    redirect('/')
    return jsonify({"message": "Unauthorized"}), 401

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    user = User.get(username)
    if user and user.password == User.hashPassword(password):
        login_user(user, remember=True)
        print("Logged in: ",current_user.is_authenticated, current_user.id)
        return jsonify({"message": "Login Successful"})
    else:
        return jsonify({"message": "Login Failed"}), 401

@app.route('/logout', methods=['GET'])
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logged Out"})

@app.route('/check_login', methods=['GET'])
def check_login():
    if current_user.is_authenticated:
        return jsonify({"message": "Logged In"})
    else:
        return jsonify({"message": "Not Logged In"}), 401

@app.route('/prisoners', methods=['GET'])
@login_required
def get_prisoners():
    db = Connector()
    try:
        db.cursor.execute("""
            SELECT 
                p.prisoner_id, 
                pd.name, 
                c.description, 
                p.enter_date, 
                p.release_date 
            FROM 
                prisoner p,
                prisoner_details pd,
                crime c
            WHERE
                pd.aadhar_number = p.aadhar_number
                and
                c.crime_id = p.crime_id
            ORDER BY
                p.prisoner_id
        """)
        prisoners = db.cursor.fetchall()

        prisoner_list = []
        for prisoner in prisoners:
            prisoner_list.append({
                "prisoner_id": prisoner[0],
                "name": prisoner[1],
                "description": prisoner[2],
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
@login_required
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
@login_required
def get_visitors():
    db = Connector()
    try:
        db.cursor.execute("""
            SELECT 
                vd.visitor_name,
                vd.phone_number, 
                pd.name,
                vd.date,
                vd.time
            FROM 
                visitor_details vd,
                prisoner_details pd,
                prisoner p
            WHERE
                vd.prisoner_id = p.prisoner_id
                and
                p.aadhar_number = pd.aadhar_number
            ORDER BY
                vd.date desc, vd.time
        """)
        visitors = db.cursor.fetchall()

        visitor_list = []
        for visitor in visitors:
            visitor_list.append({
                "visitor_name": visitor[0],
                "phone_number": visitor[1],
                "prisoner_name": visitor[2],
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
@login_required
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
@login_required
def delete_prisoner():
    try:
        db = Connector()
        p = Prisoner()

        data = request.get_json()
        prisonerID = data.get('prisonerID')

        if not prisonerID:
            return jsonify({'message': 'Prisoner ID is required'}), 400

        check = p.deletePrisoner(prisonerID)
        if check:
            return jsonify({'message': 'Prisoner Deleted Successfully!'}), 200
        else:
            return jsonify({'message': 'Prisoner Not Found'}), 404
        
    except Exception as e:
        print(f"Error Deleting Prisoner: {e}")
        return jsonify({"message": "Failed to Delete Prisoner"}), 500

    finally:
        if db.conn.is_connected():
            db.cursor.close()
            db.conn.close()

@app.route('/delete-prisoner-details', methods=['DELETE'])
@login_required
def delete_prisoner_details():
    try:
        db = Connector()
        p = Prisoner()

        data = request.get_json()
        aadhar_number = data.get('aadharNumber')

        if not aadhar_number:
            return jsonify({'message': 'Aadhar Number is required'}), 400

        check = p.deletePrisonerDetails(aadhar_number)
        if check:
            return jsonify({'message': 'Prisoner deleted successfully!'}), 200
        else:
            return jsonify({'message': 'Prisoner Either Not Found or Has Records Existing In Prison Table'}), 404
        
    except Exception as e:
        print(f"Error Deleting prisoner: {e}")
        return jsonify({"message": "Failed to Delete Prisoner"}), 500

    finally:
        if db.conn.is_connected():
            db.cursor.close()
            db.conn.close()

@app.route('/add_visitor', methods=['POST'])
@login_required
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
@login_required
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
@login_required
def get_staff():
    staff=Staff()
    try:
        staff_list=staff.view_staff()
        return jsonify(staff_list)
    except Exception as e:
        print(f"Error getting staff: {e}")
        return jsonify({"error": str(e)}), 500
    
@app.route('/add_staff', methods=['POST'])
@login_required
def add_staff():
    staff=Staff()
    data = request.get_json()
    staff_id = data.get('id')
    staff_name = data.get('name')
    age = data.get('age')
    phone_number = data.get('phonenumber')
    role = data.get('role')
    try:
        staff.add_staff(staff_id,staff_name,age,phone_number,role)
        return jsonify({"message": "Staff added successfully!"}), 200
    except Exception as e:
        print(f"Error adding staff: {e}")
        return jsonify({"message": "Failed to add staff"}), 500
    
@app.route('/remove_staff', methods=['DELETE'])
@login_required
def remove_staff():
    staff=Staff()
    data = request.get_json()
    staff_id = data.get('staff_id')
    if not staff_id:
        return jsonify({'message': 'Staff ID is required'}), 400
    if staff.remove_staff(staff_id):
        return jsonify({'message': 'Staff removed successfully!'}), 200
    else:
        return jsonify({'message': 'Staff not found'}), 404
    
@app.route('/add_user', methods=['POST'])
@login_required
def add_user():
    staff=Staff()
    data = request.get_json()
    staff_id = data.get('id')
    password = data.get('password')
    if not all([staff_id, password]):
        return jsonify({'message': 'All fields are required'}), 400
    try:
        if staff.add_user(staff_id,password):
            return jsonify({'message': 'User added successfully!'}), 200
        else:
            return jsonify({'message': 'Staff not found'}), 404
    except Exception as e:
        print(f"Error adding user: {e}")
        return jsonify({"message": "Failed to add user"}), 500
    
@app.route('/remove_user', methods=['DELETE'])
@login_required
def remove_user():
    staff=Staff()
    data = request.get_json()
    staff_id = data.get('staff_id')
    if not staff_id:
        return jsonify({'message': 'Staff ID is required'}), 400
    try:
        if not staff.remove_user(staff_id):
            return jsonify({'message': 'User does not exist'}), 404
        return jsonify({'message': 'User removed successfully!'}), 200
    except Exception as e:
        print(f"Error removing user: {e}")
        return jsonify({"message": "Failed to remove user"}), 500
    
@app.route('/crime-details', methods=['GET'])
@login_required
def get_crimes():
    db = Connector()
    try:
        db.cursor.execute("SELECT * FROM crime")
        crimes = db.cursor.fetchall()

        crimes_list = []
        for crime in crimes:
            crimes_list.append({
                "crime_id": crime[0],
                "crime_description": crime[1],
            })

        return jsonify(crimes_list)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        if db.conn.is_connected():
            db.cursor.close()
            db.conn.close()

@app.route('/add_crime', methods=['POST'])
@login_required
def addCrime():
    crime=Crime()
    data = request.get_json()
    crime_id = data.get('crimeID')
    description = data.get('desc')
    if not all([crime_id, description]):
        return jsonify({'message': 'All fields are required'}), 400
    try:
        crime.insertCrime(crime_id,description)
        return jsonify({"message": "Crime added successfully!"}), 200
    except Exception as e:
        print(f"Error adding crime: {e}")
        return jsonify({"message": "Failed to add crime"}), 500

@app.route('/delete_crime', methods=['DELETE'])
@login_required
def deleteCrime():
    crime=Crime()
    data = request.get_json()
    crime_id = data.get('crimeID')
    if not crime_id:
        return jsonify({'message': 'Crime ID is required'}), 400
    try:
        if crime.deleteCrime(crime_id):
            return jsonify({'message': 'Crime removed successfully!'}), 200
        else:
            return jsonify({'message': 'Crime not found'}), 404
    except Exception as e:
        print(f"Error deleting crime: {e}")
        return jsonify({"message": "Failed to delete crime"}), 500
    
@app.route('/cells', methods = ['GET'])
@login_required
def get_cells():
    db = Connector()
    try:
        db.cursor.execute("""
            SELECT 
                c.cell_number, 
                c.vacant, 
                c.prisoner_id, 
                pd.name
            FROM 
                cells c
            LEFT JOIN 
                prisoner p ON c.prisoner_id = p.prisoner_id
            LEFT JOIN 
                prisoner_details pd ON pd.aadhar_number = p.aadhar_number
            ORDER BY 
                c.cell_number;
        """)
        cells = db.cursor.fetchall()

        cells_list = []
        for crime in cells:
            cells_list.append({
                "cell_no": crime[0],
                "vacant": crime[1],
                "prisoner_id": crime[2],
                "name": crime[3]
            })

        return jsonify(cells_list)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        if db.conn.is_connected():
            db.cursor.close()
            db.conn.close()

@app.route('/add_cell', methods=['POST'])
@login_required
def add_cell():
    c = Cells()
    try:
        c.addCell()
        return jsonify({"message": "Cell added successfully!"}), 200
    
    except Exception as e:
        print(f"Error Adding New Cell: {e}")
        return jsonify({"message": "Failed to Add New Cell"}), 500
    
@app.route('/delete_cell', methods=['POST'])
@login_required
def delete_cell():
    c = Cells()
    data = request.get_json()

    cellNo = data.get('cell_number')
    try:
        check = c.deleteCell(cellNo)
        if check == 0:
            return jsonify({"message": "Cell Deleted successfully!"}), 200
        else:
            return jsonify({"message": "Cell Contains A Prisoner!"}), 200
    
    except Exception as e:
        print(f"Error Adding New Cell: {e}")
        return jsonify({"message": "Failed to Delete New Cell"}), 500
    
if __name__ == "__main__":
    app.run(debug = True)