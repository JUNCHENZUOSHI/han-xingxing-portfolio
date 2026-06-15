/**
 * Profile SSOT — single source of truth for all personal information.
 * Source: 00_context/profile.md
 * Rule: No component hardcodes name, title, experience, or contact.
 *        Always import from this file.
 *
 * Confidence markers:
 *   ✅ = confirmed by resume/documentation
 *   🔮 = inferred from available evidence
 *   ❓ = awaiting confirmation
 *
 * Last updated: 2026-06-14
 */

export const profile = {
  /* ── 1. Basic Identity (profile.md §1) ── */
  name: 'Han Xingxing',
  nameZh: '韩星星',
  age: 30,
  location: 'Shanghai',
  education: '南京大学 · 人力资源管理 · 本科 · 2018–2022',
  yearsOfExperience: '6–7',
  status: 'Available now',
  languages: 'Chinese (primary)',
  email: 'han164522@163.com',
  phone: '17898872362',

  /* ── 2. Professional Identity (profile.md §2-3) ── */
  title: 'AI-Native Product Designer',
  subtitle: 'B2B AI Product Designer',
  tagline:
    '将 AI 能力、复杂业务系统与商业目标整合为可规模化落地的产品体验',
  specialization: [
    'Enterprise SaaS',
    'AI Product Experience',
    'Growth-Oriented Design',
    'Design System Thinking',
  ],

  /* ── 3. Target Roles ── */
  targetRoles: [
    'Senior Product Designer',
    'AI Product Designer',
    'Senior UX Designer',
  ],

  /* ── 4. Career Narrative (3-segment story) ── */
  narrative: [
    {
      period: '2019–2023',
      label: '复杂系统设计',
      story:
        '在企业级软件公司，从低代码平台入手，理解了如何把企业级复杂业务流程抽象为可用的产品体验',
    },
    {
      period: '2023–至今',
      label: 'AI 产品设计',
      story:
        '在跨境电商 SaaS 公司，将生成式 AI 融入跨境电商 SaaS，从 AI 能力抽象到业务结果闭环',
    },
    {
      period: '现在–未来',
      label: '体系推动者',
      story:
        '不止做单个 AI 功能，而是建立 AI 体验度量体系、语义设计系统、跨团队协作机制',
    },
  ],

  /* ── 5. Trust Hooks (Hero stats) ── */
  trustHooks: [
    { number: '6年', label: 'B 端企业级经验' },
    { number: '2个', label: 'AI 产品从 0 到 1 交付' },
    { number: '60+', label: '组件设计系统' },
  ],

  /* ── 6. Experience (profile.md §4) ── */
  experience: [
    {
      period: '2023 – 至今',
      role: '交互设计专家',
      company: '跨境电商 SaaS 平台', // 🔴 脱敏后
      companyRaw: '艾德领客（上海）数字技术有限公司', // 🔴 do not render
      location: 'Shanghai',
      highlights: [
        '主导 Shopify Sidekick AI 能力融合与体验升级',
        '推动 AI 驱动增长体验建设',
        '建立体验与业务指标联动机制',
        '搭建设计系统和国际化设计规范',
        '推动产品从流程工具向智能增长平台转型',
      ],
      metrics: [
        { label: '创意准备效率', value: '↑25%', note: 'AI 自动生成贡献其中约 60% 增幅' },
        { label: '单次素材生产周期', value: '↓4h' },
        { label: '客户首次购买转化率', value: '↑8%' },
        { label: '组件复用率', value: '70%' },
        { label: '国际化迭代周期', value: '↓30%' },
      ],
    },
    {
      period: '2019 – 2023',
      role: '交互设计师',
      company: '企业级低代码平台', // 🔴 脱敏后
      companyRaw: '上海博科资讯股份有限公司', // 🔴 do not render
      location: 'Shanghai',
      highlights: [
        '主导 AI 驱动低代码体验升级',
        '建立智能体验设计体系',
        '推动语义化组件系统建设',
        '建立 AI 质量评估框架',
        '推动 AI 产品能力规模化落地',
      ],
      metrics: [
        { label: '典型应用构建效率', value: '↑30–45%' },
        { label: '智能模板推荐命中率', value: '70%+' },
        { label: 'NPS/CSAT 提升', value: '↑10–15%' },
        { label: '关键任务完成率', value: '↑15%+' },
        { label: '用户错误率', value: '↓20%' },
        { label: 'AI 生成界面准确率', value: '↑25–30%' },
        { label: '设计–研发一致性', value: '↑30%' },
        { label: '产研协作效率', value: '↑20–25%' },
        { label: '语义设计系统覆盖组件', value: '60+' },
      ],
    },
  ],

  /* ── 7. Capabilities (profile.md §6) ── */
  capabilities: [
    {
      title: 'AI Product Design',
      description:
        '将生成式 AI 能力抽象为产品策略，建立从 AI 质量到业务结果的量化闭环。',
      items: [
        'AI 体验度量体系设计',
        'Prompt 驱动产品策略',
        'AI 交互模式基线制定',
        'AI 错误兜底与可解释性设计',
      ],
    },
    {
      title: 'Enterprise SaaS & Growth',
      description:
        '将复杂企业级业务流程抽象为可用产品体验，通过设计驱动业务增长。',
      items: [
        '复杂业务流程设计',
        '数据驱动增长设计',
        '跨文化市场转化优化',
        '利益相关者协作推动',
      ],
    },
    {
      title: 'Design Systems',
      description:
        '从 0 到 1 搭建企业级设计系统，支持 AI 生成与国际化多市场适配。',
      items: [
        'Design Token 体系设计',
        '语义化组件系统建设',
        'DesignOps 与协作规范',
        '国际化设计标准化',
      ],
    },
  ],

  /* ── 8. Home Capabilities (5 — mapped from profile.md §6) ── */
  homeCapabilities: [
    {
      title: 'UX Strategy',
      description:
        '将业务目标拆解为设计策略，建立从用户体验到商业结果的量化闭环。',
      items: [
        '产品策略与商业目标对齐',
        '用户旅程与信息架构设计',
        '数据驱动设计决策',
        '跨团队设计推动',
      ],
    },
    {
      title: 'Enterprise SaaS',
      description:
        '专注 B 端复杂业务系统设计，6 年以上企业级产品经验。',
      items: [
        '复杂业务流程抽象',
        '企业级产品体验优化',
        '多角色权限与配置型产品',
        '从策略到交付的全链路设计',
      ],
    },
    {
      title: 'AI Product Experience',
      description:
        '将生成式 AI 能力转化为可理解、可度量、可规模化落地的产品体验。',
      items: [
        'AI 交互模式基线制定',
        'AI 体验度量体系设计',
        'Prompt 驱动产品策略',
        'AI 错误兜底与可解释性',
      ],
    },
    {
      title: 'Design System',
      description:
        '从 0 到 1 搭建设计系统，建立 AI 可生成/可理解的双向语义体系。',
      items: [
        'Design Token 体系设计',
        '语义化组件系统（60+ 组件）',
        'DesignOps 与协作规范',
        '国际化多市场适配',
      ],
    },
    {
      title: 'Growth Design',
      description:
        '通过设计驱动转化率提升与业务增长，建立体验与业务指标联动机制。',
      items: [
        '转化率优化与 A/B 测试',
        '跨文化市场增长策略',
        '体验指标与业务 KPI 关联',
        '数据反馈驱动持续迭代',
      ],
    },
  ],

  /* ── 9. Skills with quantified evidence (profile.md §6.6) ── */
  skills: [
    { name: '复杂系统抽象', evidence: '60+ 组件语义设计系统' },
    { name: 'AI 产品设计', evidence: '效率↑25%，素材周期↓4h' },
    { name: '数据驱动设计', evidence: '四层 AI 体验评估体系' },
    { name: '国际化设计', evidence: '国际化迭代周期↓30%' },
    { name: 'DesignOps', evidence: '从 0 到 1 搭建，组件复用率 70%' },
    { name: '利益相关者沟通', evidence: '跨 PM × FE × AI Lab 推动，协作效率↑20–25%' },
  ],

  /* ── 10. Working Style / "What I'm Not" (profile.md §10) ── */
  notStatements: [
    { not: '不仅是 UI 设计师', value: '产品思考 · 业务理解 · 系统设计' },
    { not: '不以视觉表现作为核心竞争力', value: 'AI 体验设计 · 复杂系统设计' },
    { not: '不属于单纯执行型设计师', value: '策略思考 · 数据驱动决策' },
    { not: '不局限于页面交付层面', value: '设计体系建设 · 跨团队推动' },
  ],
  coreValue:
    '我的价值在于把复杂 AI 能力转化为可理解、可度量、可增长的产品体验体系，而不是产出漂亮的界面。',

  /* ── 11. About Preview data (for Home page) ── */
  industries: [
    'Enterprise SaaS (6–7 年)',
    '跨境电商 / Shopify 生态 (2–3 年)',
    'AI 产品 / Agent / Copilot',
    '低代码平台 (~4 年)',
    '复杂配置型企业级产品',
  ],
  workingStyleSummary:
    '产品思考驱动，非视觉表现驱动。策略思考，非单纯执行。将复杂 AI 能力转化为可度量、可增长的产品体验体系。',

  /* ── 12. Keywords (profile.md §12) ── */
  keywords: [
    'B2B AI Product Designer',
    'B2B SaaS',
    'Enterprise Product',
    'Shopify Ecosystem',
    'AI Product Design',
    'Design System',
    'Data-Driven Design',
    'Growth Experience',
    'Human-AI Collaboration',
    'Intelligent Workflow',
  ],
};
