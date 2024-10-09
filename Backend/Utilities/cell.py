from Utilities.connector import Connector

class Cells:
    def __init__(self) -> None:
        self.db = Connector()

    def addCell(self):
        try:
            self.db.cursor.execute("SELECT CELL_NUMBER FROM CELLS ORDER BY CELL_NUMBER DESC LIMIT 1")
            lastCell = self.db.cursor.fetchone()[0]
            self.db.cursor.execute(f"INSERT INTO CELLS(CELL_NUMBER, VACANT) VALUES({lastCell + 1}, 'Y')")
            self.db.conn.commit()
        
        except Exception as e:
            print(f"Error adding prisoner: {e}")
        
    def deleteCell(self, cell_number: int) -> bool:
        try:
            self.db.cursor.execute(f"SELECT * FROM CELLS WHERE CELL_NUMBER = {cell_number} AND VACANT = 'Y'")
            empty = self.db.cursor.fetchone()

            if empty:
                self.db.cursor.execute(f"DELETE FROM CELLS WHERE CELL_NUMBER = {cell_number}")
                self.db.conn.commit()
                return 0
            else:
                print("Cell Holds A Prisoner!")
                return 1
        
        except Exception as e:
            print(f"Error Deleting prisoner: {e}")

    def assignCell(self, prisoner_id: int) -> None:
        self.db.cursor.execute(f"SELECT CELL_NUMBER FROM CELLS WHERE PRISONER_ID = {prisoner_id};")
        check = self.db.cursor.fetchall()

        if not check:
            self.db.cursor.execute("SELECT CELL_NUMBER FROM CELLS WHERE VACANT = 'Y' LIMIT 1;")
            availableCell = self.db.cursor.fetchone()

            if availableCell:
                cellNumber = availableCell[0]

                self.db.cursor.execute(f"UPDATE Cells SET VACANT = 'N', PRISONER_ID = {prisoner_id} WHERE CELL_NUMBER = {cellNumber};")
                print(f"Prisoner {prisoner_id} assigned to cell {cellNumber}.")
                self.db.conn.commit()
            else:
                print("No vacant cells available.")
        else:
            print("Cell already Allocated for Prisoner")

    def deallocateCell(self, cellNumber: int) -> None:
        #TODO: Need to set threshold to check if the cell request has gone beyond the maximum number of cells

        self.db.cursor.execute(f"UPDATE CELLS SET VACANT = 'Y', PRISONER_ID = NULL WHERE CELL_NUMBER = {cellNumber};")
        print(f"Cell {cellNumber} is now vacant.")
        self.db.conn.commit()

    def reallocateCell(self, prisoner_id: int, new_cell_number: int) -> None:
        self.db.cursor.execute(f"SELECT CELL_NUMBER FROM CELLS WHERE PRISONER_ID = {prisoner_id};")
        currentCell = self.db.cursor.fetchone()
        
        if currentCell:
            current_cell_number = currentCell[0]
            
            self.deallocateCell(current_cell_number)
            self.db.cursor.execute(f"UPDATE CELLS SET VACANT = 'N', PRISONER_ID = {prisoner_id} WHERE CELL_NUMBER = {new_cell_number};")
            print(f"Prisoner {prisoner_id} reallocated to cell {new_cell_number}.")

            self.db.conn.commit()
        else:
            print(f"Prisoner {prisoner_id} is not currently assigned to any cell.")