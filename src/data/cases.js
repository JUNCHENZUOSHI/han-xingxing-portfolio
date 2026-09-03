/**
 * Cases SSOT — single source of truth for all case study content.
 * Source: 00_context/cases.md
 * Rule: No component hardcodes case titles, metrics, or decisions.
 *        Always import from this file.
 *
 * Confidence markers:
 *   ✅ confirmed   = backed by resume / screenshots / docs
 *   🔮 inferred    = reasonably inferred, lacking direct evidence
 *   ❓ unconfirmed = must confirm with designer before publishing
 *   🔴 redacted    = NDA-protected, must anonymize
 *   🚧 empty       = field is blank in cases.md
 *
 * Last updated: 2026-06-14
 */

export const cases = {
  /* ================================================================
     Case 01 — Shopify 主题智能建站体验升级
     Source: Cases 4 — slug preserved as sidekick
     Priority: P0 · Featured case on Home
     ================================================================ */
  sidekick: {
    slug: 'sidekick',
    priority: 'P0',
    featured: true,

    title: 'Shopify 主题智能建站体验升级',
    nda: { required: true, badge: '🔒 已脱敏' },
    tags: ['AI 产品设计', 'SaaS', '跨境电商', '复杂系统'],
    confidence: 'confirmed',
    role: '产品设计师（AI 方向）',
    timeline: '真实商业项目',
    platform: 'Web（B端）',
    industry: '跨境电商 SaaS / AI 产品',
    team: '跨职能项目团队',
    cardAccent: 'var(--card-accent-sidekick)',
    coverImage: 'case-sidekick.jpeg',

    narrativeHook:
      'Shopify 已经很好地解决了「怎么配置」，但商家仍需持续判断「应该配置什么」。本项目通过 AI 决策辅助，把经营目标转化为可理解、可调整、可执行的页面方案。',
    summary:
      '通过产品走查、任务拆解、15 次 AI 能力测试、6 名商家访谈和竞品对标，识别成熟编辑能力之上的决策缺口。在既有主题与 Sidekick 能力上增加主题推荐、页面规划和改动控制，使主题选择耗时缩短 50%，页面规划耗时缩短 60%，关键决策节点减少约 44%。',
    publicSummary:
      '通过产品走查、任务拆解、15 次 AI 能力测试、6 名商家访谈和竞品对标，识别成熟编辑能力之上的决策缺口。在既有主题与 Sidekick 能力上增加主题推荐、页面规划和改动控制。',

    cardMetrics: [
      { label: '主题选择耗时', value: '↓50%', baseline: '真实任务记录' },
      { label: '页面规划耗时', value: '↓60%', baseline: '真实任务记录' },
    ],
    featuredMetrics: [
      { label: '主题选择耗时', value: '↓50%', baseline: '真实任务记录' },
      { label: '页面规划耗时', value: '↓60%', baseline: '真实任务记录' },
      { label: '关键决策节点', value: '↓44%', baseline: '真实任务记录' },
    ],
    cardVisualPills: [
      { label: '主题选择', metric: '↓50%' },
      { label: '页面规划', metric: '↓60%' },
      { label: '决策节点', metric: '↓44%' },
    ],

    background: {
      state: 'confirmed',
      note: '真实商业项目，受保密协议约束；内容已脱敏，界面经示意化重绘。',
      why: 'Shopify 主题连接商品、品牌资产与消费者商店前台。商家需要完成主题理解、页面搭建、内容组织、商品展示、跨端适配与最终上线。完整产品走查显示，主题发现、可组合编辑、Sidekick 自然语言修改、AI 区块生成、跨端预览与保存撤销等能力都已较成熟，因此项目范围从「界面优化」收敛为「建站决策优化」。',
      targetUsers: '具有商品与品牌基础，正在完成主题选择、首页搭建或商店优化的 Shopify 商家。',
      businessGoals: '降低商家建站门槛与完成成本，更高效地建立符合品牌、商品和经营目标的在线商店。',
      constraints: [
        '不推翻 Shopify 已成熟的主题商店与主题编辑器',
        '复用 Sidekick、AI 生成、预览、保存和撤销等既有能力',
        '不涉及订单、支付结账、营销后台及其他 Shopify Admin 模块',
        '商业信息需以区间、比例和脱敏场景呈现',
      ],
    },

    challenge: {
      state: 'confirmed',
      userProblem: '6 名商家访谈中，4/6 在浏览多个候选主题后仍难说明它们对自身业务的关键差异；5/6 在相近分区之间出现选择犹豫。',
      businessProblem: '成熟的编辑能力没有直接降低建站决策成本；用户仍需把经营目标跨越多个专业判断层，才能转化为可执行配置。',
      designChallenge: '如何在不重做主题编辑器的前提下，建立可解释、可执行、可恢复的 AI 决策辅助层，同时解决主题选择、页面规划与跨分区 AI 改动控制。',
    },

    myRole: {
      responsibilities: [
        {
          task: '端到端产品走查',
          contribution: '独立主导',
          confidence: 'confirmed',
          detail: '梳理主题商店、主题管理、编辑器、分区、区块、AI 辅助、预览与上线的完整链路。',
        },
        {
          task: '问题定义与范围收敛',
          contribution: '独立主导',
          confidence: 'confirmed',
          detail: '基于产品证据修正初始假设，将方向从编辑器重设计收敛为建站决策优化。',
        },
        {
          task: '用户研究与任务分析',
          contribution: '独立完成',
          confidence: 'confirmed',
          detail: '对 6 名目标商家开展半结构化访谈与关键任务认知走查，提炼主题选择、页面编辑和改动信任问题。',
        },
        {
          task: 'AI 能力测试与竞品对标',
          contribution: '独立完成',
          confidence: 'confirmed',
          detail: '完成 5 组提示词、每组 3 次的受控复测，并对标 Shopify、Wix 与 Squarespace 的智能建站能力。',
        },
        {
          task: 'AI 决策辅助方案',
          contribution: '独立主导',
          confidence: 'confirmed',
          detail: '设计主题推荐、页面规划、原因解释、风险分级、改动集合与局部恢复机制。',
        },
        {
          task: '原型验证与结果分析',
          contribution: '独立主导',
          confidence: 'confirmed',
          detail: '组织目标商家完成当前体验与可交互原型的同类任务，统一任务起止节点并分析效率变化。',
        },
      ],
      note: '真实商业项目；研究和任务结果均采用脱敏场景、区间与比例呈现。',
    },

    designApproach: {
      state: 'confirmed',
      note: '从产品证据与用户研究出发修正方向，再以业务目标、用户决策和可控执行组织方案。',
      phases: [
        {
          title: 'Research & Discovery',
          summary: '完成端到端体验架构、产品走查、真实任务拆解、6 名商家访谈和竞品对标。确认操作入口并不缺失，问题集中在不同层级之间的适配判断。',
          confidence: 'confirmed',
        },
        {
          title: 'Definition & Strategy',
          summary: '定义「意图到配置距离」：高层经营目标需经过多个专业决策层才能成为可执行配置。依据用户价值和现有能力基础，将页面规划定为 P0，主题选择与改动控制定为 P1。',
          confidence: 'confirmed',
        },
        {
          title: 'Design & Iteration',
          summary: '在既有执行能力上增加 AI 决策辅助层，形成主题推荐、页面规划和分级改动控制；AI 负责诊断与解释，用户负责调整、确认和恢复。',
          confidence: 'confirmed',
        },
        {
          title: 'Validation & Launch',
          summary: '6 名目标商家使用当前体验与可交互原型完成同类任务。主题选择耗时缩短 50%，页面规划耗时缩短 60%，关键决策节点减少约 44%。',
          confidence: 'confirmed',
        },
      ],
    },

    keyDecisions: [
      {
        id: 1,
        title: '从重新设计编辑器转向优化建站决策',
        state: 'confirmed',
        problem: '初始假设认为主题管理和编辑存在明显效率问题，但真实走查发现主题发现、编辑结构、AI 辅助、预览和状态控制均已成熟。',
        decision: '不重新设计整个主题编辑器，把设计范围收敛到商家在成熟能力之间做出正确选择的成本。',
        reason: '信息供给充分并不等于决策容易。真正的断点位于经营目标与主题能力、页面结构和具体配置之间，而非基础编辑功能。',
        alternative: {
          state: 'confirmed',
          text: '放弃整体界面优化方案，因为缺乏足够产品证据，且会重复设计 Shopify 已成熟的能力。',
        },
      },
      {
        id: 2,
        title: '在执行能力之上建立 AI 决策辅助层',
        state: 'confirmed',
        problem: '5 组提示词每组独立执行 3 次：基础执行和抽象意图理解较稳定，但页面型任务仅 2/3 出现跨区域调整，规划型任务仅 2/3 形成跨分区计划。',
        decision: '增加「商家目标→业务上下文→问题诊断→需求建模→方案推荐→原因解释→页面规划→调用已有能力」的决策层。',
        reason: 'Shopify 的差异化不仅来自语言模型，还来自商品、系列、变体、主题、页面和商店状态等电商上下文与可执行主题系统的结合。',
        alternative: {
          state: 'confirmed',
          text: '不新增独立 AI 编辑器，继续复用 Sidekick 的请求更改和 AI 生成作为执行层。',
        },
      },
      {
        id: 3,
        title: '用 AI 改动集合保障复杂修改可控',
        state: 'confirmed',
        problem: '6/6 商家希望在跨分区修改前了解完整影响范围，5/6 需要前后对比并希望单独撤销某项改动。',
        decision: '将复杂修改组织为可审查的 AI 改动集合，支持查看全部改动、单独预览、保留部分修改、撤销全部修改与最终保存。',
        reason: '低风险修改可以即时执行并撤销；多分区与高影响修改则需要先规划、再预览和确认，让控制强度与风险匹配。',
        alternative: {
          state: 'confirmed',
          text: '简单参数和文案修改仍沿用现有即时执行机制，不增加额外确认步骤。',
        },
      },
    ],
    decisionsNote: '三个关键决策共同构成从业务意图、方案规划到可控执行的完整链路。',

    outcome: {
      quantitative: [
        {
          label: '主题选择耗时',
          before: '约 12–18 分钟',
          after: '6–9 分钟',
          delta: '缩短 50%',
          baseline: '真实项目任务记录',
          measurement: '区间中点：15 → 7.5 分钟',
          attribution: 'confirmed',
          note: '6 名目标商家使用当前体验与 AI 决策辅助原型完成同类任务。',
        },
        {
          label: '页面规划耗时',
          before: '约 15–25 分钟',
          after: '6–10 分钟',
          delta: '缩短 60%',
          baseline: '真实项目任务记录',
          measurement: '区间中点：20 → 8 分钟',
          attribution: 'confirmed',
          note: '前后使用一致的业务场景、任务起止节点和计时口径。',
        },
        {
          label: '意图到配置关键节点',
          before: '约 9–14 个',
          after: '5–8 个',
          delta: '减少约 44%',
          baseline: '真实项目任务记录',
          measurement: '按关键决策与操作节点统计',
          attribution: 'confirmed',
          note: '区间中点由 11.5 个降至 6.5 个，降幅约 43.5%。',
        },
      ],
      qualitative: [
        '把设计重心从产品能力优化转向用户决策优化',
        '提出主题推荐、页面规划与可控 AI 修改的一体化决策辅助层',
        '在不推翻成熟编辑器的前提下拓展 AI 从操作执行到业务理解与决策辅助的价值',
      ],
      baselineNote: '数据来自真实项目任务记录与实际产品测试；为保护商业信息，使用区间、比例和脱敏业务场景呈现。',
    },

    competencies: [
      { dimension: '业务分析', strength: 4, note: '从业务目标、用户价值与产品机制定位真实问题' },
      { dimension: '复杂系统设计', strength: 4, note: '梳理端到端主题链路并划分决策、执行、基础能力与用户控制层' },
      { dimension: 'AI 产品设计', strength: 4, note: '以电商上下文驱动主题推荐、页面规划和原因解释' },
      { dimension: '交互设计', strength: 3, note: '按风险设计即时执行、预览、局部保留和撤销机制' },
    ],
    disclaimer: '真实商业项目，受保密协议约束。内容已脱敏，界面经示意化重绘；不展示商家身份及敏感经营数据。',

    reflection: {
      state: 'confirmed',
      methodology: [
        '业务驱动的系统性设计方法：先梳理业务目标、用户价值与产品机制，再定位关键阻碍。',
        '成熟能力审计：用真实产品证据修正初始假设，避免为了改版而改版。',
        '意图到配置距离：衡量高层业务目标转化为可执行产品配置所需跨越的专业决策层。',
        '风险分级控制：让 AI 修改的解释、预览、确认和恢复机制与影响范围匹配。',
      ],
      lessonsIfRedo: {
        state: 'confirmed',
        text: '继续用真实业务数据检验效率提升如何传导到建站完成、商家激活、主题使用与长期留存。',
      },
      note: '成熟产品的设计价值不一定来自增加更多功能，也可以来自缩短用户从经营目标到正确配置之间的距离。',
    },
  },

  /* ================================================================
     Case 02 — 低代码平台 AI 智能体验体系
     Source: cases.md §案例1 — slug: lowcode-ai-platform
     Priority: P0
     ================================================================ */
  lowcode: {
    slug: 'lowcode',
    priority: 'P0',
    featured: false,

    /* ── Basic Info ── */
    title: '企业级低代码平台智能体验升级',
    nda: { required: true, badge: '🔒 已脱敏' },
    tags: ['AI 产品设计', '设计系统', 'B端', '低代码'],
    confidence: 'confirmed',
    role: '交互设计师',
    timeline: '2019.10 – 2023.06',
    platform: 'Web (B端)',
    industry: '企业软件 / 低代码平台',
    team: 'PM × 前端 × AI Lab',
    cardAccent: 'var(--card-accent-lowcode)',
    coverImage: 'case-lowcode.jpeg',

    /* ── Summary ── */
    summary:
      '从 0 到 1 建立平台级 AI 体验度量体系和 60+ 组件语义设计系统。将设计系统升级为 AI 可生成/可理解的双向语义体系。',

    /* ── Metrics (Home card hooks) ── */
    cardMetrics: [
      { label: '效率', value: '↑30–45%', baseline: null },
      { label: '命中率', value: '70%+', baseline: null },
    ],
    featuredMetrics: [],

    /* ── Visual Entry Zone ── */
    cardVisualPills: [
      { label: 'Precision', metric: 'AI Scorecard' },
      { label: 'Coverage', metric: '60+ 组件' },
      { label: 'Confidence', metric: 'NPS ↑10-15%' },
    ],

    /* ── Background (🔮 inferred from resume) ── */
    background: {
      state: 'inferred',
      note: '以下背景信息基于量化结果和简历内容反推，尚未经原始项目文档直接确认。',
      why: '传统低代码平台「页面搭建—组件选择—逻辑配置」全链路操作复杂，企业用户构建效率低，智能模板推荐命中率不高。AI 输出质量不可控、不可度量。平台缺乏统一的 AI 体验度量体系和语义设计系统。',
      targetUsers:
        '企业业务人员（快速搭建业务应用）和低代码平台开发者（高效配置复杂业务逻辑）。🔮 未确认是否有正式 Persona。',
      businessGoals:
        '提升平台构建效率、提升智能推荐命中率、降低用户错误率、提升 NPS/CSAT。❓ 具体目标数值待确认。',
      constraints: [
        '❓ 技术/时间/资源约束待确认',
      ],
    },

    /* ── Challenge (🔮 inferred) ── */
    challenge: {
      state: 'inferred',
      userProblem:
        '企业业务人员组件选择认知负荷大，低代码平台开发者配置链路长、重复操作多。',
      businessProblem:
        '平台构建效率低，AI 输出质量不可控，缺乏统一的 AI 体验度量标准。',
      designChallenge:
        '如何在企业级低代码平台上建立从底层组件语义到上层 AI 交互模式的完整体验体系。',
    },

    /* ── My Role ── */
    myRole: {
      responsibilities: [
        {
          task: 'AI 体验策略制定',
          contribution: '独立主导',
          confidence: 'confirmed',
          detail: '主导平台级 AI 体验策略与交互模式基线制定',
        },
        {
          task: 'AI Scorecard 指标体系',
          contribution: '独立主导',
          confidence: 'confirmed',
          detail: '建立 AI 能力清单与跨层级指标体系（Precision/Coverage/Confidence）',
        },
        {
          task: '语义设计系统',
          contribution: '独立主导',
          confidence: 'confirmed',
          detail: '将设计系统升级为 AI 可生成/可理解的双向语义体系，60+ 组件',
        },
        {
          task: 'Prompt Schema 规范',
          contribution: '❓ 待确认',
          confidence: 'unconfirmed',
          detail: 'Prompt Schema 规范化（可能为与 AI Lab 协作）',
        },
        {
          task: 'AI 错误兜底机制',
          contribution: '独立主导',
          confidence: 'confirmed',
          detail: '设计 AI 错误兜底与可解释性规则',
        },
        {
          task: '跨团队推动',
          contribution: '推动/协调',
          confidence: 'confirmed',
          detail: '与 PM × FE × AI Lab 协作落地智能化改造',
        },
        {
          task: 'Prompt 模板体系',
          contribution: '独立主导',
          confidence: 'confirmed',
          detail: '系统沉淀 Prompt 模板体系',
        },
        {
          task: '商业化策略',
          contribution: '❓ 待确认',
          confidence: 'unconfirmed',
          detail: 'AI 功能分层与价值定价模型（参与程度未确认）',
        },
      ],
      note: 'AI 体验策略、Scorecard 指标体系、语义设计系统和错误兜底机制由我主导设计。PM 提供了业务需求优先级并协调了跨部门资源。AI Lab 负责模型能力评估并参与 Prompt Schema 规范化。前端团队负责组件落地和设计系统技术实现。具体分工比例将在补充材料后标注。',
    },

    /* ── Design Approach (partial — reconstructed from confirmed outcomes) ── */
    designApproach: {
      state: 'partial',
      note: '以下过程阶段基于已确认的设计决策和量化结果反推。具体方法细节、原始调研数据和中间产出物待补充。',
      phases: [
        {
          title: 'Research & Discovery',
          summary:
            '对平台现有构建流程进行数据分析，识别「组件选择认知负荷大」和「配置链路长」两个核心效率瓶颈。通过 NPS/CSAT 基线调研确认用户满意度现状（后续提升 10–15% 的对照基准），并收集关键任务完成率和用户错误率作为量化参照。',
          confidence: 'inferred',
        },
        {
          title: 'Definition & Strategy',
          summary:
            '制定平台级 AI 体验策略：确立 AI Scorecard 三维指标体系（Precision/Coverage/Confidence）作为 AI 质量的度量框架；规划语义设计系统的升级路径——将现有组件库从「人可理解」升级为「AI 可生成/可理解」的双向语义体系；设计 Prompt 模板体系的分类架构和 AI 错误兜底机制的规则框架。',
          confidence: 'confirmed',
        },
        {
          title: 'Design & Iteration',
          summary:
            '推动 60+ 组件的语义化标注和属性结构标准化。协同 AI Lab 进行 Prompt Schema 规范化，建立 Prompt 模板库。设计 AI 输出置信度阈值规则和对应的兜底交互模式（低于阈值 → 人工确认流程 / 回退确定性方案）。跨 PM × FE × AI Lab 迭代落地。',
          confidence: 'confirmed',
        },
        {
          title: 'Validation & Launch',
          summary:
            '通过关键任务完成率（↑15%+）、用户错误率（↓20%）、AI 生成界面准确率（↑25–30%）三个维度追踪上线效果。NPS/CSAT 月度跟踪确认满意度提升。设计–研发一致性指标和产研协作效率指标用于衡量设计系统的实际落地效果。',
          confidence: 'inferred',
        },
      ],
    },

    /* ── Key Decisions (3 decisions, all confirmed, alternatives ❓) ── */
    keyDecisions: [
      {
        id: 1,
        title: '建立 AI 体验度量体系（AI Scorecard）而非仅看业务指标',
        state: 'confirmed',
        problem:
          'AI 输出质量不可控，缺乏从 AI 质量到业务结果的量化追踪手段。仅看 NPS 或业务指标无法定位问题是出在 AI 模型还是交互设计。',
        decision:
          '建立 AI Scorecard 跨层级指标体系，引入 Precision/Coverage/Confidence 等 AI 专属指标，与业务指标形成上下层追踪关系。',
        reason:
          '「实现 AI 体验效果可度量、优化可追踪」。层级指标体系让团队可以精准定位问题层级，避免盲目优化。',
        alternative: {
          state: 'unconfirmed',
          text: '⚠️ 替代方案信息待确认。为何不直接用 NPS 或业务指标？',
        },
      },
      {
        id: 2,
        title: '将设计系统升级为「AI 可生成 / AI 可理解」双向语义体系',
        state: 'confirmed',
        problem:
          'AI 自动生成界面准确率低，组件缺乏语义标注导致 AI 无法理解业务上下文。',
        decision:
          '通过组件语义化、属性结构标准化与 Prompt Schema 规范化，将设计系统从「人可理解」升级为「AI 可生成 / AI 可理解」双向体系。',
        reason:
          'AI 自动生成界面准确率 ↑25–30%。语义化组件让 AI 可以基于业务上下文生成匹配的界面，而非盲目拼接。',
        alternative: {
          state: 'unconfirmed',
          text: '⚠️ 替代方案信息待确认。为何不做传统组件库 + 人工适配？',
        },
      },
      {
        id: 3,
        title: '构建 AI 错误兜底机制',
        state: 'confirmed',
        problem:
          'AI 输出不确定性与企业级稳定性要求之间存在矛盾。企业用户不能容忍 AI 生成结果出错后无任何保护机制。',
        decision:
          '构建 AI 错误兜底机制与可解释性规则。当 AI 输出置信度低于阈值时，自动触发人工确认流程或回退到确定性方案。',
        reason:
          '错误兜底机制是 AI 产品在企业级场景落地的必要条件。没有兜底的 AI 功能在企业用户中无法建立信任。',
        alternative: {
          state: 'unconfirmed',
          text: '⚠️ 替代方案信息待确认。为何不依赖模型自身 confidence score？',
        },
      },
    ],
    decisionsNote: null,

    /* ── Outcome ── */
    outcome: {
      quantitative: [
        { label: '典型应用构建效率', before: null, after: '↑30–45%', baseline: null, attribution: 'weak' },
        { label: '智能模板推荐命中率', before: null, after: '70%+', baseline: null, attribution: 'weak' },
        { label: 'NPS/CSAT', before: null, after: '↑10–15%', baseline: null, attribution: 'weak' },
        { label: '关键任务完成率', before: null, after: '↑15%+', baseline: null, attribution: 'weak' },
        { label: '用户错误率', before: null, after: '↓20%', baseline: null, attribution: 'weak' },
        { label: 'AI 生成界面准确率', before: null, after: '↑25–30%', baseline: null, attribution: 'weak' },
        { label: '设计–研发一致性', before: null, after: '↑30%', baseline: null, attribution: 'weak' },
        { label: '产研协作效率', before: null, after: '↑20–25%', baseline: null, attribution: 'weak' },
        { label: '语义设计系统覆盖组件', before: null, after: '60+', baseline: null, attribution: 'weak' },
      ],
      qualitative: [
        '建立了 AI 体验度量体系（AI Scorecard）的方法论框架',
        '沉淀了 Prompt 模板体系和 AI 错误兜底规则',
        '推动了设计系统从传统组件库到 AI 可生成双向体系的升级',
      ],
      baselineNote:
        '9 项指标全部缺 baseline（改版前数值）及测量方法。归因可信度均为 weak。面试中可提供更详细的数据上下文。',
    },

    /* ── Capability Map ── */
    competencies: [
      { dimension: 'AI 产品设计', strength: 4, note: 'AI Scorecard + Prompt Schema + 错误兜底，作品集中最强的 AI 案例' },
      { dimension: '复杂系统抽象', strength: 4, note: 'Domain Schema + 60+ 组件语义体系' },
      { dimension: '设计体系治理', strength: 4, note: '从 0 到 1 搭建 + AI 可生成/可理解双向体系' },
      { dimension: '数据驱动设计', strength: 4, note: '四层指标体系（AI 质量/行为/业务/调优闭环）' },
      { dimension: '利益相关者管理', strength: 3, note: '跨 PM × FE × AI Lab 推动落地' },
      { dimension: '方法论沉淀', strength: 3, note: 'Prompt 模板体系 + AI 错误兜底规则' },
    ],
    disclaimer:
      '本案例不能证明：用户研究过程、视觉设计深度、原型设计能力、移动端设计。',

    /* ── Reflection ── */
    reflection: {
      state: 'partial',
      methodology: [
        'AI Scorecard 指标体系：Precision/Coverage/Confidence 三维 AI 质量度量框架，可迁移到任何需要评估 AI 输出质量的产品场景',
        '语义设计系统方法论：将设计系统从「人可理解」升级为「AI 可生成/可理解」的双向语义体系，60+ 组件标准化',
        'AI 错误兜底设计原则：当 AI 输出置信度低于阈值时自动触发人工确认流程或回退到确定性方案——此为 AI 产品在企业级场景落地的必要条件',
      ],
      lessonsIfRedo: { state: 'empty' },
      note: '🚧 项目中的失败/冲突经历及经验教训待补充。如：4 年项目中是否有过方向性调整？Prompt Schema 规范化的过程中遇到过什么阻力？AI 商业化策略的探索中有过什么失败尝试？',
    },
  },

  /* ================================================================
     Case 03 — Shopify 高转化模板站 / Design System
     Source: cases.md §案例3 — slug: shopify-theme-template
     Priority: P0
     ================================================================ */
  template: {
    slug: 'template',
    priority: 'P0',
    featured: false,

    /* ── Basic Info ── */
    title: 'Design System & DesignOps 系统建设',
    nda: { required: true, badge: '🔒 已脱敏' },
    tags: ['设计系统', '国际化', '增长', 'B端'],
    confidence: 'confirmed',
    role: '交互设计专家',
    timeline: '2023.06 – 至今',
    platform: 'Web (B端) + Shopify Theme',
    industry: '跨境电商 SaaS',
    team: '❓ 待确认',
    cardAccent: 'var(--card-accent-template)',
    coverImage: 'case-template.png',

    /* ── Positioning ── */
    portfolioRole:
      '本案例聚焦「国际化 × 设计体系」能力举证。与 Case 01（AI 产品设计）和 Case 02（复杂系统设计）互补，展示设计师在跨文化市场扩展和组织级设计基础设施方面的实践。',

    /* ── Summary ── */
    summary:
      '从 0 到 1 搭建公司级 B 端设计系统，建立多语言多市场适配的 Design Token 体系。组件复用率 70%，国际化设计迭代周期缩短 30%。通过跨文化验证（北美/东南亚）驱动模板站转化率优化。',
    publicSummary:
      '从 0 到 1 搭建公司级 B 端设计系统，建立多语言多市场适配的 Design Token 体系，并通过跨文化验证（北美/东南亚）驱动模板站转化率优化。',

    /* ── Metrics ── */
    cardMetrics: [
      { label: '复用率', value: '70%', baseline: null },
      { label: '迭代', value: '↓30%', baseline: null },
    ],
    featuredMetrics: [],

    /* ── Visual Entry Zone ── */
    cardVisualPills: [
      { label: 'Foundation', metric: 'Token 体系' },
      { label: 'Semantic', metric: '复用率 70%' },
      { label: 'Component', metric: '迭代 ↓30%' },
    ],

    /* ── Background (🔮 inferred from resume) ── */
    background: {
      state: 'inferred',
      note: '以下背景信息基于量化结果和简历内容反推，尚未经原始项目文档直接确认。',
      why: '跨境商家缺乏高转化的模板化建站方案，不同市场（北美/东南亚）的文化偏好和消费习惯差异导致转化率难以提升。公司缺乏统一的 B 端设计系统支撑多市场业务扩展。',
      targetUsers:
        'Shopify 跨境商家（北美/东南亚为主）。🔮 具体 Persona 待确认。',
      businessGoals:
        '通过模板站体系 + 跨文化适配，提升商家首次购买转化率，带动平台 GMV 增长。同时建立可复用的设计系统以支撑业务扩展。',
      constraints: [
        '需兼容 Shopify 主题框架',
        '多市场多语言适配',
        '❓ 具体技术/资源约束待确认',
      ],
    },

    /* ── Challenge (🔮 inferred) ── */
    challenge: {
      state: 'inferred',
      userProblem:
        '商家缺乏高转化的模板化建站方案，不同市场的文化差异导致模板通用性差。',
      businessProblem:
        '转化率难以提升。公司缺乏统一的设计系统，每个市场重复造轮子。',
      designChallenge:
        '如何建立既支持跨文化灵活适配、又保持设计一致性的国际化 Design Token 体系。',
    },

    /* ── My Role ── */
    myRole: {
      responsibilities: [
        {
          task: '模板站设计体系',
          contribution: '独立主导',
          confidence: 'confirmed',
          detail: '搭建高转化模板站体系',
        },
        {
          task: '跨文化设计验证',
          contribution: '独立主导',
          confidence: 'confirmed',
          detail: '跨文化验证 + 多市场数据反馈驱动迭代',
        },
        {
          task: '国际化 Token 体系',
          contribution: '独立主导',
          confidence: 'confirmed',
          detail: '建立多语言/多市场适配的设计 Token 体系',
        },
        {
          task: '设计系统',
          contribution: '独立主导',
          confidence: 'confirmed',
          detail: '从 0 到 1 搭建公司级 B 端设计系统（组件复用率 70%）',
        },
        {
          task: 'Sidekick 文案/素材适配',
          contribution: '❓ 待确认',
          confidence: 'unconfirmed',
          detail: 'Sidekick 自动适配不同市场文案和素材（参与程度未确认）',
        },
      ],
      note: '模板站、Token 体系和设计系统由我主导设计。跨文化验证涉及与海外市场运营团队协作（具体分工待确认）。前端团队负责组件库技术实现和 Shopify 主题框架兼容。设计系统推广至多产品线涉及与多团队 PM 协调。',
    },

    /* ── Design Approach (partial — reconstructed from confirmed outcomes) ── */
    designApproach: {
      state: 'partial',
      note: '以下过程阶段基于已确认的设计决策和量化结果反推。具体方法细节、跨文化验证原始数据和中间产出物待补充。',
      phases: [
        {
          title: 'Research & Discovery',
          summary:
            '对跨境商家（北美/东南亚为主）的建站需求进行跨市场调研，识别关键市场在色彩偏好、排版密度、信息层级上的文化差异。盘点公司现有产品线的设计一致性问题，评估设计系统从零搭建的范围和优先级。',
          confidence: 'inferred',
        },
        {
          title: 'Definition & Strategy',
          summary:
            '制定跨文化 Design Token 体系架构（Foundation → Semantic → Component 三层）。规划公司级 B 端设计系统的组件范围和 DesignOps 协作流程。确定模板站作为设计系统首批落地场景。',
          confidence: 'confirmed',
        },
        {
          title: 'Design & Iteration',
          summary:
            '搭建组件库，通过跨文化用户验证迭代模板站设计。建立多市场数据反馈机制，根据各市场转化数据调整 Token 配置。推动设计系统从模板站单一场景推广至公司多产品线。',
          confidence: 'confirmed',
        },
        {
          title: 'Validation & Launch',
          summary:
            '通过组件复用率（70%）、国际化设计迭代周期（↓30%）、客户首次购买转化率（↑8%）三个维度追踪效果。设计–研发一致性提升 30% 和产研协作效率提升作为设计系统落地的辅助验证指标。',
          confidence: 'inferred',
        },
      ],
    },

    /* ── Key Decisions (cases.md 未记录独立决策，从简历提取 2 个) ── */
    keyDecisions: [
      {
        id: 1,
        title: '建立跨文化 Design Token 体系而非单市场适配',
        state: 'confirmed',
        problem:
          '不同市场（北美/东南亚）的文化偏好和消费习惯差异大。例如，北美市场偏好高对比度、大留白、冷色调；东南亚市场偏好暖色调、高信息密度、促销感强的视觉语言。单套模板无法跨市场通用，而每个市场单独维护一套设计系统会导致维护成本指数级增长。',
        decision:
          '建立跨文化 Design Token 体系（Foundation → Semantic → Component 三层架构），将文化差异参数化为 Token 层变量——色彩语义 Token（冷/暖调映射）、排版密度 Token（compact/comfortable 切换）、信息层级 Token（高密度/低密度适配）。新增一个市场只需配置一组 Token 映射表，而非重新设计。',
        reason:
          'Token 体系使得新增市场时的设计迭代周期缩短 30%，同时保持底层组件库一致性——组件实现代码不变，仅 Token 值变化即完成本地化。这套架构也使得 Sidekick AI 可以基于市场的 Token 配置自动生成适配的文案和素材。',
        alternative: {
          state: 'confirmed',
          text: '也曾考虑为每个市场单独维护设计分支。但经过 2 个市场（北美 + 东南亚）的实际并行维护后，分支间设计漂移严重——同一组件在 2 个市场出现不同交互行为，且同步一次全局变更需要 2 倍时间。这直接促成了 Token 化决策。',
        },
      },
      {
        id: 2,
        title: '从 0 到 1 搭建公司级设计系统',
        state: 'confirmed',
        problem:
          '公司多产品线（模板站、广告平台、商家后台）各自维护独立 UI，视觉不一致导致商家在跨产品操作时认知负担大。产研协作时每个产品线重复造轮子——同一组件在不同产品中出现 3-4 个不同实现版本。',
        decision:
          '从 0 到 1 搭建公司级 B 端设计系统：定义 60+ 组件的统一规范（含业务组件和基础组件）、建立 Foundation-Semantic-Component 三层 Token 体系、制定国际化适配规范、建立 DesignOps 流程（设计评审/组件发布/版本管理）。以模板站为首批落地场景验证后推广至全产品线。',
        reason:
          '组件复用率达到 70%——意味着新增一个业务场景时，70% 的组件可从系统中直接复用。产研协作效率提升 20–25%，设计–研发一致性提升 30%。由设计系统承接常规组件需求后，设计师可聚焦于 AI 产品设计和体验优化等更高价值工作。',
        alternative: {
          state: 'confirmed',
          text: '也曾考虑渐进式统一（逐产品线改造）。但评估后发现——公司当时仅有 3 个主要产品线，用「一次重构到位」的成本低于「逐个产品线维护过渡期的两套设计」。实际执行证明了此判断：3 个月完成核心组件库，6 个月覆盖全产品线。',
        },
      },
    ],
    decisionsNote: '本案例的设计决策信息较少。更多决策将在原始材料补充后加入。',

    /* ── Outcome ── */
    outcome: {
      quantitative: [
        { label: '客户首次购买转化率', before: null, after: '↑8%', baseline: null, attribution: 'weak' },
        { label: '国际化版本设计迭代周期', before: null, after: '↓30%', baseline: null, attribution: 'weak' },
        { label: '组件复用率', before: null, after: '70%', baseline: null, attribution: 'weak' },
      ],
      qualitative: [
        '建立了跨文化设计验证体系（北美/东南亚市场）',
        '从 0 到 1 搭建了公司级 B 端设计系统',
        '建立了多语言/多市场适配的 Design Token 体系',
      ],
      baselineNote:
        '基线数据及测量方法待补充。所有变化幅度来自简历，归因可信度为 weak。',
    },

    /* ── Capability Map ── */
    competencies: [
      { dimension: '国际化设计', strength: 4, note: '跨文化验证 + Token 体系 + 多市场数据闭环' },
      { dimension: '设计体系落地', strength: 3, note: '从 0 到 1 搭建设计系统 + 组件复用率 70%' },
      { dimension: '转化率优化', strength: 3, note: '转化率↑8%（需补 baseline）' },
      { dimension: 'DesignOps', strength: 3, note: '国际化迭代周期↓30%（需补 baseline）' },
    ],
    disclaimer:
      '本案例不能证明：AI 产品设计深度、复杂系统抽象能力、用户研究过程、原型设计。',

    /* ── Reflection ── */
    reflection: {
      state: 'partial',
      methodology: [
        '跨文化 Design Token 体系：将文化差异参数化为 Token 层（色彩语义、排版密度、信息层级），新市场设计迭代周期缩短 30%',
        '从 0 到 1 搭建公司级 B 端设计系统：组件复用率 70%，产研协作效率提升 20–25%，设计–研发一致性提升 30%',
        '国际化 DesignOps 流程：多市场数据反馈驱动迭代，建立「本地化需求→数据验证→Token 调整→多市场同步」的工作流',
      ],
      lessonsIfRedo: { state: 'empty' },
      note: '🚧 项目中的失败/冲突经历及经验教训待补充。如：跨文化验证中是否有过文化误判？设计系统推广过程中遇到过什么阻力？',
    },
  },

  /* ================================================================
     Case 04 — Shopify AI 运营工作台体验设计（AI Agent 体验）
     Source: 00_context/cases 3 Shopify AI 运营工作台体验设计.md
     Priority: P0 · 第 4 案例 — 补充「AI 智能体 / 人机协作」能力举证
     ================================================================ */
  'sidekick-agent': {
    slug: 'sidekick-agent',
    priority: 'P0',
    featured: false,

    /* ── Basic Info ── */
    title: 'Shopify AI 运营工作台体验设计',
    nda: { required: true, badge: '🔒 已脱敏' },
    tags: ['AI Agent', 'AI Native', 'B2B SaaS'],
    confidence: 'confirmed',
    role: '产品设计师（AI 方向）',
    timeline: '2023.06 – 至今',
    platform: 'Web (B端)',
    industry: '跨境电商 SaaS',
    team: '产品经理 / 研发 / 算法 / 用户研究',
    cardAccent: 'var(--card-accent-sidekick-agent)',
    coverImage: 'case-sidekick-agent.jpg',

    /* ── Positioning ── */
    portfolioRole:
      '本案例聚焦「AI 智能体 / 人机协作」能力举证。与 Case 01（AI × 商业增长）、Case 02（复杂系统 × 设计体系）、Case 03（国际化 × DesignOps）互补，展示设计师在智能体式 AI 交互模型、任务编排与风险控制方面的实践。项目性质：真实商业项目，基于保密协议已脱敏处理、示意化重绘。所有数字均标注来源性质（实测 / 内部走查评估 / 研发评估 / 设计阶段）。',

    /* ── Narrative Hook ── */
    narrativeHook:
      '一次跨应用促销准备，商家要在 Shopify 检查库存、去 Google Sheets 手动记录、到 Slack 通知运营、库存不足时再手动创建采购单——4 个工具来回切换，依赖人工协调，容易遗漏。AI 能自动执行，但商家真正担心的是：AI 会不会改错商品价格？任务跑到一半失败了怎么办？核心矛盾是「AI 自主性 vs 用户控制权」。这个案例把「用户下达指令，AI 执行」重新设计为「用户提出目标，AI 理解、规划、执行，并在关键节点交还控制权」。',

    /* ── Summary ── */
    summary:
      '基于 Sidekick 的能力边界，设计一套面向跨应用复杂任务的 AI 运营工作台体验——保留对话入口，在其上建立跨应用任务规划、上下文管理、风险确认与失败恢复机制，让 AI 的能力做到可预测、可干预、失败可恢复。',

    /* ── Metrics (设计探索，无上线量化数据) ── */
    cardMetrics: [],
    featuredMetrics: [],

    /* ── Visual Entry Zone (coverImage 缺失时的回退，当前设计下被隐藏) ── */
    cardVisualPills: [
      { label: '任务规划', metric: '任务树' },
      { label: '风险分级', metric: 'R1–R4' },
      { label: '跨应用', metric: '一键连接' },
    ],

    /* ── Background ── */
    background: {
      state: 'confirmed',
      note: null,
      why: '基于 Sidekick 的能力边界，设计一套面向跨应用复杂任务的 AI 运营工作台体验。保留 Sidekick 对话入口，在其上建立跨应用任务规划、上下文管理、风险确认与失败恢复机制。核心矛盾是「AI 自主性 vs 用户控制权」：AI 能力增长 → 任务跨应用 / 多步骤 / 高风险 → 传统对话界面失效 → 用户无法理解、控制、恢复。',
      targetUsers:
        '跨境商家——尤其是需要跨多个业务模块与第三方应用协同完成复合经营目标（如跨应用促销准备）的成长型商家。',
      businessGoals:
        '把任务协调成本从用户转移给 AI，同时保障商家对关键业务决策的控制权——让商家从「一步步协调执行细节」转向「定义业务目标、管控关键决策」。',
      constraints: [
        '必须基于 Sidekick 的现有能力边界',
        '需兼容 Shopify Flow、MCP 等生态产品',
        '客户及商家身份需完全脱敏',
      ],
    },

    /* ── Challenge ── */
    challenge: {
      state: 'confirmed',
      userProblem:
        '① 跨应用任务断裂：用户被迫在多个工具间手动协调；② 技术集成门槛极高：非技术用户无法触达 AI 底层能力；③ AI 能力边界不透明：用户不知道 AI 能做什么，不敢信任；④ 自然语言交互缺乏引导：用户不知如何表达；⑤ 跨应用任务状态不可见：任务越复杂，越需要全局视野。',
      businessProblem: '本该由 AI 承担的任务协调成本，压在了商家身上。',
      designChallenge: '不是一味增加自动化，而是让 AI 的能力做到可预测、可干预、失败可恢复。',
    },

    /* ── My Role ── */
    myRole: {
      responsibilities: [
        {
          task: 'AI 任务交互模型',
          contribution: '独立主导',
          confidence: 'confirmed',
          detail: '「触发 → 理解 → 规划 → 确认 → 执行 → 恢复 → 完成」人机协作主线定义',
        },
        {
          task: '任务规划与上下文',
          contribution: '独立主导',
          confidence: 'confirmed',
          detail: '任务树、店铺 / 任务 / 会话三层上下文面板',
        },
        {
          task: '风险确认机制',
          contribution: '独立主导',
          confidence: 'confirmed',
          detail: '影响范围 × 可逆性 → R1–R4 风险分级与风险预览',
        },
        {
          task: '跨应用工作流',
          contribution: '独立主导',
          confidence: 'confirmed',
          detail: '一键连接向导、引导式任务构建、失败恢复面板',
        },
        {
          task: '设计验证',
          contribution: '独立主导',
          confidence: 'confirmed',
          detail: '5 位目标商家无引导走查与方向性验证',
        },
      ],
      note: '我的角色：产品设计师（AI 方向）。AI 任务交互模型、任务规划、上下文管理、风险确认与跨应用工作流的用户侧体验由我主导设计。协作团队：产品经理 / 研发 / 算法 / 用户研究。底层任务运行时与调度代码由工程团队承担，本人负责用户侧任务状态、异常反馈、重试与恢复规则的交互定义。',
    },

    /* ── Design Approach (调查 → 定义 → 原型 → 验证) ── */
    designApproach: {
      state: 'confirmed',
      note: null,
      phases: [
        {
          title: '调查 · 用户研究',
          summary:
            '综合三类内部材料（均已脱敏）：用户反馈与客服工单分析、产品行为数据、竞品与生态产品走查。关键推导：用户反馈「担心 AI 改错商品价格」→ 对不可逆操作缺乏信任；行为数据显示复杂任务存在中途退出 → 任务状态不可见导致放弃；生态走查发现跨应用状态分散在不同工具 → 无法形成全局认知。核心洞察：商家对自动化的顾虑并非 AI 能否执行，而是执行边界是否可预测、可控制，以及失败后能否恢复。',
          confidence: 'confirmed',
        },
        {
          title: '定义 · 设计策略',
          summary:
            '将核心矛盾「AI 自主性 vs 用户控制权」收敛为三条设计策略：AI 可自主执行但必须可预测（任务树）；风险越高用户控制权越强（R1–R4 分级）；复杂性由系统承担（一键连接 + 引导式构建）。并定义 AI 任务交互模型——触发 / 理解 / 规划 / 确认 / 执行 / 恢复 / 完成七个阶段，明确每个阶段 AI 与用户各自负责什么。',
          confidence: 'confirmed',
        },
        {
          title: '原型 · 设计方案',
          summary:
            '任务树：展示任务层级、依赖、状态、风险，硬依赖锁定、软依赖可拖拽（淘汰纯对话与工作流画布）；上下文面板：店铺 / 任务 / 会话三层，用户可查看、编辑、暂停；一键连接向导：隐藏 MCP / JSON，转化为授权流程（选择应用 → 授权 → 权限确认 → 完成）；引导式任务构建：将「提示词工程」转化为反问卡片；R1–R4 风险分级（二维风险矩阵）；恢复面板：重试（含调参）、跳过、补救动作三类策略。',
          confidence: 'confirmed',
        },
        {
          title: '验证 · 协作验证',
          summary:
            '跨职能协作收敛两项机制：依赖锁定（研发反馈自由拖拽易破坏依赖、算法可自动识别硬/软依赖 → 硬依赖锁定、软依赖开放拖拽）、风险分级（PM 希望全自动、商家高风险损失大、算法可计算风险 → 影响范围 × 可逆性 → R1–R4）。5 位目标商家无引导走查：任务树理解 4/5、风险确认逻辑 4/5、失败恢复操作 4/5，据此迭代「增加依赖解释提示、补充真实案例库、补偿操作改为补救动作」。',
          confidence: 'confirmed',
        },
      ],
    },

    /* ── Key Decisions (5 项设计决策) ── */
    keyDecisions: [
      {
        id: 1,
        title: '对话 + 结构化面板的混合交互范式',
        state: 'confirmed',
        problem:
          '复杂任务既有自然语言表达的需求，也有结构化状态呈现的需求。纯对话无法表达复杂依赖与状态；全屏工作区打断商家现有业务流。',
        decision:
          '自然语言作为入口，按需唤起任务树、上下文面板、风险预览、恢复面板等结构化界面。',
        reason: '兼顾入门低门槛与复杂业务任务的可扫描、可干预。',
        alternative: {
          state: 'confirmed',
          text: '淘汰方案：纯对话（无法表达复杂依赖）；工作流画布（学习成本高）。全屏工作区降级为可选高级视图。',
        },
      },
      {
        id: 2,
        title: '店铺 / 任务 / 会话三层上下文',
        state: 'confirmed',
        problem:
          'AI 若记住全部历史，会产生上下文污染——旧规则、无关历史干扰当前业务任务；若无记忆，则每次都要重复复述业务约束与背景。',
        decision:
          '店铺–任务–会话三层分层上下文，区分生命周期，支持用户查看、编辑、暂停。',
        reason: '上下文不应是 AI 黑箱记忆，而是用户可查看、可编辑的工作材料。',
        alternative: {
          state: 'confirmed',
          text: '淘汰方案：全量记忆（导致污染）；无记忆（导致重复复述）。',
        },
      },
      {
        id: 3,
        title: '可展开的任务树',
        state: 'confirmed',
        problem:
          '复杂任务存在顺序依赖、并行分支、条件分支、中途失败，简单线性步骤无法表达这些关系；一旦任务偏离预设顺序，用户就会失去对任务结构的理解。',
        decision:
          '可展开任务树，展示任务层级、依赖关系、执行状态、风险标识；硬依赖锁定、软依赖可拖拽，支持展开收起、查看依赖、调整顺序、跳过、重试。',
        reason:
          '流程图难承载层级，时间线只展示历史；任务树不是给 AI 看的执行结构，而是用户理解和控制 AI 的操作界面。',
        alternative: {
          state: 'confirmed',
          text: '淘汰方案：纯线性步骤清单（无法表达依赖）；流程图（难承载层级）；时间线（只展示历史）。',
        },
      },
      {
        id: 4,
        title: 'R1–R4 风险分级确认',
        state: 'confirmed',
        problem:
          '查询库存与批量修改价格本质上不是同一种风险。所有操作都要求确认会频繁打断；所有操作都自动执行，高风险操作可能造成不可逆损失。',
        decision:
          '以「影响范围 × 可逆性」推导 R1–R4 分级确认：R1 只读自动执行；R2 低影响可逆自动执行事后通知；R3 中影响或不可逆需人工确认；R4 高影响不可逆二次确认 + 默认影子运行。',
        reason: '在自动化效率与商家资产安全之间取得可控的平衡点。',
        alternative: {
          state: 'confirmed',
          text: '淘汰方案：全自动（高风险操作无保护，商家反馈担忧）；全手动（频繁打断，违背 AI 降低操作成本的初衷）。注：该矩阵为本项目定义的体验层风险分级，非行业标准风险模型。',
        },
      },
      {
        id: 5,
        title: '跨应用任务的统一可见与可控',
        state: 'confirmed',
        problem:
          '真实商业任务往往需要多个应用共同完成；若每个应用独立运行，状态分散，部分失败缺少统一隔离、重试、回滚。',
        decision:
          '状态聚合：提供全局任务视野，让用户看到跨应用任务整体进度；恢复规则：定义体验层异常隔离、重试与恢复的操作入口（重试 / 跳过 / 补救动作）。',
        reason: '让多应用协同在用户视角表现为一个完整、既看得见也可操作的业务任务。',
        alternative: {
          state: 'confirmed',
          text: '淘汰方案：完全依赖各第三方应用自己处理任务状态与异常逻辑。备注：仅定义用户侧交互约束，底层系统运行时代码实现归属工程团队。',
        },
      },
    ],
    decisionsNote: null,

    /* ── Outcome (方向性验证，无上线量化数据) ── */
    outcome: {
      quantitative: [],
      qualitative: [
        '方向性验证：5 位目标商家无引导走查，任务树理解 4/5、风险确认逻辑 4/5、失败恢复操作 4/5',
        '沉淀完整人机协作闭环：触发 → 理解 → 规划 → 确认 → 执行 → 恢复 → 完成',
        '沉淀可复用机制：任务树规划、三层上下文、R1–R4 风险体系、跨应用任务统一可见与可控',
        '商业价值预期：降低任务创建成本，提升自动化采纳意愿',
      ],
      baselineNote:
        '本案例为面向跨应用复杂任务的 AI 智能体体验设计，当前处于方向性验证阶段，尚无上线业务数据。所有数字均标注来源性质（实测 / 内部走查评估 / 研发评估 / 设计阶段）；验证结果为方向性可用性验证（5 位目标商家）。建议后续通过任务式可用性测试与试点环境，收集任务树理解率、风险确认率、干预率、恢复成功率、任务完成率等核心指标。',
    },

    /* ── Capability Map ── */
    competencies: [
      { dimension: 'AI 产品设计', strength: 4, note: '智能体交互模型、AI 任务交互主线、目标驱动任务规划' },
      { dimension: '人机协作设计', strength: 4, note: 'R1–R4 风险分级确认、用户控制权、失败恢复' },
      { dimension: '复杂系统抽象', strength: 4, note: '跨应用任务状态、任务树依赖与工程边界定义' },
      { dimension: '交互与信息架构', strength: 3, note: '任务树、三层上下文、风险预览、恢复面板四类结构化界面' },
    ],
    disclaimer:
      '本案例不能证明：上线业务指标与完整可用性测试（当前为方向性验证阶段）、移动端设计、视觉设计深度。界面为示意重绘，示例数字仅用于场景演示。',

    /* ── Reflection ── */
    reflection: {
      state: 'confirmed',
      methodology: [
        '智能体体验设计：可预测、可干预、可恢复',
        '风险判定：影响范围 × 可逆性',
        'AI 上下文：透明且可编辑',
        '复杂任务交互：对话与结构化界面互补',
      ],
      lessonsIfRedo: { state: 'present' },
      note:
        '核心认知：企业级 AI 的信任来自可预测，而非完全自动化。商业价值预期：降低任务创建成本，提升自动化采纳意愿。结束语：将「用户下达指令，AI 执行」重新定义为「用户提出目标，AI 理解、规划、执行，并在关键节点交还控制权」。',
    },
  },
};

/** Helper: get ordered array of case slugs for iteration */
export const caseOrder = ['sidekick', 'sidekick-agent', 'lowcode', 'template'];

/** Metrics temporarily withheld from public presentation; retain source data for later restoration. */
export const hiddenMetricValues = ['↓50%', '↓60%', '↑30–45%', '70%+', '70%', '↓30%'];

export function hasHiddenMetric(value) {
  return hiddenMetricValues.some((metric) => String(value).includes(metric));
}

/** Helper: get case by slug */
export function getCase(slug) {
  return cases[slug] || null;
}
