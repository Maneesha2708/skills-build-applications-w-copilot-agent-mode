import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeCollection } from '../lib/api';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : 'http://localhost:8000/api';
  const apiUrl = `${apiBaseUrl}/leaderboard/`;

  useEffect(() => {
    let isMounted = true;

    async function loadLeaderboard() {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        if (isMounted) {
          setEntries(normalizeCollection(payload));
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load leaderboard');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadLeaderboard();

    return () => {
      isMounted = false;
    };
  }, [apiUrl]);

  if (loading) {
    return <div className="alert alert-info">Loading leaderboard…</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="h4 mb-1">Leaderboard</h2>
          <p className="text-muted mb-0">Track standings across teams.</p>
        </div>
      </div>
      <div className="list-group">
        {entries.map((entry) => (
          <div className="list-group-item d-flex justify-content-between align-items-center" key={entry._id || entry.name}>
            <div>
              <h3 className="h6 mb-1">{entry.name}</h3>
              <p className="text-muted mb-0">{entry.teamName}</p>
            </div>
            <span className="badge text-bg-success">{entry.score}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Leaderboard;
