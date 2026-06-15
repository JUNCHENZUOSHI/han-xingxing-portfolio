import { useI18n, useResumeData } from '../../i18n/context';
import { profile } from '../../data/profile';
import './Resume.css';

export default function Resume() {
  const { t, lang } = useI18n();
  const rd = useResumeData();
  const isEn = lang === 'en';

  return (
    <>
      {/* ── Hero ── */}
      <section className="section resume-hero">
        <div className="container">
          <span className="section-label">{rd.targetPosition}</span>
          <h1 className="resume-hero__name">{t('common.name')}</h1>
          <div className="resume-hero__meta">
            <span>{rd.targetCity}</span>
            <span className="resume-hero__sep">·</span>
            <span>{profile.yearsOfExperience}{rd.yearsExpLabel}</span>
            <span className="resume-hero__sep">·</span>
            <span>{profile.email}</span>
            <span className="resume-hero__sep">·</span>
            <span>{profile.phone}</span>
          </div>
          <p className="resume-hero__status">{profile.status}</p>
        </div>
      </section>

      {/* ── Strengths — #f5f5f7 ── */}
      <section className="section section--alt">
        <div className="container">
          <h2 className="section-heading">{t('resume.strengths')}</h2>
          <p className="resume-intro">{rd.strengthSummary}</p>
          <div className="resume-strengths">
            {rd.strengths.map((s, i) => (
              <div className="resume-strength" key={i}>
                <h3 className="resume-strength__title">{s.title}</h3>
                <p className="resume-strength__desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Experience — white ── */}
      <section className="section">
        <div className="container">
          <h2 className="section-heading">{t('resume.experience')}</h2>
          {rd.experience.map((exp, i) => (
            <div className="resume-exp" key={i}>
              <div className="resume-exp__head">
                <h3 className="resume-exp__company">{exp.company}</h3>
                <div className="resume-exp__sub">
                  <span>{exp.role}</span>
                  <span className="resume-hero__sep">·</span>
                  <span>{exp.period}</span>
                </div>
              </div>
              <p className="resume-exp__summary">{exp.summary}</p>

              {exp.achievements && exp.achievements.length > 0 && (
                <div className="resume-exp__group">
                  <h4 className="resume-exp__group-title">{rd.achievementsLabel}</h4>
                  {exp.achievements.map((a, j) => (
                    <div className="resume-exp__item" key={j}>
                      <h5 className="resume-exp__item-title">{a.title}</h5>
                      <p className="resume-exp__item-desc">{a.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {exp.responsibilities && exp.responsibilities.length > 0 && (
                <div className="resume-exp__group">
                  <h4 className="resume-exp__group-title">{rd.responsibilitiesLabel}</h4>
                  <ul className="resume-exp__list">
                    {exp.responsibilities.map((r, j) => (
                      <li key={j}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Education — #f5f5f7 ── */}
      <section className="section section--alt">
        <div className="container">
          <h2 className="section-heading">{t('resume.education')}</h2>
          <div className="resume-edu">
            <span className="resume-edu__school">{rd.education.school}</span>
            <span className="resume-edu__sep">·</span>
            <span>{rd.education.degree}</span>
            <span className="resume-edu__sep">·</span>
            <span>{rd.education.major}</span>
            <span className="resume-edu__sep">·</span>
            <span className="resume-edu__period">{rd.education.period}</span>
          </div>
        </div>
      </section>

      {/* ── Download — white ── */}
      <section className="section resume-download">
        <div className="container">
          <p className="resume-download__text">{t('resume.downloadHint')}</p>
          <a href={`${import.meta.env.BASE_URL}resume.pdf`} className="btn-primary" download>
            {t('resume.downloadPdf')}
          </a>
        </div>
      </section>
    </>
  );
}
