import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeCollection } from '../lib/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadActivities() {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(buildApiUrl('activities'));
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        if (isMounted) {
          setActivities(normalizeCollection(payload));
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load activities');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadActivities();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading activities…</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="h4 mb-1">Activities</h2>
          <p className="text-muted mb-0">Recent workouts and movement logs.</p>
        </div>
      </div>
      <div className="row g-3">
        {activities.map((activity) => (
          <div className="col-md-6" key={activity._id || activity.type + activity.userName}>
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h3 className="h5">{activity.type}</h3>
                <p className="text-muted mb-2">{activity.userName}</p>
                <p className="mb-0">{activity.durationMinutes} minutes</p>
                {activity.distanceMiles ? <small className="text-muted">{activity.distanceMiles} miles</small> : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Activities;
