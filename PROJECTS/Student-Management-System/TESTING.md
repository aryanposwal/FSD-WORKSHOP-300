# Testing Checklist

Use this checklist before submitting the project.

| Test Case | Steps | Expected Result |
|---|---|---|
| Add valid student | Fill all fields correctly and submit | Student added successfully |
| Duplicate ID | Add another student with an existing ID | Duplicate ID error displayed |
| Empty form | Submit missing required fields | Validation message displayed |
| Invalid email | Enter an invalid email | Validation message displayed |
| Invalid semester | Enter semester outside 1–8 | Validation message displayed |
| Invalid mobile | Enter fewer/more than 10 digits | Validation message displayed |
| Fetch students | Open/reload frontend while backend is running | Student records displayed |
| Search by name | Enter part of a student name | Matching records displayed, case-insensitive |
| Search by ID | Enter a student ID | Matching record displayed |
| Search unavailable | Search for an unknown ID/name | “No student found” displayed |
| Update student | Click Edit, change details, submit | Updated details displayed |
| Delete student | Click Delete and confirm | Record removed |
| Cancel delete | Click Delete and cancel confirmation | Record remains |
| Branch filter | Select a branch | Only matching branch records displayed |
| Pagination | Add more than 5 matching records | Next/Previous page controls work |
| Details page | Click View | Separate student details page opens |
| Restart server | Stop and restart backend | In-memory student records reset |
