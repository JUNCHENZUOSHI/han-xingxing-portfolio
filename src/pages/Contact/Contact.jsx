import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n/context';
import { profile } from '../../data/profile';
import './Contact.css';

export default function Contact() {
  const { t } = useI18n();

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="contact-hero">
            <h1 className="case-title">{t('contact.heading')}</h1>
            <p className="case-subtitle">
              {t('contact.subtitle', { roles: profile.targetRoles.slice(0, 2).join(' / ') })}
            </p>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-item">
              <span className="contact-item__label">{t('contact.email')}</span>
              <a href={`mailto:${profile.email}`} className="text-link contact-item__link">{profile.email}</a>
            </div>
            <div className="contact-item">
              <span className="contact-item__label">{t('contact.phone')}</span>
              <span className="contact-item__value">{profile.phone}</span>
            </div>
            <div className="contact-item">
              <span className="contact-item__label">{t('contact.location')}</span>
              <span className="contact-item__value">{profile.location}</span>
            </div>
            <div className="contact-item">
              <span className="contact-item__label">{t('contact.availability')}</span>
              <span className="contact-item__value contact-item__value--status">{profile.status}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-resume">
            <h2 className="section-heading">{t('contact.resumeHeading')}</h2>
            <div className="contact-resume__inner">
              <p className="contact-resume__text">{t('contact.resumeText')}</p>
              <a href={`${import.meta.env.BASE_URL}resume.pdf`} className="btn-primary" download>
                {t('contact.downloadResume')}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="contact-links">
            <Link to="/" className="btn-secondary">{t('contact.viewCases')}</Link>
            <Link to="/about" className="btn-secondary">{t('contact.aboutMe')}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
