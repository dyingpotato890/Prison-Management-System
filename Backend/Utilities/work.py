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

        