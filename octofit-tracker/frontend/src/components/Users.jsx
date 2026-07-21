import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeCollection } from '../lib/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const apiUrl = buildApiUrl('users');

  useEffect(() => {
    let isMounted = true;

    async function loadUsers() {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        if (isMounted) {
          setUsers(normalizeCollection(payload));
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load users');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, [apiUrl]);

  if (loading) {
    return <div className="alert alert-info">Loading users…</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="h4 mb-1">Users</h2>
          <p className="text-muted mb-0">Browse the latest members in the tracker.</p>
        </div>
      </div>
      <div className="row g-3">
        {users.map((user) => (
          <div className="col-md-6" key={user._id || user.email}>
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h3 className="h5">{user.name}</h3>
                <p className="text-muted mb-2">{user.email}</p>
                <span className="badge text-bg-primary">{user.fitnessGoal}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Users;
