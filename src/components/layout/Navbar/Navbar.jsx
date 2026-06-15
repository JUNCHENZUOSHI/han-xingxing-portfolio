import { NavLink } from 'react-router-dom';
import { useI18n } from '../../../i18n/context';
import { profile } from '../../../data/profile';
import './Navbar.css';

export default function Navbar() {
  const { lang, toggleLang, t } = useI18n();

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <NavLink to="/" className="navbar__brand">{profile.name}</NavLink>
        <div className="navbar__links">
          <NavLink to="/" end className="nav-link">{t('nav.work')}</NavLink>
          <NavLink to="/resume" className="nav-link">{t('nav.resume')}</NavLink>
          <a href={`mailto:${profile.email}`} className="nav-link">{t('nav.contact')}</a>
          <button className="lang-switcher" onClick={toggleLang} aria-label="Switch language">
            <span className={lang === 'zh' ? 'lang-switcher__active' : ''}>中</span>
            <span className="lang-switcher__sep">/</span>
            <span className={lang === 'en' ? 'lang-switcher__active' : ''}>EN</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
