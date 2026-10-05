import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/students';

export default function StudentDetails() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStudent() {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Could not load student.');
        setStudent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadStudent();
  }, [id]);

  return (
    <main className="app-shell details-shell">
      <header className="hero compact-hero">
        <div>
          <p className="hero-kicker">Student Management System</p>
          <h1>Student Details</h1>
        </div>
        <Link to="/" className="btn btn-light">Back to dashboard</Link>
      </header>

      <section className="card details-card">
        {loading && <p>Loading student...</p>}
        {error && <div className="alert alert-error">{error}</div>}
        {student && (
          <div className="details-grid">
            <div><span>Student ID</span><strong>{student.id}</strong></div>
            <div><span>Name</span><strong>{student.name}</strong></div>
            <div><span>Email</span><strong>{student.email}</strong></div>
            <div><span>Branch</span><strong>{student.branch}</strong></div>
            <div><span>Semester</span><strong>{student.semester}</strong></div>
            <div><span>Mobile</span><strong>{student.mobile}</strong></div>
          </div>
        )}
      </section>
    </main>
  );
}
