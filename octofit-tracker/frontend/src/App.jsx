import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import './App.css';

const navItems = [
  { to: '/', label: 'Overview' },
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4 p-lg-5">
              <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
                <div>
                  <p className="text-uppercase text-primary fw-semibold mb-2">OctoFit Tracker</p>
                  <h1 className="display-6 fw-bold mb-2">Track workouts, teams, and progress in one place.</h1>
                  <p className="lead text-muted mb-0">
                    This multi-tier app uses a React 19 frontend and a Node.js + Express API with MongoDB-backed data.
                  </p>
                </div>
                <div className="text-muted small">
                  <div>API base: {codespaceName ? `https://${codespaceName}-8000.app.github.dev/api` : 'http://localhost:8000/api'}</div>
                  <div className="text-secondary">Set VITE_CODESPACE_NAME in .env.local for Codespaces.</div>
                </div>
              </div>

              <nav className="nav nav-pills flex-wrap gap-2 mb-4">
                {navItems.map((item) => (
                  <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              <Routes>
                <Route
                  path="/"
                  element={
                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="card h-100 border-0 shadow-sm">
                          <div className="card-body">
                            <h2 className="h5">Overview</h2>
                            <p className="text-muted">Explore the tracker data across users, teams, activities, and workouts.</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="card h-100 border-0 shadow-sm">
                          <div className="card-body">
                            <h2 className="h5">API compatibility</h2>
                            <p className="text-muted">The UI works with array payloads and paginated responses via a safe normalization helper.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                />
                <Route path="/users" element={<Users />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/activities" element={<Activities />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/workouts" element={<Workouts />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
