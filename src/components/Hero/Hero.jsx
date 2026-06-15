import { useI18n } from '../../i18n/context';
import { profile } from '../../data/profile';
import './Hero.css';

export default function Hero() {
  const { t } = useI18n();

  return (
    <section className="hero">
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
