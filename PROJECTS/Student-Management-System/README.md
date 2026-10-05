# Student Management System

A beginner-friendly full-stack Student Management System built with **React.js**, **Node.js**, and **Express.js**. It supports adding, viewing, updating, deleting, searching, filtering, and paginating student records.

> **Important:** Student data is stored in an in-memory JavaScript array in the backend. It resets when the Node.js server restarts. No database is used.

## Features

- Add a student with validation
- View all students in a table
- Update existing student details
- Delete a student with confirmation
- Search by Student ID or Student Name (case-insensitive)
- Server-side validation and useful error messages
- Responsive user interface
- No page reload during CRUD operations
- Bonus: filter by branch
- Bonus: pagination (5 records per page)
- Bonus: separate Student Details page using React Router

## Student Fields

| Field | Validation |
|---|---|
| Student ID | Required, positive number, unique |
| Name | Required |
| Email | Required, valid email format |
| Branch | CSE, CS, IT, ECE |
| Semester | 1 to 8 |
| Mobile Number | Exactly 10 digits |

## Project Structure

```text
Student-Management-System/
├── backend/
│   ├── routes/
│   │   └── studentRoutes.js
│   ├── .gitignore
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchStudent.jsx
│   │   │   ├── StudentDetails.jsx
│   │   │   ├── StudentForm.jsx
│   │   │   └── StudentList.jsx
│   │   ├── App.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── screenshots/
│   └── README.md
├── API_TESTS.http
├── TESTING.md
├── VIVA_NOTES.md
└── README.md
```

## Requirements

Install these before running the project:

- Node.js 18 or later
- npm
- VS Code (recommended)

## How to Run

### 1. Start the backend

Open a terminal in the project folder:

```bash
cd backend
npm install
npm start
```

The backend will run at:

```text
http://localhost:5000
```

### 2. Start the frontend

Open a **second terminal**:

```bash
cd frontend
npm install
npm run dev
```

Vite will show a local address, normally:

```text
http://localhost:5173
```

Open it in your browser.

## REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/students` | Fetch all students |
| GET | `/api/students/:id` | Fetch student by ID |
| POST | `/api/students` | Add a student |
| PUT | `/api/students/:id` | Update a student |
| DELETE | `/api/students/:id` | Delete a student |

## Sample POST Request

```json
{
  "id": 101,
  "name": "Rahul Sharma",
  "email": "rahul@gmail.com",
  "branch": "CSE",
  "semester": 3,
  "mobile": "9876543210"
}
```

## Main Validation Rules

Validation is performed in both the React form and the Express backend. The backend is the final source of truth and checks duplicate IDs, valid branch, semester range, email format, and 10-digit mobile number.

## Suggested Demo Flow

1. Start backend and frontend.
2. Add a valid student.
3. Try to add the same Student ID again to show the duplicate-ID error.
4. Add 2–3 more students.
5. Search by name and then by ID.
6. Filter by branch.
7. Click **Edit**, update a field, and save.
8. Click **View** to open the Student Details page.
9. Click **Delete** and confirm.
10. Restart the backend to demonstrate that in-memory data resets.

## Screenshots for Submission

After running the project, save screenshots in the `screenshots/` folder showing:

- Add Student
- View Student List
- Update Student
- Delete Student
- Search Student

Do not use placeholder screenshots as submission evidence; capture the running application on your own system.

## GitHub Submission

Suggested commands:

```bash
git init
git add .
git commit -m "Initial Student Management System"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

Use meaningful commits, for example:

```text
Add Express CRUD API
Build React student form
Add search and table UI
Add validation and error handling
Add responsive styling
```

## Notes

- There is intentionally no MongoDB, MySQL, Firebase, or other database.
- JSON-file persistence is not enabled because the core assignment expects in-memory data to reset when the server restarts.
- Bonus branch filtering, pagination, and a React Router details page are included.
