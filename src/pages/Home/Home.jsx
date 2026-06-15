import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n/context';
import { profile } from '../../data/profile';
import { cases, caseOrder } from '../../data/cases';
import Hero from '../../components/Hero/Hero';
import CaseCard from '../../components/CaseCard/CaseCard';
import CapabilityCard from '../../components/CapabilityCard/CapabilityCard';
import './Home.css';

export default function Home() {
  const { t } = useI18n();
  const trans = t('home.transition') || ['深度', '可迁移性', '宽度'];

  return (
    <>
      <Hero />

      {/* ── Transition Guide ── */}
      <section className="section transition-guide">
        <div className="container">
          <p className="transition-guide__text">
            <span className="transition-guide__item">{trans[0]}</span>
            <span className="transition-guide__sep">→</span>
            <span className="transition-guide__item">{trans[1]}</span>
            <span className="transition-guide__sep">→</span>
            <span className="transition-guide__item">{trans[2]}</span>
          </p>
        </div>
      </section>

      {/* ── Featured Cases ── */}
      <section className="section" id="work">
        <div className="container">
          <h2 className="section-heading">{t('home.featuredCases')}</h2>
          <CaseCard caseData={cases.sidekick} variant="featured" />
        </div>
      </section>

      {/* ── All Cases ── */}
      <section className="section">
        <div className="container">
          <h2 className="section-heading">{t('home.allCases')}</h2>
          <div className="case-grid">
            {caseOrder.map((slug) => (
              <CaseCard key={slug} caseData={cases[slug]} variant="standard" />
            ))}
          </div>
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section className="section section--alt">
        <div className="container">
          <h2 className="section-heading">{t('home.capabilities')}</h2>
          <div className="capability-grid capability-grid--5">
            {profile.homeCapabilities.map((cap) => (
              <CapabilityCard
                key={cap.title}
                title={cap.title}
                description={cap.description}
                items={cap.items}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── About Preview ── */}
      <section className="section">
        <div className="container">
          <h2 className="section-heading">{t('home.about')}</h2>
          <div className="about-preview">
            <div className="about-preview__intro">
              <p className="about-preview__text">
                {t('home.aboutText', { years: profile.yearsOfExperience })}
              </p>
            </div>
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
                <Link to="/about" className="text-link" style={{ marginTop: 'var(--space-8)' }}>
                  {t('home.moreAbout')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Experience ── */}
      <section className="section section--alt">
        <div className="container">
          <h2 className="section-heading">{t('home.experience')}</h2>
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
          <p className="experience-status">
            {profile.location} · {profile.status}
          </p>
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section className="section contact-cta">
        <div className="container">
          <div className="contact-cta__inner">
            <h2 className="contact-cta__heading">{t('home.letsTalk')}</h2>
            <p className="contact-cta__subtitle">{t('home.letsTalkSub')}</p>
            <div className="contact-cta__actions">
              <a href={`mailto:${profile.email}`} className="btn-primary">
                {profile.email}
              </a>
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
