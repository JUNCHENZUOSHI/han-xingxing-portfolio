import { useEffect, useRef } from 'react';
import { useI18n } from '../../i18n/context';
import { resumeUrl } from '../../data/site';
import HeroScene from './HeroScene';
import './Hero.css';

const copy = {
  en: { description: 'Start with business goals and user value, then integrate AI into product mechanisms to move from problem definition to validated delivery.' },
  zh: { description: '从业务目标与用户价值出发，将 AI 能力融入产品机制，推动方案从问题定义走向落地验证。' },
  'zh-TW': { description: '從業務目標與使用者價值出發，將 AI 能力融入產品機制，推動方案從問題定義走向落地驗證。' },
};
const tags = ['AI Product Design', 'B2B SaaS', 'UX Strategy', 'Design Systems'];

export default function Hero() {
  const { lang, t } = useI18n();
  const content = copy[lang] || copy.en;
  const isChinese = lang !== 'en';
  const isTraditional = lang === 'zh-TW';
  const descriptionVariant = isTraditional
    ? 'hero__description--traditional'
    : lang === 'en' ? 'hero__description--en' : '';
  const visibleTags = isChinese
    ? (isTraditional ? ['AI 產品設計', '企業級 SaaS', '使用者體驗策略', '設計系統'] : ['AI 产品设计', '企业级 SaaS', '用户体验策略', '设计系统'])
    : tags;
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
          <ul className="hero__tags" lang={isChinese ? 'zh-CN' : 'en'}>{visibleTags.map(tag => <li key={tag}>{tag}</li>)}</ul>
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
