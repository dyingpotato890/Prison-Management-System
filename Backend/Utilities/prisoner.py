from Utilities.connector import Connector

class Prisoner:
    # Prisoner related functions

    def __init__(self) -> None:
        self.db = Connector()

    def insertPrisonerDetails(self, aadhar_number: str, name: str, age: int, noOfConvictions: int) -> bool:
        try:
            self.db.cursor.execute(f"INSERT INTO PRISONER_DETAILS VALUES('{aadhar_number}', '{name}', {age}, {noOfConvictions});")
            self.db.conn.commit()
            return True
        except Exception as e:
            print("Error inserting prisoner details:", e)
            return False

    def insertPrisoner(self, prisoner_id: int, aadhar_number: str, crime_id: int, enter_date: str, release_date: str) -> bool:
        try:
            self.db.cursor.execute(f"INSERT INTO PRISONER (PRISONER_ID, AADHAR_NUMBER, CRIME_ID, ENTER_DATE, RELEASE_DATE) VALUES({prisoner_id}, '{aadhar_number}', {crime_id}, '{enter_date}', '{release_date}');")
            self.db.conn.commit()
            return True
        except Exception as e:
            print("Error inserting prisoner:", e)
            return False

    def viewPrisoners(self, order_by='PRISONER_ID', order='DESC'):
        self.db.cursor.execute(f"SELECT * FROM PRISONER ORDER BY {order_by} {order};")
        row_headers = [x[0] for x in self.db.cursor.description]
        prisoners = self.db.cursor.fetchall()
        prisoner_list = []
        for p in prisoners:
            prisoner_list.append(dict(zip(row_headers, p)))
        return prisoner_list

    def viewPrisonerDetails(self, aadhar_number: str):  # returns a dictionary containing details of the prisoner
        self.db.cursor.execute(f"SELECT * FROM PRISONER_DETAILS WHERE AADHAR_NUMBER='{aadhar_number}';")
        row_headers = [x[0] for x in self.db.cursor.description]
        prisoner = self.db.cursor.fetchall()
        for p in prisoner:
            return dict(zip(row_headers, p))

    def deletePrisoner(self, prisonerID: str) -> bool:
        try:
            self.db.cursor.execute(f"""
                SELECT
                    PD.NUMBER_OF_CONVICTIONS,
                    PD.AADHAR_NUMBER
                FROM
                    PRISONER_DETAILS PD,
                    PRISONER P
                WHERE
                    PD.AADHAR_NUMBER = P.AADHAR_NUMBER
                    AND
                    P.PRISONER_ID = {prisonerID}
                """)
            result = self.db.cursor.fetchone()
            convictions = result[0]
            aadhar = result[1]

            self.db.cursor.execute(f"DELETE FROM PRISONER WHERE PRISONER_ID='{prisonerID}';")

            if convictions == 1:
                self.db.cursor.execute(f"DELETE FROM PRISONER_DETAILS WHERE AADHAR_NUMBER = {aadhar}")
    
            self.db.conn.commit()
            return True
        
        except Exception as e:
            print("Error deleting prisoner:", e)
            return False

    def deletePrisonerDetails(self, aadhar_number: str) -> bool:
        try:
            self.db.cursor.execute("SELECT COUNT(*) FROM PRISONER WHERE AADHAR_NUMBER = %s", (aadhar_number,))
            prisoner_count = self.db.cursor.fetchone()[0]

            if prisoner_count > 0:
                return False

            self.db.cursor.execute("SELECT COUNT(*) FROM PRISONER_DETAILS WHERE AADHAR_NUMBER = %s", (aadhar_number,))
            details_count = self.db.cursor.fetchone()[0]

            if details_count > 0:
                self.db.cursor.execute("DELETE FROM PRISONER_DETAILS WHERE AADHAR_NUMBER = %s", (aadhar_number,))
                self.db.conn.commit()
                return True
            
        except Exception as e:
            print(f"Error deleting prisoner details: {e}")
            return False
        
    def checkPID(self, prisoner_id: int) -> bool:
        self.db.cursor.execute("SELECT * FROM PRISONER WHERE PRISONER_ID = %s", (prisoner_id,))
        prisoner = self.db.cursor.fetchone()
    
        return prisoner is not None
        
    def updateDetails(self, name: str, age: int, crime_id: int, release_date: str, prisoner_id: int):
        update_query = "UPDATE PRISONER SET "
        update_values = []
        fields_to_update = []

        if name != '':
            self.db.cursor.execute("""
                                UPDATE 
                                    PRISONER_DETAILS PD
                                SET 
                                    PD.NAME = %s 
                                WHERE 
                                    PD.AADHAR_NUMBER = (
                                        SELECT P.AADHAR_NUMBER 
                                        FROM PRISONER P 
                                        WHERE P.PRISONER_ID = %s)""", (name, prisoner_id))
            self.db.conn.commit()
        if age is not None:
            self.db.cursor.execute("""
                                UPDATE 
                                    PRISONER_DETAILS PD
                                SET 
                                    PD.AGE = %s 
                                WHERE 
                                    PD.AADHAR_NUMBER = (
                                        SELECT P.AADHAR_NUMBER 
                                        FROM PRISONER P 
                                        WHERE P.PRISONER_ID = %s)""", (age, prisoner_id))
            self.db.conn.commit()
        if crime_id is not None:
            fields_to_update.append("CRIME_ID = %s")
            update_values.append(crime_id)
        if release_date is not None:
            fields_to_update.append("RELEASE_DATE = %s")
            update_values.append(release_date)

        if fields_to_update:
            update_query += ", ".join(fields_to_update)
            update_query += " WHERE PRISONER_ID = %s"

            update_values.append(prisoner_id)

            try:
                self.db.cursor.execute(update_query, tuple(update_values))
                self.db.conn.commit()
                print("Prisoner details updated successfully.")
            except Exception as e:
                print(f"Error updating prisoner: {e}")
        else:
            print("No fields to update.")