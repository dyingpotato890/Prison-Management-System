from Utilities.connector import Connector

class Work:
    def __init__(self) -> None:
        self.db = Connector()
    
    def addHours(self, jobID, prisonerID, hours):
        self.db.cursor.execute("SELECT * FROM WORK WHERE JOBID = %s AND PRISONER_ID = %s", (jobID, prisonerID))
        self.db.cursor.fetchall()
        if self.db.cursor.rowcount == 0:
           self.db.cursor.execute("INSERT INTO WORK (JOBID, PRISONER_ID, HOURS_WORKED) VALUES (%s, %s, %s)", (jobID, prisonerID, hours))
        else:
           self.db.cursor.execute("UPDATE WORK SET HOURS_WORKED = HOURS_WORKED + %s WHERE JOBID = %s AND PRISONER_ID = %s", (hours, jobID, prisonerID))
        self.db.conn.commit()
    
    def deleteWork(self, jobID, prisonerID):
        self.db.cursor.execute("SELECT * FROM WORK WHERE JOBID = %s AND PRISONER_ID = %s", (jobID, prisonerID))
        self.db.cursor.fetchall()
        if self.db.cursor.rowcount == 0:
            raise Exception("No work found for the given jobID and prisonerID")
        self.db.cursor.execute("DELETE FROM WORK WHERE JOBID = %s AND PRISONER_ID = %s", (jobID, prisonerID))
        self.db.conn.commit() 