import { useEffect, useState } from 'react';
import { normalizeCollection } from '../lib/api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const apiUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/';

  useEffect(() => {
    let isMounted = true;

    async function loadWorkouts() {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        if (isMounted) {
          setWorkouts(normalizeCollection(payload));
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load workouts');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadWorkouts();

    return () => {
      isMounted = false;
    };
  }, [apiUrl]);

  if (loading) {
    return <div className="alert alert-info">Loading workouts…</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="h4 mb-1">Workouts</h2>
          <p className="text-muted mb-0">Planned routines for building momentum.</p>
        </div>
      </div>
      <div className="row g-3">
        {workouts.map((workout) => (
          <div className="col-md-6" key={workout._id || workout.name}>
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h3 className="h5">{workout.name}</h3>
                <p className="text-muted mb-2">{workout.intensity}</p>
                <p className="mb-0">{workout.durationMinutes} minutes</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Workouts;
