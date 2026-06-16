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
     Case 01 — Shopify AI / Sidekick
     Source: cases.md §案例2 — slug: shopify-sidekick-ai
     Priority: P0 · Featured case on Home
     ================================================================ */
  sidekick: {
    slug: 'sidekick',
    priority: 'P0',
    featured: true,

    /* ── Basic Info ── */
    title: 'Sidekick AI 驱动广告素材自动化',
    nda: { required: true, badge: '🔒 已脱敏' },
    tags: ['AI 产品设计', 'B端', '增长', '跨境电商'],
    confidence: 'confirmed',
    role: '交互设计专家',
    timeline: '2023.06 – 至今',
    platform: 'Web (B端)',
    industry: '跨境电商 SaaS',
    team: 'PM × 前端 × AI Lab',
    cardAccent: 'var(--card-accent-sidekick)',
    coverImage: 'case-sidekick.jpeg',

    /* ── Narrative Hook (displayed on case detail header, not card) ── */
    narrativeHook:
      '一个跨境商家的广告投放流程需要 4 小时手动操作——从选品、生成素材、配置投放到上线。Sidekick AI 能将这个过程大幅缩短。但核心问题不是「AI 能生成多快」，而是「商家凭什么信任 AI 生成的素材能带来订单？」这个案例讲述了我如何将 Sidekick 的三类 AI 能力抽象为可复用的产品模型，同时在这套模型中嵌入信任机制——让商家不仅用 AI，更依赖 AI。',

    /* ── Summary ── */
    summary:
      '商家广告投放流程耗时 4 小时以上，且 AI 生成的素材能否驱动订单仍是未知数。本文将 Sidekick AI 的三类能力（内容生成/策略建议/自动化执行）抽象为可复用的产品模型，同时从 AI 质量和业务结果两个层面建立度量闭环——效率 ↑25%，生产周期 ↓4h，客户首次购买转化率 ↑8%。',

    /* ── Metrics (Home card hooks) ── */
    cardMetrics: [
      { label: '效率', value: '↑25%', baseline: null },
      { label: '周期', value: '↓4h', baseline: null },
    ],
    featuredMetrics: [
      { label: '效率', value: '↑25%', baseline: null },
      { label: '周期', value: '↓4h', baseline: null },
      { label: '转化率', value: '↑8%', baseline: null },
    ],

    /* ── Visual Entry Zone (capability pills on cards) ── */
    cardVisualPills: [
      { label: '内容生成', metric: '↑25%' },
      { label: '策略建议', metric: 'ROI' },
      { label: '自动化执行', metric: '↓4h' },
    ],

    /* ── Background (🔮 inferred from resume) ── */
    background: {
      state: 'inferred',
      note: '以下背景信息基于量化结果和简历内容反推，尚未经原始项目文档直接确认。',
      why: '跨境商家的典型广告投放场景：一个商家需要为同一款产品生成适应北美和东南亚两个市场的广告素材，每个市场需要多组创意用于 A/B 测试。从拍摄产品、撰写文案、设计素材到配置投放参数，一次完整流程平均耗时 4 小时以上。对于日均上架 5-10 款新品的活跃商家，这意味着每天有 20-40 小时被纯操作工作消耗——尚未计算投放后的效果监控和策略调整。AI 可以生成素材——但商家反复修改 AI 输出、不信任 AI 建议、最终手动推翻重做，AI 的存在并未真正释放效率。',
      targetUsers:
        'Shopify 跨境商家、广告投放运营人员。🔮 具体 Persona 待确认。',
      businessGoals:
        '通过 AI 自动化降低素材生产的人力成本与时间成本，提升广告投放的整体 ROI。',
      constraints: [
        '必须集成 Shopify Sidekick 的现有能力边界',
        '多语言市场（至少中 + 英）',
        '❓ 技术/时间/资源约束待确认',
      ],
    },

    /* ── Challenge (🔮 inferred) ── */
    challenge: {
      state: 'inferred',
      userProblem:
        '广告素材制作重复劳动多，从创意到上线周期长，商家投放启动慢。',
      businessProblem:
        '人力成本高，AI 能力未被有效利用于广告投放全流程。',
      designChallenge:
        'Sidekick AI 有能力生成素材、给出策略建议、甚至自动化执行操作——但商家面对 AI 输出的第一反应是「改一改再用」，第二反应是「算了还是我自己来」。核心设计挑战不是「AI 能不能做」，而是双重信任问题：① 商家如何相信 AI 生成的素材质量不会损害自己的广告表现？② 团队（PM、AI Lab、前端）如何相信这套 AI 能力模型可以规模化而非一次性集成？第一个问题关乎「商家愿不愿意用」，第二个关乎「组织愿不愿意持续投入」。',
    },

    /* ── My Role ── */
    myRole: {
      responsibilities: [
        {
          task: 'AI 能力模型抽象',
          contribution: '独立主导',
          confidence: 'confirmed',
          detail:
            '将 Sidekick 三类 AI 能力（内容生成/策略建议/自动化执行）抽象为可复用模型',
        },
        {
          task: 'AI 嵌入策略',
          contribution: '独立主导',
          confidence: 'confirmed',
          detail:
            '将 AI 系统性嵌入广告创建、商品优化、工作流自动化等关键路径',
        },
        {
          task: 'AI 体验评估体系',
          contribution: '独立主导',
          confidence: 'confirmed',
          detail:
            '构建跨层级指标体系（AI 质量层/体验行为层/业务结果层）',
        },
        {
          task: '持续调优闭环',
          contribution: '独立主导',
          confidence: 'confirmed',
          detail:
            '建立「问题发现→数据诊断→AI 能力微调→增量上线」持续交付机制',
        },
        {
          task: '广告素材自动化流程',
          contribution: '独立主导',
          confidence: 'confirmed',
          detail: '重构「素材生成→投放配置」链路',
        },
      ],
      note: 'AI 能力模型、评估体系和自动化流程由我主导设计。PM 提供了业务优先级和商家需求输入，AI Lab 验证了 Sidekick 的技术能力边界并参与了 Prompt 调优。前端团队负责实现。团队协作说明将在补充更多过程材料后细化。',
    },

    /* ── Design Approach (partial — reconstructed from confirmed outcomes) ── */
    designApproach: {
      state: 'partial',
      note: '以下过程阶段基于已确认的设计决策和量化结果反推。具体方法细节、原始调研数据和中间产出物待补充。',
      phases: [
        {
          title: 'Research & Discovery',
          summary:
            '对跨境商家广告素材制作全流程进行效率分析，识别「素材生产周期长」和「投放配置重复劳动多」两个核心瓶颈。通过商家访谈和数据埋点分析，量化创意准备效率现状和广告投放 ROI 基线。',
          confidence: 'inferred',
        },
        {
          title: 'Definition & Strategy',
          summary:
            '将 Sidekick AI 的三类能力（内容生成/策略建议/自动化执行）抽象为可复用的产品能力模型。制定 AI 嵌入策略——确定广告创建、商品优化、工作流自动化等关键路径的 AI 注入点。设计四层 AI 体验评估体系框架（AI 质量层/体验行为层/业务结果层/调优闭环）。',
          confidence: 'confirmed',
        },
        {
          title: 'Design & Iteration',
          summary:
            '重构「素材生成→投放配置」链路，将 AI 能力系统性嵌入关键节点。建立「问题发现→数据诊断→AI 能力微调→增量上线」的持续调优闭环机制。跨 PM × FE × AI Lab 迭代优化 AI 交互模式。',
          confidence: 'confirmed',
        },
        {
          title: 'Validation & Launch',
          summary:
            '通过创意准备效率（↑25%，AI 贡献其中约 60%）、单次素材生产周期（↓4h）、客户首次购买转化率（↑8%）三个维度追踪上线效果。四层评估体系持续监控 Sidekick 的真实业务贡献。',
          confidence: 'inferred',
        },
      ],
    },

    /* ── Key Decisions ── */
    keyDecisions: [
      {
        id: 1,
        title: '将 Sidekick AI 三类能力抽象为可复用模型',
        state: 'confirmed',
        problem:
          '商家手动制作广告素材平均耗时 4 小时以上。AI 能生成内容，但逐功能点嵌入的方式导致——今天在「广告创建」页面加一个「AI 生成文案」按钮，明天在「商品优化」页面加一个「AI 推荐关键词」按钮，下周在「投放配置」加一个「AI 建议出价」。三个月后，产品里散布着 7 个 AI 按钮，但①商家认知中不存在一个统一的「AI 能帮我做什么」心智模型，②每次新增场景都需要从零设计 AI 交互模式，③维护 7 套独立 AI 功能的成本指数级上升——AI Lab 开始质疑「我们到底在做一个产品还是 7 个功能？」',
        decision:
          '将 Sidekick AI 的三类能力（内容生成/策略建议/自动化执行）抽象为一个统一的能力模型——不是设计 7 个 AI 按钮，而是定义 3 种能力类型，让任何业务场景都可以在这 3 种能力中找到适配入口。内容生成解决「产出素材」，策略建议解决「怎么做更好」，自动化执行解决「帮我把这个过程跑完」。',
        reason:
          '能力模型让所有 AI 功能共享同一套交互模式——商家学会在一处使用 AI 后，可以在任何其他场景复用同一心智模型。新增业务场景只需声明「此场景需要哪种能力类型」，而非从零设计交互。AI Lab 从维护 7 套独立功能代码降为维护 1 套能力调度系统——他们从「你又在加一个 AI 功能」变成了「这个场景需要哪个能力类型？直接调」。这是项目从「功能堆叠」升级为「平台化」的时刻。',
        alternative: {
          state: 'unconfirmed',
          text: '⚠️ 替代方案信息待确认。曾考虑的其他方案及放弃原因将在原始材料到位后补充。',
        },
      },
      {
        id: 2,
        title: '建立四层 AI 体验评估体系',
        state: 'confirmed',
        problem:
          '能力模型建立后，下一个问题立刻浮现：怎么证明这套模型真正在驱动业务结果，而不只是在产品里「看起来有 AI」？每次 AI 生成素材后，商家改动了多少？改了之后效果变好还是变差？如果 AI 建议了一个投放策略但商家没采纳——是因为建议不好，还是因为商家不信任？没有从 AI 质量到业务结果的量化追踪，AI 团队（AI Lab）和商业团队（PM、运营）之间的对话永远是：「AI 很强」vs「我没看到订单增长」。',
        decision:
          '建立四层 AI 体验评估体系：AI 质量层（一致率、幻觉率——监控 AI 自身输出质量）、体验行为层（采纳率、修改率、修改幅度——监控商家如何与 AI 输出交互）、业务结果层（转化率、ROI、效率提升——连接 AI 使用与商业指标）、调优闭环层（异常检测→根因定位→微调→增量验证——让每一层的问题能被追溯到上一层并修复）。',
        reason:
          '层级指标体系解决了「吵架」问题。当 AI Lab 说「模型指标很好」，但 PM 说「转化率没涨」，四层体系可以让团队逐层排查——是模型输出质量真的不好（AI 质量层），还是输出质量没问题但商家不采纳（体验行为层），还是商家采纳了但素材本身对目标市场无效（业务结果层）？每一层有独立指标，每一层的问题有独立的优化手段，不需要「盲调」。AI Lab 投入模型优化之后，能看到体验行为层的采纳率确实在上升——这是第一次，团队可以基于数据对话，而不是基于印象争论。',
        alternative: {
          state: 'unconfirmed',
          text: '⚠️ 替代方案信息待确认。',
        },
      },
    ],
    decisionsNote: '当前可展示 2 个关键设计决策。第 3 个决策将在设计过程材料补充后加入。',

    /* ── Outcome ── */
    outcome: {
      quantitative: [
        {
          label: '创意准备效率',
          before: null,
          after: '↑25%',
          delta: null,
          baseline: null,
          measurement: null,
          attribution: 'weak',
          note: 'AI 自动生成贡献其中约 60% 增幅',
        },
        {
          label: '单次素材生产周期',
          before: null,
          after: '↓4h',
          delta: null,
          baseline: null,
          measurement: null,
          attribution: 'weak',
        },
      ],
      qualitative: [
        '建立了可复用的 AI 能力模型（内容生成/策略建议/自动化执行）',
        '推动了产品从传统流程型操作升级为智能驱动型增长路径',
      ],
      baselineNote:
        '基线（改版前数值）及测量方法待补充。所有变化幅度来自简历，归因可信度为 weak。面试中可提供更详细的数据上下文。',
    },

    /* ── Capability Map ── */
    competencies: [
      { dimension: 'AI 产品设计', strength: 4, note: 'AI 能力模型设计 + 四层评估体系 + 持续调优闭环' },
      { dimension: '复杂系统抽象', strength: 3, note: '三类 AI 能力模型 + 关键路径嵌入策略' },
      { dimension: '数据驱动设计', strength: 3, note: '跨层级指标监控（AI 质量/行为/业务）' },
      { dimension: '业务增长导向', strength: 3, note: 'AI → 效率 → ROI 闭环' },
    ],
    disclaimer:
      '本案例不能证明：用户研究过程、视觉设计深度、原型设计能力、移动端设计。',

    /* ── Reflection ── */
    reflection: {
      state: 'partial',
      methodology: [
        'AI 能力抽象模型：将三类 AI 能力（内容生成/策略建议/自动化执行）抽象为可复用的产品能力模型，可迁移到任何需要集成 AI 的 B 端产品',
        '四层 AI 体验评估体系：AI 质量层 → 体验行为层 → 业务结果层 → 调优闭环，层级指标体系让团队可精准定位问题所在层级',
        '持续调优闭环：「问题发现→数据诊断→AI 能力微调→增量上线」的持续交付机制',
      ],
      lessonsIfRedo: { state: 'empty' },
      note: '🚧 项目中的失败/冲突经历及经验教训待补充。如：是否有过设计方向错误？是否有过与 PM/工程师的重大分歧及解决过程？',
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
};

/** Helper: get ordered array of case slugs for iteration */
export const caseOrder = ['sidekick', 'lowcode', 'template'];

/** Helper: get case by slug */
export function getCase(slug) {
  return cases[slug] || null;
}
