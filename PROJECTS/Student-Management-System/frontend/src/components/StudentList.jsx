import { Link } from 'react-router-dom';

export default function StudentList({ students, onEdit, onDelete, page, totalPages, onPageChange }) {
  return (
    <section className="card list-card">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Records</p>
          <h2>All Students</h2>
        </div>
        <span className="count-badge">{students.length} on this page</span>
      </div>

      {students.length === 0 ? (
        <div className="empty-state">
          <h3>No student found</h3>
          <p>Add a student or change the search/filter.</p>
        </div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Branch</th>
                <th>Semester</th>
                <th>Mobile</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td><span className="branch-chip">{student.branch}</span></td>
                  <td>{student.semester}</td>
                  <td>{student.mobile}</td>
                  <td>
                    <div className="actions">
                      <Link className="btn btn-small btn-ghost" to={`/student/${student.id}`}>
                        View
                      </Link>
                      <button className="btn btn-small btn-edit" onClick={() => onEdit(student)}>
                        Edit
                      </button>
                      <button className="btn btn-small btn-delete" onClick={() => onDelete(student)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="btn btn-ghost"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>Page {page} of {totalPages}</span>
          <button
            className="btn btn-ghost"
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}
