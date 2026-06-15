import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n/context';
import { profile } from '../../data/profile';
import { cases, caseOrder } from '../../data/cases';
import Hero from '../../components/Hero/Hero';
import CaseCard from '../../components/CaseCard/CaseCard';
import './Home.css';

export default function Home() {
  const { t } = useI18n();

  return (
    <>
      {/* ── Hero — white bg ── */}
      <Hero />

      {/* ── Featured Case — #f5f5f7 ── */}
      <section className="section section--alt" id="work">
        <div className="container">
          <span className="section-label">{t('home.featuredCases')}</span>
          <CaseCard caseData={cases.sidekick} variant="featured" />
        </div>
      </section>

      {/* ── What I Do — white bg ── */}
      <section className="section">
        <div className="container">
          <span className="section-label">What I Do</span>
          <h2 className="section-heading">{t('home.capabilities')}</h2>
          <div className="capability-list">
            {profile.homeCapabilities.map((cap) => (
              <div className="capability-item" key={cap.title}>
                <h3 className="capability-item__title">{cap.title}</h3>
                <p className="capability-item__desc">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── All Cases — #f5f5f7 ── */}
      <section className="section section--alt">
        <div className="container">
          <span className="section-label">{t('home.allCases')}</span>
          <div className="case-grid">
            {caseOrder.map((slug) => (
              <CaseCard key={slug} caseData={cases[slug]} variant="standard" />
            ))}
          </div>
        </div>
      </section>

      {/* ── About — white bg ── */}
      <section className="section">
        <div className="container">
          <span className="section-label">{t('home.about')}</span>
          <div className="about-preview">
            <p className="about-preview__text">
              {t('home.aboutText', { years: profile.yearsOfExperience })}
            </p>
            <div className="about-preview__columns">
              <div className="about-preview__col">
                <h3 className="about-preview__col-title">{t('home.industries')}</h3>
                <ul className="about-preview__list">
                  {profile.industries.map((ind) => <li key={ind}>{ind}</li>)}
                </ul>
              </div>
              <div className="about-preview__col">
                <h3 className="about-preview__col-title">{t('home.workingStyle')}</h3>
                <p className="about-preview__col-text">{profile.workingStyleSummary}</p>
                <Link to="/about" className="text-link">{t('home.moreAbout')}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Experience — #f5f5f7 ── */}
      <section className="section section--alt">
        <div className="container">
          <span className="section-label">{t('home.experience')}</span>
          <div className="experience-list">
            {profile.experience.map((exp, i) => (
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

      {/* ── Contact CTA — white bg ── */}
      <section className="section contact-cta">
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
