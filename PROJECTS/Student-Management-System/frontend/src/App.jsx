import { useEffect, useMemo, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import SearchStudent from './components/SearchStudent';
import StudentDetails from './components/StudentDetails';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/students';
const PAGE_SIZE = 5;

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [search, setSearch] = useState('');
  const [branch, setBranch] = useState('ALL');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [page, setPage] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();

  async function fetchStudents() {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to fetch students.');
      setStudents(data);
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (location.state?.message) {
      setMessage({ type: 'success', text: location.state.message });
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  useEffect(() => {
    setPage(1);
  }, [search, branch]);

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();
    return students.filter((student) => {
      const matchesSearch =
        !query ||
        String(student.id).includes(query) ||
        student.name.toLowerCase().includes(query);
      const matchesBranch = branch === 'ALL' || student.branch === branch;
      return matchesSearch && matchesBranch;
    });
  }, [students, search, branch]);

  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visibleStudents = filteredStudents.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  async function saveStudent(student) {
    setSaving(true);
    setMessage(null);

    try {
      const isEditing = Boolean(editingStudent);
      const url = isEditing ? `${API_URL}/${editingStudent.id}` : API_URL;
      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to save student.');

      setMessage({ type: 'success', text: data.message });
      setEditingStudent(null);
      await fetchStudents();
      return true;
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
      return false;
    } finally {
      setSaving(false);
    }
  }

  function startEdit(student) {
    setEditingStudent(student);
    setMessage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function deleteStudent(student) {
    const confirmed = window.confirm(`Delete ${student.name} (ID ${student.id})?`);
    if (!confirmed) return;

    try {
      const response = await fetch(`${API_URL}/${student.id}`, { method: 'DELETE' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to delete student.');

      if (editingStudent?.id === student.id) setEditingStudent(null);
      setMessage({ type: 'success', text: data.message });
      await fetchStudents();
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
  }

  return (
    <main className="app-shell">
      <header className="hero">
        <div>
          <p className="hero-kicker">React + Node.js + Express.js</p>
          <h1>Student Management System</h1>
          <p className="hero-copy">Add, view, update, delete and search student records without page reloads.</p>
        </div>
        <div className="hero-stat">
          <strong>{students.length}</strong>
          <span>Total students</span>
        </div>
      </header>

      {message && (
        <div className={`alert ${message.type === 'error' ? 'alert-error' : 'alert-success'}`}>
          {message.text}
          <button aria-label="Close message" onClick={() => setMessage(null)}>×</button>
        </div>
      )}

      <StudentForm
        editingStudent={editingStudent}
        onSave={saveStudent}
        onCancelEdit={() => setEditingStudent(null)}
        busy={saving}
      />

      <SearchStudent
        search={search}
        onSearchChange={setSearch}
        branch={branch}
        onBranchChange={setBranch}
      />

      {loading ? (
        <section className="card"><p>Loading students...</p></section>
      ) : (
        <StudentList
          students={visibleStudents}
          onEdit={startEdit}
          onDelete={deleteStudent}
          page={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}

      <footer>
        <p>Data is stored in server memory and resets when the backend restarts.</p>
      </footer>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/student/:id" element={<StudentDetails />} />
    </Routes>
  );
}
