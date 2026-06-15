import { useI18n } from '../../i18n/context';
import { profile } from '../../data/profile';
import './Hero.css';

export default function Hero() {
  const { t } = useI18n();

  return (
    <section className="section hero">
      <div className="container">
        <div className="hero__content">
          <span className="tag tag--accent">{profile.title}</span>
          <h1 className="hero__name">{profile.name}</h1>
          <p className="hero__statement">{profile.tagline}</p>

          <div className="hero__trust">
            {profile.trustHooks.map((hook) => (
              <div className="hero__trust-item" key={hook.label}>
                <span className="hero__trust-number">{hook.number}</span>
                <span className="hero__trust-label">{hook.label}</span>
              </div>
            ))}
          </div>

          <div className="hero__tags">
            {profile.specialization.map((spec) => (
              <span className="tag" key={spec}>{spec}</span>
            ))}
          </div>

          <div className="hero__cta">
            <a href="#work" className="btn-primary">{t('hero.viewCases')}</a>
            <a href={`${import.meta.env.BASE_URL}resume.pdf`} className="btn-secondary" download>{t('hero.downloadResume')}</a>
            <a href={`mailto:${profile.email}`} className="btn-secondary">{t('hero.contact')}</a>
          </div>

          <p className="hero__scroll-hint">{t('hero.scrollHint')}</p>
        </div>
      </div>
    </section>
  );
}
