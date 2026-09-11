const homeContent = {
  zh: {
    casesHeading: '精选案例',
    capabilitiesLabel: '我的能力',
    capabilitiesTitle: '核心能力',
    capabilities: [
      { title: '业务与产品策略', description: '从业务目标、用户价值与产品机制出发，识别关键问题并定义体验策略与产品方向。' },
      { title: '企业级 SaaS 设计', description: '近 7 年企业级产品设计经验，覆盖低代码、跨境电商与复杂配置型业务系统。' },
      { title: 'AI 产品体验设计', description: '设计 Agent 与 Copilot 的任务规划、风险确认、执行反馈和失败恢复机制。' },
      { title: '设计系统 / 设计运维', description: '以 Design Token、组件语义与协作机制支撑多产品、多语言规模化交付。' },
      { title: '验证与数据驱动', description: '通过用户研究、可用性测试与业务指标验证设计价值，持续推动效率、转化与体验提升。' },
    ],
    workflow: {
      title: '我的工作流',
      subtitle: '以业务目标为起点，从洞察问题到设计验证。',
      human: '人 · 判断与方向',
      ai: 'AI · 研究 / 推演 / 设计 / 实现 / 验证',
      tools: ['ChatGPT · 研究与推演', 'Figma · 映射、设计与原型', 'Codex · 文件、实现、测试与迭代'],
      toolNote: '工具按任务组合使用，贯穿整个设计流程。',
      replay: '再次播放',
      phases: [
        { title: '启动', detail: '组织人员 · 统一信息 · 盘点资源' },
        { title: '调查', detail: '明确需求 · 了解业务 · 了解用户 · 了解产品' },
        { title: '聚焦', detail: '确定目标 · 确定原则 · 确定指标' },
        { title: '设计', detail: '列举方案 · 对比方案 · 产出原型' },
        { title: '评估', detail: '验证设计 · 资料归档' },
      ],
    },
    about: {
      domainTitle: '领域经验',
      description: '聚焦 AI 产品与复杂业务系统，建立清晰、可控、可规模化的产品体验。',
      domains: [
        { title: '企业级 SaaS', detail: '近 7 年' },
        { title: '跨境电商', detail: '3 年+' },
        { title: '低代码平台', detail: '近 4 年' },
        { title: 'AI Agent', detail: 'AI 产品体验', isAi: true },
      ],
      more: '了解更多 →',
    },
    experience: [
      { period: '2023.06—至今', location: '上海', role: '交互设计专家', company: '跨境电商 SaaS 平台', description: '负责面向 Shopify 商家的跨境电商 SaaS 全链路体验设计，推进 AI 在素材生成、投放配置、智能建站与商家运营场景中的产品化落地。' },
      { period: '2019.10—2023.06', location: '上海', role: '交互设计师', company: '企业级低代码平台', description: '负责企业级低代码平台核心体验设计，覆盖业务建模、复杂配置、模板复用、企业级工作流与设计系统建设。' },
    ],
    contact: { title: '一起聊聊', subtitle: '目前考虑高级产品设计师 / AI 产品设计师机会。\n\n专注 AI 产品、企业级 SaaS 与复杂业务系统。', resume: '下载简历 (PDF)' },
    cases: {
      sidekick: { projectType: '商业项目 · 已脱敏', tags: ['AI 建站', '企业级 SaaS'], title: 'Shopify 主题智能建站体验升级', summary: '面向 Shopify 商家的智能建站场景，通过产品走查、商家访谈与 15 次 AI 能力测试，定位主题选择、页面规划和改动控制中的决策缺口；基于 Theme 与 Sidekick 现有能力，构建从智能推荐、结构规划到安全执行的建站体验。', alt: 'Shopify 主题智能建站体验方案预览', cta: '查看案例 →' },
      'sidekick-agent': { projectType: '体验探索', tags: ['AI Agent', '多应用协同'], title: 'Shopify Sidekick AI 运营工作台体验设计', summary: '面向跨境商家的跨应用复杂运营任务，构建涵盖任务规划、上下文管理、风险确认、执行反馈与失败恢复的 AI 运营工作台，让执行计划清晰可见、过程可干预、失败可恢复。', alt: 'Shopify Sidekick AI 运营工作台方案预览', cta: '查看案例 →' },
      lowcode: { projectType: '商业项目 · 已脱敏', tags: ['低代码', '企业级 SaaS'], title: '企业级低代码平台体验升级', summary: '围绕业务建模、复杂配置与模板复用重构低代码核心流程，降低企业用户的理解与搭建成本，使搭建效率提升 30%–45%，模板命中率超过 70%。', alt: '企业级低代码平台体验升级方案预览', cta: '查看案例 →' },
      template: { projectType: '商业项目 · 已脱敏', tags: ['设计系统', '设计运维'], title: '企业级设计系统与设计运维建设', summary: '从 0 到 1 建立企业级设计系统，通过 Design Token、组件规范与协作机制支撑多产品、多语言交付；组件复用率达到 70%，国际化迭代周期缩短 30%。', alt: '企业级设计系统与设计运维方案预览', cta: '查看案例 →' },
      novabot: { projectType: '商业项目 · 已脱敏', tags: ['IoT', 'Mobile App'], title: 'Novabot 智能割草机 App 体验重构', summary: '面向北美住宅草坪用户，重构设备激活、网络连接、地图构建、任务控制与异常恢复链路，让复杂硬件状态清晰、可控、可恢复，使用户更安心地将草坪维护交给机器人。', alt: 'Novabot 智能割草机 App 体验方案预览', cta: '查看案例 →' },
      'sidekick-ai-app': { projectType: '体验探索', tags: ['体验探索 · AI Agent', '移动端产品设计'], title: 'Shopify Sidekick AI App', summary: '从对话助手到可控经营任务系统。识别真实经营阻塞，支撑安全决策，让每一次执行都有结果、可回退。', alt: 'Shopify Sidekick AI App 体验方案预览', cta: '查看案例 →' },
    },
  },
  en: {
    casesHeading: 'Selected Work', capabilitiesLabel: 'My Capabilities', capabilitiesTitle: 'Core Capabilities',
    capabilities: [
      { title: 'Business & Product Strategy', description: 'Identify critical problems and define experience strategy from business goals, user value and product mechanisms.' },
      { title: 'Enterprise SaaS Design', description: 'Nearly seven years of enterprise product design across low-code, cross-border commerce and complex configuration systems.' },
      { title: 'AI Product Experience', description: 'Design planning, risk confirmation, feedback and recovery patterns for Agents and Copilots.' },
      { title: 'Design System / DesignOps', description: 'Use design tokens, component semantics and operating practices to scale multilingual product delivery.' },
      { title: 'Validation & Data', description: 'Validate design value through research, usability testing and business metrics to improve efficiency, conversion and experience.' },
    ],
    workflow: { title: 'My Workflow', subtitle: 'Start with business goals, then move from problem definition to validated delivery.', human: 'HUMAN · Judgment / Direction', ai: 'AI · Research / Reasoning / Design / Implementation / Validation', tools: ['ChatGPT · Research & reasoning', 'Figma · Mapping, design & prototyping', 'Codex · Files, implementation, testing & iteration'], toolNote: 'Tools are combined by task throughout the design process.', replay: 'Play again', phases: [{ title: 'Start', detail: 'Business goals · scope · success metrics' }, { title: 'Research', detail: 'User interviews · service map · market context' }, { title: 'Define', detail: 'Key problems · priorities · design principles' }, { title: 'Prototype', detail: 'Task flows · interaction · high-fidelity prototype' }, { title: 'Validate', detail: 'Usability · data review · iteration' }] },
    about: { domainTitle: 'Domain Experience', description: 'Focused on AI products and complex business systems, creating clear, controllable and scalable product experiences.', domains: [{ title: 'Enterprise SaaS', detail: 'Nearly 7 years' }, { title: 'Cross-border Commerce', detail: '3+ years' }, { title: 'Low-code Platforms', detail: 'Nearly 4 years' }, { title: 'AI Agent', detail: 'AI Product Experience', isAi: true }], more: 'Learn more →' },
    experience: [{ period: 'Jun 2023—Present', location: 'Shanghai', role: 'Interaction Design Specialist', company: 'Cross-border E-commerce SaaS Platform', description: 'Own end-to-end experience design for Shopify merchants, bringing AI into asset generation, campaign setup, AI site building and merchant operations.' }, { period: 'Oct 2019—Jun 2023', location: 'Shanghai', role: 'Interaction Designer', company: 'Enterprise Low-code Platform', description: 'Designed core low-code experiences spanning business modeling, complex configuration, template reuse, enterprise workflows and design systems.' }],
    contact: { title: "Let's Talk", subtitle: 'Currently considering Senior Product Designer / AI Product Designer opportunities.\n\nFocused on AI products, Enterprise SaaS, and complex business systems.', emailAction: 'Send email', resume: 'Download Resume (PDF)' },
    cases: {
      sidekick: { projectType: 'Commercial project · Redacted', tags: ['AI Site Building', 'Enterprise SaaS'], title: 'Shopify Theme AI Site-building Experience', summary: 'For Shopify merchants, identified decision gaps in theme selection, page planning and change control through product review, merchant research and 15 AI capability tests; then designed a site-building experience from recommendations and structure planning to safe execution.', alt: 'Shopify theme AI site-building experience preview', cta: 'View Case →' },
      'sidekick-agent': { projectType: 'Experience exploration', tags: ['AI Agent', 'Multi-app orchestration'], title: 'Shopify Sidekick AI Operations Workbench', summary: 'For complex cross-application operations, designed an AI workbench for planning, context, risk confirmation, feedback and recovery—making plans visible, interventions possible and failures recoverable.', alt: 'Shopify Sidekick AI operations workbench preview', cta: 'View Case →' },
      lowcode: { projectType: 'Commercial project · Redacted', tags: ['Low-code', 'Enterprise SaaS'], title: 'Enterprise Low-code Platform Experience Upgrade', summary: 'Reworked core low-code flows around business modeling, complex configuration and template reuse, improving clarity and build efficiency by 30–45% with template adoption above 70%.', alt: 'Enterprise low-code platform experience preview', cta: 'View Case →' },
      template: { projectType: 'Commercial project · Redacted', tags: ['Design System', 'DesignOps'], title: 'Enterprise Design System & DesignOps', summary: 'Built an enterprise design system from zero with design tokens, component standards and collaboration practices, achieving 70% component reuse and a 30% shorter localization cycle.', alt: 'Enterprise Design System and DesignOps preview', cta: 'View Case →' },
      novabot: { projectType: 'Commercial project · Redacted', tags: ['IoT', 'Mobile App'], title: 'Novabot Smart Mower App Experience', summary: 'Reworked activation, network connection, mapping, task control and recovery for North American homeowners, making complex device states clear, controllable and recoverable.', alt: 'Novabot smart mower app experience preview', cta: 'View Case →' },
      'sidekick-ai-app': { projectType: 'Experience exploration', tags: ['体验探索 · AI Agent', '移动端产品设计'], title: 'Shopify Sidekick AI App', summary: '从对话助手到可控经营任务系统。识别真实经营阻塞，支撑安全决策，让每一次执行都有结果、可回退。', alt: 'Shopify Sidekick AI App experience preview', cta: 'View Case →' },
    },
  },
};

// The existing traditional-Chinese home copy intentionally stays unchanged.
// It previously referenced this object directly, so retain its pre-update values
// in an independent locale object.
const zhTraditionalContent = {
  ...homeContent.zh,
  capabilities: homeContent.zh.capabilities.map((capability) => ({ ...capability })),
  about: { ...homeContent.zh.about, domains: homeContent.zh.about.domains.map((domain) => ({ ...domain })) },
  contact: { ...homeContent.zh.contact },
  cases: Object.fromEntries(Object.entries(homeContent.zh.cases).map(([slug, caseContent]) => [
    slug,
    { ...caseContent, tags: [...caseContent.tags] },
  ])),
};

zhTraditionalContent.capabilities[1].title = 'Enterprise SaaS 设计';
zhTraditionalContent.capabilities[3].title = 'Design System / DesignOps';
zhTraditionalContent.about.domainTitle = '領域經驗';
zhTraditionalContent.about.description = '聚焦 AI 產品與複雜業務系統，建立清晰、可控、可規模化的產品體驗。';
zhTraditionalContent.about.domains = [{ title: '企業級 SaaS', detail: '近 7 年' }, { title: '跨境電商', detail: '3 年+' }, { title: '低程式碼平台', detail: '近 4 年' }, { title: 'AI Agent', detail: 'AI 產品體驗', isAi: true }];
zhTraditionalContent.contact.subtitle = '目前考慮高級產品設計師 / AI 產品設計師機會。\n\n專注 AI 產品、企業級 SaaS 與複雜業務系統。';
zhTraditionalContent.workflow = {
  ...homeContent.zh.workflow,
  human: '人 · 判斷與方向',
  ai: 'AI · 研究 / 推演 / 設計 / 實現 / 驗證',
  tools: ['ChatGPT · 研究與推演', 'Figma · 映射、設計與原型', 'Codex · 文件、實現、測試與迭代'],
  toolNote: '工具按任務組合使用，貫穿整個設計流程。',
};
zhTraditionalContent.cases.sidekick.tags[1] = 'Enterprise SaaS';
zhTraditionalContent.cases.lowcode.tags[1] = 'Enterprise SaaS';
zhTraditionalContent.cases.template.tags = ['Design System', 'DesignOps'];
zhTraditionalContent.cases.template.title = '企业级 Design System 与 DesignOps 建设';
zhTraditionalContent.cases.template.alt = '企业级 Design System 与 DesignOps 方案预览';

homeContent['zh-TW'] = zhTraditionalContent;

export function getHomeContent(lang) {
  return homeContent[lang] || homeContent.en;
}
