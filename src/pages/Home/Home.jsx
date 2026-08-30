import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n, useProfileData } from '../../i18n/context';
import { profile } from '../../data/profile';
import { cases, caseOrder } from '../../data/cases';
import Hero from '../../components/Hero/Hero';
import DotGridOverlay from '../../components/Hero/DotGridOverlay';
import ParticleField from '../../components/Hero/ParticleField';
import WireframePlaceholder from '../../components/Hero/WireframePlaceholder';
import CaseCard from '../../components/CaseCard/CaseCard';
import './Home.css';

export default function Home() {
  const { t } = useI18n();
  const profileData = useProfileData();
  const trans = t('home.transition') || ['深度', '可迁移性', '宽度'];
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

  // scroll-driven active capability — pick the item whose center is closest to the viewport center
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

      {/* All Cases */}
      <section className="section" id="work">
        <div className="container" data-reveal>
          <span className="section-label">{t('home.allCases')}</span>
          <div className="case-grid">
            {caseOrder.map((slug) => (
              <CaseCard key={slug} caseData={cases[slug]} variant="standard" />
            ))}
          </div>
        </div>
      </section>

      {/* What I Do — scroll-driven sticky media (deepseek "一切皆插件") */}
      <section
        className="section what-i-do"
        style={{ minHeight: `calc(100vh + ${(profileData.homeCapabilities.length - 1) * 200}px + 400px)` }}
      >
        <div className="container">
          <div className="capability-layout">
            <div className="what-i-do__header">
              <span className="section-label">What I Do</span>
              <h2 className="section-heading">{t('home.capabilities')}</h2>
            </div>
            <div className="capability-list">
              {profileData.homeCapabilities.map((cap, i) => (
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
              <div className="capability-media__card" key={activeCap}>
                <WireframePlaceholder variant={activeCap} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Case */}
      <section className="section">
        <div className="container" data-reveal>
          <span className="section-label">{t('home.featuredCases')}</span>
          <CaseCard caseData={cases.sidekick} variant="featured" />
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
              <div className="about-card">
                <h3 className="about-card__title">{t('home.industries')}</h3>
                <ul className="about-card__list">
                  {profileData.industries.map((ind) => <li key={ind}>{ind}</li>)}
                </ul>
              </div>
              <div className="about-card">
                <h3 className="about-card__title">{t('home.workingStyle')}</h3>
                <p className="about-card__text">{profileData.workingStyleSummary}</p>
                <Link to="/about" className="btn-secondary">{t('home.moreAbout')}</Link>
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
        </div>
      </section>

      {/* Contact CTA — deepseek.com/harness blue-glow panel */}
      <section className="section contact-cta">
        <DotGridOverlay className="contact-cta__grid" isStatic />
        <div className="contact-cta__glow contact-cta__glow--1" aria-hidden="true" />
        <div className="contact-cta__glow contact-cta__glow--2" aria-hidden="true" />
        <div className="contact-cta__glow contact-cta__glow--3" aria-hidden="true" />
        <ParticleField className="contact-cta__particles" />
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
