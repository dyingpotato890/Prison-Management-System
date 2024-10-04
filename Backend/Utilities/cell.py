from Utilities.connector import Connector

class Cells:
    # Cells related functions

    def __init__(self) -> None:
        self.db = Connector()

    def assignCell(self, prisoner_id: int) -> None:
        availableCell = self.db.execute("SELECT cell_number FROM Cells WHERE vacant = 1 LIMIT 1;")

        if availableCell:
            cellNumber = availableCell[0]['cell_number']

            self.db.execute(f"UPDATE Cells SET vacant = 0, prisoner_id = {prisoner_id} WHERE cell_number = {cellNumber};")

            print(f"Prisoner {prisoner_id} assigned to cell {cellNumber}.")
        else:
            print("No vacant cells available.")

    def deallocateCell(self, cellNumber: int) -> None:
        self.db.execute(f"UPDATE CellsSET vacant = 1, prisoner_id = NULL WHERE cell_number = {cellNumber};")
        print(f"Cell {cellNumber} is now vacant.")

    def reallocateCell(self, prisoner_id: int, new_cell_number: int) -> None:
        currentCell = self.db.execute(f"SELECT cell_number FROM Cells WHERE prisoner_id = {prisoner_id};")
        
        if currentCell:
            current_cell_number = currentCell[0]['cell_number']
            
            self.deallocateCell(current_cell_number)
            self.db.execute(f"UPDATE Cells SET vacant = 0, prisoner_id = {prisoner_id} WHERE cell_number = {new_cell_number};")
            print(f"Prisoner {prisoner_id} reallocated to cell {new_cell_number}.")

        else:
            print(f"Prisoner {prisoner_id} is not currently assigned to any cell.")