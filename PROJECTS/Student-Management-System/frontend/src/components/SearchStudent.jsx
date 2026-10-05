export default function SearchStudent({ search, onSearchChange, branch, onBranchChange }) {
  return (
    <section className="card search-card">
      <div className="search-grid">
        <label>
          Search by Student ID or Name
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Type an ID or name"
          />
        </label>

        <label>
          Filter by Branch
          <select value={branch} onChange={(event) => onBranchChange(event.target.value)}>
            <option value="ALL">All branches</option>
            <option value="CSE">CSE</option>
            <option value="CS">CS</option>
            <option value="IT">IT</option>
            <option value="ECE">ECE</option>
          </select>
        </label>
      </div>
    </section>
  );
}
