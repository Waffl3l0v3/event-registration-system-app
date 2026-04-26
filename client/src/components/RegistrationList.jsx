import { useState, useEffect, useCallback } from 'react';
import { getAllRegistrations, deleteRegistration } from '../api/registrationApi';
import './RegistrationList.css';

const YEAR_COLORS = {
  FE: 'badge-green',
  SE: 'badge-purple',
  TE: 'badge-yellow',
  BE: 'badge-purple',
  Other: 'badge-green',
};

export default function RegistrationList({ refreshKey }) {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading]             = useState(true);
  const [search, setSearch]               = useState('');
  const [deletingId, setDeletingId]       = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllRegistrations();
      setRegistrations(res.data.data);
    } catch {
      setRegistrations([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData, refreshKey]);

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this registration?')) return;
    setDeletingId(id);
    try {
      await deleteRegistration(id);
      setRegistrations((prev) => prev.filter((r) => r._id !== id));
    } catch {
      alert('Could not delete. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = registrations.filter((r) => {
    const q = search.toLowerCase();
    return (
      r.name.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      r.eventName.toLowerCase().includes(q) ||
      (r.college || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="reg-list-wrap">
      <div className="list-header">
        <div className="list-title">
          <h2>📋 Registrations</h2>
          <span className="count-badge">{registrations.length} total</span>
        </div>
        <input
          id="search-registrations"
          className="search-input"
          type="text"
          placeholder="🔍 Search by name, email, event…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="list-loader">
          <span className="spinner" />
          <p>Loading registrations…</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🗂️</div>
          <p>{search ? 'No results match your search.' : 'No registrations yet. Be the first!'}</p>
        </div>
      ) : (
        <div className="reg-grid">
          {filtered.map((reg) => (
            <div key={reg._id} className="reg-card card">
              <div className="reg-card-top">
                <div className="reg-avatar">{reg.name[0].toUpperCase()}</div>
                <div className="reg-info">
                  <span className="reg-name">{reg.name}</span>
                  <span className="reg-email">{reg.email}</span>
                </div>
                <button
                  id={`delete-${reg._id}`}
                  className="btn btn-danger delete-btn"
                  onClick={() => handleDelete(reg._id)}
                  disabled={deletingId === reg._id}
                  title="Remove registration"
                >
                  {deletingId === reg._id ? <span className="spinner" style={{ width: 14, height: 14, borderWidth: 2 }} /> : '✕'}
                </button>
              </div>

              <div className="reg-event-chip">
                🎫 {reg.eventName}
              </div>

              <div className="reg-meta">
                {reg.phone && <span>📞 {reg.phone}</span>}
                {reg.college && <span>🏫 {reg.college}</span>}
                <span className={`badge ${YEAR_COLORS[reg.year] || 'badge-purple'}`}>{reg.year}</span>
              </div>

              {reg.message && (
                <p className="reg-message">"{reg.message}"</p>
              )}

              <div className="reg-date">
                {new Date(reg.createdAt).toLocaleDateString('en-IN', {
                  day: '2-digit', month: 'short', year: 'numeric',
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
