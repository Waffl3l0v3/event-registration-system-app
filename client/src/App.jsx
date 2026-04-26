import { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import RegistrationList from './components/RegistrationList';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('register');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setRefreshKey((k) => k + 1);
    // switch to list after short delay so user sees the success toast
    setTimeout(() => setActiveTab('list'), 1800);
  };

  return (
    <div className="app">
      {/* ── Navbar ── */}
      <header className="navbar">
        <div className="container navbar-inner">
          <div className="brand">
            <span className="brand-icon">🎪</span>
            <span className="brand-name">EventSphere</span>
          </div>
          <nav className="nav-tabs">
            <button
              id="tab-register"
              className={`tab-btn ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => setActiveTab('register')}
            >
              Register
            </button>
            <button
              id="tab-list"
              className={`tab-btn ${activeTab === 'list' ? 'active' : ''}`}
              onClick={() => setActiveTab('list')}
            >
              All Registrations
            </button>
          </nav>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-glow" />
        <div className="container hero-content">
          <h1 className="hero-title">
            Find Your Next <span className="gradient-text">Big Event</span>
          </h1>
          <p className="hero-sub">
            Register in seconds. Connect with thousands of like-minded participants.
          </p>
        </div>
      </section>

      {/* ── Main ── */}
      <main className="main-section container">
        {activeTab === 'register' ? (
          <RegistrationForm onSuccess={handleSuccess} />
        ) : (
          <RegistrationList refreshKey={refreshKey} />
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="footer">
        <p>© 2026 EventSphere · Built with 💜 on the MERN Stack</p>
      </footer>
    </div>
  );
}
