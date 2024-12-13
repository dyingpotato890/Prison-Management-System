from flask import Flask, request, jsonify, session, redirect
from Utilities.connector import Connector

class Views:
    def __init__(self) -> None:
        self.db = Connector()

    def viewPrisoners(self):
        # Get query parameter for currently incarcerated filtering
        currentlyIncarcerated = request.args.get('currentlyIncarcerated', 'false').lower() == 'true'

        query = """
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
                AND c.crime_id = p.crime_id
        """

        if currentlyIncarcerated:
            query += " AND (p.release_date >= CURDATE() OR p.release_date IS NULL)"

        query += " ORDER BY p.prisoner_id"
        self.db.cursor.execute(query)
        prisoners = self.db.cursor.fetchall()

        prisoner_list = []
        for prisoner in prisoners:
            prisoner_list.append({
                "prisoner_id": prisoner[0],
                "name": prisoner[1],
                "description": prisoner[2],
                "enter_date": str(prisoner[3]),
                "release_date": str(prisoner[4]) if prisoner[4] else None
            })

        return prisoner_list
    
    def viewPrisonerDetails(self, prisoner_id: int):
        self.db.cursor.execute("""
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
        prisoner_details = self.db.cursor.fetchone()

        return prisoner_details
    
    def viewVisitors(self):
        self.db.cursor.execute("""
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
        visitors = self.db.cursor.fetchall()

        visitor_list = []
        for visitor in visitors:
            visitor_list.append({
                "visitor_name": visitor[0],
                "phone_number": visitor[1],
                "prisoner_name": visitor[2],
                "date": str(visitor[3]),
                "time": str(visitor[4])
            })

        return visitor_list
    
    def viewStaff(self , order_by = 'STAFF_ID'):
        self.db.cursor.execute(f"SELECT * FROM STAFF ORDER BY {order_by};")
        row_headers=['staff_id','name','age','phone_number','role']
        
        staff = self.db.cursor.fetchall()
        staff_list = []
        
        for s in staff:
            staff_list.append(dict(zip(row_headers,s)))
        
        self.db.conn.close()
        return staff_list
    
    def viewCrimes(self):
        self.db.cursor.execute("SELECT * FROM crime")
        crimes = self.db.cursor.fetchall()

        crimes_list = []
        for crime in crimes:
            crimes_list.append({
                "crime_id": crime[0],
                "crime_description": crime[1],
            })

        return crimes_list
    
    def viewCells(self):
        self.db.cursor.execute("""
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
        cells = self.db.cursor.fetchall()

        cells_list = []
        for crime in cells:
            cells_list.append({
                "cell_no": crime[0],
                "vacant": crime[1],
                "prisoner_id": crime[2],
                "name": crime[3]
            })

        return cells_list
    
    def viewJobs(self):
        self.db.cursor.execute("SELECT * FROM JOBS")
        jobs = self.db.cursor.fetchall()
        
        if not jobs:
            print("No jobs found in the database.")
            return jsonify({"error": "No jobs found"}), 404
        
        jobs_list = []
        for job in jobs:
            jobs_list.append({
                "job_id": job[0],
                "job_desc": job[1],
                "work_start": str(job[2]),
                "work_end": str(job[3])
            })

        return jobs_list
    
    def viewWork(self):
        self.db.cursor.execute("""
            SELECT 
                j.jobid,
                j.job_desc,
                w.prisoner_id,
                w.hours_worked
            FROM
                work w,
                jobs j
            WHERE 
                w.jobid = j.jobid;
        """)
        work_data = self.db.cursor.fetchall()

        work_details = []
        for work in work_data:
            work_details.append({
                "job_id": work[0],
                "job_desc": work[1],
                "prisoner_id": work[2],
                "working-hours": work[3]
            })

        return work_details