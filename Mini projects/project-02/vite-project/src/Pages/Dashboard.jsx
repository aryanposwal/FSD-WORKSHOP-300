import Navbar from "../components/Navbar";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div className="dashboard-page">
      <Navbar />

      <main className="dashboard-container">
        <section className="welcome-section">
          <p className="eyebrow">Dashboard</p>
          <h1>Welcome, {user?.name || "User"}.</h1>
          <p>
            Here's a quick overview of your account.
          </p>
        </section>

        <section className="stats-grid">
          <div className="stat-card">
            <p>Total Projects</p>
            <h2>12</h2>
            <span>3 added this month</span>
          </div>

          <div className="stat-card">
            <p>Active Tasks</p>
            <h2>24</h2>
            <span>8 due this week</span>
          </div>

          <div className="stat-card">
            <p>Completed</p>
            <h2>86%</h2>
            <span>Overall completion</span>
          </div>
        </section>

        <section className="dashboard-card">
          <div>
            <p className="eyebrow">Account</p>
            <h2>Your profile</h2>
          </div>

          <div className="profile-info">
            <div>
              <span>Name</span>
              <strong>{user?.name}</strong>
            </div>

            <div>
              <span>Email</span>
              <strong>{user?.email}</strong>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;