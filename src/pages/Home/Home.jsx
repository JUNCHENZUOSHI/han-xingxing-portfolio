import { useEffect, useRef, useState } from 'react';
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
  const listRef = useRef(null);

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

  // scroll-driven active capability — transform offset (deepseek style)
  useEffect(() => {
    const section = document.querySelector('.showcase');
    const list = listRef.current;
    const items = document.querySelectorAll('.feature-item');
    if (!section || !list || !items.length) return;
    const total = items.length;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      let progress = scrollable > 0 ? -rect.top / scrollable : 0;
      progress = Math.max(0, Math.min(1, progress));

      const offset = -progress * (total - 1) * 200;
      list.style.transform = `translateY(${offset}px)`;

      const activeIndex = Math.round(progress * (total - 1));
      setActiveCap(activeIndex);
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

      {/* What I Do — scroll-driven showcase (transform offset, deepseek style) */}
      <section
        className="showcase"
        style={{ height: `calc(100vh * ${profileData.homeCapabilities.length})` }}
      >
        <div className="showcase__sticky">
          <div className="container">
            <header className="showcase__header">
              <span className="section-label">{t('home.whatIDo')}</span>
              <h2 className="section-heading">{t('home.capabilities')}</h2>
            </header>
            <div className="showcase__body">
              <div className="feature-list" ref={listRef}>
                {profileData.homeCapabilities.map((cap, i) => (
                  <div
                    className={`feature-item${activeCap === i ? ' feature-item--active' : ''}`}
                    key={cap.title}
                  >
                    <span className="feature-item__index">0{i + 1}</span>
                    <h3 className="feature-item__title">{cap.title}</h3>
                    <p className="feature-item__desc">{cap.description}</p>
                  </div>
                ))}
              </div>
              <div className="showcase__visual">
                <div className="showcase__visual-frame">
                  {profileData.homeCapabilities.map((cap, i) => (
                    <div
                      className={`showcase__visual-slide${activeCap === i ? ' showcase__visual-slide--active' : ''}`}
                      key={cap.title}
                    >
                      <WireframePlaceholder variant={i} />
                    </div>
                  ))}
                </div>
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
