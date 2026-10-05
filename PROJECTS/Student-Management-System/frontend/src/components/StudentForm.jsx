import { useEffect, useState } from 'react';

const emptyForm = {
  id: '',
  name: '',
  email: '',
  branch: 'CSE',
  semester: '1',
  mobile: ''
};

export default function StudentForm({ editingStudent, onSave, onCancelEdit, busy }) {
  const [form, setForm] = useState(emptyForm);
  const [clientError, setClientError] = useState('');

  useEffect(() => {
    if (editingStudent) {
      setForm({
        ...editingStudent,
        id: String(editingStudent.id),
        semester: String(editingStudent.semester)
      });
    } else {
      setForm(emptyForm);
    }
    setClientError('');
  }, [editingStudent]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function validate() {
    if (!form.id || Number(form.id) <= 0) return 'Student ID is required.';
    if (!form.name.trim()) return 'Name is required.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return 'Enter a valid email address.';
    if (!['CSE', 'CS', 'IT', 'ECE'].includes(form.branch)) return 'Select a valid branch.';
    if (Number(form.semester) < 1 || Number(form.semester) > 8) return 'Semester must be from 1 to 8.';
    if (!/^\d{10}$/.test(form.mobile)) return 'Mobile number must be exactly 10 digits.';
    return '';
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const error = validate();
    if (error) {
      setClientError(error);
      return;
    }

    setClientError('');
    const success = await onSave({
      ...form,
      id: Number(form.id),
      semester: Number(form.semester),
      name: form.name.trim(),
      email: form.email.trim(),
      mobile: form.mobile.trim()
    });

    if (success && !editingStudent) {
      setForm(emptyForm);
    }
  }

  return (
    <section className="card form-card">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Student form</p>
          <h2>{editingStudent ? 'Update Student' : 'Add Student'}</h2>
        </div>
        {editingStudent && (
          <button type="button" className="btn btn-ghost" onClick={onCancelEdit}>
            Cancel edit
          </button>
        )}
      </div>

      {clientError && <div className="alert alert-error">{clientError}</div>}

      <form className="student-form" onSubmit={handleSubmit} noValidate>
        <label>
          Student ID
          <input
            name="id"
            type="number"
            min="1"
            value={form.id}
            onChange={handleChange}
            placeholder="e.g. 101"
            required
          />
        </label>

        <label>
          Name
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Student name"
            required
          />
        </label>

        <label>
          Email
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="student@example.com"
            required
          />
        </label>

        <label>
          Branch
          <select name="branch" value={form.branch} onChange={handleChange}>
            <option value="CSE">CSE</option>
            <option value="CS">CS</option>
            <option value="IT">IT</option>
            <option value="ECE">ECE</option>
          </select>
        </label>

        <label>
          Semester
          <input
            name="semester"
            type="number"
            min="1"
            max="8"
            value={form.semester}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Mobile Number
          <input
            name="mobile"
            type="tel"
            inputMode="numeric"
            maxLength="10"
            value={form.mobile}
            onChange={handleChange}
            placeholder="10 digits"
            required
          />
        </label>

        <button className="btn btn-primary form-submit" type="submit" disabled={busy}>
          {busy ? 'Saving...' : editingStudent ? 'Update Student' : 'Add Student'}
        </button>
      </form>
    </section>
  );
}
