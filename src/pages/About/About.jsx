import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n/context';
import { profile } from '../../data/profile';
import CapabilityCard from '../../components/CapabilityCard/CapabilityCard';
import './About.css';

export default function About() {
  const { t } = useI18n();

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="about-hero">
            <span className="tag tag--accent">{profile.title}</span>
            <h1 className="about-hero__name">{profile.name}</h1>
            <p className="about-hero__tagline">{profile.tagline}</p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="section">
        <div className="container">
          <h2 className="section-heading">{t('about.heading')}</h2>
          <div className="text-container">
            <p className="case-text">
              {t('about.intro', { years: profile.yearsOfExperience })}
            </p>
            <div className="about-keywords">
              {profile.keywords.slice(0, 5).map((kw) => (
                <span className="tag" key={kw}>{kw}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Career Narrative */}
      <section className="section section--alt">
        <div className="container">
          <h2 className="section-heading">{t('about.careerNarrative')}</h2>
          <div className="text-container">
            <div className="about-narrative">
              {profile.narrative.map((chapter, i) => (
                <div className="about-narrative__chapter" key={i}>
                  <div className="about-narrative__period">
                    <span className="about-narrative__timeline">{chapter.period}</span>
                    <span className="about-narrative__label">{chapter.label}</span>
                  </div>
                  <p className="about-narrative__story">{chapter.story}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="section">
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
                    <ul className="about-highlights">
                      {exp.highlights.map((h, j) => <li key={j}>{h}</li>)}
                    </ul>
                    {exp.metrics.length > 0 && (
                      <div className="about-metrics">
                        {exp.metrics.map((m, k) => (
                          <span className="metric-value" key={k}>{m.label}: {m.value}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <hr className="divider divider--subtle" />
            <div className="experience-item">
              <div className="experience-item__meta">
                <span className="experience-item__period">{t('about.education')}</span>
              </div>
              <div className="experience-item__body">
                <h3 className="experience-item__role">{profile.education}</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section section--alt">
        <div className="container">
          <h2 className="section-heading">{t('about.capabilities')}</h2>
          <div className="capability-grid capability-grid--5">
            {profile.homeCapabilities.map((cap) => (
              <CapabilityCard key={cap.title} title={cap.title} description={cap.description} items={cap.items} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Evidence */}
      <section className="section">
        <div className="container">
          <h2 className="section-heading">Skills &amp; Evidence</h2>
          <div className="text-container">
            <table className="case-table">
              <thead>
                <tr>
                  <th>{t('about.capabilities')}</th>
                  <th>Evidence</th>
                </tr>
              </thead>
              <tbody>
                {profile.skills.map((s, i) => (
                  <tr key={i}><td>{s.name}</td><td>{s.evidence}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Working Style */}
      <section className="section section--alt">
        <div className="container">
          <h2 className="section-heading">{t('about.whatImNot')}</h2>
          <div className="text-container">
            <table className="case-table">
              <thead>
                <tr><th>Not</th><th>{t('about.coreValue')}</th></tr>
              </thead>
              <tbody>
                {profile.notStatements.map((ns, i) => (
                  <tr key={i}><td>{ns.not}</td><td>{ns.value}</td></tr>
                ))}
              </tbody>
            </table>
            <p className="about-core-value">{profile.coreValue}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="about-cta">
            <p className="about-cta__text">{profile.location} · {profile.status}</p>
            <div className="about-cta__actions">
              <Link to="/" className="btn-primary">{t('contact.viewCases')}</Link>
              <a href={`mailto:${profile.email}`} className="btn-secondary">{profile.email}</a>
              <a href={`${import.meta.env.BASE_URL}resume.pdf`} className="btn-secondary" download>{t('about.downloadResume')}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
