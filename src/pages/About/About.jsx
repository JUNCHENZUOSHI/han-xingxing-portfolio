import { Link } from 'react-router-dom';
import { useI18n, useProfileData } from '../../i18n/context';
import { profile } from '../../data/profile';
import './About.css';

export default function About() {
  const { t } = useI18n();
  const pd = useProfileData();

  return (
    <>
      {/* Hero */}
      <section className="section">
        <div className="container">
          <div className="about-hero">
            <span className="section-label">{pd.title}</span>
            <h1 className="about-hero__name">{t('common.name')}</h1>
            <p className="about-hero__tagline">{pd.tagline}</p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="section section--alt">
        <div className="container">
          <h2 className="section-heading">{t('about.heading')}</h2>
          <div className="text-container">
            <p className="about-text">{t('about.intro', { years: pd.yearsOfExperience })}</p>
            <div className="about-keywords">
              {pd.keywords.slice(0, 5).map((kw) => <span className="tag" key={kw}>{kw}</span>)}
            </div>
          </div>
        </div>
      </section>

      {/* Career Narrative */}
      <section className="section">
        <div className="container">
          <h2 className="section-heading">{t('about.careerNarrative')}</h2>
          <div className="text-container">
            <div className="about-narrative">
              {pd.narrative.map((chapter, i) => (
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
      <section className="section section--alt">
        <div className="container">
          <h2 className="section-heading">{t('home.experience')}</h2>
          <div className="experience-list">
            {pd.experience.map((exp, i) => (
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
                          <span className="about-metric" key={k}>{m.label}: {m.value}</span>
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
                <h3 className="experience-item__role">{pd.education}</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What I Do */}
      <section className="section">
        <div className="container">
          <h2 className="section-heading">{t('about.capabilities')}</h2>
          <div className="capability-list">
            {pd.homeCapabilities.map((cap) => (
              <div className="capability-item" key={cap.title}>
                <h3 className="capability-item__title">{cap.title}</h3>
                <p className="capability-item__desc">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="section section--alt">
        <div className="container">
          <h2 className="section-heading">Skills &amp; Evidence</h2>
          <div className="text-container">
            <table className="case-table">
              <thead>
                <tr><th>{t('about.capabilities')}</th><th>Evidence</th></tr>
              </thead>
              <tbody>
                {pd.skills.map((s, i) => (
                  <tr key={i}><td>{s.name}</td><td>{s.evidence}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Working Style */}
      <section className="section">
        <div className="container">
          <h2 className="section-heading">{t('about.whatImNot')}</h2>
          <div className="text-container">
            <table className="case-table">
              <thead>
                <tr><th>Not</th><th>{t('about.coreValue')}</th></tr>
              </thead>
              <tbody>
                {pd.notStatements.map((ns, i) => (
                  <tr key={i}><td>{ns.not}</td><td>{ns.value}</td></tr>
                ))}
              </tbody>
            </table>
            <p className="about-core-value">{pd.coreValue}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section--alt">
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
