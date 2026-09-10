import { useEffect, useRef } from 'react';
import { useI18n } from '../../i18n/context';
import { resumeUrl } from '../../data/site';
import HeroScene from './HeroScene';
import './Hero.css';

const copy = {
  en: { description: 'Integrating AI into product mechanisms to make complex business clear, controllable, and ready to deliver.' },
  zh: { description: '将 AI 能力融入产品机制，让复杂业务变得清晰、可控、可落地。' },
  'zh-TW': { description: '將 AI 能力融入產品機制，讓複雜業務變得清晰、可控、可落地。' },
};
export default function Hero() {
  const { lang, t } = useI18n();
  const content = copy[lang] || copy.en;
  const isChinese = lang !== 'en';
  const isTraditional = lang === 'zh-TW';
  const descriptionVariant = isTraditional
    ? 'hero__description--traditional'
    : lang === 'en' ? 'hero__description--en' : '';
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const fine = matchMedia('(hover: hover) and (pointer: fine)');
    let frame = 0;
    let x = 0;
    let y = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const p = reduced.matches ? 0 : Math.min(1, Math.max(0, -rect.top / rect.height));
      el.style.setProperty('--hero-brightness', 1 - p * .25);
      el.style.setProperty('--human-scale', 1 - p * .03);
      el.style.setProperty('--guardian-opacity', 1 - p * .85);
      el.style.setProperty('--system-spread', `${p * 18}px`);
      el.style.setProperty('--parallax-x', `${reduced.matches || !fine.matches ? 0 : x}px`);
      el.style.setProperty('--parallax-y', `${reduced.matches || !fine.matches ? 0 : y}px`);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const move = (event) => {
      const rect = el.getBoundingClientRect();
      x = (event.clientX - rect.left - rect.width / 2) / rect.width * 14;
      y = (event.clientY - rect.top - rect.height / 2) / rect.height * 10;
      schedule();
    };
    const reset = () => { x = 0; y = 0; schedule(); };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    el.addEventListener('pointermove', move, { passive: true });
    el.addEventListener('pointerleave', reset);
    reduced.addEventListener('change', reset);
    fine.addEventListener('change', reset);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', reset);
      reduced.removeEventListener('change', reset);
      fine.removeEventListener('change', reset);
    };
  }, []);

  return (
    <section className="hero" ref={ref} aria-labelledby="hero-name">
      <HeroScene />
      <div className="hero__content">
        <h1 className={`hero__statement${isChinese ? ' hero__statement--zh' : ''}`} id="hero-name" lang={isChinese ? 'zh-CN' : 'en'}>
          {isChinese ? <>{isTraditional ? <>借助 <span>AI</span>，為複雜系統<br />打造清晰的產品體驗</> : <>借助 <span>AI</span>，为复杂系统<br />打造清晰的产品体验</>}</> : <>Designing clarity for<br />complex systems <span>with AI.</span></>}
        </h1>
        <div className="hero__details">
          <p className={`hero__description ${descriptionVariant}`}>{content.description}</p>
          <div className="hero__cta">
            <a href="#work" className="hero__button hero__button--primary" aria-label={t('hero.viewCases')}>
              <span className="hero__button-content">
                <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
                <span>{t('hero.viewCases')}</span>
              </span>
            </a>
            <a
              href={resumeUrl}
              className="hero__button hero__button--secondary"
              aria-label={t('hero.downloadResume')}
              download
            >
              <span className="hero__button-content">
                <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                  <path d="M8 2v8M4.5 6.5 8 10l3.5-3.5M3 13.5h10" />
                </svg>
                <span>{t('hero.downloadResume')}</span>
              </span>
            </a>
          </div>
        </div>
      </div>
      <div className="hero__segue" hidden aria-hidden="true">SELECTED WORK <span>↓</span></div>
    </section>
  );
}
