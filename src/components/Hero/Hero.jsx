import { useI18n, useProfileData } from '../../i18n/context';
import './Hero.css';

export default function Hero() {
  const { t } = useI18n();
  const profile = useProfileData();

  return (
    <section className="hero">
      <div
        className="hero__bg"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}hero-bg.svg)` }}
        aria-hidden="true"
      />
      <div className="hero__content">
        <span className="hero__label">{profile.title}</span>
        <h1 className="hero__name">{t('common.name')}</h1>
        <p className="hero__statement">{profile.tagline}</p>
        <div className="hero__cta">
          <a href="#work" className="btn-primary">{t('hero.viewCases')}</a>
          <a href={`${import.meta.env.BASE_URL}resume.pdf`} className="btn-secondary" download>{t('hero.downloadResume')}</a>
        </div>
      </div>
    </section>
  );
}
