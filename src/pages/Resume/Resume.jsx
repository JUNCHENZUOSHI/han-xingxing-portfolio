import { useI18n, useResumeData } from '../../i18n/context';
import { profile } from '../../data/profile';
import './Resume.css';

export default function Resume() {
  const { t, lang } = useI18n();
  const rd = useResumeData();
  const isEn = lang === 'en';

  return (
    <section className="section">
    <div className="resume-page">
      {/* Print Header */}
      <header className="resume-print-header">
        <h1>{t('common.name')}</h1>
        <p>
          {rd.targetPosition} · {rd.salaryExpectation} · {rd.targetCity}
          &nbsp;|&nbsp; {rd.gender} · {profile.age}{isEn ? '' : rd.ageLabel} · {profile.phone} · {profile.email}
        </p>
      </header>

      {/* Screen Header */}
      <header className="resume-header no-print">
        <h1 className="resume-header__name">{t('common.name')}</h1>
        <p className="resume-header__title">
          {rd.targetPosition}&nbsp;&nbsp;·&nbsp;&nbsp;
          {profile.yearsOfExperience}{rd.yearsExpLabel}&nbsp;&nbsp;·&nbsp;&nbsp;
          {rd.targetCity}
        </p>
        <p className="resume-header__meta">
          <span>{rd.gender}</span>
          <span>{profile.age}{rd.ageLabel}</span>
          <span>{profile.phone}</span>
          <span>{profile.email}</span>
          <span>{rd.salaryLabel}{rd.salaryExpectation}</span>
        </p>
        <p className="resume-header__status">
          {profile.location} · {profile.status}
        </p>
      </header>

      {/* Strengths */}
      <section className="resume-section">
        <h2 className="resume-section__heading">{t('resume.strengths')}</h2>
        <p className="resume-section__summary">{rd.strengthSummary}</p>
        <ol className="resume-strengths">
          {rd.strengths.map((s, i) => (
            <li key={i} className="resume-strength-item">
              <strong>{s.title}：</strong>
              {s.desc}
            </li>
          ))}
        </ol>
      </section>

      {/* Experience */}
      <section className="resume-section">
        <h2 className="resume-section__heading">{t('resume.experience')}</h2>
        {rd.experience.map((exp, i) => (
          <div key={i} className="resume-experience">
            <div className="resume-experience__header">
              <h3 className="resume-experience__company">{exp.company}</h3>
              <span className="resume-experience__role">{exp.role}</span>
              <span className="resume-experience__period">{exp.period}</span>
            </div>
            <p className="resume-experience__summary">{exp.summary}</p>

            {exp.achievements && exp.achievements.length > 0 && (
              <div className="resume-experience__block">
                <h4 className="resume-experience__block-title">{rd.achievementsLabel}</h4>
                <ol className="resume-achievements">
                  {exp.achievements.map((a, j) => (
                    <li key={j}>
                      <strong>{a.title}</strong>
                      <p>{a.desc}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {exp.responsibilities && exp.responsibilities.length > 0 && (
              <div className="resume-experience__block">
                <h4 className="resume-experience__block-title">{rd.responsibilitiesLabel}</h4>
                <ol className="resume-responsibilities">
                  {exp.responsibilities.map((r, j) => (
                    <li key={j}>{r}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="resume-section">
        <h2 className="resume-section__heading">{t('resume.education')}</h2>
        <div className="resume-education">
          <span className="resume-education__school">{rd.education.school}</span>
          <span>{rd.education.degree}</span>
          <span>{rd.education.major}</span>
          <span className="resume-education__period">{rd.education.period}</span>
        </div>
      </section>

      {/* Download CTA */}
      <section className="resume-section no-print">
        <div className="resume-download-cta">
          <p>{t('resume.downloadHint')}</p>
          <a href={`${import.meta.env.BASE_URL}resume.pdf`} className="btn-primary" download>
            {t('resume.downloadPdf')}
          </a>
        </div>
      </section>
    </div>
    </section>
  );
}
