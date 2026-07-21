import './App.css'

function App() {
  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-5">
              <p className="text-uppercase text-primary fw-semibold">OctoFit Tracker</p>
              <h1 className="display-5 fw-bold mb-3">Track workouts, teams, and progress in one place.</h1>
              <p className="lead text-muted mb-4">
                This modern multi-tier app is now scaffolded with a React 19 frontend, an Express + TypeScript backend, and MongoDB connectivity.
              </p>
              <div className="d-flex gap-3">
                <a className="btn btn-primary btn-lg" href="http://localhost:8000/api/health">
                  Check API health
                </a>
                <a className="btn btn-outline-secondary btn-lg" href="http://localhost:5173">
                  Open frontend
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
