const express = require('express');

const router = express.Router();

// In-memory storage. Data resets whenever the Node.js server restarts.
let students = [];

const allowedBranches = ['CSE', 'CS', 'IT', 'ECE'];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobilePattern = /^\d{10}$/;

function normalizeStudent(body) {
  return {
    id: Number(body.id),
    name: String(body.name || '').trim(),
    email: String(body.email || '').trim().toLowerCase(),
    branch: String(body.branch || '').trim().toUpperCase(),
    semester: Number(body.semester),
    mobile: String(body.mobile || '').trim()
  };
}

function validateStudent(student) {
  const errors = [];

  if (!Number.isInteger(student.id) || student.id <= 0) {
    errors.push('Student ID must be a positive number.');
  }

  if (!student.name) {
    errors.push('Name is required.');
  }

  if (!emailPattern.test(student.email)) {
    errors.push('A valid email is required.');
  }

  if (!allowedBranches.includes(student.branch)) {
    errors.push('Branch must be one of CSE, CS, IT or ECE.');
  }

  if (!Number.isInteger(student.semester) || student.semester < 1 || student.semester > 8) {
    errors.push('Semester must be a number from 1 to 8.');
  }

  if (!mobilePattern.test(student.mobile)) {
    errors.push('Mobile number must contain exactly 10 digits.');
  }

  return errors;
}

// GET /api/students - Fetch all students
router.get('/', (req, res) => {
  res.json(students);
});

// GET /api/students/:id - Fetch one student by ID
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const student = students.find((item) => item.id === id);

  if (!student) {
    return res.status(404).json({ message: 'Student not found.' });
  }

  res.json(student);
});

// POST /api/students - Add a student
router.post('/', (req, res) => {
  const student = normalizeStudent(req.body);
  const errors = validateStudent(student);

  if (errors.length) {
    return res.status(400).json({ message: errors.join(' ') });
  }

  if (students.some((item) => item.id === student.id)) {
    return res.status(409).json({ message: 'Student ID already exists.' });
  }

  students.push(student);
  res.status(201).json({ message: 'Student added successfully.', student });
});

// PUT /api/students/:id - Update a student
router.put('/:id', (req, res) => {
  const currentId = Number(req.params.id);
  const index = students.findIndex((item) => item.id === currentId);

  if (index === -1) {
    return res.status(404).json({ message: 'Student not found.' });
  }

  const updatedStudent = normalizeStudent(req.body);
  const errors = validateStudent(updatedStudent);

  if (errors.length) {
    return res.status(400).json({ message: errors.join(' ') });
  }

  const duplicateId = students.some(
    (item, studentIndex) => item.id === updatedStudent.id && studentIndex !== index
  );

  if (duplicateId) {
    return res.status(409).json({ message: 'Student ID already exists.' });
  }

  students[index] = updatedStudent;
  res.json({ message: 'Student updated successfully.', student: updatedStudent });
});

// DELETE /api/students/:id - Delete a student
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Student not found.' });
  }

  const [deletedStudent] = students.splice(index, 1);
  res.json({ message: 'Student deleted successfully.', student: deletedStudent });
});

module.exports = router;
