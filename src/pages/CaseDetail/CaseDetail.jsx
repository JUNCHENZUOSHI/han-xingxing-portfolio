import templateCopy from '../../data/templateCase.md?raw';
import novabotCopy from '../../data/novabot.md?raw';
import { useParams, Link } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { useI18n, useCaseI18n } from '../../i18n/context';
import { getCase, caseOrder, hasHiddenMetric } from '../../data/cases';
import { lowcodeCaseContent } from '../../data/lowcodeCaseContent';
import './CaseDetail.css';
import './CaseDetailSidekick.css';

function ConfidenceMarker({ state, note, children }) {
  if (!state || state === 'confirmed') return children;
  const className =
    state === 'empty'
      ? 'cd-content-note cd-content-note--empty'
      : state === 'partial'
        ? 'cd-content-note cd-content-note--partial'
        : 'cd-content-note cd-content-note--caution';
  return (
    <>
      {note && (
        <div className={className}>
          <p>{note}</p>
        </div>
      )}
      {children}
    </>
  );
}

function SidekickBackground({ lang }) {
  const copy = lang === 'en'
    ? {
        headline: 'Storefront tools are mature, yet merchants still make key decisions',
        intro: 'Shopify covers theme browsing, page editing, and AI assistance, yet merchants still need to judge theme fit, organize pages, and decide whether to accept AI changes.',
        tasksTitle: 'Three key decisions during setup',
        tasks: [
          ['Theme selection', 'Which theme best fits the products and brand?'],
          ['Page planning', 'How should business goals translate into page structure?'],
          ['AI change control', 'What will AI change, and which results are worth accepting?'],
        ],
        hypothesisTitle: 'Initial hypothesis',
        hypothesis: 'The problem may be less about whether the tools work and more about how merchants make choices and control changes.',
        validation: 'This will be examined through a capability audit, merchant research, and AI stability tests.',
        constraintsTitle: 'Design constraints',
        constraints: [
          ['Structure', 'Keep the core structure of Theme Store and Theme Editor.', 'cube'],
          ['Reuse', 'Build on Sidekick, preview, save, and undo capabilities.', 'layers'],
          ['Scope', 'Exclude orders, payments, checkout, and marketing modules.', 'target'],
        ],
      }
    : lang === 'zh-TW'
      ? {
          headline: '建站工具已趨成熟，商家仍需要自行判斷',
          intro: 'Shopify 已涵蓋主題瀏覽、頁面編輯與 AI 輔助，商家仍需判斷主題是否適配、頁面如何組織、AI 改動是否接受。',
          tasksTitle: '建站過程中的三個關鍵判斷',
          tasks: [
            ['主題選擇', '哪個主題更適合目前商品與品牌？'],
            ['頁面規劃', '經營目標應如何轉化為頁面結構？'],
            ['AI 修改控制', 'AI 會修改什麼，哪些結果值得接受？'],
          ],
          hypothesisTitle: '初期問題假設',
          hypothesis: '問題可能不在工具能否操作，而在商家如何做選擇、如何控制修改。',
          validation: '後續透過現有能力盤點、商家研究和 AI 穩定性測試進一步驗證。',
          constraintsTitle: '設計約束',
          constraints: [
            ['結構不變', '保留 Theme Store 與 Theme Editor 的主體結構。', 'cube'],
            ['能力復用', '沿用 Sidekick、預覽、儲存及撤銷等已有能力。', 'layers'],
            ['範圍限定', '不涉及訂單、支付、結帳及行銷模組。', 'target'],
          ],
        }
      : {
          headline: '建站工具已经成熟，商家仍需要自己做判断',
          intro: 'Shopify 已覆盖主题浏览、页面编辑与 AI 辅助，商家仍要判断主题是否适配、页面如何组织、AI 改动是否接受。',
          tasksTitle: '建站过程中的三个关键判断',
          tasks: [
            ['主题选择', '哪个主题更适合当前商品与品牌？'],
            ['页面规划', '经营目标应该如何转化为页面结构？'],
            ['AI 修改控制', 'AI 会修改什么，哪些结果值得接受？'],
          ],
          hypothesisTitle: '初期问题假设',
          hypothesis: '问题可能不在工具能否操作，而在商家如何做选择、如何控制修改。',
          validation: '后续通过现有能力盘点、商家研究和 AI 稳定性测试进一步验证。',
          constraintsTitle: '设计约束',
          constraints: [
            ['结构不变', '保留 Theme Store 与 Theme Editor 的主体结构。', 'cube'],
            ['能力复用', '沿用 Sidekick、预览、保存及撤销等已有能力。', 'layers'],
            ['范围限定', '不涉及订单、支付、结账及营销模块。', 'target'],
          ],
        };

  return (
    <div className="cd-sidekick-background">
      <header className="cd-sidekick-background__intro">
        <h3 className="cd-subheading">{copy.headline}</h3>
        <p className="cd-text">{copy.intro}</p>
      </header>
      <section className="cd-sidekick-background__tasks" aria-labelledby="sidekick-background-tasks">
        <h3 className="cd-subheading" id="sidekick-background-tasks">{copy.tasksTitle}</h3>
        <ol>
          {copy.tasks.map(([title, description], index) => (
            <li key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h4>{title}</h4>
              <p>{description}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="cd-sidekick-background__hypothesis" aria-labelledby="sidekick-background-hypothesis">
        <div className="cd-sidekick-background__hypothesis-label">{copy.hypothesisTitle}</div>
        <div>
          <h3 id="sidekick-background-hypothesis">{copy.hypothesis}</h3>
          <p>{copy.validation}</p>
        </div>
      </section>
      <section className="cd-sidekick-background__constraints">
        <h3 className="cd-subheading">{copy.constraintsTitle}</h3>
        <ul className="cd-list">
          {copy.constraints.map(([label, detail, icon]) => (
            <li key={label}>
              <span className="cd-sidekick-background__constraint-icon" aria-hidden="true">
                {icon === 'cube' ? (
                  <svg viewBox="0 0 24 24"><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"/><path d="m4.4 7.7 7.6 4.4 7.6-4.4M12 12.1V21"/></svg>
                ) : icon === 'layers' ? (
                  <svg viewBox="0 0 24 24"><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/></svg>
                ) : (
                  <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/></svg>
                )}
              </span>
              <strong>{label}</strong>
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function CaseTableOfContents({ lang }) {
  const [items, setItems] = useState([]);
  const [activeId, setActiveId] = useState('');
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  useEffect(() => {
    const page = document.querySelector('.cd-page');
    const headings = [...(page?.querySelectorAll('.case-body-main .cd-section-header__title') || [])];
    const sections = headings.map((heading, index) => {
      const section = heading.closest('.cd-section');
      const id = `case-section-${index + 1}`;
      section.id = id;
      section.style.scrollMarginTop = '104px';
      return { id, title: heading.textContent.trim(), section };
    });
    setItems(sections.map(({ id, title }) => ({ id, title })));
    if (location.hash) requestAnimationFrame(() => {
      try { document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView(); } catch { /* ignore malformed hashes */ }
    });
    const hero = page?.querySelector('.cd-outcomes-section') ?? page?.querySelector('.cd-hero');
    const observers = [];
    if (hero) {
      const heroObserver = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), { threshold: 0 });
      heroObserver.observe(hero); observers.push(heroObserver);
    }
    const sectionObserver = new IntersectionObserver((entries) => {
      const visibleEntries = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visibleEntries[0]) setActiveId(visibleEntries[0].target.id);
    }, { rootMargin: '-110px 0px -65% 0px', threshold: 0 });
    sections.forEach(({ section }) => sectionObserver.observe(section)); observers.push(sectionObserver);
    const onKeyDown = (event) => { if (event.key === 'Escape') setOpen(false); };
    const onPointerDown = (event) => { if (rootRef.current && !rootRef.current.contains(event.target)) setOpen(false); };
    document.addEventListener('keydown', onKeyDown); document.addEventListener('pointerdown', onPointerDown);
    return () => { observers.forEach((observer) => observer.disconnect()); document.removeEventListener('keydown', onKeyDown); document.removeEventListener('pointerdown', onPointerDown); };
  }, [lang]);
  const returnTop = (event) => { event.preventDefault(); history.pushState(null, '', `${location.pathname}${location.search}#case-hero`); document.getElementById('case-hero')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); setOpen(false); };
  const navItems = items.map(({ id, title }) => <a key={id} href={`#${id}`} className={activeId === id ? 'is-active' : ''} aria-current={activeId === id ? 'location' : undefined} onClick={() => setOpen(false)}>{title}</a>);
  return <nav ref={rootRef} className={`case-toc${visible ? ' is-visible' : ''}`} aria-label={lang === 'en' ? 'Case sections' : lang === 'zh-TW' ? '案例章節目錄' : '案例章节目录'}>
    <div className="case-toc__desktop"><span>{lang === 'en' ? 'On this page' : lang === 'zh-TW' ? '本頁目錄' : '本页目录'}</span>{navItems}<a className="case-toc__top" href="#case-hero" onClick={returnTop}>{lang === 'en' ? 'Back to top' : lang === 'zh-TW' ? '返回頂部' : '返回顶部'}</a></div>
    <div className="case-toc__mobile"><button type="button" aria-expanded={open} aria-controls="case-toc-menu" onClick={() => setOpen((value) => !value)}>{lang === 'en' ? 'Contents' : lang === 'zh-TW' ? '目錄' : '目录'} · {items.find(({ id }) => id === activeId)?.title || items[0]?.title} <span aria-hidden="true">⌄</span></button>{open && <div className="case-toc__menu" id="case-toc-menu">{navItems}<a href="#case-hero" onClick={returnTop}>{lang === 'en' ? 'Back to top' : lang === 'zh-TW' ? '返回頂部' : '返回顶部'}</a></div>}</div>
  </nav>;
}

function translatePhaseTitle(t, heading) {
  const key = `case.phaseTitles.${heading}`;
  const val = t(key);
  return val === key ? heading : val;
}

function translateContribution(lang, value) {
  const translations = {
    Owner: { zh: '主导', 'zh-TW': '主導', en: 'Led' },
    'Design Lead': { zh: '主导', 'zh-TW': '主導', en: 'Design lead' },
    '独立主导': { zh: '主导', 'zh-TW': '主導', en: 'Led' },
    '獨立主導': { zh: '主导', 'zh-TW': '主導', en: 'Led' },
    'Led independently': { zh: '主导', 'zh-TW': '主導', en: 'Led' },
    '设计负责人': { zh: '主导', 'zh-TW': '主導', en: 'Led' },
    '設計負責人': { zh: '主导', 'zh-TW': '主導', en: 'Led' },
    '主导': { zh: '主导', 'zh-TW': '主導', en: 'Led' },
    '主導': { zh: '主导', 'zh-TW': '主導', en: 'Led' },
    负责: { zh: '独立负责', 'zh-TW': '獨立負責', en: 'Sole owner' },
    獨立負責: { zh: '独立负责', 'zh-TW': '獨立負責', en: 'Sole owner' },
    '独立负责': { zh: '独立负责', 'zh-TW': '獨立負責', en: 'Sole owner' },
    'Pending confirmation': { zh: '独立负责', 'zh-TW': '獨立負責', en: 'Sole owner' },
    协作: { zh: '协作', 'zh-TW': '協作', en: 'Collaborated' },
    協作: { zh: '协作', 'zh-TW': '協作', en: 'Collaborated' },
    '推动/协调': { zh: '协作', 'zh-TW': '協作', en: 'Collaborated' },
    '推動/協作': { zh: '协作', 'zh-TW': '協作', en: 'Collaborated' },
    'Drove / Coordinated': { zh: '协作', 'zh-TW': '協作', en: 'Collaborated' },
    Collaborated: { zh: '协作', 'zh-TW': '協作', en: 'Collaborated' },
  };
  return translations[value]?.[lang] || value;
}

function SidekickCapabilityAudit({ lang }) {
  const traditional = lang === 'zh-TW'; const english = lang === 'en';
  const copy = english ? { title:'Capability audit', lead:'Existing tools cover discovery and execution. The gap appears before action.', gap:'DECISION GAP', conclusion:'Core operation and execution are mature. The main gap is the judgment required before acting.' } : traditional ? { title:'現有能力盤點', lead:'梳理現有建站能力，定位仍需商家自行判斷的環節。', gap:'決策缺口', conclusion:'操作與執行能力已成熟，主要缺口發生在執行前的判斷過程。' } : { title:'现有能力盘点', lead:'梳理现有建站能力，定位仍需商家自行判断的环节。', gap:'决策缺口', conclusion:'保留现有编辑与执行能力，优先补强主题适配依据、整页规划与复杂修改的选择性审查。' };
  const groupsZh = [
    ['主题发现', 'Shopify Theme Store'],
    ['模块化编辑', '模板编辑器 · 分区 / 区块'],
    ['AI 辅助执行', 'Sidekick'],
    ['预览、控制与上线', '预览 · 保存 / 撤销 · 发布'],
  ];
  const groups = english ? [['Theme discovery','Shopify Theme Store'],['Section editing','Page editor · sections / blocks'],['AI-assisted edits','Sidekick'],['Preview and publishing','Preview · save / undo · publish']] : traditional ? [['主題探索','Shopify Theme Store'],['分區編輯','頁面編輯器 · 分區 / 區塊'],['AI 輔助修改','Sidekick'],['預覽與上線','預覽 · 儲存 / 撤銷 · 發佈']] : groupsZh;
  return <section className="skv skv-audit" aria-label={english ? 'Capability audit' : traditional ? '現有能力盤點' : '现有能力盘点'}>
    <header className="skv__header"><h4>{copy.title}</h4><p>{copy.lead}</p></header>
    <div className="skv-audit__rail">{groups.map(([title, items], index) => <div className="skv-audit__capability" key={title}><span>0{index + 1}</span><b>{title}</b><em>{items}</em>{index < groups.length - 1 && <i aria-hidden="true">→</i>}</div>)}</div>
    <div className="skv-audit__evidence">
<figure className="skv-audit__evidence-row"><figcaption className="skv-audit__row-title"><span>01 · Theme Store</span><h5>{english?'Browse and preview themes':traditional?'主題瀏覽與預覽':'主题浏览与预览'}</h5></figcaption><a className="skv-audit__illustration skv-audit__media" href="https://themes.shopify.com/collections/free-themes" target="_blank" rel="noopener noreferrer" aria-label={english?'Open official Theme Store source in a new tab':traditional?'在新分頁開啟 Theme Store 官方來源':'在新标签页打开 Theme Store 官方来源'}><picture><source media="(max-width: 767px)" srcSet={`${import.meta.env.BASE_URL}case-sidekick/illustrations/theme-discovery-mobile.svg`} /><img src={`${import.meta.env.BASE_URL}case-sidekick/illustrations/theme-discovery.svg`} alt="" loading="lazy" /></picture><span className="skv-audit__illustration-label">{english?'Product capability illustration':traditional?'產品能力示意':'产品能力示意'}</span></a><div className="skv-audit__row-copy"><p>{english?'Shopify Theme Store offers themes with different styles and features for merchants to browse, preview, and try.':traditional?'Shopify Theme Store 提供不同風格和功能的主題，商家可以瀏覽、預覽並試用。':'Shopify Theme Store 提供不同风格和功能的主题，商家可以浏览、预览并试用。'}<strong>{english?'Design observation: Merchants still need to assess how a theme fits their products, brand, and business goals.':traditional?'設計觀察：主題具備多種選擇，但商家仍需判斷主題與商品、品牌及經營目標的匹配程度。':'设计观察：主题具备多种选择，但商家仍需判断主题与商品、品牌及经营目标的匹配程度。'}</strong></p></div></figure>
<figure className="skv-audit__evidence-row"><figcaption className="skv-audit__row-title"><span>02 · Theme Editor</span><h5>{english?'Visual editing and sections':traditional?'視覺化編輯與分區配置':'可视化编辑与分区配置'}</h5></figcaption><a className="skv-audit__illustration skv-audit__media" href="https://shopify.dev/docs/storefronts/themes/best-practices/editor" target="_blank" rel="noopener noreferrer" aria-label={english?'Open official Theme Editor source in a new tab':traditional?'在新分頁開啟 Theme Editor 官方來源':'在新标签页打开 Theme Editor 官方来源'}><picture><source media="(max-width: 767px)" srcSet={`${import.meta.env.BASE_URL}case-sidekick/illustrations/theme-editor-mobile.svg`} /><img src={`${import.meta.env.BASE_URL}case-sidekick/illustrations/theme-editor.svg`} alt="" loading="lazy" /></picture><span className="skv-audit__illustration-label">{english?'Product capability illustration':traditional?'產品能力示意':'产品能力示意'}</span></a><div className="skv-audit__row-copy"><p>{english?'Adjust page content with sections and blocks, preview changes, and configure local styles.':traditional?'透過分區與區塊調整頁面內容，即時預覽修改效果，並配置局部樣式。':'通过分区与区块调整页面内容，实时预览修改效果，并配置局部样式。'}</p><ol className="skv-audit__annotations"><li><b>{english?'01 Section structure':traditional?'01 分區結構':'01 分区结构'}</b><span>{english?'Add, remove, and rearrange content':traditional?'新增、移除與調整內容':'新增、移除与调整内容'}</span></li><li><b>{english?'02 Live preview':traditional?'02 即時預覽':'02 实时预览'}</b><span>{english?'Inspect the updated page':traditional?'檢查修改後的頁面表現':'检查修改后的页面表现'}</span></li><li><b>{english?'03 Local settings':traditional?'03 局部設定':'03 局部设置'}</b><span>{english?'Configure selected content and styles':traditional?'配置選中區域的內容與樣式':'配置选中区域的内容与样式'}</span></li></ol>
        <div className="skv-audit__interpretation"><div className="skv-audit__interpretation-copy"><small>{english?'Design observation':traditional?'設計觀察':'设计观察'}</small><p>{english?'The editor enables changes; merchants still decide the overall page plan and content order.':traditional?'編輯工具解決了頁面如何修改的問題，但整體頁面如何規劃、內容如何排序，仍需要商家作出判斷。':'编辑工具解决了页面如何修改的问题，但整体页面如何规划、内容如何排序，仍需要商家作出判断。'}</p></div></div>

      </div></figure>
<figure className="skv-audit__evidence-row"><figcaption className="skv-audit__row-title"><span>03 · Sidekick</span><h5>{english?'AI assistance for merchant tasks':traditional?'AI 協助商家完成任務':'AI 辅助商家完成任务'}</h5></figcaption><a className="skv-audit__media skv-audit__illustration" href="https://www.shopify.com/blog/admin-new-look" target="_blank" rel="noopener noreferrer" aria-label={english?'Open official Sidekick source in a new tab':traditional?'在新分頁開啟 Sidekick 官方來源':'在新标签页打开 Sidekick 官方来源'}><picture><source media="(max-width: 767px)" srcSet={`${import.meta.env.BASE_URL}case-sidekick/illustrations/assistant-mobile.svg`} /><img src={`${import.meta.env.BASE_URL}case-sidekick/illustrations/assistant.svg`} alt="" loading="lazy" /></picture><span className="skv-audit__illustration-label">{english?'Product capability illustration':traditional?'產品能力示意':'产品能力示意'}</span></a><div className="skv-audit__row-copy"><p>{english?'Sidekick uses conversation to understand merchant needs, offer suggestions, and assist with some store management tasks.':traditional?'Sidekick 透過對話方式理解商家需求，提供建議並協助完成部分商店管理任務。':'Sidekick 通过对话方式理解商家需求，提供建议并辅助完成部分商店管理任务。'}<strong>{english?'Design observation: For edits across page areas, merchants need to understand the changes, affected areas, and final result.':traditional?'設計觀察：對於涉及多個頁面區域的修改，商家需要理解修改內容、影響範圍及最終結果。':'设计观察：对于涉及多个页面区域的修改，商家需要理解修改内容、影响范围及最终结果。'}</strong></p></div></figure>
    </div>
    <div className="skv-audit__finding"><b>{traditional?'盤點結論':english?'Audit conclusion':'盘点结论'}</b><p>{copy.conclusion}</p></div>
  </section>;
}

function SidekickResearch({ lang }) {
  const traditional = lang === 'zh-TW'; const english = lang === 'en';
  const labels = english ? { study:'40 target merchants',method:'Semi-structured interviews · Task recall',synthesis:'Synthesis',title:'3 key decision gaps',categories:'Theme fit · Page planning · AI change control',board:'From task observations to key decision questions',desc:'Research synthesis connects task observations, problem patterns, key questions, and design opportunities.',observation:'Task observation',pattern:'Problem synthesis',decision:'Key question',opportunity:'Design opportunity'} : traditional ? { study:'40 名目標商家',method:'半結構化訪談 · 關鍵任務回溯',synthesis:'研究收斂',title:'3 類關鍵決策問題',categories:'主題適配 · 頁面規劃 · 複雜 AI 修改控制',board:'從任務觀察到關鍵決策問題',desc:'依研究歸納呈現任務觀察、問題歸納、關鍵判斷與設計機會。',observation:'任務觀察',pattern:'問題歸納',decision:'關鍵判斷',opportunity:'設計機會'} : { study:'40 名目标商家',method:'半结构化访谈 · 关键任务回溯',synthesis:'研究收敛',title:'3 类关键决策问题',categories:'主题适配 · 页面规划 · 复杂 AI 修改控制',board:'从任务观察到关键决策问题',desc:'依据研究归纳呈现任务观察、问题归纳、关键判断与设计机会。',observation:'任务观察',pattern:'问题归纳',decision:'关键判断',opportunity:'设计机会'};
  const evidenceLanesZh = [
    {
      label: '主题适配',
      observations: ['候选主题较多，需要反复预览比较；主题差异难以转化为业务判断。'],
      pattern: '缺少业务适配依据。',
      question: '减少候选数量并不能替代主题与经营目标的匹配判断。',
      opportunities: ['提供主题推荐，并展示商品、品牌与经营目标的匹配依据。'],
    },
    {
      label: '页面规划',
      observations: ['商家能够表达经营目标，但难以直接组织页面结构；规划和具体配置往往混在一起。'],
      pattern: '缺少从经营目标到页面结构的规划步骤。',
      question: '先厘清整页目标与内容关系，再进入模块配置，能避免边配置边规划。',
      opportunities: ['提供可调整页面结构与内容顺序的规划视图。'],
    },
    {
      label: '复杂 AI 修改',
      observations: ['商家难以判断一次 AI 操作的影响范围，也希望能选择性保留部分修改。'],
      pattern: '多项修改的范围与选择性接受需要更清楚地表达。',
      question: '修改涉及多个区域时，先评估影响再确认，可降低整组接受的不确定性。',
      opportunities: ['提供影响范围预览、逐项保留和撤销控制。'],
    },
  ];
  const evidenceLanes = english ? [
    { label:'Theme fit',observations:['Many themes require repeated previews and comparison; differences are hard to translate into business decisions.'],pattern:'Business-fit criteria are missing.',question:'Reducing the candidate list alone does not explain which theme fits the merchant’s goals.',opportunities:['Recommend themes with visible fit criteria for products, brand, and business goals.'] },
    { label:'Page planning',observations:['Merchants can state a business goal but struggle to organize a page structure; planning and configuration are often mixed together.'],pattern:'No clear step turns business goals into page structure.',question:'Clarifying whole-page goals and content relationships first helps avoid planning while configuring.',opportunities:['Provide an editable page outline for sections and content order.'] },
    { label:'Controlled AI edits',observations:['Merchants struggle to assess the impact of an AI edit and want to keep selected changes only.'],pattern:'Complex edits lack impact review before execution.',question:'For cross-section changes, reviewing impact before confirmation reduces uncertainty about accepting a full batch.',opportunities:['Provide impact preview, per-change keep/remove controls, and undo.'] },
  ] : traditional ? [
    { label:'主題適配',observations:['候選主題較多，需要反覆預覽比較；主題差異難以轉化為業務判斷。'],pattern:'缺少業務適配依據。',question:'單純減少候選數量，無法說明主題為何符合經營目標。',opportunities:['提供主題推薦，並呈現商品、品牌與經營目標的匹配依據。'] },
    { label:'頁面規劃',observations:['商家能表達經營目標，但難以直接組織頁面結構；規劃和具體配置往往混在一起。'],pattern:'缺少從經營目標到頁面結構的規劃步驟。',question:'先釐清整頁目標與內容關係，再進入模組配置，可避免邊配置邊規劃。',opportunities:['提供可調整頁面結構與內容順序的規劃視圖。'] },
    { label:'複雜 AI 修改',observations:['商家難以判斷一次 AI 操作的影響範圍，也希望能選擇性保留部分修改。'],pattern:'複雜修改缺少執行前的影響審查。',question:'跨區域修改先查看影響再確認，可降低整組接受的不確定性。',opportunities:['提供影響範圍預覽、逐項保留與撤銷控制。'] },
  ] : evidenceLanesZh;
  return <section className="skv skv-research" aria-label={english ? 'Qualitative research with 40 target merchants' : traditional ? '40 名目標商家定性研究' : '40 名目标商家定性研究'}>
    <header className="skv-research__header"><div className="skv-research__number"><div><strong>40</strong><span>{labels.study.replace('40','').trim()}</span></div><small>{labels.method}</small></div><div><span className="skv__eyebrow">{labels.synthesis}</span><h4>{labels.title}</h4><p>{labels.categories}</p></div></header>
    <div className="skv-research__board" role="table" aria-label={labels.board}>
      <header className="skv-research__board-head"><h5>{labels.board}</h5><p>{labels.desc}</p></header>
      <div className="skv-research__board-grid skv-research__board-grid--head" role="row">{[labels.observation, labels.pattern, labels.decision, labels.opportunity].map((label) => <span role="columnheader" key={label}>{label}</span>)}</div>
      <div className="skv-research__lanes" role="rowgroup">{evidenceLanes.map((lane, index) => <article className="skv-research__lane" role="row" key={lane.label}>
        <div className="skv-research__lane-cell skv-research__lane-cell--observation" role="rowheader"><div className="skv-research__lane-label"><span>0{index + 1}</span><b>{lane.label}</b></div><small>{labels.observation}</small><ul>{lane.observations.map((item) => <li key={item}>{item}</li>)}</ul></div>
        <div className="skv-research__lane-cell skv-research__lane-cell--pattern" role="cell"><small>{labels.pattern}</small><p>{lane.pattern}</p></div>
        <div className="skv-research__lane-cell skv-research__lane-cell--question" role="cell"><small>{labels.decision}</small><p>{lane.question}</p></div>
        <div className="skv-research__lane-cell skv-research__lane-cell--opportunity" role="cell"><small>{labels.opportunity}</small><ul>{lane.opportunities.map((item) => <li key={item}>{item}</li>)}</ul></div>
      </article>)}</div>
    </div>
  </section>;
}

function SidekickStability({ lang }) {
  const traditional = lang === 'zh-TW'; const english = lang === 'en';
  const ui = english ? { independent:'independent runs',multiplier:'task types',setup:'Test setup',prompt:'Merchant goal',promptText:'Increase homepage visibility for new products while preserving the brand tone',context:'Context',contextText:'Product catalog / current theme / page state / brand expression',expected:'Expected output',expectedText:'Page plan / recommended sections / edit suggestions',evaluation:'Evaluation lens',evaluationText:'Goal coverage / impact scope / plan completeness / confirmation need',run:'Task type',finding:'Observation and task characteristics',judgment:'Design judgment',policy:'Control strategy',conclusion:'Control strength considers impact scope, business impact, and reversibility. The five task types are not five risk levels.',representative:'representative tasks',example:'Typical task walkthrough',exampleNote:'Synthesized from the task categories and design conclusions.',input:'Task input',observed:'Test observation',ux:'UX judgment',strategy:'Interaction strategy',inputText:'Increase homepage visibility for new products while preserving the brand tone.',observedText:'Cross-area edits are possible, but coverage varies.',uxText:'Before applying, merchants need to see which areas will change and judge whether the result fits the intended outcome.',strategyText:'Show affected areas, preview changes, review and confirm, then apply or discard.' } : traditional ? { independent:'次獨立執行',multiplier:'類任務',setup:'測試設定',prompt:'商家目標',promptText:'提升首頁新品曝光，同時保持目前品牌調性',context:'脈絡',contextText:'商品結構 / 目前 Theme / 頁面狀態 / 品牌表達',expected:'預期輸出',expectedText:'頁面規劃方案 / 推薦 Section / 修改建議',evaluation:'評估維度',evaluationText:'目標覆蓋 / 影響範圍 / 方案完整性 / 確認需求',run:'任務類型',finding:'測試觀察與任務特徵',judgment:'設計判斷',policy:'控制策略',conclusion:'控制強度需綜合考慮影響範圍、業務影響與可逆性；五類任務不等同於五個風險等級。',representative:'個代表任務',example:'典型任務推導',exampleNote:'依既有任務分類與設計結論整理。',input:'任務輸入',observed:'測試觀察',ux:'UX 判斷',strategy:'互動策略',inputText:'提升首頁新品曝光，同時保持品牌調性。商家希望提高新品曝光，但不希望破壞現有品牌表達。',observedText:'跨區域修改可以執行，但覆蓋範圍存在波動。',uxText:'商家需要在應用前看到哪些區域將被修改，並判斷結果是否符合預期。',strategyText:'顯示影響範圍、預覽修改、審查確認，再選擇應用或放棄。' } : { independent:'次独立执行',multiplier:'类任务',setup:'测试设置',prompt:'商家目标',promptText:'提升首页新品曝光，同时保持当前品牌调性',context:'上下文',contextText:'商品结构 / 当前 Theme / 页面状态 / 品牌表达',expected:'预期输出',expectedText:'页面规划方案 / 推荐 Section / 修改建议',evaluation:'评估维度',evaluationText:'目标覆盖 / 影响范围 / 方案完整性 / 确认需求',run:'任务类型',finding:'测试观察与任务特征',judgment:'设计判断',policy:'控制策略',conclusion:'控制强度需结合影响范围、业务影响与可逆性判断；五类任务不直接等同于五个风险等级。',representative:'个代表任务',example:'典型任务推导',exampleNote:'根据既有任务分类与设计结论整理。',input:'任务输入',observed:'测试观察',ux:'UX 判断',strategy:'交互策略',inputText:'提升首页新品曝光，同时保持品牌调性。商家希望提高新品曝光，但不希望破坏现有品牌表达。',observedText:'跨区域修改可以执行，但覆盖范围存在波动。',uxText:'商家需要在应用前看到哪些区域将被修改，并判断结果是否符合预期。',strategyText:'显示影响范围、预览修改、审查确认，再选择应用或放弃。' };
  const tasksZh = [
    ['明确参数与内容修改', '在测试范围内表现较稳定', '参数与修改对象明确，且结果可撤销，适合直接执行并及时反馈。', '直接执行 + 结果反馈 + 撤销'],
    ['抽象经营意图理解', '可识别主要目标，但依赖上下文', '补充业务上下文后再推荐，避免把意图识别结果当成已确认配置。', '补充上下文 + 推荐'],
    ['页面级跨区域修改', '可执行，但覆盖范围存在波动', '覆盖波动会增加结果不确定性，应用前应展示具体修改范围与结果。', '显示影响范围 + 修改预览'],
    ['跨分区页面规划', '能够形成方案，但需要人工审查', '生成方案仍需核对是否符合经营目标与内容顺序，审查后再配置。', '页面规划方案 + 人工审查'],
    ['高影响修改', '涉及多个区域或关键状态', '确认强度需结合业务影响和可逆性判断，不能只按覆盖范围定风险。', '原因解释 + 预览 + 明确确认'],
  ];
  const tasks = english ? [
    ['Explicit parameter and content edits','Relatively stable within the tested scope','The target and parameters are explicit and the result is reversible, so direct execution with feedback is appropriate.','Direct execution · feedback · undo'],
    ['Interpreting abstract business intent','Identifies the main goal but relies on context','Add business context before recommending; intent recognition is not confirmed configuration.','Add context · recommend'],
    ['Page-wide changes across areas','Can execute, but coverage varies','Variable coverage makes outcomes harder to predict, so show the affected areas and preview first.','Show scope · preview changes'],
    ['Planning across page sections','Can form a plan that still needs human review','Review the plan against the business goal and content order before configuration.','Page plan · human review'],
    ['High-impact edits','Multiple areas or important states require stronger control','Confirmation strength depends on business impact and reversibility, not scope alone.','Explain rationale · preview · confirm'],
  ] : traditional ? [
    ['明確參數與內容修改','在測試範圍內表現相對穩定','修改對象與參數明確，且結果可撤銷，適合直接執行並即時回饋。','直接執行 + 結果回饋 + 撤銷'],
    ['理解抽象經營意圖','可識別主要目標，但依賴脈絡','補足業務脈絡後再推薦，避免將意圖識別當成已確認的配置。','補充脈絡 + 推薦'],
    ['跨區域頁面修改','可執行，但覆蓋範圍有所波動','覆蓋波動會增加結果的不確定性，應先展示修改範圍與預覽。','顯示影響範圍 + 修改預覽'],
    ['跨分區頁面規劃','能形成方案，但仍需人工審查','先依經營目標與內容順序審查方案，再進入配置。','頁面規劃方案 + 人工審查'],
    ['高影響修改','涉及多個區域或重要狀態','確認強度需結合業務影響與可逆性判斷，不能只按覆蓋範圍定風險。','原因說明 + 預覽 + 明確確認'],
  ] : tasksZh;
  return <section className="skv skv-stability" aria-label={english ? '50 AI stability tests' : traditional ? '50 次 AI 穩定性測試' : '50 次 AI 稳定性测试'}>
    <header className="skv-stability__header"><div><strong>50</strong><span>{ui.independent}</span></div><p><b>5 {ui.multiplier}</b> × <b>2 {ui.representative}</b> × <b>5 {ui.independent}</b></p></header>
    <div className="skv-stability__sample"><small className="skv-stability__sample-label">{ui.setup}</small><div><small>{ui.prompt}</small><b>{ui.promptText}</b></div><div><small>{ui.context}</small><span>{ui.contextText}</span></div><aside><small>{ui.expected}</small><span>{ui.expectedText}</span></aside><aside><small>{ui.evaluation}</small><span>{ui.evaluationText}</span></aside></div>
    <div className="skv-stability__run-board"><div className="skv-stability__run-head"><span>{ui.run}</span><span>{ui.finding}</span><span>{ui.judgment}</span><span>{ui.policy}</span></div><div className="skv-stability__runs">{tasks.map(([title, finding, judgment, strategy], index) => <article key={title}><span className="skv-stability__run-index">0{index + 1}</span><div className="skv-stability__task"><small>{ui.run}</small><b>{title}</b></div><div className="skv-stability__cell skv-stability__observation"><small>{ui.finding}</small><p>{finding}</p></div><div className="skv-stability__cell skv-stability__judgment"><small>{ui.judgment}</small><p>{judgment}</p></div><div className="skv-stability__cell skv-stability__strategy"><small>{ui.policy}</small><strong>{strategy}</strong></div></article>)}</div></div>
    <p className="skv-stability__conclusion">{ui.conclusion}</p>
    <section className="skv-stability__derivation" aria-label={ui.example}><header><h5>{ui.example}</h5><p>{ui.exampleNote}</p></header><ol><li><small>01 · {ui.input}</small><p>{ui.inputText}</p></li><li><small>02 · {ui.observed}</small><p>{ui.observedText}</p></li><li><small>03 · {ui.ux}</small><p>{ui.uxText}</p></li><li><small>04 · {ui.strategy}</small><p>{ui.strategyText}</p></li></ol></section>
  </section>;
}

function SidekickJourney({ lang }) {
  const traditional = lang === 'zh-TW'; const english = lang === 'en';
  const t = english ? { aria:'Intent to configuration distance',eyebrow:'Problem framing',title:'From intent to configuration',desc:'Illustrative task path; the number of decision points varies by task.',before:'Before',beforeNote:'Merchant makes each decision',after:'With decision support',afterNote:'AI carries part of the reasoning',delta:'Fewer key decision points',legend:['Independent merchant decision','AI assistance','Merchant control'],fine:'Illustrative task path, not a fixed sequence for every merchant.',nodesBefore:['Business goal','Choose a theme','Understand theme capabilities','Assess business fit','Set page goals','Plan page structure','Choose sections','Order content','Present products','Configure details'],nodesAfter:['Business goal','AI reads business context','Theme recommendation','Page plan','Review and adjust','Enter configuration'] } : traditional ? { aria:'從意圖到配置的距離',eyebrow:'問題抽象',title:'從意圖到具體配置',desc:'典型任務路徑示意；決策節點數會隨任務而變化。',before:'優化前',beforeNote:'商家逐步自行判斷',after:'加入決策輔助後',afterNote:'AI 承接部分判斷',delta:'關鍵決策節點減少',legend:['商家獨立判斷','AI 輔助','商家控制'],fine:'此為典型任務路徑示意，不代表每位商家的固定流程。',nodesBefore:['經營目標','選擇 Theme','了解 Theme 能力','判斷業務適配','定義頁面目標','規劃頁面結構','選擇 Section','安排內容順序','呈現商品','具體配置'],nodesAfter:['經營目標','AI 取得業務脈絡','主題推薦','頁面規劃方案','審查與調整','進入具體配置'] } : { aria:'意图到配置的距离',eyebrow:'问题抽象',title:'从意图到具体配置',desc:'典型任务路径示意；决策节点会随任务而变化。',before:'优化前',beforeNote:'商家逐步自行判断',after:'加入决策辅助后',afterNote:'AI 承接部分判断',delta:'关键决策节点减少',legend:['商家独立判断','AI 辅助','商家控制'],fine:'此为典型任务路径示意，不代表每位商家的固定流程。',nodesBefore:['经营目标','选择 Theme','了解 Theme 能力','判断业务适配','定义页面目标','规划页面结构','选择 Section','安排内容顺序','呈现商品','具体配置'],nodesAfter:['经营目标','AI 获取业务上下文','主题推荐','页面规划方案','审查与调整','进入具体配置'] };
  const before = t.nodesBefore;
  const after = t.nodesAfter;
  return <section className="skv-journey" aria-label={t.aria}>
    <header><span className="skv__eyebrow">{t.eyebrow}</span><h4>{t.title}</h4><p>{t.desc}</p></header>
    <div className="skv-journey__row"><div className="skv-journey__label"><b>{t.before}</b><span>{t.beforeNote}</span><strong>9–14 {english?'key decisions':traditional?'個關鍵節點':'个关键节点'}</strong></div><div className="skv-journey__nodes">{before.map((node,i)=><span className={i===0||i===9?'':'is-decision'} key={node}>{node}</span>)}</div></div>
    <div className="skv-journey__delta"><strong>{english ? '↓ ~44%' : traditional ? '↓ 約 44%' : '↓ 约 44%'}</strong><span>{t.delta}</span></div>
    <div className="skv-journey__row is-after"><div className="skv-journey__label"><b>{t.after}</b><span>{t.afterNote}</span><strong>5–8 {english?'key decisions':traditional?'個關鍵節點':'个关键节点'}</strong></div><div className="skv-journey__nodes">{after.map((node,i)=><span className={i===1||i===2||i===3?'is-ai':i===4?'is-user':''} key={node}>{node}</span>)}</div></div>
    <footer><span><i className="is-decision"/>{t.legend[0]}</span><span><i className="is-ai"/>{t.legend[1]}</span><span><i className="is-user"/>{t.legend[2]}</span><small>{t.fine}</small></footer>
  </section>;
}

function SidekickPriority({ lang }) {
  const traditional = lang === 'zh-TW'; const english = lang === 'en';
  const t = english ? { eyebrow:'Priority decision',title:'Prioritize the gap that shapes the most downstream work',p0:'Page planning',p0note:'The bridge between a business goal and concrete page configuration.',existing:'Existing capability',gap:'Decision gap',impact:'Downstream work',editor:'Theme Editor supports section editing.',goal:'A business goal does not yet become a complete page structure.',stages:['Section selection','Content order','Product expression'],theme:'Theme fit',themeGap:'Theme discovery exists; business fit still needs a basis.',ai:'AI change control',aiGap:'Cross-area changes need review before execution.',basis:'Decision basis',basisItems:['Merchant effort','Capability gap','Task reach']} : traditional ? { eyebrow:'優先級判斷',title:'先處理影響最多後續決策的缺口',p0:'頁面規劃',p0note:'連接經營目標與具體頁面配置的關鍵環節。',existing:'現有能力',gap:'決策缺口',impact:'下游任務',editor:'Theme Editor 已支援 Section 編輯。',goal:'經營目標尚不能直接形成完整頁面結構。',stages:['選擇分區','安排內容順序','呈現商品'],theme:'主題適配',themeGap:'已有主題探索能力，仍缺少業務適配依據。',ai:'複雜 AI 修改控制',aiGap:'跨區域修改需要在執行前審查。',basis:'判斷依據',basisItems:['商家決策成本','現有能力缺口','任務影響範圍']} : { eyebrow:'优先级判断',title:'先解决影响后续决策最多的问题',p0:'页面规划',p0note:'连接经营目标与具体页面配置的关键环节。',existing:'现有能力',gap:'决策缺口',impact:'下游任务',editor:'Theme Editor 已支持 Section 编辑。',goal:'经营目标还不能直接形成完整页面结构。',stages:['选择分区','安排内容顺序','呈现商品'],theme:'主题适配',themeGap:'已有主题发现能力，仍缺少业务适配依据。',ai:'复杂 AI 修改控制',aiGap:'跨区域修改需要在执行前审查。',basis:'判断依据',basisItems:['商家决策成本','现有能力缺口','任务影响范围']};
  return <section className="skv-priority" aria-label={t.eyebrow}>
    <header><span className="skv__eyebrow">{t.eyebrow}</span><h4>{t.title}</h4></header>
    <div className="skv-priority__map">
      <article className="skv-priority__side"><span>P1</span><h5>{t.theme}</h5><div className="skv-priority__summary"><small>{t.existing}</small><p>{traditional ? 'Theme Store 已提供主題探索與預覽。' : english ? 'Theme Store provides discovery and preview.' : 'Theme Store 已提供主题发现与预览。'}</p></div><div className="skv-priority__detail"><small>{t.gap}</small><p>{t.themeGap}</p></div></article>
      <article className="skv-priority__focus"><div className="skv-priority__focus-label"><b>P0</b><span>{traditional ? '核心決策' : english ? 'Core decision' : '核心决策'}</span></div><h5>{t.p0}</h5><p className="skv-priority__summary">{t.p0note}</p><div className="skv-priority__content"><div className="skv-priority__facts"><div><small>{t.existing}</small><span>{t.editor}</span></div><div><small>{t.gap}</small><span>{t.goal}</span></div></div><div className="skv-priority__branches"><small>{t.impact}</small><div>{t.stages.map((item,i)=><span key={item}><i>0{i+1}</i>{item}</span>)}</div></div></div></article>
      <article className="skv-priority__side"><span>P1</span><h5>{t.ai}</h5><div className="skv-priority__summary"><small>{t.existing}</small><p>{traditional ? 'Sidekick 已支援部分修改與撤銷。' : english ? 'Sidekick supports some edits and undo.' : 'Sidekick 已支持部分修改与撤销。'}</p></div><div className="skv-priority__detail"><small>{t.gap}</small><p>{t.aiGap}</p></div></article>
    </div>
    <footer><b>{t.basis}</b>{t.basisItems.map((item,i)=><React.Fragment key={item}>{i>0&&<i aria-hidden="true">·</i>}<span>{item}</span></React.Fragment>)}</footer>
  </section>
}

function SidekickStrategy({ lang }) {
  const english = lang === 'en'; const traditional = lang === 'zh-TW';
  const items = english ? [
    ['Capability audit', 'Editing is already supported; merchants still need help with decisions before execution.'],
    ['Merchant research', 'Research with 40 target merchants surfaced theme fit, page planning, and complex AI edits.'],
    ['AI testing', '50 independent runs clarified task capability boundaries and control needs.'],
  ] : traditional ? [
    ['能力盤點', '編輯能力已具備，缺少前置決策支持。'],
    ['商家研究', '40 名目標商家研究，歸納出主題適配、頁面規劃與複雜 AI 修改三類問題。'],
    ['AI 測試', '50 次獨立執行，明確不同任務的能力邊界與控制要求。'],
  ] : [
    ['能力盘点', '编辑能力已具备，缺少前置决策支持。'],
    ['商家研究', '40 名目标商家研究，归纳出主题适配、页面规划、复杂 AI 修改三类关键问题。'],
    ['AI 测试', '50 次独立执行，明确不同任务的能力边界与控制要求。'],
  ];
  return <div className="skv-strategy">
    <div className="skv-strategy__evidence">{items.map(([title, body], i) => <article key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
    <SidekickDecisionLayer lang={lang} />
  </div>;
}

function SidekickDecisionLayer({ lang }) {
  const english = lang === 'en'; const traditional = lang === 'zh-TW';
  const t = english ? {
    aria:'Decision support between business goals and page configuration', title:'Add a decision-support layer between business goals and page configuration',
    goal:'Business goal', goalText:'Increase new product exposure', goalNote:'Preserve the current brand tone', ai:'AI decision support', aiItems:['Context understanding','Problem diagnosis','Recommendations','Page planning','Reasoning','Impact assessment'],
    control:'User decisions and AI risk controls', planningGroup:'Theme recommendation / page planning', planningActions:'User reviews, adjusts, and chooses.', executionGroup:'AI edit execution', low:'Low · Execute directly', medium:'Medium · Preview and confirm', high:'High · Review each change and confirm',
    execute:'Existing editing capability', tools:'Sections / Blocks · relevant Sidekick capabilities', result:'Result feedback and undo', applied:'Clear result status', undo:'Undo where applicable',
  } : traditional ? {
    aria:'經營目標與頁面配置之間的決策輔助', title:'在經營目標與頁面配置之間增加決策輔助層',
    goal:'經營目標', goalText:'提升新品曝光', goalNote:'保持目前品牌調性', ai:'AI 決策輔助', aiItems:['上下文理解','問題診斷','方案推薦','頁面規劃','原因解釋','影響判斷'],
    control:'使用者決策與 AI 修改控制', planningGroup:'主題推薦 / 頁面規劃', planningActions:'使用者審查、調整與選擇。', executionGroup:'AI 修改執行', low:'低風險：直接執行', medium:'中風險：預覽並確認', high:'高風險：逐項審查並最終確認',
    execute:'現有編輯能力執行', tools:'Sections / Blocks · 適用的 Sidekick 能力', result:'結果回饋與撤銷', applied:'明確呈現執行結果', undo:'適用範圍內可撤銷',
  } : {
    aria:'经营目标与页面配置之间的决策辅助', title:'在经营目标与页面配置之间增加决策辅助层',
    goal:'经营目标', goalText:'提升新品曝光', goalNote:'保持当前品牌调性', ai:'AI 决策辅助', aiItems:['上下文理解','问题诊断','方案推荐','页面规划','原因解释','影响判断'],
    control:'用户决策与风险控制', planningGroup:'主题推荐 / 页面规划', planningActions:'用户审查、调整与选择。', executionGroup:'AI 修改执行', low:'低风险：直接执行', medium:'中风险：预览并确认', high:'高风险：逐项审查并最终确认',
    execute:'现有编辑能力执行', tools:'Sections / Blocks · 适用的 Sidekick 能力', result:'结果反馈与撤销', applied:'明确呈现执行结果', undo:'适用范围内可撤销',
  };
  return <section className="skv skv-decision-layer" aria-label={t.aria}>
    <header className="skv__header"><span className="skv__eyebrow">{english ? '04 · Design strategy' : traditional ? '04 · 設計策略' : '04 · 设计策略'}</span><h4>{t.title}</h4></header>
    <div className="skv-strategy-flow">
      <article className="skv-strategy-flow__goal"><small>{t.goal}</small><b>{t.goalText}</b><span>{t.goalNote}</span></article>
      <article className="skv-strategy-flow__ai"><small>{t.ai}</small><div>{t.aiItems.map((item, i) => <span key={item}><b>0{i + 1}</b>{item}</span>)}</div></article>
      <article className="skv-strategy-flow__control"><small>{t.control}</small><div className="skv-strategy-flow__control-groups"><div className="skv-strategy-flow__control-group"><b>{t.planningGroup}</b><span>{t.planningActions}</span></div><div className="skv-strategy-flow__control-group"><b>{t.executionGroup}</b><ul><li>{t.low}</li><li>{t.medium}</li><li>{t.high}</li></ul></div></div></article>
      <article className="skv-strategy-flow__execute"><small>{t.execute}</small><b>Theme Editor</b><span>{t.tools}</span></article>
      <article className="skv-strategy-flow__result"><small>{t.result}</small><b>{t.applied}</b><span>{t.undo}</span></article>
    </div>
  </section>;
}

function TideFieldStorePage({ lang, order = [0, 1, 2, 3, 4, 5], selectedSection = null, onSelect, appliedChanges = [], visibleSections }) {
  const traditional = lang === 'zh-TW'; const english = lang === 'en';
  const sectionIds = visibleSections ? order.filter((id) => visibleSections.includes(id)) : order;
  const labels = english ? ['Hero','Value proposition','Featured products','Customer reviews','Brand story','Shop the collection'] : traditional ? ['首屏','價值主張','精選商品','用戶口碑','品牌故事','轉化行動'] : ['首屏','价值主张','精选商品','用户口碑','品牌故事','转化行动'];
  const choose = (id) => onSelect?.(id);
  return <div className="skv-plan__store"><div className="skv-plan__storebar"><b>TIDE / FIELD</b><nav>{english?'New arrivals　Shop　Our story':traditional?'新品　商品　品牌故事':'新品　商品　品牌故事'}</nav><span>{english?'Bag　0':traditional?'購物袋　0':'购物袋　0'}</span></div>{sectionIds.map((sectionId,i)=>{const name=labels[sectionId];return <article key={sectionId} className={`skv-plan__store-section skv-plan__store-section--${sectionId}${selectedSection===sectionId?' is-selected':''}`}><button type="button" className="skv-plan__store-select" onClick={()=>choose(sectionId)} aria-label={`${english?'Select':traditional?'選擇':'选择'} ${name}`}><small>{String(i+1).padStart(2,'0')} · {name}</small>{sectionId===0?<div className={`skv-plan__hero-content${appliedChanges.includes(0)?' is-ai-focused':''}`}><div><span className="skv-plan__kicker">{english?'NEW SEASON · COASTAL GOODS':traditional?'新品季　·　海岸裝備':'新品季　·　海岸装备'}</span><h3>{appliedChanges.includes(0)?(english?'Meet the new collection':traditional?'新品系列，迎接下一道浪':'新品系列，迎接下一道浪'):(english?'Meet the water on your own terms':traditional?'找到屬於你的入浪節奏':'找到属于你的入浪节奏')}</h3><p>{english?'Light, considered surf essentials made for long days by the sea.':traditional?'為海岸日常打造的輕量裝備，陪你自在迎向每一道浪。':'为海岸日常打造的轻量装备，陪你自在迎向每一道浪。'}</p><span className="skv-plan__store-cta">{english?'Explore the collection':traditional?'探索冲浪系列':'探索冲浪系列'}　→</span></div><img src={`${import.meta.env.BASE_URL}case-sidekick/planning/store-hero.svg`} alt={english?'Surfer riding a wave beside the coast':traditional?'衝浪者在海岸乘浪':'冲浪者在海岸乘浪'} /></div>:sectionId===1?<div className="skv-plan__value-content"><h3>{english?'Built for the rhythm of the sea':traditional?'為海浪而造，為日常而選':'为海浪而造，为日常而选'}</h3><p>{english?'Every detail supports confidence in the water and comfort between sessions.':traditional?'從入水穩定度到岸上收納，每個細節都回應真實的海邊生活。':'从入水稳定度到岸上收纳，每个细节都回应真实的海边生活。'}</p><div><span><b>01</b>{english?'Stable outline':traditional?'穩定板型':'稳定板型'}</span><span><b>02</b>{english?'Lightweight build':traditional?'輕量結構':'轻量结构'}</span><span><b>03</b>{english?'Made to last':traditional?'耐久設計':'耐久设计'}</span></div></div>:sectionId===2?<div className="skv-plan__product-content"><div className="skv-plan__section-heading"><h3>{english?'Boards for every kind of day':traditional?'為每種海況準備的衝浪板':'为每种海况准备的冲浪板'}</h3><span>{english?'Explore boards　→':traditional?'查看全部　→':'查看全部　→'}</span></div><div className="skv-plan__products">{[['surfboard-01.svg',english?'Coast Twin':traditional?'海岸雙板':'海岸双板','$330'],['surfboard-02.svg',english?'Current Pro':traditional?'潮流專業板':'潮流专业板','$335'],['surfboard-03.svg',english?'Open Water':traditional?'遠海輕板':'远海轻板','$330']].map(([src,title,price])=><div className="skv-plan__product" key={src}><div className="skv-plan__product-image"><img src={`${import.meta.env.BASE_URL}case-sidekick/planning/${src}`} alt={title} /></div><div><b>{title}</b><span>{english?'Designed for open water':traditional?'為海浪探索而設計':'为海浪探索而设计'}</span><small>{price} USD</small></div></div>)}</div></div>:sectionId===3?<div className="skv-plan__review-content"><div><span className="skv-plan__stars">★★★★★</span><b>{english?'Good gear earns its place':traditional?'真正好用的裝備，值得每一次出發':'真正好用的装备，值得每一次出发'}</b><p>{english?'“The board feels balanced from the first paddle. It has become my choice for weekend sessions.”':traditional?'「第一次划水就感覺很穩，現在週末出海都會帶上它。」':'「第一次划水就感觉很稳，现在周末出海都会带上它。」'}</p><small>{english?'Sample review · Surf collection':traditional?'示例評價 · 衝浪系列':'示例评价 · 冲浪系列'}</small></div><span className="skv-plan__review-mark">T/F</span></div>:sectionId===4?<div className="skv-plan__story-content"><img src={`${import.meta.env.BASE_URL}case-sidekick/planning/store-hero.svg`} alt={english?'Coastal surf scene':traditional?'海岸衝浪場景':'海岸冲浪场景'} /><div><span className="skv-plan__kicker">{english?'OUR POINT OF VIEW':traditional?'品牌理念':'品牌理念'}</span><h3>{english?'Made with respect for the water':traditional?'從海岸出發，回到海洋之中':'从海岸出发，回到海洋之中'}</h3><p>{english?'We make practical, lasting equipment for people who feel at home near the water.':traditional?'我們為熱愛海洋的人設計耐用、實用的裝備，讓每一次靠近海岸都更自在。':'我们为热爱海洋的人设计耐用、实用的装备，让每一次靠近海岸都更自在。'}</p></div></div>:<div className="skv-plan__final-cta"><div><span className="skv-plan__kicker">{english?'READY FOR YOUR NEXT SESSION?':traditional?'準備好迎接下一道浪了嗎？':'准备好迎接下一道浪了吗？'}</span><h3>{english?'Find your next board':traditional?'找到下一塊適合你的板':'找到下一块适合你的板'}</h3></div><span className="skv-plan__store-cta">{english?'Shop the collection':traditional?'選購衝浪系列':'选购冲浪系列'}　→</span></div>}</button></article>})}<footer className="skv-plan__store-footer">TIDE / FIELD <span>{english?'Thoughtful equipment for the coast':traditional?'為海岸生活而設計':'为海岸生活而设计'}</span></footer></div>;
}

function ThemeStorefrontPreview({ theme, lang, full = false }) {
  const traditional = lang === 'zh-TW'; const english = lang === 'en';
  const base = `${import.meta.env.BASE_URL}case-sidekick/planning/`;
  const copy = english ? {
    nav:'New arrivals　Shop　Our story', bag:'Bag　0', eyebrow:'NEW SEASON · COASTAL GOODS', title:'Meet the water on your own terms', desc:'Light, considered surf essentials made for long days by the sea.', cta:'Explore the collection', valueTitle:'Made for life by the water', value:'Thoughtful design for confident days in and out of the water.', products:'Meet the new collection', reviews:'Good gear earns its place', review:'“The board feels balanced from the first paddle. It has become my choice for weekend sessions.”', story:'Made with respect for the water', storyText:'Practical, lasting equipment for people who feel at home near the coast.', shop:'Find your next board', points:['Stable outline','Lightweight build','Made to last'], productNames:['Coast Twin','Current Pro','Open Water']
  } : traditional ? {
    nav:'新品　商品　品牌故事', bag:'購物袋　0', eyebrow:'新品季 · 海岸裝備', title:'找到屬於你的入浪節奏', desc:'為海岸日常打造的輕量裝備，陪你自在迎向每一道浪。', cta:'探索衝浪系列', valueTitle:'為海岸生活而造', value:'從入水穩定度到岸上收納，每個細節都回應真實的海邊生活。', products:'迎接全新衝浪系列', reviews:'真正好用的裝備，值得每一次出發', review:'「第一次划水就感覺很穩，現在週末出海都會帶上它。」', story:'從海岸出發，回到海洋之中', storyText:'為熱愛海洋的人設計耐用、實用的裝備，讓每一次靠近海岸都更自在。', shop:'找到下一塊適合你的板', points:['穩定板型','輕量結構','耐久設計'], productNames:['海岸雙板','潮流專業板','遠海輕板']
  } : {
    nav:'新品　商品　品牌故事', bag:'购物袋　0', eyebrow:'新品季 · 海岸装备', title:'找到属于你的入浪节奏', desc:'为海岸日常打造的轻量装备，陪你自在迎向每一道浪。', cta:'探索冲浪系列', valueTitle:'为海岸生活而造', value:'从入水稳定度到岸上收纳，每个细节都回应真实的海边生活。', products:'迎接全新冲浪系列', reviews:'真正好用的装备，值得每一次出发', review:'「第一次划水就感觉很稳，现在周末出海都会带上它。」', story:'从海岸出发，回到海洋之中', storyText:'为热爱海洋的人设计耐用、实用的装备，让每一次靠近海岸都更自在。', shop:'找到下一块适合你的板', points:['稳定板型','轻量结构','耐久设计'], productNames:['海岸双板','潮流专业板','远海轻板']
  };
  const hero = <section className={`skv-theme-page__hero skv-theme-page__hero--${theme.toLowerCase()}`}><div><small>{copy.eyebrow}</small><h2>{copy.title}</h2><p>{copy.desc}</p><b>{copy.cta}　→</b></div>{theme!=='Craft'&&<img src={`${base}store-hero.svg`} alt={english?'TIDE / FIELD surfer on the coast':traditional?'TIDE / FIELD 海岸衝浪場景':'TIDE / FIELD 海岸冲浪场景'} />}</section>;
  const values = <section className="skv-theme-page__values"><div><small>01 / TIDE / FIELD</small><h3>{copy.valueTitle}</h3><p>{copy.value}</p></div><ul>{copy.points.map((point,i)=><li key={point}><b>0{i+1}</b>{point}</li>)}</ul></section>;
  const products = <section className="skv-theme-page__products"><header><small>THE NEW COLLECTION</small><h3>{copy.products}</h3></header><div>{[['surfboard-01.svg','Coast Twin'],['surfboard-02.svg','Current Pro'],['surfboard-03.svg','Open Water']].map(([src,product],i)=><article key={product}><img src={`${base}${src}`} alt={copy.productNames[i]} /><div><b>{copy.productNames[i]}</b><span>{english?'Coastal surfboard':'海岸系列冲浪板'}</span><strong>{['$330','$335','$330'][i]} USD</strong></div></article>)}</div></section>;
  const reviews = <section className="skv-theme-page__review"><span>★★★★★</span><div><h3>{copy.reviews}</h3><p>{copy.review}</p><small>{english?'Sample review · Surf collection':traditional?'示例評價 · 衝浪系列':'示例评价 · 冲浪系列'}</small></div></section>;
  const story = <section className={`skv-theme-page__story${theme==='Craft'?' is-editorial':''}`}>{theme==='Craft'&&<img src={`${base}store-hero.svg`} alt={english?'TIDE / FIELD coastal surf story':traditional?'TIDE / FIELD 海岸品牌故事':'TIDE / FIELD 海岸品牌故事'} />}<div><small>OUR POINT OF VIEW</small><h3>{copy.story}</h3><p>{copy.storyText}</p></div></section>;
  const cta = <section className="skv-theme-page__cta"><div><small>TIDE / FIELD · COASTAL GOODS</small><h3>{copy.shop}</h3></div><b>{copy.cta}　→</b></section>;
  const content = theme === 'Craft' ? <>{hero}{story}{values}{products}{reviews}{cta}</> : theme === 'Dawn' ? <>{products}{hero}{values}{reviews}{story}{cta}</> : <>{hero}{values}{products}{reviews}{story}{cta}</>;
  return <div className={`skv-theme-page skv-theme-page--${theme.toLowerCase()}${full?' is-full':''}`}><header className="skv-theme-page__bar"><b>TIDE / FIELD</b><nav>{copy.nav}</nav><span>{copy.bag}</span></header>{content}<footer>TIDE / FIELD <span>{english?'Thoughtful equipment for the coast':traditional?'為海岸生活而設計':'为海岸生活而设计'}</span></footer></div>;
}

function ThemeDecisionComparison({ lang }) {
  const traditional = lang === 'zh-TW'; const english = lang === 'en';
  const copy = english ? {
    label:'Design decision review', title:'Theme recommendation: from candidate filtering to business-fit explanation',
    judgment:'Reducing options lowers browsing effort, but does not resolve the business-fit judgment on its own. The final approach adds matching rationale and preview choice so merchants understand why a theme is worth choosing.',
    alternative:'Alternative · Not adopted', alternativeTitle:'Only reduce theme options', alternativeText:'It narrows the browsing range, but merchants still need to judge whether a theme fits their business.',
    adopted:'Final approach', adoptedTitle:'Recommendation + business-fit explanation', recommended:'Recommended',
    goal:'Business goal', goalText:'Bring the new collection forward', products:'Product presentation', productsText:'Hero and featured products work together', brand:'Brand expression', brandText:'Keeps the coastal TIDE / FIELD tone', choice:'Preview the theme; the merchant keeps the final choice.'
  } : traditional ? {
    label:'設計決策復盤', title:'主題推薦：從候選篩選到業務匹配解釋',
    judgment:'減少候選可以降低瀏覽成本，但無法單獨解決業務匹配判斷。因此，最終方案增加推薦依據與預覽選擇，讓商家理解為什麼值得選擇。',
    alternative:'備選思路 · 未採用', alternativeTitle:'僅縮減主題候選', alternativeText:'減少瀏覽範圍，但商家仍需自行判斷主題是否適合業務。',
    adopted:'最終採用', adoptedTitle:'推薦 + 業務匹配解釋', recommended:'推薦',
    goal:'經營目標', goalText:'提升新品曝光', products:'商品展示', productsText:'首屏與精選商品順序', brand:'品牌風格', brandText:'保持 TIDE / FIELD 海岸調性', choice:'可預覽主題，商家保留最終選擇。'
  } : {
    label:'设计决策复盘', title:'主题推荐：从候选筛选到业务匹配解释',
    judgment:'减少候选可以降低浏览成本，但无法单独解决业务匹配判断。因此，最终方案增加推荐依据与预览选择，让商家理解为什么值得选择。',
    alternative:'备选思路 · 未采用', alternativeTitle:'仅缩减主题候选', alternativeText:'减少浏览范围，但商家仍需自行判断主题是否适合业务。',
    adopted:'最终采用', adoptedTitle:'推荐 + 业务匹配解释', recommended:'推荐',
    goal:'经营目标', goalText:'提升新品曝光', products:'商品展示', productsText:'首屏与精选商品顺序', brand:'品牌风格', brandText:'保持 TIDE / FIELD 海岸调性', choice:'可预览主题，商家保留最终选择。'
  };
  const base = `${import.meta.env.BASE_URL}case-sidekick/illustrations/`;
  const themes = ['Sense', 'Craft', 'Dawn'];
  const candidates = (recommended = false) => <div className="skv-theme-decision__candidates">{themes.map((theme) => <div className={`skv-theme-decision__candidate${recommended && theme === 'Sense' ? ' is-recommended' : ''}`} key={theme}><img src={`${base}theme-choice-${theme.toLowerCase()}.svg`} alt="" /><b>{theme}</b>{recommended && theme === 'Sense' && <span>{copy.recommended}</span>}</div>)}</div>;
  return <section className="skv-theme-decision" aria-label={copy.title}>
    <header className="skv-theme-decision__header"><span className="skv__eyebrow">{copy.label}</span><h4>{copy.title}</h4><p>{copy.judgment}</p></header>
    <div className="skv-theme-decision__cards">
      <article className="skv-theme-decision__card is-alternative"><span className="skv-theme-decision__badge">{copy.alternative}</span><h5>{copy.alternativeTitle}</h5>{candidates()}<p className="skv-theme-decision__note">{copy.alternativeText}</p></article>
      <span className="skv-theme-decision__arrow" aria-hidden="true">→</span>
      <article className="skv-theme-decision__card is-final"><span className="skv-theme-decision__badge">{copy.adopted}</span><h5>{copy.adoptedTitle}</h5><div className="skv-theme-decision__final-content"><div>{candidates(true)}</div><ul><li><b>{copy.goal}</b><span>{copy.goalText}</span></li><li><b>{copy.products}</b><span>{copy.productsText}</span></li><li><b>{copy.brand}</b><span>{copy.brandText}</span></li></ul></div><p className="skv-theme-decision__choice">{copy.choice}</p></article>
    </div>
  </section>;
}

function AiControlDecisionComparison({ lang }) {
  const traditional = lang === 'zh-TW'; const english = lang === 'en';
  const copy = english ? {
    label:'Design decision review', title:'AI edit control: from batch confirmation to risk-based review', subtitle:'Same task: increase new-product visibility while preserving the brand.',
    alternative:'Alternative · Not adopted', alternativeTitle:'Confirm the entire change set', alternativeProblem:'The merchant cannot inspect or choose edits individually.', applyAll:'Apply all', cancelAll:'Cancel all',
    adopted:'Final approach', adoptedTitle:'Risk levels + change set', preview:'Preview impact', keep:'Keep', remove:'Remove', confirm:'Final confirmation', undo:'Undo after applying',
    risks:['Low · execute','Medium · preview + confirm','High · item-by-item review'], conclusion:'Confirmation strength should match risk. Low-risk tasks execute quickly, medium-risk tasks are previewed and confirmed, and high-risk tasks are reviewed item by item—so users keep choice before consequential actions.',
    changes:['Strengthen the new-collection visual focus','Move the new-product area forward','Adjust the brand-content order']
  } : traditional ? {
    label:'設計決策復盤', title:'AI 修改控制：從整組確認到風險分級審查', subtitle:'同一任務：提升首頁新品曝光，同時保持品牌表達。',
    alternative:'備選思路 · 未採用', alternativeTitle:'整組確認修改', alternativeProblem:'無法逐項審查與選擇。', applyAll:'全部套用', cancelAll:'全部取消',
    adopted:'最終採用', adoptedTitle:'風險分級 + 修改集', preview:'影響預覽', keep:'保留', remove:'移除', confirm:'最終確認', undo:'套用後可撤銷',
    risks:['低風險 · 直接執行','中風險 · 預覽確認','高風險 · 逐項審查'], conclusion:'確認強度應與風險相匹配。低風險快速執行，中風險預覽確認，高風險逐項審查，讓使用者在關鍵操作前保有選擇權。',
    changes:['強化新品系列視覺重點','將新品商品區域提前','調整品牌內容順序']
  } : {
    label:'设计决策复盘', title:'AI 修改控制：从整组确认到风险分级审查', subtitle:'同一任务：提升首页新品曝光，同时保持品牌表达。',
    alternative:'备选思路 · 未采用', alternativeTitle:'整组确认修改', alternativeProblem:'无法逐项审查与选择。', applyAll:'全部应用', cancelAll:'全部取消',
    adopted:'最终采用', adoptedTitle:'风险分级 + 修改集', preview:'影响预览', keep:'保留', remove:'移除', confirm:'最终确认', undo:'应用后可撤销',
    risks:['低风险 · 直接执行','中风险 · 预览确认','高风险 · 逐项审查'], conclusion:'确认强度应与风险相匹配。低风险快速执行，中风险预览确认，高风险逐项审查，让用户在关键操作前保有选择权。',
    changes:['强化新品系列视觉重点','将新品商品区域提前','调整品牌内容顺序']
  };
  const changes = (final = false) => <ol className="skv-ai-decision__changes">{copy.changes.map((change, index) => <li key={change}><span>0{index + 1}</span><b>{change}</b>{final ? <div><em>{copy.preview}</em><em className={index === 2 ? 'is-removed' : ''}>{index === 2 ? copy.remove : copy.keep}</em></div> : <i aria-hidden="true">✓</i>}</li>)}</ol>;
  return <section className="skv-theme-decision skv-ai-decision" aria-label={copy.title}>
    <header className="skv-theme-decision__header"><span className="skv__eyebrow">{copy.label}</span><h4>{copy.title}</h4><p>{copy.subtitle}</p></header>
    <div className="skv-theme-decision__cards">
      <article className="skv-theme-decision__card is-alternative"><span className="skv-theme-decision__badge">{copy.alternative}</span><h5>{copy.alternativeTitle}</h5>{changes()}<p className="skv-theme-decision__note">{copy.alternativeProblem}</p><div className="skv-ai-decision__all-actions"><span>{copy.applyAll}</span><span>{copy.cancelAll}</span></div></article>
      <span className="skv-theme-decision__arrow" aria-hidden="true">→</span>
      <article className="skv-theme-decision__card is-final"><span className="skv-theme-decision__badge">{copy.adopted}</span><h5>{copy.adoptedTitle}</h5><div className="skv-ai-decision__risk-levels">{copy.risks.map((risk, index) => <span className={index === 2 ? 'is-active' : ''} key={risk}>{risk}</span>)}</div>{changes(true)}<div className="skv-ai-decision__final-actions"><b>{copy.confirm}</b><span>{copy.undo}</span></div></article>
    </div>
    <p className="skv-ai-decision__conclusion">{copy.conclusion}</p>
  </section>;
}

function SidekickSolutionShowcase({ lang }) {
  const traditional = lang === 'zh-TW'; const english = lang === 'en';
  const t = english ? { intro:'Turn merchant goals into explainable, reviewable plans for theme selection, page structure, and controlled AI edits.',solution:'Solution',themeTitle:'Recommend a theme with clear business-fit reasons',themeMatch:'Theme match',goal:'Business goal · build a homepage for a new collection',reasons:'Why it fits',preview:'Preview theme',hidePreview:'Close preview',generated:'Page plan generated',generate:'Generate page plan',pageGoal:'Increase new-product visibility while preserving the brand',beforeAfter:'Before / after',before:'Before',after:'After',beforeState:'Homepage order unchanged',keep:'Keep',removed:'Removed',selected:'Selected',review:'Review before applying',apply:'Apply selected changes',applied:'Selected changes applied',discard:'Undo / discard',planTitle:'Plan the page before configuring sections',planDesc:'Create a complete page structure, then move into section-level editing.',riskTitle:'Match control strength to risk',changeSet:'Change Set',reviewing:'review',designDecision:'Design rationale',notChosen:'Not chosen',controlPrinciple:'Control principle',complexEdits:'Complex edit handling',impact:'Impact area',applyCopy:'Let the merchant inspect each edit before applying it.' } : traditional ? { intro:'圍繞主題選擇、頁面規劃與複雜 AI 修改控制，將經營目標逐步轉化為可解釋、可審查、可執行的方案。',solution:'最終方案',themeTitle:'推薦主題並清楚說明業務適配依據',themeMatch:'主題匹配',goal:'經營目標 · 為新品系列建立首頁',reasons:'推薦依據',preview:'預覽主題',hidePreview:'收起主題預覽',generated:'頁面規劃方案已生成',generate:'生成頁面規劃方案',pageGoal:'提升新品曝光，同時保持品牌表達',beforeAfter:'修改前後對比',before:'修改前',after:'修改後',beforeState:'首頁內容順序未調整',keep:'保留',removed:'已移除',selected:'已選',review:'套用前可逐項檢查',apply:'套用所選修改',applied:'所選修改已套用',discard:'撤銷 / 放棄',planTitle:'先規劃頁面，再進行分區配置',planDesc:'先形成完整頁面方案，再進入分區編輯。',riskTitle:'依風險分級匹配控制強度',changeSet:'修改集',reviewing:'審查',designDecision:'設計判斷',notChosen:'未採用',controlPrinciple:'控制原則',complexEdits:'複雜修改機制',impact:'影響範圍',applyCopy:'讓商家在套用前逐項檢查修改。' } : { intro:'围绕主题选择、页面规划与复杂 AI 修改控制，将经营目标逐步转化为可解释、可审查、可执行的方案。',solution:'最终方案',themeTitle:'推荐主题并说明业务匹配依据',themeMatch:'主题匹配',goal:'经营目标 · 为新品系列建立首页',reasons:'推荐依据',preview:'预览主题',hidePreview:'收起主题预览',generated:'页面规划方案已生成',generate:'生成页面规划方案',pageGoal:'提升新品曝光，同时保持品牌表达',beforeAfter:'修改前后对比',before:'修改前',after:'修改后',beforeState:'首页内容顺序未调整',keep:'保留',removed:'已移除',selected:'已选',review:'应用前可逐项检查',apply:'应用所选修改',applied:'所选修改已应用',discard:'撤销 / 放弃',planTitle:'先规划页面，再进行分区配置',planDesc:'先形成完整页面方案，再进入分区级编辑。',riskTitle:'按风险分级匹配控制强度',changeSet:'修改集',reviewing:'审查',designDecision:'设计判断',notChosen:'未采用',controlPrinciple:'控制原则',complexEdits:'复杂修改机制',impact:'影响范围',applyCopy:'让商家在应用前逐项检查修改。' };
  const [selectedTheme, setSelectedTheme] = useState('Sense');
  const [themePreviewOpen, setThemePreviewOpen] = useState(false);
  const [chosenTheme, setChosenTheme] = useState(null);
  const [planGenerated, setPlanGenerated] = useState(true);
  const [planOrder, setPlanOrder] = useState([0, 1, 2, 3, 4, 5]);
  const [selectedPlanSection, setSelectedPlanSection] = useState(0);
  const [planConfirmed, setPlanConfirmed] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);
  const [riskLevel, setRiskLevel] = useState('medium');
  const [keptChanges, setKeptChanges] = useState([true, true, true]);
  const [previewedChange, setPreviewedChange] = useState(null);
  const [changesApplied, setChangesApplied] = useState(false);
  const [appliedChangeIds, setAppliedChangeIds] = useState([]);
  const [pendingConfirmation, setPendingConfirmation] = useState(false);
  const [planReviewed, setPlanReviewed] = useState(false);
  const [reviewedChangeIds, setReviewedChangeIds] = useState([]);
  const [actionFeedback, setActionFeedback] = useState('');
  const themes = english ? [
    { name:'Sense', desc:'Visual storytelling · featured products', reason:'Lead with the coastal campaign image, then bring the featured boards forward for a clear path from discovery to product.', sections:['New collection','Featured products','Brand story'] },
    { name:'Craft', desc:'Editorial content · brand story', reason:'Place the brand story before the catalog so the design point of view is clear before shoppers compare products.', sections:['Brand story','Product details','Featured products'] },
    { name:'Dawn', desc:'Product catalog · quick setup', reason:'Bring the new-board catalog to the first content area so shoppers can browse products immediately.', sections:['New collection','Categories','Reviews'] },
  ] : traditional ? [
    { name:'Sense', desc:'視覺表達 · 精選商品', reason:'先用海岸主視覺建立新品氛圍，再接續精選衝浪板，讓顧客從發現新品自然進入商品瀏覽。', sections:['新品系列','精選商品','品牌故事'] },
    { name:'Craft', desc:'內容敘事 · 品牌頁', reason:'將品牌故事放在商品目錄之前，先說明海岸裝備的設計理念，再引導顧客比較商品。', sections:['品牌故事','產品特色','精選商品'] },
    { name:'Dawn', desc:'商品目錄 · 快速上線', reason:'新品商品目錄位於頁面前段，讓顧客可以直接瀏覽系列並開始選品。', sections:['新品系列','商品分類','使用者評價'] },
  ] : [
    { name:'Sense', desc:'视觉表达 · 精选商品', reason:'先用海岸主视觉建立新品氛围，再接续精选冲浪板，让顾客从发现新品自然进入商品浏览。', sections:['新品系列','精选商品','品牌故事'] },
    { name:'Craft', desc:'内容叙事 · 品牌页', reason:'将品牌故事放在商品目录之前，先说明海岸装备的设计理念，再引导顾客比较商品。', sections:['品牌故事','产品特色','精选商品'] },
    { name:'Dawn', desc:'商品目录 · 快速上线', reason:'新品商品目录位于页面前段，让顾客可以直接浏览系列并开始选品。', sections:['新品系列','商品分类','用户评价'] },
  ];
  const activeTheme = themes.find(({name}) => name === selectedTheme) || themes[0];
  useEffect(() => { const viewport = document.querySelector('.skv-solution__theme-viewport'); if (viewport) viewport.scrollTop = 0; }, [selectedTheme]);
  const planSections = english ? [['Hero','Feature the new collection','Make the launch visible at first glance'],['Value proposition','Explain what makes the products distinct','Keep the brand promise clear'],['Featured products','Show the new collection','Move discovery toward purchase'],['Customer reviews','Build confidence with customer voices','Support purchase decisions'],['Brand story','Express the brand point of view','Keep the launch in brand context'],['Conversion action','Give shoppers a clear next step','Help interested shoppers act']] : traditional ? [['首屏','呈現新品主題','在頁面首屏承接新品曝光'],['價值主張','說明商品的核心差異','延續清晰的品牌表達'],['精選商品','展示新品組合','連接商品探索與購買'],['用戶口碑','呈現用戶評價','支持購買判斷'],['品牌故事','補充品牌背景與理念','讓新品置於品牌語境中'],['轉化行動','提供明確的下一步','幫助感興趣的用戶採取行動']] : [['首屏','呈现新品主题','在页面首屏承接新品曝光'],['价值主张','说明商品的核心差异','延续清晰的品牌表达'],['精选商品','展示新品组合','连接商品浏览与购买'],['用户口碑','呈现用户评价','支持购买判断'],['品牌故事','补充品牌背景与理念','让新品置于品牌语境中'],['转化行动','提供明确的下一步','帮助感兴趣的用户采取行动']];
  const orderedPlanSections = planOrder.map((sectionIndex) => planSections[sectionIndex]);
  const planIsAdjusted = planOrder.some((sectionIndex, index) => sectionIndex !== index);
  const resetPlan = () => {
    setPlanOrder([0, 1, 2, 3, 4, 5]);
    setSelectedPlanSection(0);
    setPlanConfirmed(false);
    setResetConfirm(false);
    setPlanGenerated(true);
  };
  const selectedPlan = planSections[selectedPlanSection];
  const movePlanSection = (sectionIndex, offset) => {
    setPlanOrder((current) => {
      const position = current.indexOf(sectionIndex);
      const destination = position + offset;
      if (position < 0 || destination < 0 || destination >= current.length) return current;
      const next = [...current];
      [next[position], next[destination]] = [next[destination], next[position]];
      return next;
    });
  };
  const changes = english ? [['Hero area','Emphasize the new collection','Changes the homepage hero'],['Product section','Move new products earlier','Reorders product display'],['Brand content','Reorder brand content','Changes homepage rhythm']] : traditional ? [['首屏區域','強化新品系列視覺重點','影響首頁首屏內容'],['商品分區','將新品商品區域提前','調整商品呈現順序'],['品牌內容','調整品牌內容順序','影響首頁內容節奏']] : [['首屏区域','强化新品系列视觉重点','影响首页首屏内容'],['商品分区','将新品商品区域提前','调整商品展示顺序'],['品牌内容','调整品牌内容顺序','影响首页内容节奏']];
  const riskOptions = english ? [['low','Low risk','Small scope, reversible','Execute · feedback · undo'],['medium','Medium risk','Changes across areas','Preview · confirm'],['high','High risk','Multiple areas, critical content, or high impact','Review plan and scope → preview items → confirm']] : traditional ? [['low','低風險','影響範圍小、可逆','直接執行 · 明確回饋 · 撤銷'],['medium','中風險','涉及跨區域修改或中等影響','預覽結果 · 套用 / 撤銷'],['high','高風險','涉及多個區域、重要內容或高影響修改','審查計畫與影響 → 逐項預覽 → 使用者確認']] : [['low','低风险','影响范围小、可逆','直接执行 · 明确反馈 · 撤销'],['medium','中风险','涉及跨区域修改或中等影响','结果预览 · 应用 / 撤销'],['high','高风险','涉及多个区域、关键内容或高影响修改','审查计划与影响 → 逐项预览 → 用户确认']];
  const misc = english ? { why:'Design rationale',w1:'Recommend against the business goal',w2:'Explain why a theme fits',w3:'Preview before choosing',w4:'Merchant keeps final choice',decision:'Why this approach',decisionText:'Show matching reasons and usage context so merchants can understand the recommendation.',not:'Not chosen',notText:'Simply reducing the number of themes does not explain why one fits.',planWhy:'Translate a business goal into an overall page structure before section-level configuration.',planNot:'Leaving merchants to add and order each section keeps the planning burden with them.',principle:'Control principle',principleText:'Scale AI control with impact and reversibility; avoid forcing the same confirmation flow on every task.',mechanism:'Reviewable changes',mechanismText:'Group the edits from one AI action so merchants can understand, preview, and keep selected changes before applying.',notAll:'Requiring identical confirmations for every edit, or relying only on undo after execution.',previewMessage:'Preview updated to the {name} page structure.',objective:'Increase new-product visibility while preserving the brand',recommendation:'Theme recommendation',newProducts:'New collection',pageTask:'Page task',reason:'Reason',beforeState:'Homepage order remains unchanged',afterLabel:'Updated state' } : traditional ? { why:'方案要點',w1:'依經營目標推薦',w2:'說明主題與業務的匹配關係',w3:'支援在選擇前快速預覽',w4:'最終選擇權由商家保留',decision:'設計判斷',decisionText:'同時提供匹配原因與適用情境，讓商家理解推薦依據。',not:'未採用',notText:'只減少候選主題數量，無法解決推薦依據不透明的問題。',planWhy:'先將經營目標轉化為完整頁面方案，再進入分區配置。',planNot:'讓商家在編輯器中逐個新增與排序分區，仍將頁面規劃責任留給使用者。',principle:'控制原則',principleText:'依影響範圍、可逆性與業務影響調整控制強度，不對所有任務使用相同確認流程。',mechanism:'修改審查',mechanismText:'將一次 AI 操作產生的多項修改整理成修改集，讓商家在套用前理解、預覽並選擇保留內容。',notAll:'對所有 AI 修改使用相同確認流程，或只依賴執行後撤銷。',previewMessage:'已切換為 {name} 的頁面結構示意。',objective:'提升新品曝光，同時保持品牌表達',recommendation:'主題適配推薦',newProducts:'新品系列',pageTask:'頁面任務',reason:'推薦原因',beforeState:'首頁內容順序未調整',afterLabel:'調整後' } : { why:'方案要点',w1:'基于经营目标推荐',w2:'解释主题与业务的匹配关系',w3:'支持在选择前快速预览',w4:'最终选择权由商家保留',decision:'设计判断',decisionText:'同时提供匹配原因和适用场景，让商家理解推荐依据。',not:'未采用',notText:'只减少候选主题数量，无法解决推荐依据不透明的问题。',planWhy:'先把经营目标转化为完整页面方案，再进入分区配置。',planNot:'让商家在编辑器中逐个添加和排序分区，仍把页面规划责任留给用户。',principle:'控制原则',principleText:'根据影响范围、可逆性和业务影响调整控制强度，不对所有任务使用同一确认流程。',mechanism:'修改审查',mechanismText:'把一次 AI 操作产生的多项修改整理成修改集，让商家在应用前理解、预览并选择保留内容。',notAll:'对所有 AI 修改使用同一确认流程，或只依赖执行后的撤销。',previewMessage:'已切换为 {name} 的页面结构示意。',objective:'提升新品曝光，同时保持品牌表达',recommendation:'主题适配推荐',newProducts:'新品系列',pageTask:'页面任务',reason:'推荐原因',beforeState:'首页内容顺序未调整',afterLabel:'调整后' };
  const appliedOrder = (() => { const next = [0,1,2,3,4,5]; if (appliedChangeIds.includes(1)) { next.splice(next.indexOf(2),1); next.splice(next.indexOf(1),0,2); } if (appliedChangeIds.includes(2)) { next.splice(next.indexOf(4),1); next.splice(next.indexOf(3),0,4); } return next; })();
  const selectedIds = keptChanges.map((keep,i)=>keep?i:-1).filter(i=>i>=0);
  const updateRisk = (level) => { setRiskLevel(level); setPendingConfirmation(false); setPlanReviewed(false); setReviewedChangeIds([]); setActionFeedback(''); if(level==='low') setKeptChanges([true,false,false]); };
  const applyEdits = (ids) => { setAppliedChangeIds((current)=>Array.from(new Set([...current,...ids]))); setChangesApplied(true); setPendingConfirmation(false); setActionFeedback(english?'Changes applied to the storefront preview.':traditional?'修改已套用至商店預覽。':'修改已应用到商店预览。'); };
  const primaryEditAction = () => { if (riskLevel==='low') { applyEdits([0]); return; } if (riskLevel==='medium') { setPendingConfirmation(true); return; } if (!planReviewed) { setPlanReviewed(true); return; } setPendingConfirmation(true); };
  return <section className="skv skv-solution" aria-label={t.solution}>
    <header className="skv-solution__intro"><span className="skv__eyebrow">{t.solution}</span><p>{t.intro}</p><p>{english?'The following interactive interfaces are anonymized reconstructions of the implemented solutions, shown to demonstrate their design and workflows.':traditional?'以下互動介面根據實際落地方案脫敏重建，用於展示設計與操作流程。':'以下交互界面根据实际落地方案脱敏重建，用于展示设计与操作流程。'}</p></header>
    <div className="skv-solution__main"><span className="skv__eyebrow">01 · {t.recommendation}</span><h4>{t.themeTitle}</h4><div className="skv-solution__ui skv-solution__theme-ui"><aside><b>{t.themeMatch}</b>{themes.map(({name,desc})=><button type="button" key={name} className={selectedTheme===name?'skv-solution__selected':''} onClick={()=>{setSelectedTheme(name);setThemePreviewOpen(false);setChosenTheme(null)}} aria-pressed={selectedTheme===name}>{name}<small>{desc}</small></button>)}</aside><main><span>{misc.objective}</span><h5>{selectedTheme} · {english?'Theme interface preview':traditional?'主題介面預覽':'主题界面预览'}</h5><div className={`skv-solution__theme-viewport${themePreviewOpen?' is-expanded':''}`}><ThemeStorefrontPreview theme={selectedTheme} lang={lang} full={themePreviewOpen} /></div><div className="skv-solution__theme-fit"><b>{t.reasons}</b><p>{activeTheme.reason}</p></div><div className="skv-solution__theme-actions"><button type="button" onClick={()=>setThemePreviewOpen(open=>{requestAnimationFrame(()=>document.querySelector('.skv-solution__theme-viewport')?.scrollTo(0,0));return !open})}>{themePreviewOpen?t.hidePreview:t.preview}</button><button type="button" className="is-primary" onClick={()=>setChosenTheme(selectedTheme)} aria-pressed={chosenTheme===selectedTheme}>{chosenTheme===selectedTheme?(english?'Selected':traditional?'已選擇':'已选择'):(english?'Choose this theme':traditional?'選擇此主題':'选择此主题')}</button></div>{chosenTheme&&<p className="skv-solution__theme-success" role="status">{english?`${chosenTheme} selected for this local demo. You can still switch themes.`:traditional?`已在本地演示中選擇 ${chosenTheme}，仍可切換其他主題。`:`已在本地演示中选择 ${chosenTheme}，仍可切换其他主题。`}</p>}</main></div></div>
    <ThemeDecisionComparison lang={lang} />
    <article className="skv-solution__plan"><span className="skv__eyebrow">02 · {english?'Page planning':traditional?'頁面規劃':'页面规划'}</span><h4>{t.planTitle}</h4><p>{t.planDesc}</p><div className="skv-solution__plan-ui"><section className="skv-plan__goal"><small>{english?'Business goal':traditional?'經營目標':'经营目标'}</small><b>{t.pageGoal}</b><button type="button" onClick={()=>setResetConfirm(true)} disabled={!planIsAdjusted}>{english?'Reset plan':traditional?'重置規劃':'重置规划'}</button>{resetConfirm&&<div className="skv-plan__reset-confirm" role="group" aria-label={english?'Confirm reset':traditional?'確認重置':'确认重置'}><span>{english?'Discard the current order and restore the default plan?':traditional?'放棄目前排序並恢復預設規劃？':'放弃当前排序并恢复默认规划？'}</span><button type="button" onClick={resetPlan}>{english?'Confirm reset':traditional?'確認重置':'确认重置'}</button><button type="button" onClick={()=>setResetConfirm(false)}>{english?'Cancel':traditional?'取消':'取消'}</button></div>}{planGenerated&&<div className="skv-plan__detail" aria-live="polite"><small>{english?'Selected section':traditional?'目前選中分區':'当前选中分区'} · {String(planOrder.indexOf(selectedPlanSection)+1).padStart(2,'0')}</small><b>{selectedPlan[0]}</b><span>{english?'Page task':traditional?'頁面任務':'页面任务'}：{selectedPlan[1]}</span><span>{english?'Reason':traditional?'推薦原因':'推荐原因'}：{selectedPlan[2]}</span></div>}</section><div className="skv-plan__builder"><header><b>{english?'Six-section page plan':traditional?'六分區頁面方案':'六分区页面方案'}</b><small>{planGenerated?(planConfirmed?(english?'Confirmed · editing':traditional?'已確認 · 編輯中':'已确认 · 编辑中'):(english?'Select a section to inspect and reorder':traditional?'選擇分區查看依據並調整順序':'选择分区查看依据并调整顺序')):(english?'Generate the plan to begin':traditional?'生成方案後查看完整結構':'生成方案后查看完整结构')}</small></header>{planGenerated?<ol className="skv-plan__list">{orderedPlanSections.map(([name,task,reason],i)=>{const sectionIndex=planOrder[i];return <li className={selectedPlanSection===sectionIndex?'is-selected':''} key={name}><button type="button" className="skv-plan__select" onClick={()=>setSelectedPlanSection(sectionIndex)} aria-pressed={selectedPlanSection===sectionIndex}><span>{String(i+1).padStart(2,'0')}</span><b>{name}</b><small>{task}<br/>{reason}</small></button><div className="skv-plan__reorder"><button type="button" onClick={()=>movePlanSection(sectionIndex,-1)} disabled={i===0||planConfirmed} aria-label={`${name}${english?' move up':traditional?'上移':'上移'}`}>↑</button><button type="button" onClick={()=>movePlanSection(sectionIndex,1)} disabled={i===planOrder.length-1||planConfirmed} aria-label={`${name}${english?' move down':traditional?'下移':'下移'}`}>↓</button></div></li>})}</ol>:<p className="skv-plan__empty">{english?'Your page structure will appear here.':traditional?'完整頁面結構將顯示於此。':'完整页面结构将在此显示。'}</p>}{planGenerated&&<footer className="skv-plan__actions">{planConfirmed?<><span>{english?'Confirmed structure is ready for section editing.':traditional?'已確認頁面結構，可進入分區編輯。':'页面结构已确认，可进入分区编辑。'}</span><button type="button" onClick={()=>setPlanConfirmed(false)}>{english?'Back to planning':traditional?'返回修改規劃':'返回修改规划'}</button></>:<button type="button" className="is-primary" onClick={()=>setPlanConfirmed(true)}>{english?'Confirm page plan':traditional?'確認頁面規劃':'确认页面规划'}</button>}</footer>}</div></div>{planGenerated&&<section className="skv-plan__preview"><header><div><small>{english?'Full-page structure preview':traditional?'整頁結構預覽':'整页结构预览'}</small><b>{planConfirmed?(english?'Confirmed page · editing':traditional?'已確認頁面 · 編輯中':'已确认页面 · 编辑中'):(english?'Scroll to explore all six sections':traditional?'滾動查看六個分區':'滚动查看六个分区')}</b></div></header><div className="skv-plan__viewport" tabIndex="0" aria-label={english?'Scrollable storefront page preview':traditional?'可捲動的整頁商店預覽':'可滚动的整页商店预览'}><TideFieldStorePage lang={lang} order={planOrder} selectedSection={selectedPlanSection} onSelect={setSelectedPlanSection} /></div></section>}</article>
    <div className="skv-solution__decision"><b>{misc.decision}</b><p>{misc.planWhy}</p><b>{misc.not}</b><p>{misc.planNot}</p></div>
    <article className="skv-solution__control"><span className="skv__eyebrow">03 · {english?'Controlled AI edits':traditional?'可控 AI 修改':'可控 AI 修改'}</span><h4>{t.riskTitle}</h4>
      <p className="skv-solution__risk-note">{english?'Risk is assessed from scope, reversibility, and business impact. This control demo shows how the workflow changes.':traditional?'風險依影響範圍、可逆性與業務影響綜合判斷；此處展示不同控制流程。':'风险根据影响范围、可逆性与业务影响综合判断；此处展示不同控制流程。'}</p>
      <div className="skv-solution__risk">{riskOptions.map(([key,level,feature,action]) => <button type="button" key={key} className={riskLevel===key?'is-selected':''} onClick={()=>updateRisk(key)} aria-pressed={riskLevel===key}><b>{level}</b><span>{feature}</span><small>{action}</small></button>)}</div>
      <div className="skv-solution__changes"><header><small>{t.changeSet} · {riskOptions.find(([key])=>key===riskLevel)?.[1]}{t.reviewing}</small><h5>{english?'Improve homepage visibility for a new collection':traditional?'優化首頁新品曝光':'优化首页新品曝光'}</h5><span>{t.selected} {selectedIds.length} / 3 {english?'edits':traditional?'項修改':'项修改'}</span></header>
      {changes.map(([name, change, reason], i) => <div className={keptChanges[i]?'is-kept':'is-removed'} key={name}><strong>0{i + 1}</strong><section><b>{change}</b><span>{reason}</span><em>{english?'Affected area':traditional?'影響區域':'影响区域'} · {name}</em><nav><button type="button" aria-pressed={previewedChange===i} onClick={()=>{setPreviewedChange((current)=>current===i?null:i);setReviewedChangeIds((current)=>current.includes(i)?current:[...current,i])}}>{previewedChange===i?(english?'Hide comparison':traditional?'收起對比':'收起对比'):t.beforeAfter}</button><button type="button" className={keptChanges[i]?'is-selected':''} disabled={riskLevel==='low'&&i!==0} onClick={()=>setKeptChanges(s=>s.map((value,j)=>j===i?!value:value))}>{keptChanges[i]?t.keep:t.removed}</button></nav></section></div>)}
      {previewedChange!==null&&<div className="skv-solution__visual-compare"><header><b>{t.beforeAfter}</b><span>{changes[previewedChange][1]}</span></header><div className="skv-solution__visual-compare-grid"><section><small>{t.before}</small><div className="skv-solution__compare-viewport"><TideFieldStorePage lang={lang} order={previewedChange===1?[0,1,2]:previewedChange===2?[0,1,2,3,4]:[0,1,2,3,4,5]} visibleSections={previewedChange===1?[1,2]:previewedChange===2?[3,4]:[0]} /></div></section><section><small>{t.after}</small><div className="skv-solution__compare-viewport"><TideFieldStorePage lang={lang} order={previewedChange===1?[0,2,1]:previewedChange===2?[0,1,2,4,3]:[0,1,2,3,4,5]} appliedChanges={previewedChange===0?[0]:[]} visibleSections={previewedChange===1?[1,2]:previewedChange===2?[3,4]:[0]} /></div></section></div></div>}
      {riskLevel==='high'&&planReviewed&&!pendingConfirmation&&<div className="skv-solution__review-plan"><b>{(riskOptions.find(([key])=>key===riskLevel)?.[1]||'')+' · '+selectedIds.length+(english?' edits · ':traditional?' 項修改 · ':' 项修改 · ')+(english?'Plan and impact review':traditional?'修改計畫與影響範圍':'修改计划与影响范围')}</b><span>{english?'Review each selected item before final confirmation.':traditional?'請逐項查看已選修改，再進行最終確認。':'请逐项查看已选修改，再进行最终确认。'}</span><ul>{selectedIds.map(i=><li key={i}>{changes[i][1]} <small>· {changes[i][0]}</small> <b>{reviewedChangeIds.includes(i)?(english?'Reviewed':traditional?'已審查':'已审查'):(english?'Open comparison':traditional?'待查看':'待查看')}</b></li>)}</ul></div>}
      {pendingConfirmation&&<div className="skv-solution__final-review" role="group" aria-label={english?'Final change review':traditional?'最終修改確認':'最终修改确认'}><b>{(riskOptions.find(([key])=>key===riskLevel)?.[1]||'')+' · '+selectedIds.length+(english?' edits to apply':traditional?' 項修改待套用':' 项修改待应用')}</b><ul>{selectedIds.map(i=><li key={i}>{changes[i][1]} <small>· {english?'Affected area':traditional?'影響區域':'影响区域'}：{changes[i][0]}</small></li>)}</ul><span>{english?'You can still cancel or remove an item before applying.':traditional?'套用前仍可取消或移除單項修改。':'应用前仍可取消或移除单项修改。'}</span></div>}
      <footer><span aria-live="polite">{actionFeedback|| (changesApplied?t.applied:t.review)}</span>{pendingConfirmation?<><button type="button" onClick={()=>applyEdits(selectedIds)} disabled={!selectedIds.length}>{english?'Confirm and apply':traditional?'確認並套用':'确认并应用'}</button><button type="button" onClick={()=>setPendingConfirmation(false)}>{english?'Cancel':traditional?'取消':'取消'}</button></>:<button type="button" onClick={primaryEditAction} disabled={!selectedIds.length||(riskLevel==='high'&&planReviewed&&!selectedIds.every(i=>reviewedChangeIds.includes(i)))}>{riskLevel==='low'?(english?'Execute one edit':traditional?'執行單項修改':'执行单项修改'):riskLevel==='medium'?(english?'Review final scope':traditional?'查看最終修改範圍':'查看最终修改范围'):!planReviewed?(english?'Review plan and impact':traditional?'審查計畫與影響':'审查计划与影响'):(english?'Final confirmation':traditional?'進入最終確認':'进入最终确认')}</button>}<button type="button" onClick={()=>{setKeptChanges([false,false,false]);setPendingConfirmation(false);setPreviewedChange(null);setReviewedChangeIds([]);setActionFeedback(english?'Unapplied suggestions discarded.':traditional?'尚未套用的建議已放棄。':'尚未应用的建议已放弃。')}}>{english?'Discard draft':traditional?'放棄未套用修改':'放弃未应用修改'}</button>{appliedChangeIds.length>0&&<button type="button" onClick={()=>{setAppliedChangeIds([]);setChangesApplied(false);setActionFeedback(english?'Applied edits undone; the original page is restored.':traditional?'已撤銷套用，頁面已恢復原狀。':'已撤销应用，页面已恢复原状。')}}>{english?'Undo applied edits':traditional?'撤銷已套用修改':'撤销已应用修改'}</button>}</footer></div>
      <section className="skv-solution__live-preview"><header><div><small>{english?'Storefront preview':traditional?'商店頁面預覽':'商店页面预览'}</small><b>{appliedChangeIds.length?(english?'Applied changes':traditional?'已套用修改':'已应用修改'):(english?'Original page':traditional?'原始頁面':'原始页面')}</b></div><span>{english?'TIDE / FIELD · Interactive demo':traditional?'TIDE / FIELD · 互動演示':'TIDE / FIELD · 交互演示'}</span></header><div className="skv-solution__live-viewport" tabIndex="0" aria-label={english?'Scrollable page preview':traditional?'可捲動頁面預覽':'可滚动页面预览'}><TideFieldStorePage lang={lang} order={appliedOrder} appliedChanges={appliedChangeIds} /></div></section>
    </article>
    <AiControlDecisionComparison lang={lang} />
  </section>;
}

function CaseAppLogo({ app }) {
  if (app === 'Shopify') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 7h12l-1 12H7L6 7Z" fill="#7AB55C"/><path d="M9 7a3 3 0 0 1 6 0" fill="none" stroke="#EFFFF0" strokeWidth="1.6"/><path d="M14.8 10.8c-.6-.5-1.3-.7-2.1-.7-1 0-1.8.5-1.8 1.3 0 1.8 3.3.9 3.3 2.9 0 .8-.7 1.4-1.9 1.4-.9 0-1.7-.3-2.3-.9" fill="none" stroke="#fff" strokeWidth="1.15" strokeLinecap="round"/></svg>;
  if (app === 'Google Sheets') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h9l4 4v14H6V3Z" fill="#34A853"/><path d="M15 3v5h4" fill="#8DE0A5"/><path d="M9 11h7M9 14h7M9 17h7M12 9v9" stroke="#fff" strokeWidth="1" opacity=".9"/></svg>;
  if (app === 'Slack') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.2 13.8a2.1 2.1 0 1 1-2.1-2.1h2.1v2.1Z" fill="#36C5F0"/><path d="M9.2 13.8a2.1 2.1 0 1 1 4.2 0v4.1a2.1 2.1 0 1 1-4.2 0v-4.1Z" fill="#2EB67D"/><path d="M10.2 8.2a2.1 2.1 0 1 1 2.1-2.1v2.1h-2.1Z" fill="#ECB22E"/><path d="M10.2 9.2a2.1 2.1 0 1 1 0 4.2H6.1a2.1 2.1 0 1 1 0-4.2h4.1Z" fill="#E01E5A"/></svg>;
  return <span aria-hidden="true">PO</span>;
}

function ReferenceBeforeStage({ lang }) {
  const traditional = lang === 'zh-TW';
  const english = lang === 'en';
  const t = traditional ? {
    eyebrow: '02 · Before', title: '跨應用任務鏈路', intro: '一次促銷準備任務被拆散在多個工具中，商家需要自行協調步驟、同步狀態並處理異常。', task: '準備一次跨應用促銷活動', insight: '同一個目標，需要使用者自己串聯多個執行步驟。', apps: [['Shopify','檢查庫存','確認商品庫存與可售狀態','Product\nInventory\n320 available'],['Google Sheets','記錄資料','手動整理庫存與促銷資訊','商品\n庫存\n促銷資訊'],['Slack','通知營運','同步活動準備進度與異常','# promotion\n庫存檢查完成'],['採購系統','建立採購單','庫存不足時人工補貨','Create purchase order\nQuantity\nSubmit']]
  } : english ? {
    eyebrow: '02 · Before', title: 'Cross-app task chain', intro: 'A promotion-preparation task is split across multiple tools, leaving merchants to coordinate steps, sync status, and handle exceptions.', task: 'Prepare a cross-app promotion', insight: 'One goal requires the user to connect multiple execution steps.', apps: [['Shopify','Check inventory','Confirm product availability','Product\nInventory\n320 available'],['Google Sheets','Record data','Manually organize inventory and promotion info','Product\nInventory\nPromotion'],['Slack','Notify operations','Sync preparation progress and exceptions','# promotion\nInventory check complete'],['Procurement','Create purchase order','Manual replenishment when stock is low','Create purchase order\nQuantity\nSubmit']]
  } : {
    eyebrow: '02 · Before', title: '跨应用任务链路', intro: '一个促销准备任务被拆散在多个工具中，商家需要自己协调步骤、同步状态并处理异常。', task: '准备一次跨应用促销活动', insight: '同一个目标，需要用户自己串联多个执行步骤。', apps: [['Shopify','检查库存','确认商品库存与可售状态','Product\nInventory\n320 available'],['Google Sheets','记录数据','手动整理库存与促销信息','商品\n库存\n促销信息'],['Slack','通知运营','同步活动准备进度与异常','# promotion\n库存检查完成'],['采购系统','创建采购单','库存不足时人工补货','Create purchase order\nQuantity\nSubmit']]
  };
  const [page, setPage] = useState(0);
  const node = ([app, action, desc, ui], conditional = false) => <article className={`skv-ref-before__node${conditional ? ' is-conditional' : ''}`}><div className="skv-ref-before__logo"><CaseAppLogo app={app} /></div><small>{app}</small><h4>{action}</h4><p>{desc}</p><pre>{ui}</pre></article>;
  return <section className="skv-ref-before" aria-label={t.title}>
    <header className="skv-ref-before__header"><span>{t.eyebrow}</span><h3>{t.title}</h3><p>{t.intro}</p><div className="skv-ref-before__controls"><b>{String(page + 1).padStart(2, '0')} / 02</b><button type="button" onClick={() => setPage(0)} disabled={page === 0}>←</button><button type="button" onClick={() => setPage(1)} disabled={page === 1}>→</button></div></header>
    <div className="skv-ref-before__task"><span>TASK</span><b>{t.task}</b></div>
    {page === 0 ? <><div className="skv-ref-before__stage"><div className="skv-ref-before__nodes"><div>{node(t.apps[0])}</div><div className="skv-ref-before__connector"><span>{traditional ? '手動切換' : english ? 'Manual switch' : '手动切换'}</span><i /></div><div>{node(t.apps[1])}</div><div className="skv-ref-before__connector"><span>{traditional ? '手動同步' : english ? 'Manual sync' : '手动同步'}</span><i /></div><div>{node(t.apps[2])}</div><div>{node(t.apps[3], true)}</div></div><div className="skv-ref-before__branch"><svg viewBox="0 0 100 42" preserveAspectRatio="none" aria-hidden="true"><path d="M12.5 0 V13 Q12.5 21 20 21 H80 Q87.5 21 87.5 13 V0" /></svg><span>{traditional ? '庫存不足？ · 人工判斷' : english ? 'Low stock? · Manual decision' : '库存不足？ · 人工判断'}</span></div></div><p className="skv-ref-before__insight">{t.insight}</p></> : <div className="skv-ref-before__page-two"><div className="skv-ref-before__chain">Shopify → Google Sheets → Slack</div><div className="skv-ref-before__problems"><div>01　多工具切换</div><div>02　状态分散</div><div>03　人工同步</div><div>04　异常人工处理</div></div></div>}
  </section>;
}

function SidekickAgentBefore({ lang }) {
  const [page, setPage] = useState(0);
  const touchStart = useRef(null);
  const traditional = lang === 'zh-TW';
  const english = lang === 'en';
  const copy = english ? {
    eyebrow: '02 · Before', title: 'Cross-app task chain', intro: 'A promotion-preparation task is split across multiple tools, leaving merchants to coordinate steps, sync status and handle exceptions.', task: 'Prepare a cross-app promotion', issues: 'How the problem emerges', conclusion: 'The more complex the task, the more coordination cost the user carries.', manual: ['Manual switch', 'Manual entry', 'Manual sync', 'Human judgment'], apps: [['Shopify', 'Check inventory', 'Confirm stock and sellable status', 'Product\nInventory\n320 available'], ['Google Sheets', 'Record data', 'Manually organize inventory and promotion details', 'Product\nStock\nPromotion'], ['Slack', 'Notify operations', 'Sync preparation progress and exceptions', '# promotion\nInventory check complete'], ['Procurement', 'Create purchase order', 'Manually replenish when stock is low', 'Create purchase order\nQuantity\nSubmit']], problems: [['Multi-tool switching', 'The same task repeatedly moves between separate systems.'], ['Scattered status', 'Inventory, promotion and communication status live in different tools.'], ['Manual sync', 'Users must carry data and progress into the next tool themselves.'], ['Manual exception handling', 'Low stock requires the user to identify the issue and enter procurement.']]
  } : traditional ? {
    eyebrow: '02 · Before', title: '跨應用任務鏈路', intro: '一次促銷準備任務被拆散在多個工具中，商家需要自行協調步驟、同步狀態並處理異常。', task: '準備一次跨應用促銷活動', issues: '問題如何產生', conclusion: '任務越複雜，使用者承擔的協調成本越高。', manual: ['手動切換', '手動錄入', '手動同步', '人工判斷'], apps: [['Shopify', '檢查庫存', '確認商品庫存與可售狀態', 'Product\nInventory\n320 available'], ['Google Sheets', '記錄資料', '手動整理庫存與促銷資訊', '商品\n庫存\n促銷資訊'], ['Slack', '通知營運', '同步活動準備進度與異常', '# promotion\n庫存檢查完成'], ['採購系統', '建立採購單', '庫存不足時人工補貨', 'Create purchase order\nQuantity\nSubmit']], problems: [['多工具切換', '同一個任務需要在多個系統之間反覆切換。'], ['狀態分散', '庫存、促銷和溝通狀態分別存在不同工具中。'], ['人工同步', '使用者需要自行把資料和進度同步到下一個工具。'], ['異常人工處理', '庫存不足等異常需要使用者自行識別並進入採購流程處理。']]
  } : {
    eyebrow: '02 · Before', title: '跨应用任务链路', intro: '一个促销准备任务被拆散在多个工具中，商家需要自己协调步骤、同步状态并处理异常。', task: '准备一次跨应用促销活动', issues: '问题如何产生', conclusion: '任务越复杂，用户承担的协调成本越高。', manual: ['手动切换', '手动录入', '手动同步', '人工判断'], apps: [['Shopify', '检查库存', '确认商品库存与可售状态', 'Product\nInventory\n320 available'], ['Google Sheets', '记录数据', '手动整理库存与促销信息', '商品\n库存\n促销信息'], ['Slack', '通知运营', '同步活动准备进度与异常', '# promotion\n库存检查完成'], ['采购系统', '创建采购单', '库存不足时人工补货', 'Create purchase order\nQuantity\nSubmit']], problems: [['多工具切换', '同一个任务需要在多个系统之间反复切换。'], ['状态分散', '库存、促销和沟通状态分别存在不同工具中。'], ['人工同步', '用户需要自己把数据和进度同步到下一个工具。'], ['异常人工处理', '库存不足等异常需要用户自行识别并进入采购流程处理。']]
  };
  useEffect(() => { const onKey = (event) => { if (event.key === 'ArrowLeft') setPage(0); if (event.key === 'ArrowRight') setPage(1); }; window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey); }, []);
  const go = (next) => setPage(Math.max(0, Math.min(1, next)));
  const appNode = ([app, title, detail, ui], branch = false) => <article className={`skv-before-carousel__node${branch ? ' is-conditional' : ''}`}><div className="skv-before-carousel__logo"><CaseAppLogo app={app} /></div><small>{app}</small><h4>{title}</h4><p>{detail}</p><pre>{ui}</pre></article>;
  const microVisual = (index) => {
    const labels = traditional ? ['Shopify ⇄ Sheets ⇄ Slack', '庫存　促銷　溝通', '複製 · 貼上 · 通知', '庫存不足 → 建立採購單'] : english ? ['Shopify ⇄ Sheets ⇄ Slack', 'Inventory · Promotion · Communication', 'Copy · Paste · Notify', 'Low stock → Create purchase order'] : ['Shopify ⇄ Sheets ⇄ Slack', '库存　促销　沟通', '复制 · 粘贴 · 通知', '库存不足 → 创建采购单'];
    return <div className={`skv-before-carousel__micro skv-before-carousel__micro--${index}`}>{labels[index]}</div>;
  };
  return <section className="skv skv-before-carousel" aria-label={copy.title} onTouchStart={(e) => { touchStart.current = e.touches[0].clientX; }} onTouchEnd={(e) => { if (touchStart.current == null) return; const delta = e.changedTouches[0].clientX - touchStart.current; if (Math.abs(delta) > 42) go(page + (delta < 0 ? 1 : -1)); touchStart.current = null; }}>
    <header className="skv-before-carousel__header"><div><span className="skv__eyebrow">{copy.eyebrow}</span><h3>{page === 0 ? copy.title : copy.issues}</h3><p>{page === 0 ? copy.intro : ''}</p></div><div className="skv-before-carousel__controls"><span>{String(page + 1).padStart(2, '0')} / 02</span><button type="button" onClick={() => go(page - 1)} disabled={page === 0} aria-label="Previous page">←</button><button type="button" onClick={() => go(page + 1)} disabled={page === 1} aria-label="Next page">→</button></div></header>
    <div className="skv-before-carousel__viewport"><div className={`skv-before-carousel__track is-page-${page}`}>
      <div className="skv-before-carousel__page"><div className="skv-before-carousel__task"><span>Task</span><b>{copy.task}</b></div><div className="skv-before-carousel__flow"><div className="skv-before-carousel__main-flow"><div className="skv-before-carousel__node-wrap skv-before-carousel__node-wrap--shopify">{appNode(copy.apps[0])}</div><div className="skv-before-carousel__connector"><span>{copy.manual[0]}</span><i aria-hidden="true" /></div><div className="skv-before-carousel__node-wrap">{appNode(copy.apps[1])}</div><div className="skv-before-carousel__connector"><span>{copy.manual[2]}</span><i aria-hidden="true" /></div><div className="skv-before-carousel__node-wrap">{appNode(copy.apps[2])}</div></div><div className="skv-before-carousel__branch" aria-label={traditional ? '採購條件分支' : english ? 'Procurement condition branch' : '采购条件分支'}><span className="skv-before-carousel__branch-label">{copy.manual[3]}</span><i className="skv-before-carousel__branch-line" aria-hidden="true" /><div className="skv-before-carousel__condition"><span aria-hidden="true" /><b>{traditional ? '庫存不足？' : english ? 'Low stock?' : '库存不足？'}</b><em>{english ? 'Yes' : 'Yes'}</em></div><div className="skv-before-carousel__node-wrap">{appNode(copy.apps[3], true)}</div></div></div><p className="skv-before-carousel__conclusion">{copy.englishConclusion || (english ? 'One goal, four tools, and the user becomes the connector.' : traditional ? '同一個目標，需要使用者自行串聯多個執行步驟。' : '同一个目标，需要用户自己串联多个执行步骤。')}</p></div>
      <div className="skv-before-carousel__page"><div className="skv-before-carousel__chain">{['Shopify', 'Google Sheets', 'Slack', traditional ? '採購系統' : english ? 'Procurement' : '采购系统'].map((app, i) => <React.Fragment key={app}><span><CaseAppLogo app={app} />{app}</span>{i < 3 && <i>→</i>}</React.Fragment>)}</div><div className="skv-before-carousel__problems">{copy.problems.map(([title, text], i) => <article key={title}><span>0{i + 1}</span>{microVisual(i)}<h4>{title}</h4><p>{text}</p>{i === 1 && <b>{traditional ? '缺少統一任務視圖' : english ? 'No unified task view' : '缺少统一任务视图'}</b>}</article>)}</div><p className="skv-before-carousel__conclusion">{copy.conclusion}</p></div>
    </div></div>
  </section>;
}

function SidekickAgentCoreModel({ lang }) {
  const [page, setPage] = useState(0); const startX = useRef(null); const english = lang === 'en'; const traditional = lang === 'zh-TW';
  const text = english ? { title: 'AI × User task interaction', lead: 'AI understands, plans and executes; users take control at key decisions, high-risk actions and exceptions.', labels: ['Goal', 'Understand', 'Plan', 'Confirm', 'Execute', 'Recover', 'Complete'], roles: ['User', 'AI', 'AI', 'User', 'AI', 'AI + User', 'User'], sub: ['Describe the business goal and constraints.', 'Identify the goal, objects, conditions and context.', 'Break down dependencies and generate the execution order.', 'Review the plan and risk operations before continuing.', 'Call the connected tools and update task status.', 'Show the cause and impact; let the user choose recovery.', 'Review the result and finish or adjust the task.'], handoff: 'Control Handoff', lanes: ['AI', 'User'], conclusion: 'Users manage one business goal; AI coordinates multiple execution tools.' } : traditional ? { title: 'AI × User 任務互動主線', lead: 'AI 負責理解、規劃與執行；遇到關鍵決策、高風險操作或異常時，控制權交還給使用者。', labels: ['提出目標', '理解', '規劃', '確認', '執行', '恢復', '完成'], roles: ['User', 'AI', 'AI', 'User', 'AI', 'AI + User', 'User'], sub: ['用自然語言描述經營目標，並補充必要約束。', '識別目標、對象、條件與既有上下文。', '拆解任務、識別依賴關係並生成執行順序。', '檢查任務計畫與風險操作，確認或調整後繼續。', '按計畫呼叫對應應用，並持續更新任務狀態。', '展示原因與影響，由使用者選擇恢復方式。', '查看執行結果，確認結束或繼續調整。'], handoff: 'Control Handoff', lanes: ['AI', 'User'], conclusion: '使用者管理一個業務目標，AI 負責協調多個執行工具。' } : { title: 'AI × User 任务交互主线', lead: '从用户提出目标开始，AI 负责理解、规划与执行；涉及关键决策、高风险操作或异常处理时，控制权重新交给用户。', labels: ['提出目标', '理解', '规划', '确认', '执行', '恢复', '完成'], roles: ['User', 'AI', 'AI', 'User', 'AI', 'AI + User', 'User'], sub: ['用自然语言描述经营目标，并补充必要约束。', '识别目标、对象、条件与已有上下文。', '拆解任务，识别依赖关系并生成执行顺序。', '检查任务计划与风险操作，确认或调整后继续。', '按计划调用对应应用，并持续更新任务状态。', '出现异常时展示原因与影响，由用户选择恢复方式。', '查看执行结果，确认任务结束或继续调整。'], handoff: 'Control Handoff', lanes: ['AI', 'User'], conclusion: '用户管理一个业务目标，AI 负责协调多个执行工具。' };
  const go = (n) => setPage(Math.max(0, Math.min(2, n)));
  useEffect(() => { const f = (e) => { if (e.key === 'ArrowLeft') go(page - 1); if (e.key === 'ArrowRight') go(page + 1); }; addEventListener('keydown', f); return () => removeEventListener('keydown', f); }, [page]);
  return <section className="skv skv-core-carousel" aria-label={text.title} onTouchStart={(e) => { startX.current = e.touches[0].clientX; }} onTouchEnd={(e) => { if (startX.current == null) return; const d = e.changedTouches[0].clientX - startX.current; if (Math.abs(d) > 42) go(page + (d < 0 ? 1 : -1)); startX.current = null; }}>
    <header className="skv-core-carousel__header"><div><span className="skv__eyebrow">03 · Core Model</span><h3>{text.title}</h3><p>{page === 0 ? text.lead : page === 1 ? (traditional ? '控制權隨著任務風險與狀態動態切換。' : english ? 'Control shifts as task risk and state change.' : '控制权随着任务风险与状态动态切换。') : ''}</p></div><div className="skv-before-carousel__controls"><span>{String(page + 1).padStart(2, '0')} / 03</span><button type="button" onClick={() => go(page - 1)} disabled={!page} aria-label="Previous page">←</button><button type="button" onClick={() => go(page + 1)} disabled={page === 2} aria-label="Next page">→</button></div></header>
    <div className="skv-core-carousel__viewport"><div className={`skv-core-carousel__track is-page-${page}`}>
      <div className="skv-core-carousel__page"><div className="skv-core-timeline">{text.labels.map((label, i) => <div className={`skv-core-step skv-core-step--${text.roles[i].replace(/[^A-Za-z]/g, '').toLowerCase()} ${[2,3,5].includes(i) ? 'is-focus' : ''}`} key={label}><span>0{i + 1}</span><b>{label}</b><small>{text.roles[i]}</small><p>{text.sub[i]}</p>{i < text.labels.length - 1 && <i>→</i>}</div>)}</div><p className="skv-core-conclusion">{english ? 'AI moves the task forward; users make the critical judgments.' : traditional ? 'AI 負責推進任務，使用者負責關鍵判斷。' : 'AI 负责推进任务，用户负责关键判断。'}</p></div>
      <div className="skv-core-carousel__page"><div className="skv-core-handoff"><div className="skv-core-state"><span>AI-led</span><i /><b>{traditional ? '使用者決策' : english ? 'User decision' : '用户决策'}</b><i /><span>AI-led</span><i /><b>{traditional ? '使用者處理' : english ? 'User recovery' : '用户处理'}</b></div><div className="skv-core-lane"><strong>AI</strong><div><span>理解<br /><small>解析目標與上下文</small></span><span>規劃<br /><small>生成任務樹與順序</small></span><span>執行<br /><small>呼叫應用並更新狀態</small></span><span>異常<br /><small>識別原因與影響</small></span></div></div><div className="skv-core-lane skv-core-lane--user"><strong>User</strong><div><span>目標輸入<br /><small>提出目標與約束</small></span><span className="is-handoff">計畫確認<br /><small>檢查並調整計畫</small></span><span className="is-handoff">風險確認<br /><small>高風險操作前確認</small></span><span className="is-handoff">異常處理<br /><small>選擇重試、跳過或補救</small></span></div></div><em>{text.handoff}</em></div><p className="skv-core-conclusion">{traditional ? '控制權隨著任務風險與狀態動態切換。' : english ? 'Control shifts with task risk and state.' : '控制权随着任务风险与状态动态切换。'}</p></div>
      <div className="skv-core-carousel__page"><div className="skv-core-layers"><div className="skv-core-layer"><b>User</b><span>{traditional ? '業務目標　·　約束　·　確認' : english ? 'Business goal · constraints · confirmation' : '业务目标　·　约束　·　确认'}</span></div><i>↓</i><div className="skv-core-layer skv-core-layer--agent"><b>AI Agent</b><div><span>理解目標</span><span>任務規劃</span><span>工具呼叫</span><span>狀態管理</span></div></div><i>↓</i><div className="skv-core-tools">{['Shopify', 'Google Sheets', 'Slack', traditional ? '採購系統' : english ? 'Procurement' : '采购系统'].map((tool) => <span key={tool}>{tool}</span>)}</div></div><p className="skv-core-conclusion">{text.conclusion}</p></div>
    </div></div>
  </section>;
}

function SidekickResults({ lang }) {
  const copy = lang === 'en'
    ? { title: 'Launch results', intro: 'The three metrics map to theme fit, page planning, and the intent-to-configuration path.', before: 'Before', after: 'After', solution: 'Related solution:', footer: 'Commercial figures are anonymized and presented as ranges and percentages.', results: [['↓ 50%', 'Theme selection time', '12–18 min', '6–9 min', '50%', 'Theme recommendations + rationale'], ['↓ 60%', 'Page planning time', '15–25 min', '6–10 min', '40%', 'Page planning'], ['↓ ~44%', 'Intent-to-configuration decision steps', '9–14', '5–8', '56%', 'AI decision support + risk controls']] }
    : lang === 'zh-TW'
      ? { title: '上線結果', intro: '三項核心指標分別對應主題適配、頁面規劃和意圖到配置路徑。', before: '優化前', after: '優化後', solution: '對應方案：', footer: '商業數據以區間和比例進行脫敏呈現。', results: [['↓ 50%', '主題選擇耗時', '12–18 分鐘', '6–9 分鐘', '50%', '主題推薦 + 原因說明'], ['↓ 60%', '頁面規劃耗時', '15–25 分鐘', '6–10 分鐘', '40%', '頁面規劃方案'], ['↓ 約 44%', '意圖到配置關鍵節點', '9–14 個', '5–8 個', '56%', 'AI 決策輔助 + 風險控制']] }
      : { title: '上线结果', intro: '三个核心指标分别对应主题适配、页面规划和意图到配置路径。', before: '优化前', after: '优化后', solution: '对应方案：', footer: '商业数据以区间和比例进行脱敏呈现。', results: [['↓ 50%', '主题选择耗时', '12–18 分钟', '6–9 分钟', '50%', '主题推荐 + 原因解释'], ['↓ 60%', '页面规划耗时', '15–25 分钟', '6–10 分钟', '40%', '页面规划方案'], ['↓ 约 44%', '意图到配置关键节点', '9–14 个', '5–8 个', '56%', 'AI 决策辅助 + 风险控制']] };
  return (
    <section className="skv skv-results" aria-label={copy.title}>
      <h4>{copy.title}</h4>
      <p>{copy.intro}</p>
      <div>
        {copy.results.map(([value, label, before, after, afterWidth, solution]) => {
          const arrow = value.startsWith('↓') ? '↓' : '';
          const [valueBeforePercent, percentSign] = value.slice(arrow.length).split(/(%)$/u);
          const [leading, qualifier, trailing] = valueBeforePercent.split(/([约約])/u);
          return (
            <article key={label}>
              <strong>
                {arrow && <span className="skv-results__arrow">{arrow}</span>}
                {leading}
                {qualifier && <span className="skv-results__qualifier">{qualifier}</span>}
                {trailing}
                {percentSign && <span className="skv-results__percent-sign">{percentSign}</span>}
              </strong>
              <b>{label}</b>
              <div className="skv-results__comparison">
                <div className="skv-results__comparison-row">
                  <span>{copy.before}</span><b>{before}</b><i />
                </div>
                <div className="skv-results__comparison-row">
                  <span>{copy.after}</span><b>{after}</b><i style={{ '--bar-width': afterWidth }} />
                </div>
              </div>
              <small>{copy.solution} {solution}</small>
            </article>
          );
        })}
      </div>
      <footer>{copy.footer}</footer>
    </section>
  );
}

function ResultsMeasurementMethod({ lang }) {
  const traditional = lang === 'zh-TW'; const english = lang === 'en';
  const copy = english ? {
    title:'Metric definitions and calculation check', definitions:'Metric definitions', calculation:'Calculation check', midpoint:'Range midpoint = (lower bound + upper bound) ÷ 2', reduction:'Reduction = (before midpoint − after midpoint) ÷ before midpoint',
    items:[['Theme selection time','Time from entering the theme-selection task to confirming a theme.'],['Page planning time','Time from entering the page-planning task to confirming the page structure.'],['Key decision steps','Key judgments from a business goal to specific page configuration; not the number of clicks.']],
    checked:[['Theme selection','15 → 7.5 min','50%'],['Page planning','20 → 8 min','60%'],['Decision steps','11.5 → 6.5','≈ 43.5% · shown as ~44%']], note:'These figures are a mathematical check of the currently anonymized ranges; the original project’s specific calculation method and task-by-task records cannot currently be independently traced.'
  } : traditional ? {
    title:'指標定義與計算複核', definitions:'指標定義', calculation:'計算與複核', midpoint:'區間中點＝（下限＋上限）÷ 2', reduction:'縮減比例＝（優化前中點－優化後中點）÷ 優化前中點',
    items:[['主題選擇耗時','從進入主題選擇任務到確認主題的時間。'],['頁面規劃耗時','從進入頁面規劃任務到確認頁面結構的時間。'],['關鍵決策節點','從經營目標到具體頁面配置過程中需要完成的關鍵判斷，不等於點擊次數。']],
    checked:[['主題選擇','15 → 7.5 分鐘','50%'],['頁面規劃','20 → 8 分鐘','60%'],['決策節點','11.5 → 6.5 個','約 43.5%，展示為約 44%']], note:'以上按現有脫敏區間進行數學複核；原專案具體統計方法與逐任務記錄目前無法獨立追溯。'
  } : {
    title:'指标定义与计算复核', definitions:'指标定义', calculation:'计算与复核', midpoint:'区间中点＝（下限＋上限）÷ 2', reduction:'缩减比例＝（优化前中点－优化后中点）÷ 优化前中点',
    items:[['主题选择耗时','从进入主题选择任务到确认主题的时间。'],['页面规划耗时','从进入页面规划任务到确认页面结构的时间。'],['关键决策节点','从经营目标到具体页面配置过程中需要完成的关键判断，不等于点击次数。']],
    checked:[['主题选择','15 → 7.5 分钟','50%'],['页面规划','20 → 8 分钟','60%'],['决策节点','11.5 → 6.5 个','约 43.5%，展示为约 44%']], note:'以上按现有脱敏区间进行数学复核；原项目具体统计方法与逐任务记录目前无法独立追溯。'
  };
  return <section className="skv-results__method" aria-label={copy.title}>
    <header><span className="skv__eyebrow">{copy.calculation}</span><h5>{copy.title}</h5></header>
    <div className="skv-results__method-grid">
      <section className="skv-results__definitions"><h6>{copy.definitions}</h6>{copy.items.map(([label, text], index) => <article key={label}><span>0{index + 1}</span><div><b>{label}</b><p>{text}</p></div></article>)}</section>
      <section className="skv-results__formula"><h6>{copy.calculation}</h6><p>{copy.midpoint}</p><p>{copy.reduction}</p><dl>{copy.checked.map(([label, value, result]) => <div key={label}><dt>{label}</dt><dd><b>{value}</b><span>{result}</span></dd></div>)}</dl></section>
    </div>
    <p className="skv-results__method-note">{copy.note}</p>
  </section>;
}

export default function CaseDetail() {
  const { t, lang } = useI18n();
  const { slug } = useParams();
  const caseData = getCase(slug);
  const caseAccent = slug === 'sidekick' ? '#27ae60' : caseData?.cardAccent || 'var(--color-accent)';
  const localizedCase = useCaseI18n(slug);
  const lowcodeLocale = slug === 'lowcode' ? lowcodeCaseContent[lang] : null;
  // These source cases are Chinese-only. Skip legacy translations so they cannot override them.
  const caseI18n = lowcodeLocale || (['sidekick', 'lowcode', 'novabot', 'sidekick-ai-app', 'template'].includes(slug) ? {} : localizedCase);

  if (slug === 'template') {
    const sections = templateCopy.split(/^## /m);
    const intro = sections.shift().trim().split(/\n\s*\n/);
    const inline = (value) => value.split(/(\*\*.*?\*\*)/g).map((part, i) => part.startsWith('**') && part.endsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : part);
    const blocks = (body) => body.trim().split(/\n\s*\n/).filter(block => block.trim() !== '---').map((block, i) => {
      const lines = block.split('\n');
      const heading = lines[0].match(/^(#{3,4}) (.*)/);
      if (heading) {
        const Heading = heading[1].length === 3 ? 'h3' : 'h4';
        return <div key={i}><Heading className="cd-subheading">{inline(heading[2])}</Heading>{lines.slice(1).length > 0 && <p className="cd-text">{inline(lines.slice(1).join(' '))}</p>}</div>;
      }
      if (lines.every(line => /^- /.test(line))) return <ul className="cd-list" key={i}>{lines.map((line, j) => <li key={j}>{inline(line.slice(2))}</li>)}</ul>;
      if (lines.every(line => /^\d+\. /.test(line))) return <ol className="cd-list" key={i}>{lines.map((line, j) => <li key={j}>{inline(line.replace(/^\d+\. /, ''))}</li>)}</ol>;
      const boldHeading = lines[0].match(/^\*\*(.*?)\*\*\s*$/);
      if (boldHeading && lines.length > 1) return <div key={i}><h4 className="cd-subheading">{boldHeading[1]}</h4><p className="cd-text">{inline(lines.slice(1).join(' '))}</p></div>;
      return <p className="cd-text" key={i}>{inline(lines.join(' '))}</p>;
    });
    return <div className="cd-page cd-page--template" style={{ '--case-accent': caseAccent }}>
      <section className="cd-hero" id="case-hero"><div className="container"><p className="cd-hero__portfolio-role">{intro[0]}</p><h1 className="cd-hero__title">{intro[1].replace(/^# /, '')}</h1><p className="cd-hero__subtitle">{intro[2]}</p><div className="cd-hero__tags">{intro[3].replace(/\*\*/g, '').split(' · ').map(tag => <span className="cd-hero__tag" key={tag}>{tag}</span>)}</div></div></section>
      <div className="case-body-layout"><main className="case-body-main">{sections.map((section, i) => { const [title, ...body] = section.split('\n'); return <section className="cd-section" key={title}><div className="container"><div className="cd-section-header"><span className="cd-section-header__number">{String(i + 1).padStart(2, '0')}</span><h2 className="cd-section-header__title">{title}</h2></div>{blocks(body.join('\n'))}</div></section>; })}</main><CaseTableOfContents lang={lang} /></div>
      <div className="container"><nav className="cd-nav"><Link to="/case/novabot" className="cd-nav__link">{t('case.previousCase')}</Link><Link to="/" className="cd-nav__link">{t('case.allCases')}</Link></nav></div>
    </div>;
  }

  if (!caseData) {
    return (
      <div className="cd-page">
        <div className="cd-section">
          <div className="container">
            <p>Case not found.</p>
            <Link to="/" className="text-link">{t('case.back')}</Link>
          </div>
        </div>
      </div>
    );
  }

  // Helper: drill into caseI18n by dot path, fallback to a given default
  function ci(path, fallback) {
    const keys = path.split('.');
    let val = caseI18n;
    for (const k of keys) {
      if (val == null) return fallback;
      val = val[k];
    }
    return val ?? fallback;
  }

  const currentIdx = caseOrder.indexOf(slug);
  const prevSlug = currentIdx > 0 ? caseOrder[currentIdx - 1] : null;
  const nextSlug = currentIdx < caseOrder.length - 1 ? caseOrder[currentIdx + 1] : null;

  // ── i18n-merged values ──
  const displayNdaBadge = ci('nda.badge', caseData.nda?.badge);
  const displayPortfolioRole = ci('portfolioRole', caseData.portfolioRole);
  const displayNarrativeHook = ci('narrativeHook', caseData.narrativeHook);
  const displayTitle = slug === 'sidekick' && lang === 'en' ? 'Shopify Theme-Based Storefront Creation Experience' : lowcodeLocale?.title || (['sidekick', 'lowcode', 'novabot', 'sidekick-ai-app', 'template'].includes(slug)
    ? caseData.title
    : caseI18n.title || t(`caseTitles.${slug}`) || caseData.title);
  const displaySummary = ci('summary', caseData.publicSummary || caseData.summary);
  const displayTags = ci('tags', caseData.tags);
  const displayBackgroundWhy = ci('background.why', caseData.background.why);
  const displayBackgroundTargetUsers = ci('background.targetUsers', caseData.background.targetUsers);
  const displayBackgroundBusinessGoals = ci('background.businessGoals', caseData.background.businessGoals);
  const displayBackgroundConstraints = ci('background.constraints', caseData.background.constraints);
  const displayChallengeUserProblem = slug === 'sidekick' && lang === 'en'
    ? [
        'Audit existing capabilities before deciding what to change',
        'The project began with a full review of Theme Store, theme management, Theme Editor, Sections / Blocks, and Sidekick. The review followed the complete workflow from AI generation and cross-device preview through save, undo, and publishing to identify what the product already handled and where merchants still had to make their own decisions.',
        'The audit showed that editing and execution were already mature. Adding more entry points or restructuring the editor would not directly reduce the decision effort involved in building a storefront.',
        'Qualitative research with 40 target merchants',
        'Semi-structured interviews and task recalls focused on theme selection, page planning, and complex AI edits to understand how merchants make decisions during storefront creation.',
        'Theme fit: merchants can browse many themes, but still need to judge whether theme capabilities fit their products, brand expression, and business goals.',
        'Page planning: translating a business goal into a page requires decisions about page goals, content structure, section combinations, information order, and product presentation.',
        'Complex AI change control: merchants need to know what changed, why it changed, what could be affected, which edits they can keep, and how to recover when a result is unsuitable.',
        '50 AI stability tests',
        'Five task types covered explicit edits, abstract business intent, page-wide changes, cross-section planning, and high-impact changes to identify where AI could act reliably and where review was needed.',
        'Evidence from the capability audit, merchant research, and stability tests informed the design direction.'
      ].join('\n\n')
    : ci('challenge.userProblem', caseData.challenge.userProblem);
  const displayChallengeBusinessProblem = slug === 'sidekick' && lang === 'en'
    ? 'Business goal → page goal → information and product structure → page plan → section selection → content order → page configuration\n\nThis path represents the layers of expert judgment merchants must cross to turn a business goal into an executable page plan. The project calls this the “intent-to-configuration distance.”'
    : ci('challenge.businessProblem', caseData.challenge.businessProblem);
  const displayChallengeDesignChallenge = slug === 'sidekick' && lang === 'en'
    ? 'Shorten the distance between business intent and the right page configuration. Turn fragmented merchant judgments into decisions the product can support, while matching control to task risk.'
    : ci('challenge.designChallenge', caseData.challenge.designChallenge);
  const displayApproachNote = ci('designApproach.note', caseData.designApproach.note);
  const displayBaselineNote = ci('outcome.baselineNote', caseData.outcome.baselineNote);
  const displayDisclaimer = ci('disclaimer', caseData.disclaimer);
  const displayReflectionNote = slug === 'sidekick' && lang === 'en'
    ? 'The working relationship is straightforward: AI helps interpret, plan, and explain. Merchants review, adjust, confirm, and make the final decision.'
    : ci('reflection.note', caseData.reflection.note);
  const displayRole = slug === 'sidekick' && lang === 'en' ? 'Product Designer · AI Product Design' : ci('role', caseData.role);
  const displayTimeline = slug === 'sidekick' && lang === 'en' ? 'Launched' : ci('timeline', caseData.timeline);
  const displayPlatform = ci('platform', caseData.platform);
  const displayTeam = slug === 'sidekick' && lang === 'en' ? 'Cross-functional product team' : ci('team', caseData.team);
  const sidekickHeroCopy = lang === 'en'
    ? { role: 'Real commercial project · Launched · Anonymized', summary: 'Reduce merchants’ decision effort from business goals to page configuration through theme fit, page planning, and controlled AI edits.', tags: ['AI product design', 'Enterprise SaaS', 'Cross-border commerce', 'Complex systems'], metrics: [['50%', 'Theme selection time reduced'], ['60%', 'Page planning time reduced'], ['~44%', 'Fewer intent-to-configuration decision steps']] }
    : lang === 'zh-TW'
      ? { role: '真實商業項目 · 已上線 · 內容已脫敏', summary: '聚焦主題適配、頁面規劃與 AI 修改控制，降低商家從經營目標到頁面配置的決策成本。', tags: ['AI 產品設計', '企業級 SaaS', '跨境電商', '複雜系統'], metrics: [['50%', '主題選擇耗時下降'], ['60%', '頁面規劃耗時下降'], ['約 44%', '意圖到配置關鍵節點減少']] }
      : { role: '真实商业项目 · 已上线 · 内容已脱敏', summary: '围绕主题适配、页面规划与 AI 修改控制，减少商家从经营目标到页面配置的决策成本。', tags: ['AI 产品设计', '企业级 SaaS', '跨境电商', '复杂系统'], metrics: [['50%', '主题选择耗时下降'], ['60%', '页面规划耗时下降'], ['约 44%', '意图到配置关键节点减少']] };

  // Merge array fields by index
  const sourceResponsibilities = slug === 'sidekick' && lang === 'en'
    ? [
        { task: 'Problem definition', contribution: 'Led', detail: 'Product audit · Scope definition · Problem framing' },
        { task: 'Research and validation', contribution: 'Led', detail: '40 merchant interviews · 50 AI stability tests · Competitive analysis' },
        { task: 'Solution design', contribution: 'Led', detail: 'Theme recommendations · Page planning · Risk controls · Change sets' },
        { task: 'Delivery collaboration', contribution: 'Collaborated', detail: 'Interaction prototypes · Design validation · Engineering · Launch follow-up' },
      ]
    : lowcodeLocale?.myRole?.responsibilities || caseData.myRole.responsibilities;
  const responsibilities = sourceResponsibilities.map((r, i) => ({
    task: ci(`myRole.responsibilities.${i}.task`, r.task),
    contribution: translateContribution(
      lang,
      ci(`myRole.responsibilities.${i}.contribution`, r.contribution),
    ),
    detail: ci(`myRole.responsibilities.${i}.detail`, r.detail),
    confidence: r.confidence,
  }));

  const sourcePhases = slug === 'sidekick' && lang === 'en'
    ? [
        { title: 'Capability audit · Verify the problem first', summary: 'The project began with a complete review of Theme Store, theme management, Theme Editor, Sections, Blocks, Sidekick, AI generation, cross-device preview, save, undo, and publishing to separate solved problems from decisions merchants still had to make.\n\nThe audit showed that editing was already capable. Adding entry points or rebuilding the editor would not directly reduce storefront decision effort.', confidence: 'confirmed' },
        { title: 'Research · 40 target merchants', summary: 'Semi-structured interviews and task recalls focused on theme selection, page planning, and complex AI edits. Three recurring decision needs emerged: assess theme fit against products and brand goals; translate business goals into page structure; and review the scope, rationale, and recovery options for cross-page AI edits.', confidence: 'confirmed' },
        { title: 'Testing · 50 AI stability tests', summary: 'Tests covered explicit edits, abstract intent, page-wide changes, cross-section planning, and high-impact changes. Local edits were better suited to quick execution, while complex tasks required planning, explanation, preview, and confirmation.', confidence: 'confirmed' },
        { title: 'Definition and strategy · Intent to configuration', summary: 'The evidence framed the problem as the multiple expert judgments between a merchant’s business goal and a configured page. Priorities were set by task complexity, capability gaps, and impact: P0 page planning, P1 theme selection, and P1 control for complex AI changes.', confidence: 'confirmed' },
      ]
    : lowcodeLocale?.designApproach?.phases || caseData.designApproach.phases;
  const phases = sourcePhases.map((p, i) => ({
    title: translatePhaseTitle(t, ci(`designApproach.phases.${i}.title`, p.title)),
    summary: ci(`designApproach.phases.${i}.summary`, p.summary),
    confidence: p.confidence,
  }));

  const sourceDecisions = lowcodeLocale?.keyDecisions || caseData.keyDecisions;
  const keyDecisions = sourceDecisions.map((d, i) => ({
    ...d,
    title: ci(`keyDecisions.${i}.title`, d.title),
    problem: ci(`keyDecisions.${i}.problem`, d.problem),
    decision: ci(`keyDecisions.${i}.decision`, d.decision),
    reason: ci(`keyDecisions.${i}.reason`, d.reason),
    alternative: {
      ...d.alternative,
      text: ci(`keyDecisions.${i}.alternative.text`, d.alternative?.text),
    },
  }));

  const sourceOutcome = lowcodeLocale?.outcome || caseData.outcome;
  const outcomeQuant = sourceOutcome.quantitative
    .map((m, i) => ({
      ...m,
      label: ci(`outcome.quantitative.${i}.label`, m.label),
      note: ci(`outcome.quantitative.${i}.note`, m.note || ''),
    }))
    .filter((metric) => !hasHiddenMetric(metric.after));

  const sidekickMetricDescriptions = lang === 'en' ? [
    'Time spent judging fit across theme options',
    'Planning effort from business goal to page structure',
    'Manual decisions and steps from intent to page configuration',
  ] : [
    '多个候选主题之间的适配判断成本',
    '从经营目标到页面结构方案之间的规划成本',
    '经营意图转化为具体配置时需要人工跨越的判断与操作路径',
  ];

  const outcomeQual = sourceOutcome.qualitative.map((item, i) =>
    ci(`outcome.qualitative.${i}`, item)
  );

  const sourceCompetencies = slug === 'sidekick' && lang === 'en'
    ? [
        { dimension: 'Business and problem framing', note: 'Audited mature capabilities and reframed the project from editor redesign to storefront decision support.' },
        { dimension: 'Complex systems design', note: 'Separated business intent, AI decisions, execution capabilities, and user control into clear layers.' },
        { dimension: 'AI product design', note: 'Used 50 stability tests to map task boundaries and shape explanation, planning, risk tiers, and user controls.' },
        { dimension: 'Interaction design', note: 'Matched immediate execution, preview, change sets, selective retention, and undo to operational risk.' },
      ]
    : lowcodeLocale?.competencies || caseData.competencies || [];
  const competencies = sourceCompetencies.map((c, i) => ({
    ...c,
    dimension: ci(`competencies.${i}.dimension`, c.dimension),
    note: ci(`competencies.${i}.note`, c.note),
  }));

  const sourceReflection = lowcodeLocale?.reflection || caseData.reflection;
  const sourceMethodology = slug === 'sidekick' && lang === 'en'
    ? [
        'Opportunity in a mature product may sit beyond the interface. When core capabilities are complete, the experience gap can shift from difficulty operating tools to uncertainty about what to choose. Locate the problem before deciding whether the interface needs to change.',
        'AI product design must account for varying capability and confidence. Local edits can be fast; high-impact changes need planning, rationale, impact visibility, and recovery options before they affect the user.',
        'AI should not make every decision for the user. It can help interpret, plan, and explain; merchants remain responsible for adjusting, confirming, and making the final decision.',
      ]
    : sourceReflection.methodology;
  const reflectionMethodology = sourceMethodology.map((item, i) =>
    ci(`reflection.methodology.${i}`, item)
  );

  const sidekickHookEmphasis = '应该选择什么、页面应该如何组织，以及 AI 的修改是否值得执行。';
  function renderNarrativeHook() {
    if (!displayNarrativeHook) return null;
    if (slug === 'sidekick-agent') {
      const emphasis = 'AI 自主性与用户控制权应该如何平衡？';
      return (
        <div className="cd-hero__hook cd-hero__hook--stack">
          {displayNarrativeHook.split(/\n\n+/).filter(Boolean).map((block, i) => {
            const emphasisStart = block.indexOf(emphasis);
            return (
              <p key={i}>
                {emphasisStart >= 0 ? (
                  <>
                    {block.slice(0, emphasisStart)}
                    <strong>{emphasis}</strong>
                    {block.slice(emphasisStart + emphasis.length)}
                  </>
                ) : block}
              </p>
            );
          })}
        </div>
      );
    }
    if (slug !== 'sidekick') return <p className="cd-hero__hook">{displayNarrativeHook}</p>;

    const emphasisStart = displayNarrativeHook.indexOf(sidekickHookEmphasis);
    if (emphasisStart < 0) return <p className="cd-hero__hook">{displayNarrativeHook}</p>;

    return (
      <p className="cd-hero__hook">
        {displayNarrativeHook.slice(0, emphasisStart)}
        <strong>{sidekickHookEmphasis}</strong>
        {displayNarrativeHook.slice(emphasisStart + sidekickHookEmphasis.length)}
      </p>
    );
  }

  function renderTextValue(value, className = 'cd-text') {
    if (!Array.isArray(value)) return <p className={className}>{value}</p>;
    return (
      <div className={`${className} cd-text-list`}>
        {value.map((item, i) => (
          <p key={i}>
            {typeof item === 'object' ? (
              <>
                <strong>{item.heading}</strong>
                <br />
                {item.body}
              </>
            ) : item}
          </p>
        ))}
      </div>
    );
  }

  function renderSidekickChallenge() {
    const blocks = displayChallengeUserProblem.split(/\n\n+/).filter(Boolean);
    if (blocks.length < 11) return renderTextValue(displayChallengeUserProblem);
    const renderResearchFinding = (block) => {
      const separator = block.indexOf('：');
      if (separator < 0) return <p className="cd-text">{block}</p>;
      return (
        <>
          <h4 className="cd-evidence-subheading">{block.slice(0, separator)}</h4>
          <p className="cd-text">{block.slice(separator + 1)}</p>
        </>
      );
    };

    return (
      <div className="cd-sidekick-evidence-flow">
        <h3 className="cd-subheading">{blocks[0]}</h3>
        <p className="cd-text">{blocks[1]}</p>
        <p className="cd-text">{blocks[2]}</p>
        <SidekickCapabilityAudit lang={lang} />

        <h3 className="cd-subheading">{blocks[3]}</h3>
        <p className="cd-text">{blocks[4]}</p>
        <SidekickResearch lang={lang} />

        <h3 className="cd-subheading">{blocks[8]}</h3>
        <p className="cd-text">{blocks[9]}</p>
        <SidekickStability lang={lang} />
        <SidekickJourney lang={lang} />
        <SidekickPriority lang={lang} />
      </div>
    );
  }

  if (slug === 'novabot') {
    const sections = novabotCopy.split(/^## /m);
    const intro = sections.shift().trim().split(/\n\s*\n/);
    const renderBlocks = (body) => body.trim().split(/\n\s*\n/).map((block, i) => {
      if (block.startsWith('### ')) {
        const [heading, ...rest] = block.split('\n');
        return <div key={i}><h3 className="cd-subheading">{heading.replace(/^### /, '')}</h3>{rest.length > 0 && <p className="cd-text">{rest.join('\n')}</p>}</div>;
      }
      if (block.startsWith('#### ')) {
        const [heading, ...rest] = block.split('\n');
        return <div key={i}><h4 className="cd-subheading">{heading.replace(/^#### /, '')}</h4>{rest.length > 0 && <p className="cd-text">{rest.join('\n')}</p>}</div>;
      }
      if (block.startsWith('- ')) return <ul className="cd-list" key={i}>{block.split('\n').map((line, j) => <li key={j}>{line.replace(/^- /, '')}</li>)}</ul>;
      if (block.startsWith('**')) {
        const match = block.match(/^\*\*(.*?)\*\*\s*\n([\s\S]*)/);
        if (match) return <div key={i}><h3 className="cd-subheading">{match[1]}</h3><p className="cd-text">{match[2]}</p></div>;
      }
      return <p className="cd-text" key={i}>{block}</p>;
    });
    return <div className="cd-page cd-page--novabot" style={{ '--case-accent': caseAccent }}>
      <section className="cd-hero" id="case-hero"><div className="container">
        <p className="cd-hero__portfolio-role">{intro[0]}</p>
        <h1 className="cd-hero__title">{intro[1].replace(/^# /, '')}</h1>
        <p className="cd-hero__subtitle">{intro[2]}</p>
        <div className="cd-hero__tags">{intro[3].split(' · ').map(tag => <span className="cd-hero__tag" key={tag}>{tag}</span>)}</div>
      </div></section>
      <div className="case-body-layout"><main className="case-body-main">{sections.map((section, i) => { const [title, ...body] = section.split('\n'); return <section className="cd-section" key={title}><div className="container"><div className="cd-section-header"><span className="cd-section-header__number">{String(i + 1).padStart(2, '0')}</span><h2 className="cd-section-header__title">{title}</h2></div>{renderBlocks(body.join('\n'))}</div></section>; })}</main><CaseTableOfContents lang={lang} /></div>
      <div className="container"><nav className="cd-nav">{prevSlug ? <Link to={`/case/${prevSlug}`} className="cd-nav__link">{t('case.previousCase')}</Link> : <span />}<Link to="/" className="cd-nav__link">{t('case.allCases')}</Link>{nextSlug && <Link to={`/case/${nextSlug}`} className="cd-nav__link">{t('case.nextCase')}</Link>}</nav></div>
    </div>;
  }

  return (
    <div className={`cd-page cd-page--${slug}`} style={{ '--case-accent': caseAccent }}>
      {/* ═══════════════════════════════════════
          Hero
          ═══════════════════════════════════════ */}
      <section className="cd-hero" id="case-hero">
        <div className="container">
          {slug === 'sidekick' || slug === 'lowcode' || slug === 'sidekick-ai-app' || slug === 'novabot' || slug === 'template' ? (
            <>
              <p className="cd-hero__portfolio-role">{slug === 'sidekick' ? sidekickHeroCopy.role : displayPortfolioRole}</p>
              <h1 className="cd-hero__title">{displayTitle}</h1>
              {slug === 'sidekick' ? <p className="cd-hero__subtitle">{sidekickHeroCopy.summary}</p> : <><p className="cd-hero__hook">{displayNarrativeHook}</p><p className="cd-hero__subtitle">{displaySummary}</p></>}
            </>
          ) : slug === 'sidekick-agent' ? (
            <>
              {displayPortfolioRole && (
                <p className="cd-hero__portfolio-role">{displayPortfolioRole}</p>
              )}
              <h1 className="cd-hero__title">{displayTitle}</h1>
              <p className="cd-hero__subtitle">{displaySummary}</p>
            </>
          ) : (
            <>
              <div className="cd-hero__badge-row">
                {caseData.nda && (
                  <span className="cd-hero__nda-badge">
                    <span className="cd-hero__nda-icon" aria-hidden="true">🔒</span>
                    <span>{displayNdaBadge.replace(/^🔒\s*/, '')}</span>
                  </span>
                )}
              </div>

              {displayPortfolioRole && (
                <div className="cd-content-note cd-content-note--partial" style={{ marginBottom: 'var(--space-24)' }}>
                  <p>{displayPortfolioRole}</p>
                </div>
              )}

              {renderNarrativeHook()}
              <h1 className="cd-hero__title">{displayTitle}</h1>
              <p className="cd-hero__subtitle">{displaySummary}</p>
            </>
          )}

          {displayTags?.length > 0 && (
            <div className="cd-hero__tags">
              {(slug === 'sidekick' ? sidekickHeroCopy.tags : displayTags).map((tag) => (
                <span className="cd-hero__tag" key={tag}>{tag}</span>
              ))}
            </div>
          )}
        </div>
      </section>

      {slug === 'sidekick' && (
        <section className="cd-outcomes-section" aria-label={lang === 'en' ? 'Project outcomes' : '成果摘要'}>
          <div className="container">
            <div className="cd-hero__outcomes">
              {sidekickHeroCopy.metrics.map(([value, label], index) => (
                <div key={label}>
                  <span className="cd-hero__outcomes-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" focusable="false">
                      {index === 0 ? <><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3.5 2" /></> : index === 1 ? <><path d="m12 3 8 4-8 4-8-4 8-4Z" /><path d="m4 11 8 4 8-4M4 15l8 4 8-4" /></> : <><circle cx="6" cy="6" r="2" /><circle cx="18" cy="6" r="2" /><circle cx="6" cy="18" r="2" /><circle cx="18" cy="18" r="2" /><path d="M9 6h3m3 0h1M6 9v3m0 3v1m12-7v3m0 3v1M9 18h3m3 0h1" /></>}
                    </svg>
                  </span>
                  <span className="cd-hero__outcomes-copy"><strong>{value}</strong><span>{label}</span></span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="case-body-layout">
      <main className="case-body-main">

      {/* ═══════════════════════════════════════
          01 Background
          ═══════════════════════════════════════ */}
      <section className="cd-section">
        <div className="container">
          <div className="cd-section-header">
            <span className="cd-section-header__number">01</span>
            <h2 className="cd-section-header__title">{t('case.context')}</h2>
          </div>

          <ConfidenceMarker state={caseData.background.state} note={caseData.background.note}>
            {slug === 'sidekick' ? <SidekickBackground lang={lang} /> : <>
              <h3 className="cd-subheading">{t('case.whyThisProject')}</h3>
              <p className="cd-text">{displayBackgroundWhy}</p>

              <h3 className="cd-subheading">{t('case.targetUsers')}</h3>
              <p className="cd-text">{displayBackgroundTargetUsers}</p>

              <h3 className="cd-subheading">{t('case.businessGoals')}</h3>
              <p className="cd-text">{displayBackgroundBusinessGoals}</p>

              <h3 className="cd-subheading">{t('case.constraints')}</h3>
              <ul className="cd-list">
                {displayBackgroundConstraints.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </>}
          </ConfidenceMarker>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          02 Challenge
          ═══════════════════════════════════════ */}
      <section className="cd-section">
        <div className="container">
          <div className="cd-section-header">
            <span className="cd-section-header__number">02</span>
            <h2 className="cd-section-header__title">{t('case.challenge')}</h2>
          </div>

          <ConfidenceMarker state={caseData.challenge.state}>
            {slug === 'sidekick' ? (
              renderSidekickChallenge()
            ) : slug === 'sidekick-agent' ? (
              <><ReferenceBeforeStage lang={lang} /><SidekickAgentCoreModel lang={lang} /></>
            ) : (
              <>
                <h3 className="cd-subheading">{t('case.userProblem')}</h3>
                {renderTextValue(displayChallengeUserProblem)}
              </>
            )}

            <h3 className="cd-subheading">{t('case.businessProblem')}</h3>
            <p className="cd-text">{displayChallengeBusinessProblem}</p>

            <h3 className="cd-subheading">{t('case.designChallenge')}</h3>
            <p className="cd-text">{displayChallengeDesignChallenge}</p>
          </ConfidenceMarker>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          03 My Role
          ═══════════════════════════════════════ */}
      <section className="cd-section cd-role-section">
        <div className="container">
          <div className="cd-section-header">
            <span className="cd-section-header__number">03</span>
            <h2 className="cd-section-header__title">{t('case.role')}</h2>
          </div>

          {/* Meta Grid — Glass Bar */}
          <div className="cd-meta-grid">
            <div className="cd-meta-grid__item">
              <span className="cd-meta-grid__label">{t('case.roleLabel')}</span>
              <span className="cd-meta-grid__value">{displayRole}</span>
            </div>
            <div className="cd-meta-grid__item">
              <span className="cd-meta-grid__label">{slug === 'sidekick' ? (lang === 'en' ? 'Project status' : lang === 'zh-TW' ? '專案狀態' : '项目状态') : t('case.timeline')}</span>
              <span className="cd-meta-grid__value">{displayTimeline}</span>
            </div>
            <div className="cd-meta-grid__item">
              <span className="cd-meta-grid__label">{t('case.platform')}</span>
              <span className="cd-meta-grid__value">{displayPlatform}</span>
            </div>
            <div className="cd-meta-grid__item">
              <span className="cd-meta-grid__label">{slug === 'sidekick' ? (lang === 'en' ? 'Collaboration' : lang === 'zh-TW' ? '協作方式' : '协作方式') : t('case.team')}</span>
              <span className="cd-meta-grid__value">{displayTeam}</span>
            </div>
          </div>

          <h3 className="cd-subheading">{t('case.responsibilities')}</h3>

          {/* Responsibilities — Glass Card List */}
          <div className="cd-responsibilities">
            {responsibilities.map((r, i) => (
              <div className="cd-responsibility" key={i}>
                <span className="cd-responsibility__task">{r.task}</span>
                <span className="cd-responsibility__contribution">
                  {r.contribution}
                  {r.confidence === 'unconfirmed' && (
                    <span className="cd-inline-mark" title={t('case.contributionPending')}> ⚠️</span>
                  )}
                </span>
                <span className="cd-responsibility__detail">{r.detail}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════
          04 Design Approach
          ═══════════════════════════════════════ */}
      <section className={`cd-section${slug === 'sidekick' ? ' cd-section--strategy' : ''}`}>
        <div className="container">
          <div className="cd-section-header">
            <span className="cd-section-header__number">04</span>
            <h2 className="cd-section-header__title">{t('case.approach')}</h2>
          </div>

          {caseData.designApproach.state === 'empty' && (
            <div className="cd-content-note cd-content-note--empty">
              <p>{t('case.processPending')}</p>
            </div>
          )}

          {caseData.designApproach.state === 'partial' && displayApproachNote && (
            <div className="cd-content-note cd-content-note--partial">
              <p>{displayApproachNote}</p>
            </div>
          )}

          {slug === 'sidekick' ? <SidekickStrategy lang={lang} /> : <div className="cd-phases">
            {phases.map((phase, i) => {
              const isString = typeof phase === 'string';
              const heading = isString ? phase : phase.title;
              const hasContent = !isString && phase.summary;
              const phaseState = caseData.designApproach.state;
              return (
                <div
                  className={`cd-phase-card${phaseState === 'empty' ? ' cd-phase-card--empty' : ''}`}
                  key={i}
                >
                  <span className="cd-phase-card__number">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="cd-phase-card__title">
                    {t('case.phaseLabel', { n: i + 1 })}: {heading}
                    {!isString && phase.confidence === 'inferred' && (
                      <span className="cd-field-mark" title={t('case.processReconstructed')}> 🔮</span>
                    )}
                  </h3>
                  {hasContent && (
                    <p className="cd-phase-card__summary">{phase.summary}</p>
                  )}
                  {phaseState === 'empty' && (
                    <p className="cd-phase-card__empty-note">{t('case.pending')}</p>
                  )}
                </div>
              );
            })}
          </div>}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          05 Key Decisions
          ═══════════════════════════════════════ */}
      <section className="cd-section">
        <div className="container">
          <div className="cd-section-header">
            <span className="cd-section-header__number">05</span>
            <h2 className="cd-section-header__title">{t('case.solution')}</h2>
          </div>

          {caseData.decisionsNote && (
            <div className="cd-content-note cd-content-note--partial">
              <p>{caseData.decisionsNote}</p>
            </div>
          )}

          {slug === 'sidekick' && (
            <>
              <p className="cd-text cd-sidekick-solution-intro">{lang === 'en' ? 'Turn business goals into explainable, reviewable, and executable plans through theme selection, page planning, and controlled AI edits.' : lang === 'zh-TW' ? '圍繞主題選擇、頁面規劃與複雜 AI 修改控制，將經營目標逐步轉化為可解釋、可審查、可執行的方案。' : '围绕主题选择、页面规划与复杂 AI 修改控制，将经营目标逐步转化为可解释、可审查、可执行的方案。'}</p>
              <SidekickSolutionShowcase lang={lang} />
            </>
          )}

          {slug !== 'sidekick' && <div className="cd-decisions">
            {keyDecisions.map((d) => (
              <div className="cd-decision" key={d.id}>
                <span className="cd-decision__number">{t('case.decisionLabel', { n: String(d.id).padStart(2, '0') })}</span>
                <h3 className="cd-decision__title">{d.title}</h3>

                <div className="cd-decision__blocks">
                  <div className="cd-decision__block">
                    <span className="cd-decision__label">{t('case.problem')}</span>
                    <p className="cd-decision__text">{d.problem}</p>
                  </div>

                  <div className="cd-decision__block">
                    <span className="cd-decision__label">{t('case.decision')}</span>
                    <p className="cd-decision__text">{d.decision}</p>
                  </div>

                  <div className="cd-decision__block">
                    <span className="cd-decision__label">{t('case.rationale')}</span>
                    <p className="cd-decision__text">{d.reason}</p>
                  </div>

                  <div className="cd-decision__block">
                    <span className="cd-decision__label">{t('case.alternative')}</span>
                    <p className="cd-decision__text cd-decision__text--alternative">
                      {d.alternative.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          06 Outcome
          ═══════════════════════════════════════ */}
      <section className="cd-section">
        <div className="container">
          <div className="cd-section-header">
            <span className="cd-section-header__number">06</span>
            <h2 className="cd-section-header__title">
              {slug === 'sidekick-agent' ? '验证结果' : t('case.impact')}
            </h2>
          </div>

          {slug === 'sidekick-agent' ? (
            <div className="cd-validation-result">
              <h3 className="cd-subheading">方向性验证结果</h3>
              <ul className="cd-qual-list">
                {(caseData.outcome.validationResults || []).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              <h3 className="cd-subheading">基于验证完成的迭代</h3>
              <ul className="cd-qual-list">
                {(caseData.outcome.iterations || []).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

            </div>
          ) : slug === 'sidekick' ? (
            <div className="cd-sidekick-results">
              <p className="cd-text">{lang === 'en' ? 'Three solutions were launched: theme-fit recommendations, page planning, and AI edit risk levels with a change set.' : lang === 'zh-TW' ? '已上線主題適配推薦、頁面規劃，以及 AI 修改風險分級與修改集三套方案。' : '已上线主题适配推荐、页面规划，以及 AI 修改风险分级与修改集三套方案。'}</p>
              <SidekickResults lang={lang} />
              <ResultsMeasurementMethod lang={lang} />
            </div>
          ) : (
            <>
              <h3 className="cd-subheading">{t('case.quantitativeResults')}</h3>

              <div className="cd-metrics-grid">
                {outcomeQuant.map((m, i) => (
                  <div className={`cd-metric-card${slug === 'sidekick' ? ' cd-metric-card--sidekick' : ''}`} key={i}>
                    {slug === 'sidekick' ? (
                      <>
                        <span className="cd-metric-card__label">{m.label}</span>
                        <strong className="cd-metric-card__value">
                          {m.delta
                            ?.replace(/^缩短\s*/, '↓ ')
                            .replace(/^减少\s*约?\s*/, '↓ ')}
                        </strong>
                        <span className="cd-metric-card__comparison">
                          {m.before?.replace(/^约\s*/, '')} → {m.after}
                        </span>
                        <span className="cd-metric-card__note">{sidekickMetricDescriptions[i] || m.note || t('case.baselineMissing')}</span>
                      </>
                    ) : (
                      <>
                        <span className="cd-metric-card__value">{m.after}</span>
                        <span className="cd-metric-card__label">{m.label}</span>
                        <span className="cd-metric-card__note">{t('case.baselineMissing')}</span>
                      </>
                    )}
                  </div>
                ))}
              </div>

              {displayBaselineNote && (
                <p className="cd-note" style={{ marginTop: 0 }}>{displayBaselineNote}</p>
              )}

              <h3 className="cd-subheading">{t('case.qualitativeResults')}</h3>
              <ul className="cd-qual-list">
                {outcomeQual.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          07 Reflection
          ═══════════════════════════════════════ */}
      <section className="cd-section">
        <div className="container">
          <div className="cd-section-header">
            <span className="cd-section-header__number">07</span>
            <h2 className="cd-section-header__title">{t('case.reflection')}</h2>
          </div>

          {/* Reusable Methodology */}
          {reflectionMethodology.length > 0 && (
            <>
              <h3 className="cd-subheading">{t('case.reusableMethodology')}</h3>
              <ul className="cd-qual-list" style={slug === 'sidekick' ? undefined : { marginBottom: 'var(--space-40)' }}>
                {reflectionMethodology.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </>
          )}

          {/* Lessons & If Redo — empty state */}
          {caseData.reflection.lessonsIfRedo.state === 'empty' && (
            <div className="cd-content-note cd-content-note--empty">
              <p>{t('case.lessonsEmpty')}</p>
            </div>
          )}

          {displayReflectionNote && (
            <p className="cd-note cd-note--reflection">{displayReflectionNote}</p>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          08 What This Demonstrates
          ═══════════════════════════════════════ */}
      <section className="cd-section">
          <div className="container">
          {slug !== 'sidekick-agent' && slug !== 'sidekick-ai-app' && (
            <div className="cd-section-header">
              <span className="cd-section-header__number">08</span>
              <h2 className="cd-section-header__title">{t('case.demonstrates')}</h2>
            </div>
          )}

          {/* Competency Grid */}
          {slug !== 'sidekick-agent' && slug !== 'sidekick-ai-app' && (
            <div className="cd-competency-grid">
              {competencies.map((c, i) => (
                <div className={`cd-competency-card${slug === 'sidekick' ? ' cd-competency-card--sidekick' : ''}`} key={i}>
                  <div className="cd-competency-card__dimension">{c.dimension}</div>
                  {slug !== 'sidekick' && (
                    <div className="cd-competency-card__stars">{'⭐'.repeat(c.strength)}</div>
                  )}
                  <div className="cd-competency-card__note">{c.note}</div>
                </div>
              ))}
            </div>
          )}

          {/* Disclaimer */}
          {slug !== 'sidekick' && slug !== 'sidekick-agent' && displayDisclaimer && (
            <div className="cd-disclaimer">
              <p><strong>{t('case.doesNotDemonstrate')}</strong>{displayDisclaimer}</p>
            </div>
          )}

          {/* Navigation — Glass Bar */}
          <nav className="cd-nav">
            {prevSlug ? (
              <Link to={`/case/${prevSlug}`} className="cd-nav__link">{t('case.previousCase')}</Link>
            ) : <span />}
            <Link to="/" className="cd-nav__link">{t('case.allCases')}</Link>
            {nextSlug ? (
              <Link to={`/case/${nextSlug}`} className="cd-nav__link">{t('case.nextCase')}</Link>
            ) : <span />}
          </nav>
        </div>
      </section>
      </main>
      <CaseTableOfContents lang={lang} />
      </div>
    </div>
  );
}
