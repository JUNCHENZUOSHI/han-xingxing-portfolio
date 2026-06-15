import { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useI18n } from '../../../i18n/context';
import { profile } from '../../../data/profile';
import './Navbar.css';

export default function Navbar() {
  const { lang, setLang, t, LANG_META, LANG_ORDER } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const current = LANG_META[lang];

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <NavLink to="/" className="navbar__brand">{t('common.name')}</NavLink>
        <div className="navbar__links">
          <NavLink to="/" end className="nav-link">{t('nav.work')}</NavLink>
          <NavLink to="/resume" className="nav-link">{t('nav.resume')}</NavLink>
          <a href={`mailto:${profile.email}`} className="nav-link">{t('nav.contact')}</a>

          {/* Language dropdown */}
          <div className="lang-dropdown" ref={ref}>
            <button
              className="lang-dropdown__trigger"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label="Switch language"
            >
              <span className="lang-dropdown__icon">{current.icon}</span>
              <span className="lang-dropdown__label">{current.label}</span>
              <span className={`lang-dropdown__arrow${open ? ' lang-dropdown__arrow--open' : ''}`}>▾</span>
            </button>
            {open && (
              <ul className="lang-dropdown__menu">
                {LANG_ORDER.map((key) => {
                  const meta = LANG_META[key];
                  const active = key === lang;
                  return (
                    <li key={key}>
                      <button
                        className={`lang-dropdown__item${active ? ' lang-dropdown__item--active' : ''}`}
                        onClick={() => { setLang(key); setOpen(false); }}
                      >
                        <span className="lang-dropdown__icon">{meta.icon}</span>
                        <span>{meta.label}</span>
                        {active && <span className="lang-dropdown__check">✓</span>}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
