import { Link } from 'react-router-dom';
import { useI18n, useProfileData } from '../../i18n/context';
import { profile } from '../../data/profile';
import { cases, caseOrder } from '../../data/cases';
import Hero from '../../components/Hero/Hero';
import CaseCard from '../../components/CaseCard/CaseCard';
import './Home.css';

export default function Home() {
  const { t } = useI18n();
  const profileData = useProfileData();
  const trans = t('home.transition') || ['深度', '可迁移性', '宽度'];

  return (
    <>
      <Hero />

      {/* Transition Guide */}
      <section className="section section--alt">
        <div className="container">
          <p style={{ textAlign: 'center', fontSize: 'var(--text-caption)', color: 'var(--color-text-tertiary)' }}>
            <span style={{ fontWeight: 'var(--weight-medium)', color: 'var(--color-text-secondary)' }}>{Array.isArray(trans) ? trans[0] : trans}</span>
            <span style={{ margin: '0 12px', color: 'var(--color-border)' }}>→</span>
            <span style={{ fontWeight: 'var(--weight-medium)', color: 'var(--color-text-secondary)' }}>{Array.isArray(trans) ? trans[1] : ''}</span>
            <span style={{ margin: '0 12px', color: 'var(--color-border)' }}>→</span>
            <span style={{ fontWeight: 'var(--weight-medium)', color: 'var(--color-text-secondary)' }}>{Array.isArray(trans) ? trans[2] : ''}</span>
          </p>
        </div>
      </section>

      {/* Featured Case */}
      <section className="section" id="work">
        <div className="container">
          <span className="section-label">{t('home.featuredCases')}</span>
          <CaseCard caseData={cases.sidekick} variant="featured" />
        </div>
      </section>

      {/* What I Do */}
      <section className="section section--alt">
        <div className="container">
          <span className="section-label">What I Do</span>
          <h2 className="section-heading">{t('home.capabilities')}</h2>
          <div className="capability-list">
            {profileData.homeCapabilities.map((cap) => (
              <div className="capability-item" key={cap.title}>
                <h3 className="capability-item__title">{cap.title}</h3>
                <p className="capability-item__desc">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Cases */}
      <section className="section">
        <div className="container">
          <span className="section-label">{t('home.allCases')}</span>
          <div className="case-grid">
            {caseOrder.map((slug) => (
              <CaseCard key={slug} caseData={cases[slug]} variant="standard" />
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section section--alt">
        <div className="container">
          <span className="section-label">{t('home.about')}</span>
          <div className="about-preview">
            <p className="about-preview__text">
              {t('home.aboutText', { years: profileData.yearsOfExperience })}
            </p>
            <div className="about-preview__columns">
              <div className="about-preview__col">
                <h3 className="about-preview__col-title">{t('home.industries')}</h3>
                <ul className="about-preview__list">
                  {profileData.industries.map((ind) => <li key={ind}>{ind}</li>)}
                </ul>
              </div>
              <div className="about-preview__col">
                <h3 className="about-preview__col-title">{t('home.workingStyle')}</h3>
                <p className="about-preview__col-text">{profileData.workingStyleSummary}</p>
                <Link to="/about" className="text-link">{t('home.moreAbout')}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="section">
        <div className="container">
          <span className="section-label">{t('home.experience')}</span>
          <div className="experience-list">
            {profileData.experience.map((exp, i) => (
              <div key={i}>
                {i > 0 && <hr className="divider divider--subtle" />}
                <div className="experience-item">
                  <div className="experience-item__meta">
                    <span className="experience-item__period">{exp.period}</span>
                    <span className="experience-item__location">{exp.location}</span>
                  </div>
                  <div className="experience-item__body">
                    <h3 className="experience-item__role">{exp.role}</h3>
                    <p className="experience-item__company">{exp.company}</p>
                    <p className="experience-item__desc">
                      {exp.highlights.slice(0, 2).join('。')}。
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="experience-status">{profile.location} · {profile.status}</p>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section section--alt contact-cta">
        <div className="container">
          <div className="contact-cta__inner">
            <h2 className="contact-cta__heading">{t('home.letsTalk')}</h2>
            <p className="contact-cta__subtitle">{t('home.letsTalkSub')}</p>
            <div className="contact-cta__actions">
              <a href={`mailto:${profile.email}`} className="btn-primary">{profile.email}</a>
              <a href={`${import.meta.env.BASE_URL}resume.pdf`} className="btn-secondary" download>
                {t('home.downloadResumePdf')}
              </a>
              <span className="contact-cta__meta">
                {profile.location} · {profile.phone} · {profile.status}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
