import { Link, NavLink } from 'react-router-dom';
import { profile } from '../../../data/profile';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand">{profile.name}</Link>
        <div className="navbar__links">
          <NavLink to="/" end className="nav-link">Work</NavLink>
          <a href="/resume.pdf" className="nav-link">Resume</a>
          <a href={`mailto:${profile.email}`} className="nav-link" aria-label="Contact">✉</a>
        </div>
      </div>
    </nav>
  );
}
