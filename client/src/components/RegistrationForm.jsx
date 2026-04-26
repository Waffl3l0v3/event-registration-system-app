import { useState } from 'react';
import { registerForEvent } from '../api/registrationApi';
import './RegistrationForm.css';

const EVENTS = [
  'TechFest 2026',
  'Hackathon Sprint',
  'AI & ML Workshop',
  'Cybersecurity Bootcamp',
  'Web Dev Bootcamp',
  'Robotics Championship',
];

const YEARS = ['FE', 'SE', 'TE', 'BE', 'Other'];

const initialForm = {
  name: '',
  email: '',
  phone: '',
  eventName: '',
  college: '',
  year: 'Other',
  message: '',
};

export default function RegistrationForm({ onSuccess }) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null); // { type, text }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setAlert(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);
    try {
      await registerForEvent(form);
      setAlert({ type: 'success', text: `🎉 Successfully registered for "${form.eventName}"!` });
      setForm(initialForm);
      if (onSuccess) onSuccess();
    } catch (err) {
      const msg = err?.response?.data?.message || 'Registration failed. Please try again.';
      setAlert({ type: 'error', text: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reg-form-wrap card">
      <div className="reg-form-header">
        <div className="reg-icon">🎟️</div>
        <div>
          <h2>Register for an Event</h2>
          <p className="subtitle">Fill in your details to secure your spot</p>
        </div>
      </div>

      {alert && (
        <div className={`alert alert-${alert.type}`}>{alert.text}</div>
      )}

      <form onSubmit={handleSubmit} id="registration-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="e.g. Rewa Shete"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              placeholder="+91 98765 43210"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="eventName">Select Event *</label>
            <select
              id="eventName"
              name="eventName"
              value={form.eventName}
              onChange={handleChange}
              required
            >
              <option value="" disabled>-- Choose an event --</option>
              {EVENTS.map((ev) => (
                <option key={ev} value={ev}>{ev}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="college">College / Institution</label>
            <input
              id="college"
              type="text"
              name="college"
              placeholder="e.g. PICT, Pune"
              value={form.college}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="year">Year of Study</label>
            <select
              id="year"
              name="year"
              value={form.year}
              onChange={handleChange}
            >
              {YEARS.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="message">Any Message / Query</label>
          <textarea
            id="message"
            name="message"
            placeholder="Optional — questions, dietary requirements, etc."
            value={form.message}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <button
          id="submit-registration"
          type="submit"
          className="btn btn-primary submit-btn"
          disabled={loading}
        >
          {loading ? <span className="spinner" /> : '✨ Register Now'}
        </button>
      </form>
    </div>
  );
}
