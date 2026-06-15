import { Link } from 'react-router-dom';
import { profile } from '../../data/profile';
import CapabilityCard from '../../components/CapabilityCard/CapabilityCard';
import './About.css';

export default function About() {
  return (
    <>
      {/* ============================================================
          1. Hero Mini
          ============================================================ */}
      <section className="section">
        <div className="container">
          <div className="about-hero">
            <span className="tag tag--accent">{profile.title}</span>
            <h1 className="about-hero__name">{profile.name}</h1>
            <p className="about-hero__tagline">{profile.tagline}</p>
          </div>
        </div>
      </section>

      {/* ============================================================
          2. Introduction
          Profile §2 + §3.2 narrative
          ============================================================ */}
      <section className="section">
        <div className="container">
          <h2 className="section-heading">Introduction</h2>
          <div className="text-container">
            <p className="case-text">
              {profile.subtitle} — 专注于企业级 SaaS、跨境电商平台、低代码平台
              及 AI 产品体验设计。{profile.yearsOfExperience} 年产品设计经验，
              具备从业务洞察、产品策略、交互设计、设计系统建设到设计落地的
              从策略到交付的全链路设计能力。
            </p>
            <p className="case-text">
              长期参与复杂业务系统和国际化产品建设，能够在体验目标与商业目标之间
              建立有效连接。擅长将生成式 AI、智能决策系统和自动化能力转化为
              可理解、可执行、可规模化落地的产品体验。
            </p>

            <div className="about-keywords">
              {profile.keywords.slice(0, 5).map((kw) => (
                <span className="tag" key={kw}>{kw}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          3. Career Narrative (profile.md §3.2 — 3-segment story)
          ============================================================ */}
      <section className="section">
        <div className="container">
          <h2 className="section-heading">Career Narrative</h2>
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

      {/* ============================================================
          4. Experience Timeline
          Full highlights + metrics (not truncated like Home)
          ============================================================ */}
      <section className="section">
        <div className="container">
          <h2 className="section-heading">Experience</h2>
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
                      {exp.highlights.map((h, j) => (
                        <li key={j}>{h}</li>
                      ))}
                    </ul>
                    {exp.metrics.length > 0 && (
                      <div className="about-metrics">
                        {exp.metrics.map((m, k) => (
                          <span className="metric-value" key={k}>
                            {m.label}: {m.value}
                          </span>
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
                <span className="experience-item__period">Education</span>
              </div>
              <div className="experience-item__body">
                <h3 className="experience-item__role">{profile.education}</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          5. Capabilities Overview
          ============================================================ */}
      <section className="section">
        <div className="container">
          <h2 className="section-heading">Capabilities</h2>
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

      {/* ============================================================
          6. Skills & Evidence
          ============================================================ */}
      <section className="section">
        <div className="container">
          <h2 className="section-heading">Skills & Evidence</h2>
          <div className="text-container">
            <table className="case-table">
              <thead>
                <tr>
                  <th>能力维度</th>
                  <th>量化证据</th>
                </tr>
              </thead>
              <tbody>
                {profile.skills.map((s, i) => (
                  <tr key={i}>
                    <td>{s.name}</td>
                    <td>{s.evidence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============================================================
          7. Working Style
          ============================================================ */}
      <section className="section">
        <div className="container">
          <h2 className="section-heading">Working Style</h2>
          <div className="text-container">
            <table className="case-table">
              <thead>
                <tr>
                  <th>我不是</th>
                  <th>我的核心价值在于</th>
                </tr>
              </thead>
              <tbody>
                {profile.notStatements.map((ns, i) => (
                  <tr key={i}>
                    <td>{ns.not}</td>
                    <td>{ns.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="about-core-value">{profile.coreValue}</p>
          </div>
        </div>
      </section>

      {/* ============================================================
          8. CTA
          ============================================================ */}
      <section className="section">
        <div className="container">
          <div className="about-cta">
            <p className="about-cta__text">
              {profile.location} · {profile.status}
            </p>
            <div className="about-cta__actions">
              <Link to="/" className="btn-primary">View Case Studies</Link>
              <a href={`mailto:${profile.email}`} className="btn-secondary">{profile.email}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
