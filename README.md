# Prison Management System

## Table of Contents
- [Introduction](#introduction)
- [Module Descriptions](#module-descriptions)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Database Schema](#database-schema)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## Introduction
The **Prison Management System** is a comprehensive application designed to manage prison operations efficiently. It streamlines tasks such as managing prisoners, staff, visitors, cells, and crime statistics through an easy-to-use interface. Built with modern technologies, the system ensures scalability, reliability, and security.

---

## Module Descriptions

### - Prisoner Management Module
- Record and update prisoner details.
- Maintain personal and legal information.
- Add, update, and remove prisoner records.
- Track prisoner status and legal cases.

### - Visitor Management Module
- Register new visitors.
- Link visitors to specific prisoners.
- Remove visitor records.
- Track visitor history for security purposes.

### - Cell Management Module
- Manage allocation of cells to prisoners.
- Add new cells and delete unused cells.
- Reallocate prisoners between cells to ensure safety and optimize operations.

### - Staff Management Module
- Register new staff members and update their details.
- Remove staff when required.
- Manage user access based on staff roles.

### - Crime Management Module
- Add and update criminal records of prisoners.
- Maintain historical records for legal tracking.
- Remove outdated crime details.

### - Job Management Module
- Assign tasks to prisoners.
- Update and track job details.
- Remove completed or redundant job assignments.

### - Work Management Module
- Record work details and hours completed by prisoners.
- Track productivity and compliance.
- Maintain proper documentation of all work activities.

---

## Tech Stack

### Backend
- **Programming Language:** Python
- **Web Framework:** Flask
- **Database:** MySQL
- **Libraries/Tools:** MySQL Connector for database connectivity

### Frontend
- **Framework:** React.js
- **Libraries:**
  - `react-table` for dynamic table generation
  - `axios` for API calls

### Additional Tools
- **Version Control:** Git and GitHub
- **IDE:** Visual Studio Code (recommended)

---

## Installation

### Prerequisites
- Python 3.9 or later.
- Node.js and npm.
- MySQL server.

### Steps
#### NOTE: If you are using the project for the first time, run `tables.py` to create the required database and tables.

1. Clone the repository:
    ```bash
    git clone https://github.com/dyingpotato890/Prison-Management-System.git
    cd Prison-Management-System
    ```
2. Set up the backend:
    - Navigate to the backend folder:
      ```bash
      cd backend
      ```
    - Install required Python dependencies:
      ```bash
      pip install -r requirements.txt
      ```
    - Run the backend:
      ```bash
      python main.py
      ```
3. Set up the frontend:
    - Navigate to the frontend folder:
      ```bash
      cd frontend
      ```
    - Install dependencies:
      ```bash
      npm install
      ```
    - Start the development server:
      ```bash
      npm start
      ```

---

## Usage
1. **Launch the Application:**
   - Ensure both the backend and frontend servers are running.
   - Open the frontend in your browser at `http://localhost:3000`.
2. **Login as Staff:**
   - Use your Staff ID and password to access the system.
3. **Navigate through Features:**
   - Use the sidebar to explore and manage staff, prisoners, visitors, and other entities.
4. **Perform Administrative Tasks:**
   - Assign cells, manage staff roles, and track crimes effortlessly.

---

## File and Folder Structure

### Backend
```
Backend/
├── database/
│   ├── schema.sql
│   ├── seed.sql

├── Initialization Files/
│   ├── tables.py
│   ├── updateDB.py

├── Table Data/
│   └── Contains all the CSV files containing the data for the tables.

├── utils/
│   ├── cell.py
│   ├── connector.py
│   ├── crime.py
│   ├── jobs.py
│   ├── prisoner.py
│   ├── staff.py
│   ├── user.py
│   ├── views.py
│   ├── visitor.py
│   └── work.py

├── server.py

```
- **`database/`:** Contains the schema and initial seed data for the MySQL database.
- **`Initialization Files/`:** Contains the files to initialise and update (if necessary) the database.
- **`Table Data/`:** Contains all the CSV files containing the data for the tables.
- **`utils/`:** Contains helper files like the database `connector.py` for managing database connections.
- **`server.py`:** The entry point to the backend application.

### Frontend

```
frontend/
├── build/

├── node_modules/

├── public/
│ └── index.html

├── src/
│   ├── Components/
│   │   └── Assets/
│   ├── Pages/
│   │   ├── Cell Management/
│   │   ├── Crime Management/
│   │   ├── Error Page/
│   │   ├── Job Management/
│   │   ├── Landing/
│   │   ├── Login/
│   │   ├── Modal/
│   │   ├── Prisoner Management/
│   │   ├── Staff Management/
│   │   ├── Visitor Management/
│   │   └── Work Management/
│   ├── App.css
│   ├── App.js
│   ├── index.css
│   ├── index.js
```

- **`build/`:** Contains production build files for deployment.
- **`node_modules/`:** Contains all the installed dependencies for the project.
- **`public/`:** Static files and the main HTML file.
- **`src/`:** Contains the source code for the application.
- **`Components/`:** Contains React components for various parts of the UI.
- **`Assets/`:** Contains static assets like images, icons, and other media.
- **`Pages/`:** Contains React components for different pages of the application (e.g., Cell Management, Crime Management, etc.).
- **`App.css`:** Main styling file for the entire application.
- **`App.js`:** Main React component rendering the application.
- **`index.css`:** Global styling for the application.
- **`index.js`:** Entry point for the React application.

---

## Database Schema

### ER Diagram:
<p align="center">
  <img src = "https://github.com/dyingpotato890/Prison-Management-System/blob/main/Documents/Latex/er.png" alt = "ER Diagram" />
</p>

### Table: CRIME
| Column Name  | Data Type    | Constraints        |
|--------------|-------------|--------------------|
| CRIME_ID     | INT         | PRIMARY KEY, NOT NULL |
| DESCRIPTION  | VARCHAR(150)| NOT NULL          |

---

### Table: PRISONER
| Column Name     | Data Type    | Constraints                       |
|-----------------|-------------|-----------------------------------|
| PRISONER_ID     | INT         | PRIMARY KEY, NOT NULL            |
| AADHAR_NUMBER   | VARCHAR(20) | NOT NULL                         |
| CRIME_ID        | INT         | FOREIGN KEY REFERENCES CRIME(CRIME_ID), NOT NULL |
| ENTER_DATE      | DATE        | NOT NULL                         |
| RELEASE_DATE    | DATE        | NULLABLE                         |

---

### Table: PRISONER_DETAILS
| Column Name         | Data Type    | Constraints                                  |
|---------------------|-------------|----------------------------------------------|
| AADHAR_NUMBER       | VARCHAR(20) | PRIMARY KEY, NOT NULL                       |
| NAME                | VARCHAR(50) | NOT NULL                                    |
| AGE                 | INT         | NOT NULL, CHECK (AGE >= 18 AND AGE <= 100) |
| NUMBER_OF_CONVICTIONS | INT       | NOT NULL                                    |

---

### Table: STAFF
| Column Name  | Data Type    | Constraints                                |
|--------------|-------------|--------------------------------------------|
| STAFF_ID     | INT         | PRIMARY KEY, NOT NULL                     |
| NAME         | VARCHAR(50) | NOT NULL                                  |
| AGE          | INT         | NOT NULL, CHECK (AGE >= 18 AND AGE <= 70)|
| PHONE_NUMBER | VARCHAR(20) | NOT NULL                                  |
| ROLE         | VARCHAR(50) | NOT NULL                                  |

---

### Table: LOGIN_DETAILS
| Column Name | Data Type    | Constraints                                |
|-------------|-------------|--------------------------------------------|
| STAFF_ID    | INT         | PRIMARY KEY, NOT NULL, FOREIGN KEY REFERENCES STAFF(STAFF_ID) |
| PASSWORD    | VARCHAR(255)| NOT NULL                                  |

---

### Table: VISITOR_DETAILS
| Column Name   | Data Type    | Constraints                                      |
|---------------|-------------|--------------------------------------------------|
| VISITOR_NAME  | VARCHAR(50) | PRIMARY KEY (composite), NOT NULL               |
| PHONE_NUMBER  | INT         | NOT NULL                                        |
| PRISONER_ID   | INT         | PRIMARY KEY (composite), FOREIGN KEY REFERENCES PRISONER(PRISONER_ID), NOT NULL |
| DATE          | DATE        | PRIMARY KEY (composite), NOT NULL              |
| TIME          | TIME        | PRIMARY KEY (composite), NOT NULL              |

---

### Table: CELLS
| Column Name   | Data Type    | Constraints                                      |
|---------------|-------------|--------------------------------------------------|
| CELL_NUMBER   | INT         | PRIMARY KEY, NOT NULL                           |
| VACANT        | CHAR(1)     | NOT NULL                                        |
| PRISONER_ID   | INT         | FOREIGN KEY REFERENCES PRISONER(PRISONER_ID), NULLABLE |

---

### Table: JOBS
| Column Name   | Data Type    | Constraints                                      |
|---------------|-------------|--------------------------------------------------|
| JOBID         | INT         | PRIMARY KEY, NOT NULL                           |
| JOB_DESC      | VARCHAR(100)| NOT NULL                                        |
| WORK_START    | TIME        | NOT NULL                                        |
| WORK_END      | TIME        | NOT NULL                                        |

---

### Table: WORK
| Column Name   | Data Type    | Constraints                                      |
|---------------|-------------|--------------------------------------------------|
| PRISONER_ID   | INT         | PRIMARY KEY (composite), FOREIGN KEY REFERENCES PRISONER(PRISONER_ID), NOT NULL |
| JOBID         | INT         | PRIMARY KEY (composite), FOREIGN KEY REFERENCES JOBS(JOBID), NOT NULL |
| HOURS_WORKED  | DECIMAL(5,2)| NOT NULL, CHECK (HOURS_WORKED >= 0 AND HOURS_WORKED <= 24) |

---

## Screenshots

### Login Screen:
<p align="center">
  <img src = "https://github.com/dyingpotato890/Prison-Management-System/blob/main/Documents/Latex/login.png" alt = "Login Screen" />
</p>

### Prioner Management:
<p align="center">
  <img src = "https://github.com/dyingpotato890/Prison-Management-System/blob/main/Documents/Latex/prisonermgmt.png" alt = "Prioner Management" />
</p>

### Prioner Details:
<p align="center">
  <img src = "https://github.com/dyingpotato890/Prison-Management-System/blob/main/Documents/Latex/prisonerdet.png" alt = "Prioner Details" />
</p>

### Visitor Tracking:
<p align="center">
  <img src = "https://github.com/dyingpotato890/Prison-Management-System/blob/main/Documents/Latex/visitor.png" alt = "Visitor Tracking" />
</p>

### Cell Management:
<p align="center">
  <img src = "https://github.com/dyingpotato890/Prison-Management-System/blob/main/Documents/Latex/cell.png" alt = "Cell Management" />
</p>

### Staff Management:
<p align="center">
  <img src = "https://github.com/dyingpotato890/Prison-Management-System/blob/main/Documents/Latex/staff.png" alt = "Staff Management" />
</p>

### Crime Management:
<p align="center">
  <img src = "https://github.com/dyingpotato890/Prison-Management-System/blob/main/Documents/Latex/crime.png" alt = "Crimes Management" />
</p>

### Job Management:
<p align="center">
  <img src = "https://github.com/dyingpotato890/Prison-Management-System/blob/main/Documents/Latex/job.png" alt = "Job Management" />
</p>

### Work Management:
<p align="center">
  <img src = "https://github.com/dyingpotato890/Prison-Management-System/blob/main/Documents/Latex/work.png" alt = "Work Management" />
</p>

---

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature-name
    ```
3. Commit your changes:
    ```bash
    git commit -m "Description of changes"
    ```
4. Push to the branch:
    ```bash
    git push origin feature-name
    ```
5. Submit a pull request.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.
