import { Link } from 'react-router-dom';
import { profile } from '../../data/profile';
import './Contact.css';

export default function Contact() {
  return (
    <>
      {/* ============================================================
          1. Hero
          ============================================================ */}
      <section className="section">
        <div className="container">
          <div className="contact-hero">
            <h1 className="case-title">Contact</h1>
            <p className="case-subtitle">
              Currently available for {profile.targetRoles.slice(0, 2).join(' / ')} opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
          2. Primary Contact Cards
          ============================================================ */}
      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-item">
              <span className="contact-item__label">Email</span>
              <a href={`mailto:${profile.email}`} className="text-link contact-item__link">
                {profile.email}
              </a>
            </div>

            <div className="contact-item">
              <span className="contact-item__label">Phone</span>
              <span className="contact-item__value">{profile.phone}</span>
            </div>

            <div className="contact-item">
              <span className="contact-item__label">Location</span>
              <span className="contact-item__value">
                {profile.location}
              </span>
            </div>

            <div className="contact-item">
              <span className="contact-item__label">Availability</span>
              <span className="contact-item__value contact-item__value--status">
                {profile.status}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          3. Resume Download
          ============================================================ */}
      <section className="section">
        <div className="container">
          <div className="contact-resume">
            <h2 className="section-heading">Resume</h2>
            <div className="contact-resume__inner">
              <p className="contact-resume__text">
                Detailed work history, quantified results, and full case context.
              </p>
              <a href="/resume.pdf" className="btn-primary" download>
                Download Resume (PDF)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          4. Quick Links
          ============================================================ */}
      <section className="section">
        <div className="container">
          <div className="contact-links">
            <Link to="/" className="btn-secondary">View Case Studies</Link>
            <Link to="/about" className="btn-secondary">About Me</Link>
          </div>
        </div>
      </section>
    </>
  );
}
