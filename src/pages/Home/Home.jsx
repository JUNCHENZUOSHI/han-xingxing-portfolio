import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useI18n, useProfileData } from '../../i18n/context';
import { profile } from '../../data/profile';
import { cases, caseOrder } from '../../data/cases';
import Hero from '../../components/Hero/Hero';
import DotGridOverlay from '../../components/Hero/DotGridOverlay';
import CaseCard from '../../components/CaseCard/CaseCard';
import './Home.css';

export default function Home() {
  const { t } = useI18n();
  const profileData = useProfileData();
  const trans = t('home.transition') || ['深度', '可迁移性', '宽度'];

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

  return (
    <>
      <Hero />

      {/* Transition Guide */}
      <section className="section section--alt">
        <div className="container" data-reveal>
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
        <div className="container" data-reveal>
          <span className="section-label">{t('home.featuredCases')}</span>
          <CaseCard caseData={cases.sidekick} variant="featured" />
        </div>
      </section>

      {/* What I Do */}
      <section className="section section--alt">
        <div className="container" data-reveal>
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
        <div className="container" data-reveal>
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
        <div className="container" data-reveal>
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
        <div className="container" data-reveal>
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
          <p className="experience-status">{profileData.location} · {profileData.status}</p>
        </div>
      </section>

      {/* Contact CTA — deepseek.com/harness blue-glow panel */}
      <section className="section contact-cta">
        <DotGridOverlay className="contact-cta__grid" isStatic />
        <div className="contact-cta__glow contact-cta__glow--1" aria-hidden="true" />
        <div className="contact-cta__glow contact-cta__glow--2" aria-hidden="true" />
        <div className="contact-cta__glow contact-cta__glow--3" aria-hidden="true" />
        <div className="container" data-reveal>
          <div className="contact-cta__inner">
            <h2 className="contact-cta__heading">{t('home.letsTalk')}</h2>
            <p className="contact-cta__subtitle">{t('home.letsTalkSub')}</p>
            <div className="contact-cta__actions">
              <a href={`mailto:${profile.email}`} className="btn-primary">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <rect x="1.5" y="3" width="13" height="10" rx="2" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M2 4.5L8 9l6-4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {profile.email}
              </a>
              <a href={`${import.meta.env.BASE_URL}resume.pdf`} className="btn-secondary" download>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5v8M4.5 6.5L8 10l3.5-3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2.5 13.5h11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                {t('home.downloadResumePdf')}
              </a>
              <span className="contact-cta__meta">
                {profileData.location} · {profile.phone} · {profileData.status}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
