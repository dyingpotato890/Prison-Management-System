from Utilities.connector import Connector

class Work:
    def __init__(self) -> None:
        self.db = Connector()

    def getWork(self):
        self.db.cursor.execute("""SELECT j.job_desc,
                               w.prisoner_id,
                               w.hours_worked
                               from work w, jobs j
                               where w.jobid = j.jobid;
                               """)
        work_data = self.db.cursor.fetchall()
        work_details = []
        for work in work_data:
            work_details.append({
                "job_desc": work[0],
                "prisoner_id": work[1],
                "working-hours": work[2]
            })
        return work_details
    def addHours(self, jobID, prisonerID, hours):
        self.db.cursor.execute("SELECT * FROM WORK WHERE JOBID = %s AND PRISONER_ID = %s", (jobID, prisonerID))
        self.db.cursor.fetchall()
        if self.db.cursor.rowcount == 0:
           self.db.cursor.execute("INSERT INTO WORK (JOBID, PRISONER_ID, HOURS_WORKED) VALUES (%s, %s, %s)", (jobID, prisonerID, hours))
        else:
           self.db.cursor.execute("UPDATE WORK SET HOURS_WORKED = HOURS_WORKED + %s WHERE JOBID = %s AND PRISONER_ID = %s", (hours, jobID, prisonerID))
        self.db.conn.commit()