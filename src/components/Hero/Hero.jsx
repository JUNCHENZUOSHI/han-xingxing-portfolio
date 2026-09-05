import { useI18n, useProfileData } from '../../i18n/context';
import AuroraBackground from './AuroraBackground';
import DotGridOverlay from './DotGridOverlay';
import './Hero.css';

export default function Hero() {
  const { t } = useI18n();
  const profile = useProfileData();

  return (
    <section className="hero">
      <AuroraBackground />
      {/* z-10: text content — centered in the banner, like the previous version */}
      <div className="hero__content">
        <span className="hero__label">{profile.title}</span>
        <h1 className="hero__name">{t('common.name')}</h1>
        <p className="hero__statement">{profile.tagline}</p>
        <div className="hero__cta">
          <a href="#work" className="btn-primary">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t('hero.viewCases')}
          </a>
          <a href={`${import.meta.env.BASE_URL}resume.pdf`} className="btn-secondary" download>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 1.5v8M4.5 6.5L8 10l3.5-3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2.5 13.5h11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            {t('hero.downloadResume')}
          </a>
        </div>
      </div>
      {/* z-5: dot-grid overlay with cursor repulsion */}
      <DotGridOverlay />
    </section>
  );
}
