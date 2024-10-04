from Utilities.connector import Connector

class Cells:
    def __init__(self) -> None:
        self.db = Connector()

    def assignCell(self, prisoner_id: int) -> None:
        self.db.cursor.execute(f"SELECT cell_number FROM Cells WHERE prisoner_id = {prisoner_id};")
        check = self.db.cursor.fetchall()

        if not check:
            self.db.cursor.execute("SELECT cell_number FROM Cells WHERE vacant = 'Y' LIMIT 1;")
            availableCell = self.db.cursor.fetchone()

            if availableCell:
                cellNumber = availableCell[0]

                self.db.cursor.execute(f"UPDATE Cells SET vacant = 'N', prisoner_id = {prisoner_id} WHERE cell_number = {cellNumber};")
                print(f"Prisoner {prisoner_id} assigned to cell {cellNumber}.")
                self.db.conn.commit()
            else:
                print("No vacant cells available.")
        else:
            print("Cell already Allocated for Prisoner")

    def deallocateCell(self, cellNumber: int) -> None:
        #TODO: Need to set threshold to check if the cell request has gone beyond the maximum number of cells

        self.db.cursor.execute(f"UPDATE Cells SET vacant = 'Y', prisoner_id = NULL WHERE cell_number = {cellNumber};")
        print(f"Cell {cellNumber} is now vacant.")
        self.db.conn.commit()

    def reallocateCell(self, prisoner_id: int, new_cell_number: int) -> None:
        self.db.cursor.execute(f"SELECT cell_number FROM Cells WHERE prisoner_id = {prisoner_id};")
        currentCell = self.db.cursor.fetchone()
        
        if currentCell:
            current_cell_number = currentCell[0]
            
            self.deallocateCell(current_cell_number)
            self.db.cursor.execute(f"UPDATE Cells SET vacant = 'N', prisoner_id = {prisoner_id} WHERE cell_number = {new_cell_number};")
            print(f"Prisoner {prisoner_id} reallocated to cell {new_cell_number}.")

            self.db.conn.commit()
        else:
            print(f"Prisoner {prisoner_id} is not currently assigned to any cell.")