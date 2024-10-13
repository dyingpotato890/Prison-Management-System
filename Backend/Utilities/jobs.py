from Utilities.connector import Connector

class Job:
    def __init__(self) -> None:
        self.db = Connector()

    def addJob(self, job_id: int, job_desc: str, work_start: str, work_end: str) -> None:
        self.db.cursor.execute(
            "INSERT INTO JOBS VALUES (%s, %s, %s, %s)",
            (job_id, job_desc, work_start, work_end))
        self.db.conn.commit()

    def updateJob(self, job_id: int, work_start: str, work_end: str) -> None:
        self.db.cursor.execute(
            "UPDATE JOBS SET WORK_START = %s, WORK_END = %s WHERE JOBID = %s",
            (work_start, work_end, job_id))
        self.db.conn.commit()

    def deleteJob(self, job_id: int) -> None:
        self.db.cursor.execute("DELETE FROM JOBS WHERE JOBID = %s", (job_id,))
        self.db.conn.commit()

    def assignJob(self, prisoner_id: int, job_id: int, hours_worked: float) -> None:
        self.db.cursor.execute(
            "INSERT INTO WORK (PRISONER_ID, JOBID, HOURS_WORKED) VALUES (%s, %s, %s)",
            (prisoner_id, job_id, hours_worked))
        self.db.conn.commit()

    def updateHoursWorked(self, prisoner_id: int, job_id: int, hours_worked: float) -> None:
        self.db.cursor.execute(
            "UPDATE WORK SET HOURS_WORKED = %s WHERE PRISONER_ID = %s AND JOBID = %s",
            (hours_worked, prisoner_id, job_id))
        self.db.conn.commit()

    def totalHours(self, prisoner_id: int) -> float:
        self.db.cursor.execute("SELECT sum(HOURS_WORKED) FROM WORK WHERE PRISONER_ID = %s",(prisoner_id,))
        total_hours = self.db.cursor.fetchone()[0]
        return total_hours if total_hours else 0.0