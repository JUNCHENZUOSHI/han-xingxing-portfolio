import { useI18n, useProfileData } from '../../i18n/context';
import AuroraBackground from './AuroraBackground';
import DotGridOverlay from './DotGridOverlay';
import './Hero.css';

export default function Hero() {
  const { t } = useI18n();
  const profile = useProfileData();

  return (
    <section className="hero">
      {/* z-0: aurora fluid background (deepseek harness style, mouse-reactive) */}
      <AuroraBackground />
      {/* z-10: text content — centered in the banner, like the previous version */}
      <div className="hero__content">
        <span className="hero__label">{profile.title}</span>
        <h1 className="hero__name">{t('common.name')}</h1>
        <p className="hero__statement">{profile.tagline}</p>
        <div className="hero__cta">
          <a href="#work" className="btn-primary">{t('hero.viewCases')}</a>
          <a href={`${import.meta.env.BASE_URL}resume.pdf`} className="btn-secondary" download>{t('hero.downloadResume')}</a>
        </div>
      </div>
      {/* z-5: dot-grid overlay with cursor repulsion */}
      <DotGridOverlay />
    </section>
  );
}
