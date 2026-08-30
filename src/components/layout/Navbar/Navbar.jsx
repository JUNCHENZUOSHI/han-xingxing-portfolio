import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useI18n } from '../../../i18n/context';
import { profile } from '../../../data/profile';
import './Navbar.css';

export default function Navbar() {
  const { lang, setLang, t, LANG_META, LANG_ORDER } = useI18n();
  const [scrolled, setScrolled] = useState(false);

  // Reveal the frosted-glass pill once the page has scrolled past the top.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <NavLink to="/" className="navbar__brand">
          <span className="navbar__brand-name">{t('common.name')}</span>
          <span className="navbar__slogan">{t('common.slogan')}</span>
        </NavLink>

        <div className="navbar__links">
          <NavLink to="/" end className="nav-link">{t('nav.work')}</NavLink>
          <NavLink to="/resume" className="nav-link">{t('nav.resume')}</NavLink>
          <a href={`mailto:${profile.email}`} className="nav-link">{t('nav.contact')}</a>

          {/* Segmented language toggle — deepseek.com/harness style */}
          <div className="lang-toggle" role="group" aria-label="Switch language">
            {LANG_ORDER.map((key) => {
              const meta = LANG_META[key];
              const active = key === lang;
              return (
                <button
                  key={key}
                  type="button"
                  className={`lang-toggle__item${active ? ' lang-toggle__item--active' : ''}`}
                  onClick={() => setLang(key)}
                  aria-pressed={active}
                  title={meta.label}
                >
                  {meta.short}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
