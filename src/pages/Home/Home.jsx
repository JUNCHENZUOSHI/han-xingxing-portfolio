import { Link } from 'react-router-dom';
import { profile } from '../../data/profile';
import { cases, caseOrder } from '../../data/cases';
import Hero from '../../components/Hero/Hero';
import CaseCard from '../../components/CaseCard/CaseCard';
import CapabilityCard from '../../components/CapabilityCard/CapabilityCard';
import './Home.css';

export default function Home() {
  return (
    <>
      {/* ============================================================
          Module 1: Hero
          Name · One-line Positioning · Capability Tags · Contact CTA
          ============================================================ */}
      <Hero />

      {/* ============================================================
          Module 2: Transition Guide
          ============================================================ */}
      <section className="section transition-guide">
        <div className="container">
          <p className="transition-guide__text">
            <span className="transition-guide__item">深度</span>
            <span className="transition-guide__sep">→</span>
            <span className="transition-guide__item">可迁移性</span>
            <span className="transition-guide__sep">→</span>
            <span className="transition-guide__item">宽度</span>
          </p>
        </div>
      </section>

      {/* ============================================================
          Module 3: Featured Cases (3 projects)
          Shopify AI / Low-code AI / Design System & Globalization
          ============================================================ */}
      <section className="section" id="work">
        <div className="container">
          <h2 className="section-heading">Featured Cases</h2>

          {/* Featured: Case 01 — Sidekick AI (full-width) */}
          <CaseCard caseData={cases.sidekick} variant="featured" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-heading">All Cases</h2>
          <div className="case-grid">
            {caseOrder.map((slug) => (
              <CaseCard key={slug} caseData={cases[slug]} variant="standard" />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          Module 4: Capabilities (5)
          UX Strategy · Enterprise SaaS · AI Product Experience
          · Design System · Growth Design
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
          Module 5: About Preview
          Experience · Industries · Working Style
          ============================================================ */}
      <section className="section">
        <div className="container">
          <h2 className="section-heading">About</h2>
          <div className="about-preview">
            <div className="about-preview__intro">
              <p className="about-preview__text">
                {profile.yearsOfExperience} 年 B 端产品设计经验，专注
                Enterprise SaaS 与 AI 产品体验设计。具备从业务洞察、产品策略、
                交互设计到设计系统建设的全链路设计能力。
              </p>
              <div className="about-preview__tags">
                {profile.keywords.slice(0, 4).map((kw) => (
                  <span className="tag" key={kw}>{kw}</span>
                ))}
              </div>
            </div>

            <div className="about-preview__columns">
              <div className="about-preview__col">
                <h3 className="about-preview__col-title">Industries</h3>
                <ul className="about-preview__list">
                  {profile.industries.map((ind) => (
                    <li key={ind}>{ind}</li>
                  ))}
                </ul>
              </div>
              <div className="about-preview__col">
                <h3 className="about-preview__col-title">Working Style</h3>
                <p className="about-preview__col-text">{profile.workingStyleSummary}</p>
                <Link to="/about" className="text-link" style={{ marginTop: 'var(--space-8)' }}>
                  More about me →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          Module 6: Experience Timeline
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
                    <p className="experience-item__desc">
                      {exp.highlights.slice(0, 2).join('。')}。
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="experience-status">
            📍 {profile.location} · {profile.status}
          </p>
        </div>
      </section>

      {/* ============================================================
          Module 7: Contact CTA
          Email · Resume · Location + Availability
          ============================================================ */}
      <section className="section contact-cta">
        <div className="container">
          <div className="contact-cta__inner">
            <h2 className="contact-cta__heading">Let&rsquo;s talk</h2>
            <p className="contact-cta__subtitle">
              Currently available for Senior Product Designer / AI Product Designer opportunities.
            </p>
            <div className="contact-cta__actions">
              <a href={`mailto:${profile.email}`} className="btn-primary">
                {profile.email}
              </a>
              <a href="/resume.pdf" className="btn-secondary">
                Download Resume (PDF)
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
