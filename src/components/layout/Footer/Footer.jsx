import { profile } from '../../../data/profile';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <hr className="divider divider--subtle" />
        <div className="footer__inner">
          <div className="footer__contact">
            <a href={`mailto:${profile.email}`} className="text-link">{profile.email}</a>
            <span className="footer__sep">·</span>
            <span>{profile.phone}</span>
            <span className="footer__sep">·</span>
            <span>📍 {profile.location} · {profile.status}</span>
          </div>
          <div className="footer__actions">
            <a href="/resume.pdf" className="text-link">Download Resume (PDF)</a>
          </div>
          <p className="footer__copy">© 2026 {profile.name}</p>
        </div>
      </div>
    </footer>
  );
}
