import React, { useState } from 'react';
import './Feedback.css';

const CATEGORIES = [
  'General Feedback',
  'Bug Report',
  'Feature Request',
  'Road Data Issue',
  'UI/UX Suggestion',
  'Other',
];

const RECENT_FEEDBACK = [
  { id: 1, category: 'Feature Request', subject: 'Export road reports to PDF', status: 'Under Review', statusColor: '#f59e0b', statusBg: '#fef3c7', date: '21 May 2026' },
  { id: 2, category: 'Bug Report', subject: 'Map markers overlap at zoom level 12', status: 'Resolved', statusColor: '#15803d', statusBg: '#dcfce7', date: '18 May 2026' },
  { id: 3, category: 'UI/UX Suggestion', subject: 'Add dark mode toggle', status: 'Implemented', statusColor: '#1d4ed8', statusBg: '#dbeafe', date: '14 May 2026' },
  { id: 4, category: 'General Feedback', subject: 'Dashboard is very helpful', status: 'Acknowledged', statusColor: '#7c3aed', statusBg: '#ede9fe', date: '10 May 2026' },
];

const STAR_LABELS = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

export const Feedback: React.FC = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    category: '',
    subject: '',
    message: '',
    rating: 0,
    attachment: null as File | null,
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required.';
    if (!form.email.trim()) e.email = 'Email address is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email address.';
    if (!form.category) e.category = 'Please select a category.';
    if (!form.subject.trim()) e.subject = 'Subject is required.';
    if (!form.message.trim()) e.message = 'Message is required.';
    if (form.rating === 0) e.rating = 'Please give a rating.';
    return e;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(err => { const copy = { ...err }; delete copy[name]; return copy; });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm(f => ({ ...f, attachment: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setForm({ fullName: '', email: '', category: '', subject: '', message: '', rating: 0, attachment: null });
      setErrors({});
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1000);
  };

  const handleDismissSuccess = () => setSubmitted(false);

  return (
    <div className="feedback-page animate-fade-in">
      {/* Page Header */}
      <div className="feedback-header">
        <div className="feedback-header-inner">
          <div className="feedback-header-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <div>
            <h1 className="feedback-title">💬 Feedback &amp; Suggestions</h1>
            <p className="feedback-subtitle">Help us improve RoadLens by sharing your experience, ideas and suggestions.</p>
          </div>
        </div>
      </div>

      {/* Success Banner */}
      {submitted && (
        <div className="feedback-success-banner">
          <div className="success-inner">
            <span className="success-icon">✅</span>
            <div>
              <strong>Feedback submitted successfully!</strong>
              <p>Thank you for helping improve RoadLens. Your feedback has been received and our team will review it shortly.</p>
            </div>
            <button className="success-dismiss" onClick={handleDismissSuccess} aria-label="Dismiss">✕</button>
          </div>
        </div>
      )}

      <div className="feedback-layout">
        {/* Main Form Card */}
        <div className="feedback-form-card">
          <h2 className="form-section-title">Submit Your Feedback</h2>

          <form onSubmit={handleSubmit} noValidate>
            {/* Name + Email */}
            <div className="form-row-2col">
              <div className="form-group">
                <label className="form-label">Full Name <span className="required">*</span></label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`form-input${errors.fullName ? ' has-error' : ''}`}
                />
                {errors.fullName && <span className="form-error">{errors.fullName}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Email Address <span className="required">*</span></label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`form-input${errors.email ? ' has-error' : ''}`}
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>
            </div>

            {/* Category + Subject */}
            <div className="form-row-2col">
              <div className="form-group">
                <label className="form-label">Feedback Category <span className="required">*</span></label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className={`form-input form-select${errors.category ? ' has-error' : ''}`}
                >
                  <option value="">Select a category</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                {errors.category && <span className="form-error">{errors.category}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Subject <span className="required">*</span></label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Brief subject line"
                  className={`form-input${errors.subject ? ' has-error' : ''}`}
                />
                {errors.subject && <span className="form-error">{errors.subject}</span>}
              </div>
            </div>

            {/* Message */}
            <div className="form-group">
              <label className="form-label">Message <span className="required">*</span></label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                placeholder="Describe your feedback, idea, or issue in detail..."
                className={`form-input form-textarea${errors.message ? ' has-error' : ''}`}
              />
              {errors.message && <span className="form-error">{errors.message}</span>}
            </div>

            {/* Star Rating */}
            <div className="form-group">
              <label className="form-label">Overall Rating <span className="required">*</span></label>
              <div className="star-rating-row">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    className={`star-btn${(hoverRating || form.rating) >= star ? ' active' : ''}`}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => { setForm(f => ({ ...f, rating: star })); if (errors.rating) setErrors(err => { const copy = { ...err }; delete copy.rating; return copy; }); }}
                    aria-label={`Rate ${star} — ${STAR_LABELS[star - 1]}`}
                  >
                    ★
                  </button>
                ))}
                {(hoverRating || form.rating) > 0 && (
                  <span className="star-label">{STAR_LABELS[(hoverRating || form.rating) - 1]}</span>
                )}
              </div>
              {errors.rating && <span className="form-error">{errors.rating}</span>}
            </div>

            {/* Attachment */}
            <div className="form-group">
              <label className="form-label">Attachment <span className="form-optional">(Optional)</span></label>
              <div className="file-upload-zone">
                <input type="file" id="attachment" accept="image/*,.pdf" onChange={handleFileChange} className="file-input-hidden" />
                <label htmlFor="attachment" className="file-upload-label">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  {form.attachment ? (
                    <span className="file-name">{form.attachment.name}</span>
                  ) : (
                    <span>Click to upload image or PDF <span className="file-hint">(max 5MB)</span></span>
                  )}
                </label>
              </div>
            </div>

            {/* Submit */}
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="submitting-row">
                  <span className="submit-spinner"></span>
                  Submitting…
                </span>
              ) : (
                '✉️  Submit Feedback'
              )}
            </button>
          </form>
        </div>

        {/* Sidebar */}
        <div className="feedback-sidebar">
          {/* Recent Feedback Status */}
          <div className="feedback-sidebar-card">
            <h3 className="sidebar-section-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              Recent Feedback Status
            </h3>
            <div className="recent-feedback-list">
              {RECENT_FEEDBACK.map(item => (
                <div key={item.id} className="recent-feedback-item">
                  <div className="rf-top">
                    <span className="rf-category">{item.category}</span>
                    <span className="rf-status-badge" style={{ background: item.statusBg, color: item.statusColor }}>{item.status}</span>
                  </div>
                  <div className="rf-subject">{item.subject}</div>
                  <div className="rf-date">{item.date}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="feedback-sidebar-card contact-card">
            <h3 className="sidebar-section-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3-8.59A2 2 0 0 1 3.68 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.9-.85a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Need Direct Help?
            </h3>
            <div className="contact-info-list">
              <div className="contact-info-item">
                <span className="contact-label">Support Email</span>
                <span className="contact-value">support@roadlens.in</span>
              </div>
              <div className="contact-info-item">
                <span className="contact-label">Helpline</span>
                <span className="contact-value">1800-103-5000</span>
              </div>
              <div className="contact-info-item">
                <span className="contact-label">Working Hours</span>
                <span className="contact-value">Mon–Fri, 9AM–6PM IST</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
