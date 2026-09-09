import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n/context';
import { profile } from '../../data/profile';
import { cases, caseOrder } from '../../data/cases';
import { getHomeContent } from '../../data/homeContent';
import { resumeUrl } from '../../data/site';
import Hero from '../../components/Hero/Hero';
import DotGridOverlay from '../../components/Hero/DotGridOverlay';
import ParticleField from '../../components/Hero/ParticleField';
import CaseCard from '../../components/CaseCard/CaseCard';
import WorkflowAnimation from '../../components/WorkflowAnimation/WorkflowAnimation';
import './Home.css';

function WorkPathContinuation() {
  return (
    <svg className="work-ai-path" viewBox="0 0 1000 360" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <g>
        <path d="M282 0 C270 36 235 48 216 82 C195 119 160 128 139 165 C119 201 83 218 57 254 C39 279 25 307 12 340" />
        <path d="M184 0 C207 27 209 62 235 88 C261 114 262 151 286 182 C307 209 306 244 332 279" />
        <path d="M75 0 C66 29 62 56 49 83 C35 112 26 148 21 189" className="work-ai-path__far" />
        <path d="M659 0 C642 29 650 62 635 94 C619 128 629 163 614 198 C600 231 608 266 590 304" />
        <path d="M754 0 C780 29 778 67 805 94 C834 122 833 160 862 190 C890 218 890 258 919 292 C940 316 953 337 970 355" />
        <path d="M847 0 C868 20 891 23 910 48 C931 74 954 75 973 99 C986 116 993 138 999 164" className="work-ai-path__far" />
      </g>
      <g className="work-ai-path__nodes">
        <circle cx="216" cy="82" r="1" /><circle cx="139" cy="165" r=".72" /><circle cx="57" cy="254" r=".52" />
        <circle cx="235" cy="88" r=".86" /><circle cx="286" cy="182" r=".62" /><circle cx="332" cy="279" r=".44" />
        <circle cx="49" cy="83" r=".48" /><circle cx="21" cy="189" r=".36" />
        <circle cx="635" cy="94" r=".9" /><circle cx="614" cy="198" r=".58" /><circle cx="590" cy="304" r=".4" />
        <circle cx="805" cy="94" r=".82" /><circle cx="862" cy="190" r=".58" /><circle cx="919" cy="292" r=".42" />
        <circle cx="910" cy="48" r=".5" /><circle cx="973" cy="99" r=".38" />
      </g>
    </svg>
  );
}

export default function Home() {
  const { lang, t } = useI18n();
  const content = getHomeContent(lang);
  const [contactLead, contactSupporting] = content.contact.subtitle.split('\n\n');
  const [activeCap, setActiveCap] = useState(0);

  useEffect(() => {
    // 视差：滚动时让带 data-parallax 的元素按比例慢速漂移
    const parallaxEls = document.querySelectorAll('[data-parallax]');
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        parallaxEls.forEach((el) => {
          const speed = parseFloat(el.dataset.parallax || '0.2');
          el.style.transform = `translate3d(0, ${(y * speed).toFixed(1)}px, 0)`;
        });
        raf = 0;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // 缓动：内容进入视口时淡入上移
    const revealEls = document.querySelectorAll('[data-reveal]');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-revealed');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );
    revealEls.forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, []);

  // scroll-driven active capability — activate item closest to viewport center
  useEffect(() => {
    const items = document.querySelectorAll('.capability-item');
    if (!items.length) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const center = window.innerHeight / 2;
      let bestIdx = 0;
      let bestDist = Infinity;
      items.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        const c = rect.top + rect.height / 2;
        const d = Math.abs(c - center);
        if (d < bestDist) { bestDist = d; bestIdx = i; }
      });
      setActiveCap(bestIdx);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <Hero />

      {/* Transition Guide — hidden for now (show later) */}

      {/* Selected work */}
      <section className="section work-section" id="work">
        <WorkPathContinuation />
        <div className="container" data-reveal>
          <span className="section-label">{content.casesHeading}</span>
          <div className="case-grid">
            {caseOrder.map((slug) => (
              <CaseCard key={slug} caseData={cases[slug]} homeCopy={content.cases[slug]} variant="standard" />
            ))}
          </div>
        </div>
      </section>

      {/* Core capabilities */}
      <section className="section what-i-do">
        <div className="container">
          <span className="section-label">{content.capabilitiesLabel}</span>
          <h2 className="section-heading">{content.capabilitiesTitle}</h2>
          <div className="capability-layout">
            <div className="capability-list">
              {content.capabilities.map((cap, i) => (
                <div
                  className={`capability-item${activeCap === i ? ' capability-item--active' : ''}`}
                  key={cap.title}
                >
                  <span className="capability-item__index">0{i + 1}</span>
                  <h3 className="capability-item__title">{cap.title}</h3>
                  <p className="capability-item__desc">{cap.description}</p>
                </div>
              ))}
            </div>
            <div className="capability-media">
              <div className="capability-media__frame">
                {content.capabilities.map((cap, i) => (
                  <div
                    className={`capability-media__slide${activeCap === i ? ' capability-media__slide--active' : ''}`}
                    key={cap.title}
                  >
                    <img
                      className="capability-media__image"
                      src={`${import.meta.env.BASE_URL}capabilities/capability-${String(i + 1).padStart(2, '0')}.png`}
                      alt=""
                      aria-hidden="true"
                      draggable="false"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="section workflow-section">
        <div className="container" data-reveal>
          <h2 className="section-heading workflow-section__heading">{content.workflow.title}</h2>
          <p className="workflow-section__subtitle">{content.workflow.subtitle}</p>
          <WorkflowAnimation content={content.workflow} />
        </div>
      </section>

      {/* About */}
      <section className="section section--alt about-section">
        <div className="container" data-reveal>
          <span className="section-label">{t('home.about')}</span>
          <div className="about-preview">
            <p className="about-preview__text">{content.about.intro}</p>
            <div className="about-preview__columns">
              <div className="about-card">
                <h3 className="about-card__title">{content.about.domainTitle}</h3>
                <ul className="about-card__list">
                  {content.about.industries.map((ind) => <li key={ind}>{ind}</li>)}
                </ul>
                <Link to="/about" className="btn-secondary about-card__cta">{content.about.more}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="section">
        <div className="container" data-reveal>
          <span className="section-label">{t('home.experience')}</span>
          <div className="experience-list experience-list--cards">
            {content.experience.map((exp, i) => (
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
                      {exp.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA — deepseek.com/harness blue-glow panel */}
      <section className="section contact-cta">
        <div className="contact-cta__backdrop" aria-hidden="true">
          <DotGridOverlay className="contact-cta__grid" isStatic />
          <div className="contact-cta__glow contact-cta__glow--1" />
          <div className="contact-cta__glow contact-cta__glow--2" />
          <div className="contact-cta__glow contact-cta__glow--3" />
          <ParticleField className="contact-cta__particles" />
        </div>
        <div className="container" data-reveal>
          <div className="contact-cta__inner">
            <h2 className="contact-cta__heading">{content.contact.title}</h2>
            <p className="contact-cta__lead">{contactLead}</p>
            {contactSupporting && <p className="contact-cta__supporting">{contactSupporting}</p>}
            <div className="contact-cta__actions">
              <a href={`mailto:${profile.email}`} className="btn-primary contact-cta__email">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
                  <rect x="1.5" y="3" width="13" height="10" rx="2" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M2 4.5 8 9l6-4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {profile.email}
              </a>
              <a href={resumeUrl} className="btn-secondary" download>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
                  <path d="M8 1.5v8M4.5 6.5L8 10l3.5-3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2.5 13.5h11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                {content.contact.resume}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
