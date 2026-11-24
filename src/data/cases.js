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
    nda: null,
    portfolioRole: '商业项目 · 已上线 · 已脱敏',
    tags: ['AI 产品设计', 'Enterprise SaaS', '跨境电商', '复杂系统'],
    confidence: 'confirmed',
    role: 'UX / 产品设计师',
    timeline: '已上线',
    platform: 'Web · 商家端 SaaS',
    industry: 'Enterprise SaaS · 跨境电商 · AI 产品',
    team: '跨职能团队协作',
    cardAccent: 'var(--card-accent-sidekick)',
    coverImage: 'optimized/case-sidekick.jpg',

    narrativeHook:
      '现有 Shopify Theme、Theme Editor 与 Sidekick 已经覆盖大量基础编辑与执行任务，但商家在实际建站过程中仍需要持续判断：应该选择什么、页面应该如何组织，以及 AI 的修改是否值得执行。',
    summary:
      '通过完整产品走查与关键任务拆解，并结合 40 名目标商家定性研究、50 次 AI 稳定性测试和竞品对标，本项目在既有 Theme 与 Sidekick 能力基础上设计并上线 AI 决策辅助方案。',
    publicSummary:
      '通过完整产品走查与关键任务拆解，并结合 40 名目标商家定性研究、50 次 AI 稳定性测试和竞品对标，本项目在既有 Theme 与 Sidekick 能力基础上设计并上线 AI 决策辅助方案。',

    cardMetrics: [
      { label: '主题选择耗时', value: '↓ 50%', baseline: '真实任务记录' },
      { label: '页面规划耗时', value: '↓ 60%', baseline: '真实任务记录' },
      { label: '意图到配置关键节点', value: '↓ 约 44%', baseline: '真实任务记录' },
    ],
    featuredMetrics: [
      { label: '主题选择耗时', value: '↓ 50%', baseline: '真实任务记录' },
      { label: '页面规划耗时', value: '↓ 60%', baseline: '真实任务记录' },
      { label: '意图到配置关键节点', value: '↓ 约 44%', baseline: '真实任务记录' },
    ],
    cardVisualPills: [
      { label: '主题选择', metric: '↓50%' },
      { label: '页面规划', metric: '↓60%' },
      { label: '决策节点', metric: '↓约 44%' },
    ],

    background: {
      state: 'confirmed',
      note: null,
      why: 'Shopify 已经建立较完整的主题发现与模块化编辑能力，也提供 AI 辅助、跨端预览以及保存与撤销。\n\n一次完整的建站或店铺优化，通常会经历：\n\n主题选择 → 页面规划 → 内容组织 → 商品展示 → 页面编辑 → 跨端检查 → 上线\n\n在这条链路中，基础操作已经有成熟工具承接，但商家仍然要判断主题是否适合当前业务，同时决定页面如何组织，以及一次 AI 修改是否合理。\n\n项目因此不再围绕编辑入口做增量优化，将范围收敛到：\n\n降低商家从经营目标到正确页面配置之间的决策成本。',
      targetUsers: '具有商品和基础品牌资产，正在进行主题选择、首页搭建或现有商店优化的 Shopify 商家。',
      businessGoals: '降低商家从经营目标到页面配置之间的理解、判断和执行成本，提高主题选择与页面规划效率，并在复杂 AI 修改中保持必要的可解释性与控制感。',
      constraints: [
        '保留现有 Theme Store 与 Theme Editor 的主体结构',
        '复用 Sidekick、AI 生成、预览、保存与撤销等现有能力',
        '聚焦主题选择、页面规划与 AI 修改控制',
        '不扩展至订单、支付、结账和营销后台等其他 Shopify Admin 模块',
      ],
    },

    challenge: {
      state: 'confirmed',
      userProblem: '先盘点现有能力，再决定改什么\n\n项目初期并没有直接进入界面改版。首先完整走查 Theme Store、主题管理与 Theme Editor，继续检查 Sections / Blocks 和 Sidekick，再覆盖从 AI 生成、跨端预览到保存 / 撤销和上线的完整链路，判断现有能力已经解决什么，以及用户仍需要在哪些环节自行完成判断。\n\n产品走查显示：编辑与执行能力已经较成熟，继续增加入口或重构编辑结构，并不能直接降低建站过程中的决策成本。\n\n40 名目标商家定性研究\n\n围绕主题选择、页面规划与复杂 AI 修改，对 40 名目标商家开展半结构化访谈与关键任务回溯，观察商家在关键建站决策中的判断过程。\n\n主题适配判断：商家可以浏览大量候选主题，但仍需要自行理解主题能力、商品结构、品牌表达与经营目标之间是否匹配。\n\n页面规划：从经营目标到页面结构之间仍存在页面目标、内容结构、Section 组合、信息顺序、商品表达与具体配置等多层判断。\n\n复杂 AI 修改控制：一次 AI 修改跨越多个页面区域，商家关注修改了哪些区域、为什么修改、哪些内容会受到影响、是否可以只接受其中一部分，以及结果不合适时如何恢复。\n\n50 次 AI 稳定性测试\n\n为判断现有 AI 能力适合承担哪一层任务，将测试拆分为 5 类任务，覆盖明确参数与内容修改、抽象经营意图理解、页面级跨区域修改、跨分区页面规划和高影响修改。\n\n明确、局部的修改更适合快速执行；抽象经营意图可以被理解，但仍需要结合商品、页面与商店状态等上下文；页面级修改与页面规划已经具备可用能力，但复杂任务中的覆盖范围与方案完整性存在波动；影响范围越大，越需要在执行前增加计划、解释、预览与确认。',
      businessProblem: '经营目标 → 页面目标 → 信息与商品结构 → 页面规划 → Section 选择 → 内容组织 → 具体配置\n\n这段路径描述了商家为了把经营目标转化为可执行页面方案，需要自行完成的多层专业判断。项目将这段路径定义为「意图到配置距离」，衡量经营意图转化为具体配置过程中需要跨越的决策层级。',
      designChallenge: '缩短经营意图到正确配置之间的距离，将原本分散在用户侧的判断过程转化为产品可协助完成的决策过程，并根据任务风险匹配不同的控制强度。',
    },

    myRole: {
      responsibilities: [
        {
          task: '问题定义',
          contribution: 'Owner',
          confidence: 'confirmed',
          detail: '梳理现有产品能力与商家任务，识别主题适配、页面规划和复杂 AI 修改三类关键决策问题。',
        },
        {
          task: '研究与验证',
          contribution: 'Owner',
          confidence: 'confirmed',
          detail: '结合 40 名目标商家定性研究与 50 次 AI 稳定性测试，整理观察结果并转化为设计依据。',
        },
        {
          task: '交互方案',
          contribution: 'Owner',
          confidence: 'confirmed',
          detail: '设计主题推荐、六分区页面规划、AI 修改风险分级与修改集交互。',
        },
        {
          task: '落地协作',
          contribution: 'Collaborated',
          confidence: 'confirmed',
          detail: '推进交互原型、设计评审、开发沟通与体验验证。',
        },
      ],
      note: '围绕问题定义、研究验证、交互方案与落地协作，将研究发现转化为可评审、可验证的设计方案。',
    },

    designApproach: {
      state: 'confirmed',
      note: '从产品证据与用户研究出发修正方向，再以业务目标、用户决策和可控执行组织方案。',
      phases: [
        {
          title: '产品能力审计 · 先确认问题',
          summary: '项目初期并没有直接进入界面改版。先把 Theme Store、主题管理、Theme Editor、Sections、Blocks、Sidekick、AI 生成、跨端预览、保存、撤销和上线串成完整链路，检查哪些问题已经被现有产品解决，哪些仍然需要用户自己判断。\n\n产品走查带来的第一个结论很明确：编辑能力已经比较完整，继续增加入口或重做编辑结构，并不会直接降低商家的建站决策成本。',
          confidence: 'confirmed',
        },
        {
          title: '研究 · 40 名目标商家定性研究',
          summary: '围绕主题选择、页面规划和复杂 AI 修改，对 40 名目标商家开展半结构化访谈与关键任务回溯。研究过程中反复出现三类问题：主题能力 × 商品结构 × 品牌表达 × 经营目标之间的适配判断；从经营目标到页面结构的规划判断；跨多个页面区域的 AI 修改需要解释、影响范围和恢复控制。',
          confidence: 'confirmed',
        },
        {
          title: '测试 · 50 次 AI 稳定性测试',
          summary: '将测试拆成 5 类任务，覆盖明确参数与内容修改、抽象经营意图理解、页面级跨区域修改、跨分区页面规划和高影响修改。明确局部修改更适合快速执行；复杂任务需要计划、解释、预览与确认。',
          confidence: 'confirmed',
        },
        {
          title: '定义与策略 · 意图到配置距离',
          summary: '综合产品走查、用户研究与 AI 测试后，问题收敛为商家从经营目标到具体配置需要跨越的多层专业判断，即「意图到配置距离」。综合任务复杂度、现有能力缺口与影响范围，确定 P0 页面规划、P1 主题选择和 P1 复杂 AI 修改控制。',
          confidence: 'confirmed',
        },
      ],
    },

    keyDecisions: [
      {
        id: 1,
        title: '从结果推荐升级为可解释的主题适配推荐',
        state: 'confirmed',
        problem: '传统主题浏览可以帮助用户找到候选项，却很难回答候选主题与自身业务到底有什么关系。商家仍然需要自己比较商品数量与结构、内容承载方式、品牌视觉倾向、首页展示重点和当前经营目标。',
        decision: '主题推荐展示结果、匹配原因、关键能力和适用场景。',
        reason: '用户能快速理解它为什么适合当前商品和经营目标。',
        alternative: {
          state: 'confirmed',
          text: '只减少候选主题数量，而不解释推荐依据。',
        },
      },
      {
        id: 2,
        title: '页面规划先于页面配置',
        state: 'confirmed',
        problem: '传统页面搭建把规划过程拆散在很多局部操作里，商家需要一边添加 Section，一边决定页面内容、商品出现时机、信任信息、品牌内容位置和转化入口。',
        decision: '在真正修改页面之前，根据经营目标先生成完整 Page Plan，例如 Hero、Value Proposition、Featured Products、Social Proof、Brand Story、Conversion CTA；每个 Section 同时说明页面任务和推荐原因。',
        reason: '把边配置边思考改成先判断整体方案，再执行配置。用户先看懂全局，再处理细节。',
        alternative: {
          state: 'confirmed',
          text: '继续让商家在编辑器中逐个添加和排序 Section。',
        },
      },
      {
        id: 3,
        title: '基于风险分级匹配 AI 控制强度',
        state: 'confirmed',
        problem: '所有 AI 修改都要求确认，会让效率重新回到传统工具；所有修改都自动执行，又会让跨区域操作失去必要的控制。',
        decision: '根据影响范围 × 可逆性 × 业务影响判断修改风险，并对应不同交互方式：Low 即时执行 → 明确反馈 → Undo；Medium 结果预览 → 应用 / 撤销；High 先生成计划 → 展示影响范围 → 逐项预览 → 选择保留 → 确认应用。',
        reason: '低风险任务保持效率，高影响任务增加必要的解释和确认。',
        alternative: {
          state: 'confirmed',
          text: '对所有 AI 修改使用同一套确认流程。',
        },
      },
      {
        id: 4,
        title: '用 修改集 管理复杂修改',
        state: 'confirmed',
        problem: '复杂 AI 操作最难判断的是它到底改了多少地方，以及用户想保留哪些。传统 Undo 更适合撤销一次已经发生的操作，却不适合审查一组同时发生的修改。',
        decision: '把一次复杂 AI 操作产生的多个修改组织成一个 修改集，支持查看全部改动、理解每项修改原因、单独预览、保留或移除部分修改、确认应用，需要时整体撤销。',
        reason: '控制前移到保存之前。用户可以先理解修改，再决定接受多少。',
        alternative: {
          state: 'confirmed',
          text: '只依赖传统 Undo 解决复杂修改后的后悔问题。',
        },
      },
    ],
    decisionsNote: null,

    outcome: {
      quantitative: [
        {
          label: '主题选择耗时',
          before: '12–18 分钟',
          after: '6–9 分钟',
          delta: '↓ 50%',
          baseline: '真实项目任务记录',
          measurement: '主题选择任务耗时区间',
          attribution: 'confirmed',
          note: '适配判断成本降低',
        },
        {
          label: '页面规划耗时',
          before: '15–25 分钟',
          after: '6–10 分钟',
          delta: '↓ 60%',
          baseline: '真实项目任务记录',
          measurement: '页面规划任务耗时区间',
          attribution: 'confirmed',
          note: '页面结构决策更高效',
        },
        {
          label: '意图到配置关键节点',
          before: '9–14 个',
          after: '5–8 个',
          delta: '↓ 约 44%',
          baseline: '真实项目任务记录',
          measurement: '关键决策与操作节点区间',
          attribution: 'confirmed',
          note: '缩短意图到配置路径',
        },
      ],
      qualitative: [
        '主题选择耗时下降，对应主题适配判断。',
        '页面规划耗时下降，对应从经营目标到页面结构的规划过程。',
        '关键决策节点减少，对应经营意图到具体配置之间的路径长度。',
      ],
      baselineNote: '商业数据以区间和比例进行脱敏呈现。',
    },

    competencies: [
      { dimension: '业务与问题定义', strength: 0, note: '通过成熟能力审计修正初始假设，将项目从编辑器重设计收敛为建站决策优化。' },
      { dimension: '复杂系统设计', strength: 0, note: '将经营意图、AI 决策、现有执行能力与用户控制拆分为不同层级，并建立清晰协作关系。' },
      { dimension: 'AI 产品设计', strength: 0, note: '通过 50 次稳定性测试识别不同任务的 AI 能力边界，并把不确定性转化为解释、规划、风险分级与用户控制机制。' },
      { dimension: '交互设计', strength: 0, note: '根据操作风险建立即时执行、预览、修改集、选择性保留与撤销机制。' },
    ],
    disclaimer: null,

    reflection: {
      state: 'confirmed',
      methodology: [
        '成熟产品的机会不一定在界面上：当基础能力已经足够完整时，体验问题可能已经从「操作困难」转移到「不知道该怎么选」。设计需要先判断问题发生在哪一层，再决定是不是值得改界面。',
        'AI 产品设计要处理能力差异，而不是假设能力稳定：局部修改可以快，高影响修改需要慢一点，在结果真正影响用户之前，把计划、原因、影响范围和恢复方式交代清楚。',
        'AI 的价值不是替用户做完所有判断：AI 帮助理解、规划和解释，用户负责调整、确认和最终决策。最后形成的关系很简单：AI 帮助理解、规划和解释。用户负责调整、确认和最终决策。这比单纯提高生成能力更接近实际的建站过程。',
      ],
      lessonsIfRedo: {
        state: 'confirmed',
        text: '继续用真实业务数据检验效率提升如何传导到建站完成、商家激活、主题使用与长期留存。',
      },
      note: '',
    },
  },

  /* ================================================================
     Case 03 — 企业级低代码平台体验升级
     Source: 案例3_企业级低代码平台体验升级_去AI味版.md
     Priority: P0
     ================================================================ */
  lowcode: {
    slug: 'lowcode',
    priority: 'P0',
    featured: false,

    /* ── Basic Info ── */
    title: '企业级低代码平台体验升级',
    nda: null,
    portfolioRole: '真实商业项目 · 已上线 · 内容已脱敏',
    tags: ['企业级 SaaS', '低代码', '复杂系统', 'AI 辅助体验'],
    confidence: 'confirmed',
    role: '交互设计师',
    timeline: '2019.10 – 2023.06，持续参与平台多轮产品迭代',
    platform: 'Web · 企业级 B 端低代码平台',
    industry: '企业软件 / 低代码平台',
    team: '产品经理 / 前端工程师 / 后端工程师',
    cardAccent: 'var(--card-accent-lowcode)',
    coverImage: 'optimized/case-lowcode.jpg',

    /* ── Summary ── */
    summary: '以易学性为切入点，通过角色分层与任务测试，并结合用户旅程定位复杂配置中的关键阻力，重构工作台和表单，以及流程、权限与报表等核心场景，并用 AI 助手补足首次学习与复杂决策中的信息缺口。',
    publicSummary: '以易学性为切入点，通过角色分层与任务测试，并结合用户旅程定位复杂配置中的关键阻力，重构工作台和表单，以及流程、权限与报表等核心场景，并用 AI 助手补足首次学习与复杂决策中的信息缺口。',

    /* ── Metrics (Home card hooks) ── */
    cardMetrics: [],
    featuredMetrics: [],

    /* ── Visual Entry Zone ── */
    cardVisualPills: [
      { label: '组件选择', metric: '降低理解成本' },
      { label: '复杂配置', metric: '保持任务上下文' },
      { label: '模板复用', metric: '沉淀平台资产' },
    ],

    /* ── Background ── */
    background: {
      state: 'confirmed',
      note: null,
      why: '低代码平台的核心价值，是让企业用户以更低的技术门槛完成业务应用搭建。\n\n随着平台持续迭代，组件和字段不断增加，流程、权限和业务规则也不断增加，产品能力逐渐完善，但使用复杂度也同步上升。用户需要在大量组件与配置项之间持续判断，不仅要知道“有哪些能力”，还要理解“当前任务应该使用什么，以及不同能力之间如何组合”。\n\n原有体验的问题贯穿应用搭建的完整过程，涉及范围超过单个页面：\n\n选择组件 → 搭建页面 → 配置规则 → 校验结果 → 保存与复用\n\n因此，本次升级将重点放在重新组织复杂能力上，功能扩充不再作为主要方向，让用户在完成业务任务时能够更快理解、更少中断，并让成熟方案可以持续复用。',
      targetUsers: '面向企业业务人员与专业配置人员。\n\n业务人员更关注快速完成应用搭建与日常业务配置；专业配置人员需要处理更复杂的字段和规则，以及流程与权限关系。\n\n两类用户的熟练程度不同，但共同目标一致：以尽可能低的理解成本完成业务配置，并准确获得预期结果。',
      businessGoals: '提升核心业务应用的搭建与配置效率\n降低复杂配置过程中的理解成本与操作错误\n提高模板与已有方案的复用效率\n建立可持续扩展的平台级体验规则，减少跨模块体验差异',
      constraints: [
        '平台需要持续迭代，组件、字段、流程、权限和业务规则会继续增加',
        '需要同时服务业务人员与专业配置人员，保留企业级专业能力',
        '复杂能力需要通过任务结构、信息层级和反馈规则降低用户感知到的复杂度',
        '统一规则需要支撑跨模块扩展，而不是只解决单个页面问题',
      ],
    },

    /* ── Challenge ── */
    challenge: {
      state: 'confirmed',
      userProblem: '01｜平台能力持续增加，组件选择成本同步上升\n\n低代码平台需要覆盖表单与数据能力，以及流程、权限和业务逻辑等多类能力。\n\n当组件和配置项不断增加，用户面临的问题逐渐从“有没有这个功能”转变为：当前场景应该选择哪个组件，不同组件之间有什么区别。\n\n如果分类方式、组件命名和业务场景之间缺乏清晰映射，平台能力越丰富，用户的选择成本越高。\n\n02｜复杂配置跨越多个步骤，任务上下文容易中断\n\n企业级业务配置通常包含字段和规则，以及流程、权限与页面关系，不同配置之间存在明显的前后依赖。\n\n原有链路中，部分操作被分散在不同页面和层级。用户需要反复切换位置、寻找入口，并依赖记忆维持当前任务状态。\n\n判断重点应放在任务上下文，步骤数量本身居于次要位置：用户很难持续确认自己正在配置什么、已经完成什么，以及下一步需要处理什么。\n\n03｜相似业务反复搭建，已有成果难以复用\n\n大量企业业务具有相似结构。\n\n如果已经完成的页面、组件组合或业务配置无法被方便复用，用户只能重复寻找组件、重新设置规则，不仅影响效率，也容易导致同类业务采用不同实现方式。\n\n04｜产品持续扩展，跨模块体验逐渐失去一致性\n\n随着平台功能增加，相同组件和操作模式在不同业务模块中出现不同实现。\n\n对用户而言，同类任务需要重新学习；对团队而言，相同问题被重复设计与重复开发。\n\n项目因此需要同时解决两个层面的问题：既优化当前任务体验，也建立能够支撑产品继续扩展的统一规则。',
      businessProblem: '平台按照功能组织能力，而用户按照任务理解产品。用户需要在选择能力、搭建内容、配置规则、校验结果、保存与复用之间持续维持任务上下文，同时面对不断增加的跨模块差异。',
      designChallenge: '将平台能力从“功能可用”进一步推进到“复杂能力可理解、关键任务可连续、成熟方案可复用、平台规则可扩展”，并在不牺牲专业能力的前提下控制用户需要面对的复杂度。',
    },

    /* ── My Role ── */
    myRole: {
      responsibilities: [
        {
          task: '关键任务链路',
          contribution: '负责',
          confidence: 'confirmed',
          detail: '梳理应用搭建与复杂配置的关键任务链路。',
        },
        {
          task: '组件选择与信息层级',
          contribution: '负责',
          confidence: 'confirmed',
          detail: '优化组件选择、信息层级与配置流程。',
        },
        {
          task: '模板与方案复用',
          contribution: '负责',
          confidence: 'confirmed',
          detail: '建立模板与已有方案的复用机制。',
        },
        {
          task: '复杂操作模式与反馈',
          contribution: '负责',
          confidence: 'confirmed',
          detail: '统一高频复杂操作的交互模式与反馈规则。',
        },
        {
          task: '平台级设计系统',
          contribution: '负责',
          confidence: 'confirmed',
          detail: '从 0 到 1 参与平台级设计系统建设。',
        },
        {
          task: '跨模块一致性落地',
          contribution: '负责',
          confidence: 'confirmed',
          detail: '推动设计方案在不同业务模块中的一致性落地。',
        },
      ],
      note: '产品经理负责业务需求与产品规划，研发团队负责平台能力与技术实现。我主要负责将复杂业务规则转化为用户能够理解和操作的产品结构，并在多轮迭代中持续维护核心体验的一致性。',
    },

    /* ── Design Approach ── */
    designApproach: {
      state: 'confirmed',
      note: null,
      phases: [
        {
          title: '从单点页面问题回到完整任务',
          summary: '低代码平台的体验问题很容易被拆成入口不好找、配置项难理解、页面步骤过多等局部需求。如果只逐个修改页面，往往只能缓解局部问题。因此按照用户完成业务目标的顺序重新梳理核心链路：选择能力 → 搭建内容 → 配置规则 → 校验结果 → 保存与复用。平台按照功能组织能力，而用户按照任务理解产品，许多表面上独立的问题其实来自同一个结构性矛盾。',
          confidence: 'confirmed',
        },
        {
          title: '定位高频任务中的关键阻力',
          summary: '围绕应用搭建、组件选择和复杂配置等高频场景，系统梳理现有产品结构和关键任务路径，重点判断用户在哪里需要反复寻找、在哪里最容易失去上下文，以及哪些工作正在被重复完成，最终收敛为降低选择成本、保持配置上下文、提高方案复用效率三个方向。',
          confidence: 'confirmed',
        },
        {
          title: '建立复杂系统的设计原则',
          summary: '建立四项原则：先帮助用户判断，再要求用户配置；让复杂配置保持连续；让成熟方案能够直接复用；相同问题使用相同规则解决。通过结构、步骤状态与反馈机制，让用户持续明确当前对象、已完成内容和待处理内容，并将反复出现的组件、状态与复杂操作沉淀为统一规则。',
          confidence: 'confirmed',
        },
        {
          title: '验证与落地',
          summary: '从任务层、系统层和协作层持续验证：用户能否理解当前状态、核心操作是否连续、出现问题后是否有明确恢复路径；新增需求能否复用既有组件和交互规则；产品、设计与研发能否基于统一组件和规则讨论问题，减少重复定义、重复设计与重复实现。',
          confidence: 'confirmed',
        },
      ],
    },

    /* ── Key Decisions ── */
    keyDecisions: [
      {
        id: 1,
        title: '从功能分类转向任务导向的组件选择',
        state: 'confirmed',
        problem: '组件数量持续增加后，用户面对的首要问题已经转向判断，配置不再居于首位。仅依赖组件名称和传统功能分类，很难帮助用户快速理解不同能力之间的差异，也难以建立组件与业务任务之间的对应关系。',
        decision: '重新梳理组件分类、信息层级与选择路径，让组件从单纯的功能列表扩展为更容易根据当前任务进行判断的能力集合。组件选择重点强化能力类型、主要用途、相似组件之间的差异，以及组件与当前业务任务之间的对应关系；对于高频能力缩短进入路径，对于相似或低频能力通过分组和渐进展示降低首屏信息密度。',
        reason: '设计目标从“帮助用户找到组件”进一步转向帮助用户更快判断哪个组件适合当前任务。',
        alternative: {
          state: 'unconfirmed',
          text: '继续依赖组件名称和传统分类，让用户自行比较不同能力。',
        },
      },
      {
        id: 2,
        title: '按照任务顺序重组复杂配置',
        state: 'confirmed',
        problem: '复杂业务配置包含大量参数、规则和依赖关系。如果所有配置同时展开，页面会产生明显的信息负担；如果过度拆分，又会导致任务被切得过碎，用户需要频繁切换上下文。',
        decision: '按照用户完成任务时的判断顺序重新组织配置内容，将复杂操作划分为具有明确关系的阶段，并统一当前对象、配置阶段、已完成与待完成内容、配置结果与异常状态，以及返回、修改与继续操作的路径；高频配置保留直接操作路径，低频和高级配置采用渐进披露。',
        reason: '重新分配复杂度，不减少专业能力本身，而是让系统承担结构和规则，让用户只在当前任务需要时接触对应信息。',
        alternative: {
          state: 'unconfirmed',
          text: '把全部配置同时展开，或将任务过度拆分成互不关联的步骤。',
        },
      },
      {
        id: 3,
        title: '建立模板与方案复用机制',
        state: 'confirmed',
        problem: '企业内部大量业务具有相似结构，但用户仍然需要反复完成相同的页面搭建与规则配置，已经完成的成果难以沉淀。',
        decision: '将具有复用价值的页面结构、组件组合和业务配置沉淀为模板与标准方案，并优化模板分类、查找与使用路径，使用户可以根据业务场景快速定位已有方案，并在此基础上继续调整，减少每次从空白状态重新开始。',
        reason: '平台的使用方式由从零搭建逐渐转变为选择已有方案 → 调整 → 复用，让完成的配置真正成为平台资产。模板既是效率工具，也是控制重复建设和保持业务一致性的基础能力。',
        alternative: {
          state: 'unconfirmed',
          text: '继续让用户从空白状态开始搭建相似业务。',
        },
      },
      {
        id: 4,
        title: '沉淀平台级交互模式与设计规范',
        state: 'confirmed',
        problem: '随着业务模块持续扩展，相同组件、状态和复杂操作出现了不同实现，增加用户学习成本，也增加产品、设计与研发团队的重复沟通成本。',
        decision: '从高频业务场景中抽取稳定模式，对基础组件、业务组件、页面结构、表单与配置模式、状态与反馈机制、复杂操作模式及组件使用规则进行统一，并持续沉淀到平台级设计系统。',
        reason: '让设计系统成为承载产品行为一致性的共同语言，而不只是视觉组件集合；让设计工作从解决单个需求，逐步转向维护平台整体体验，为后续产品扩展建立稳定基础。',
        alternative: {
          state: 'unconfirmed',
          text: '让每个业务模块继续独立设计和实现相同的组件与交互模式。',
        },
      },
    ],
    decisionsNote: null,

    /* ── Outcome ── */
    outcome: {
      quantitative: [],
      qualitative: [
        '核心任务体验：围绕组件选择、复杂配置与模板复用重新梳理关键任务链路，使产品从单纯按照功能组织能力，逐渐转向围绕用户任务组织体验。',
        '复杂系统设计：将大量业务规则、配置关系与操作状态重新组织为更清晰的任务结构，在保留企业级产品专业能力的同时，降低用户感知到的复杂度。',
        '平台设计体系：从高频场景中沉淀组件与状态，以及配置和反馈模式，并参与从 0 到 1 建立平台级设计系统，为跨模块体验一致性与后续产品扩展提供基础。',
        '团队协作：通过统一设计规则与交互模式，使产品、设计和研发能够围绕同一套组件与行为规范协作，减少重复定义和沟通成本。',
      ],
      baselineNote: null,
    },

    /* ── Capability Map ── */
    competencies: [
      { dimension: '复杂业务建模', strength: 0, note: '将业务规则、配置关系与操作状态转化为用户能够理解和操作的任务结构。' },
      { dimension: '复杂配置体验', strength: 0, note: '通过任务阶段、对象状态与统一反馈保持配置上下文连续。' },
      { dimension: '模板与方案复用', strength: 0, note: '将页面结构、组件组合和业务配置沉淀为可再次使用的平台资产。' },
      { dimension: '平台级设计系统', strength: 0, note: '统一组件、状态、交互模式和使用规则，支撑跨模块持续扩展。' },
    ],
    disclaimer: null,

    /* ── Reflection ── */
    reflection: {
      state: 'confirmed',
      methodology: [
        '先理解业务结构，再讨论页面结构：低代码并不意味着低复杂度，真正需要解决的是哪些复杂度必须由用户理解、哪些复杂度应该由系统承担。',
        '先梳理完整任务，再优化单个操作：从选择能力、搭建内容、配置规则、校验结果到保存复用，持续观察任务上下文。',
        '先明确用户当前需要做出的判断，再决定展示多少信息：在不牺牲专业能力的前提下控制用户需要面对的复杂度。',
        '将反复出现的解决方案沉淀为规则，而不是持续依赖单点优化：设计系统对用户保持行为一致性，对团队约束持续扩展中的设计复杂度。',
      ],
      lessonsIfRedo: { state: 'confirmed' },
      note: '对于复杂系统，设计的价值在于控制用户需要面对的复杂度，同时保留专业能力。把所有东西做得“简单”并非目标。设计系统的作用也超出组件库本身：对用户，它负责保持产品行为的一致性；对团队，它负责约束产品持续扩展过程中不断增长的设计复杂度。',
    },
  },

  /* ================================================================
     Case 06 — Design System & DesignOps 系统建设
     Source: Case06_Design_System_DesignOps_大厂标准重构版_去AI味.md
     Priority: P0
     ================================================================ */
  template: {
    slug: 'template',
    priority: 'P0',
    featured: false,

    /* ── Basic Info ── */
    title: 'Design System & DesignOps 系统建设',
    nda: null,
    tags: ['Design System', 'DesignOps', '国际化', 'Enterprise SaaS'],
    confidence: 'confirmed',
    role: '交互设计专家 / 项目主导设计师',
    timeline: '2023.06 – 至今',
    platform: 'Web（B 端） / Shopify Theme',
    industry: '跨境电商 SaaS',
    team: '产品、前端与海外业务团队',
    cardAccent: 'var(--card-accent-template)',
    coverImage: 'optimized/case-template.jpg',

    /* ── Positioning ── */
    portfolioRole: '真实商业项目 · 已上线 · 内容已脱敏',

    /* ── Summary ── */
    summary: '围绕跨境电商 SaaS 的多产品、多语言与持续迭代需求，从 0 到 1 建立公司级 B 端设计系统，完成 Design Token、组件体系与 DesignOps 协作机制建设，并在模板站等真实业务场景中持续落地与验证。',
    publicSummary: '围绕跨境电商 SaaS 的多产品、多语言与持续迭代需求，从 0 到 1 建立公司级 B 端设计系统，完成 Design Token、组件体系与 DesignOps 协作机制建设，并在模板站等真实业务场景中持续落地与验证。',

    /* ── Metrics ── */
    cardMetrics: [
      { label: '组件复用率', value: '70%', baseline: null },
      { label: '国际化迭代', value: '↓ 30%', baseline: null },
      { label: '首次购买转化', value: '↑ 8%', baseline: null },
    ],
    featuredMetrics: [],

    /* ── Visual Entry Zone ── */
    cardVisualPills: [
      { label: 'Design System', metric: '60+ 组件' },
      { label: 'Design Token', metric: '国际化适配' },
      { label: 'DesignOps', metric: '持续治理' },
    ],

    /* ── Background ── */
    background: {
      state: 'confirmed',
      note: null,
      why: '随着跨境业务持续扩展，模板站、广告平台与商家后台等产品逐步形成多产品线并行迭代的状态。原有以单页面、单业务需求为单位的设计方式开始出现明显的规模化问题：不同产品线分别维护 UI，同类组件存在多套视觉与交互实现；设计与研发重复定义颜色、间距、状态和组件行为；多语言版本主要依赖页面级人工适配；模板站需要兼顾品牌表达、内容差异与转化效率，单一视觉规范难以支撑不同业务场景持续扩展。\n\n当问题从单个页面的一致性扩展到多产品、多语言和长期协作后，单纯补充组件已经无法解决根因。项目因此从页面优化转向系统建设：建立统一设计语言、可复用组件资产和持续治理机制。',
      targetUsers: '直接使用者：产品经理、设计师与前端研发。他们需要稳定的设计规则、可复用组件和明确的协作机制，以降低重复设计、重复开发和跨团队沟通成本。\n\n最终用户：使用平台完成建站与运营的 Shopify 跨境商家。设计系统并不直接面向商家，但会通过更一致的交互、更稳定的多语言体验和更高效的产品迭代，最终影响商家的使用体验。',
      businessGoals: '1. 建立统一设计语言，统一基础视觉、交互状态与高频组件规则，减少多产品线之间的体验分叉；\n2. 提升设计与研发复用效率，将重复出现的界面能力沉淀为可复用组件与模式，降低新增页面和业务模块的重复建设成本；\n3. 建立国际化适配能力，将多语言、多市场需求前置到 Token、组件和内容规则中，减少上线前的页面级补丁；\n4. 形成可持续的治理机制，通过组件准入、变更与发布，以及版本管理，保证设计系统能够随业务持续演进，避免停留在一次性的规范整理。',
      constraints: [
        '基础规则保持统一，高频能力优先复用，业务差异通过明确的扩展机制承接',
        '多语言适配需要处理文本长度、布局空间、信息密度和内容结构变化',
        '系统需要兼容既有产品实现与 Shopify Theme 相关能力',
        '组件需要进入新增、变更、发布、扩展与回收的持续治理流程',
      ],
    },

    /* ── Challenge ── */
    challenge: {
      state: 'confirmed',
      userProblem: '01｜标准化与业务扩展如何共存\n\n规则过少，不同产品会继续形成新的设计分支；规则过重，又会限制业务组件对真实场景的适配能力。系统边界需要明确：基础规则保持统一，高频能力优先复用，业务差异通过明确的扩展机制承接。\n\n02｜国际化如何从页面问题转为系统能力\n\n多语言适配除了翻译文案，还要处理文本长度与按钮宽度的变化，表格列宽也会受到影响；表单布局、状态提示和信息层级同样会随语言变化。如果这些问题始终在页面末端解决，设计和研发就会持续产生重复调整。国际化必须进入 Token 与组件层，成为系统默认具备的能力。\n\n03｜如何让设计系统真正进入业务\n\n设计系统的价值取决于使用率与持续维护，组件数量不能单独代表系统价值。除了组件设计，还需要解决组件何时新增、如何变更，以及怎样同步研发和旧资产如何退出等治理问题，否则组件库很快会再次分叉。',
      businessProblem: '当设计系统进入多产品、多语言和长期协作环境后，组件设计、国际化适配、版本管理与协作流程必须同时被治理，否则系统会再次产生重复资产与规则分叉。',
      designChallenge: '如何建立统一设计语言、可复用组件资产与持续治理机制，让基础规则保持稳定、业务差异可以扩展，并通过真实业务场景验证系统有效性。',
    },

    /* ── My Role ── */
    myRole: {
      responsibilities: [
        {
          task: '产品与组件资产盘点',
          contribution: '主导',
          confidence: 'confirmed',
          detail: '主导现有产品与组件资产盘点，识别重复组件、体验分叉与国际化适配问题。',
        },
        {
          task: '公司级 Design System',
          contribution: '主导',
          confidence: 'confirmed',
          detail: '从 0 到 1 搭建公司级 B 端 Design System。',
        },
        {
          task: 'Design Token 与国际化',
          contribution: '主导',
          confidence: 'confirmed',
          detail: '建立 Foundation → Semantic → Component 三层 Design Token 架构。',
        },
        {
          task: '基础组件与业务组件',
          contribution: '主导',
          confidence: 'confirmed',
          detail: '设计并规范 60+ 个基础组件与业务组件。',
        },
        {
          task: '多语言与多市场适配',
          contribution: '主导',
          confidence: 'confirmed',
          detail: '建立多语言、多市场场景下的布局、内容与组件适配规则。',
        },
        {
          task: '模板站与业务落地',
          contribution: '主导',
          confidence: 'confirmed',
          detail: '主导模板站设计体系，将设计系统应用到真实业务场景并持续迭代。',
        },
        {
          task: '组件治理机制',
          contribution: '主导',
          confidence: 'confirmed',
          detail: '建立组件评审、变更、发布与版本管理机制。',
        },
        {
          task: 'DesignOps 与协作机制',
          contribution: '主导',
          confidence: 'confirmed',
          detail: '协同产品、前端与海外业务团队推动设计系统在多产品线中落地。',
        },
      ],
      note: '协同产品、前端与海外业务团队推动设计系统在多产品线中落地。',
    },

    /* ── Design Approach ── */
    designApproach: {
      state: 'confirmed',
      note: null,
      phases: [
        {
          title: '先建立统一基线，再建设组件',
          summary: '通过现状审计梳理视觉规则、组件规则与交互规则，以及国际化问题，先确定哪些能力需要统一，再进入组件建设。',
          confidence: 'confirmed',
        },
        {
          title: '用语义化 Token 隔离变化',
          summary: '通过 Foundation → Semantic → Component 三层结构，将基础设计值、业务语义与组件实现分离，降低全局调整对具体页面的影响。',
          confidence: 'confirmed',
        },
        {
          title: '以真实业务场景验证系统',
          summary: '选择模板站作为重点落地场景，通过真实页面组合、多语言内容与业务迭代检验组件体系是否具备足够的稳定性与扩展性。',
          confidence: 'confirmed',
        },
        {
          title: '用 DesignOps 管理持续变化',
          summary: '将组件新增、变更、发布、扩展和回收纳入固定流程，避免设计系统在业务扩展后重新产生重复资产与规则分叉。',
          confidence: 'confirmed',
        },
      ],
    },

    /* ── Key Decisions ── */
    keyDecisions: [
      {
        id: 1,
        title: '从组件库升级为完整的设计系统',
        state: 'confirmed',
        problem: '早期如果只解决 UI 复用问题，很容易把项目做成一个 Figma 组件库。但随着产品线增加，组件定义、状态、使用方式和研发实现没有统一标准，持续影响交付效率。',
        decision: '系统包含四个层级：设计基础、组件体系、模式规范与协作机制。覆盖基础组件和业务组件，并补齐状态、尺寸、响应式、内容约束与设计研发对应关系。',
        reason: '这使 Design System 从“设计资产”变成可以持续维护的产品基础设施。',
        alternative: {
          state: 'confirmed',
          text: '只制作一套 Figma 组件库，不统一组件定义、状态和协作流程。',
        },
      },
      {
        id: 2,
        title: '把国际化能力放进 Token 和组件规则',
        state: 'confirmed',
        problem: '多语言适配过去主要发生在页面完成之后，长文案容易让按钮、表格、卡片和弹窗出现布局问题，页面级补丁带来持续维护成本。',
        decision: '将弹性布局、内容长度与截断规则、容器最大承载范围、字号间距与信息密度纳入 Token 和组件规则，并保留业务层覆盖能力。',
        reason: '同一套组件可以稳定承载不同语言与内容环境，国际化相关设计迭代周期缩短约 30%。',
        alternative: {
          state: 'confirmed',
          text: '继续在页面完成后为每种语言单独打补丁。',
        },
      },
      {
        id: 3,
        title: '用真实模板站验证设计系统，而不是停留在规范文件',
        state: 'confirmed',
        problem: '设计系统如果只停留在规范文件，无法验证统一组件在真实业务中的灵活性、国际化稳定性和转化链路适配能力。',
        decision: '将模板站作为首批重点落地场景，验证不同模板组合、Token 视觉调整、多语言内容变化和页面结构扩展。',
        reason: '真实业务数据让设计系统从内部效率工具与业务结果建立联系，最终推动客户首次购买转化率提升 8%。',
        alternative: {
          state: 'confirmed',
          text: '先完成规范文件，再等待业务场景逐步接入。',
        },
      },
      {
        id: 4,
        title: '通过 DesignOps 管理“变化”',
        state: 'confirmed',
        problem: '设计系统进入多产品线后，最大的风险是修改失控，旧组件和重复样式会继续扩散。',
        decision: '建立新增、变更、发布、扩展和回收五个环节的轻量 DesignOps 机制，并通过版本记录同步设计与研发。',
        reason: '组件第一次发布只是开始，持续治理才能避免重复组件与规则分叉，让系统随着业务增长继续演进。',
        alternative: {
          state: 'confirmed',
          text: '只维护组件库，不建立变更管理、版本发布和回收机制。',
        },
      },
    ],
    decisionsNote: null,

    /* ── Outcome ── */
    outcome: {
      quantitative: [],
      qualitative: [
        '60+ 个组件完成统一：建立基础组件、业务组件与高频模式，覆盖主要 B 端产品场景，并补齐状态与使用规则、内容约束和国际化要求。',
        '多产品线持续复用：设计系统逐步应用到模板站、广告相关产品与商家后台等业务场景，新页面优先基于已有组件与模式组合完成。',
        '组件复用率达到 70%：在新增页面与业务模块中，约 70% 的界面能力可以直接复用现有组件或模式。设计资源因此能够从重复绘制基础 UI，进一步转向业务流程、交互决策和体验优化。',
        '国际化设计迭代周期缩短 30%：多语言适配从页面级修补前置到 Token 与组件规则后，设计侧处理重复布局和内容适配问题的成本下降。',
        '客户首次购买转化率提升 8%：在模板站场景中，设计系统落地与页面体验优化同步推进，客户首次购买转化率最终提升 8%，来自页面结构、组件表现与内容呈现的持续迭代。',
        '从组件资产升级为持续治理机制：组件评审、变更管理与版本发布，以及旧资产回收形成固定协作流程，使设计系统能够伴随业务增长持续演进，避免在首版发布后重新分叉。',
      ],
      baselineNote: null,
    },

    /* ── Capability Map ── */
    competencies: [
      { dimension: 'Design System', strength: 0, note: '统一设计语言、组件规则与高频业务模式。' },
      { dimension: 'International Design Token', strength: 0, note: '通过系统化 Token 和组件约束支撑多语言、多市场适配。' },
      { dimension: 'DesignOps', strength: 0, note: '建立设计、产品与研发共同维护设计系统的协作机制。' },
      { dimension: '产品基础设施建设', strength: 0, note: '将设计从页面交付推进到可持续复用的产品基础设施。' },
    ],
    disclaimer: null,

    /* ── Reflection ── */
    reflection: {
      state: 'confirmed',
      methodology: [
        '设计系统解决的核心问题是变化成本：明确哪些基础规则必须稳定、哪些组件行为必须统一、哪些业务差异允许扩展，以及变化应该发生在哪一层。',
        'Token 的价值在于建立稳定的语义映射：Foundation、Semantic、Component 三层结构将基础设计值、业务语义与组件实现分离。',
        '组件数量不是成熟度指标，复用与治理才是：没有准入、变更、发布与回收机制，组件越多越难维护。',
        '国际化应该在系统层被提前设计，将文本承载、布局弹性、信息密度和组件状态前置到系统层。',
      ],
      lessonsIfRedo: { state: 'confirmed' },
      note: '本项目最终形成三类可持续复用的产品设计能力：Design System、International Design System 与 DesignOps。项目价值不止于完成一套 UI 规范，而是建立了一套可复用、可扩展、可治理的设计基础设施。',
    },
  },

  /* ================================================================
     Case 02 — Shopify Sidekick AI 运营工作台体验设计
     Source: Case02_大厂标准_像素级文案重构终版_去AI味.md
     Priority: P0 · 第 2 案例 — 方向性验证
     ================================================================ */
  'sidekick-agent': {
    slug: 'sidekick-agent',
    priority: 'P0',
    featured: false,

    /* ── Basic Info ── */
    title: 'Shopify Sidekick AI 运营工作台体验设计',
    nda: null,
    tags: ['AI Agent', 'Human-AI Collaboration', 'B2B SaaS'],
    confidence: 'confirmed',
    role: '产品设计师（AI 方向）',
    timeline: '方向性验证',
    platform: 'Web · B2B',
    industry: '跨境电商 SaaS',
    team: '产品经理 / 研发 / 算法 / 用户研究',
    cardAccent: 'var(--card-accent-sidekick-agent)',
    coverImage: 'optimized/case-sidekick-agent.jpg',

    /* ── Positioning ── */
    portfolioRole: '真实商业项目 · 方向性验证 · 已脱敏',

    /* ── Narrative Hook ── */
    narrativeHook: null,

    /* ── Summary ── */
    summary:
      '一次跨应用促销准备，需要商家在 Shopify、Google Sheets、Slack 与采购系统之间反复切换。AI 开始接管这类任务后，用户还要判断哪些步骤可以交给 AI，哪些关键操作需要自己确认，执行失败后又该从哪里继续。',

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
      why: '一次跨应用促销准备中，商家需要在 Shopify 检查库存，到 Google Sheets 记录数据，再通过 Slack 通知运营；库存不足时，还要进入采购系统创建采购单。\n\n业务目标只有一个，执行过程却散落在多个工具里。商家需要记住当前做到哪里、哪些信息已经同步，以及异常出现后下一步该去哪里处理。\n\nAI 接管部分执行后，原有的协调成本没有自动消失，还增加了新的判断：AI 会不会改错商品或价格？任务执行到一半失败怎么办？哪些步骤可以自动执行，哪些操作必须由用户确认？\n\n本项目因此聚焦一个问题：AI 自主性增加以后，用户如何保持对任务和风险的控制。',
      targetUsers:
        '跨境商家，尤其是成长型商家，需要跨多个业务模块与第三方应用协同完成复合经营目标。',
      businessGoals:
        '让 AI 接管跨应用任务中的协调与执行，把商家的注意力留给目标设定、关键决策和异常处理。',
      constraints: [
        '基于 Sidekick 的既有能力边界进行设计',
        '覆盖 Shopify Flow、第三方应用连接与标准化工具调用场景',
        '客户、商家身份及业务敏感信息均进行脱敏处理',
      ],
    },

    /* ── Challenge ── */
    challenge: {
      state: 'confirmed',
      userProblem: [
        { heading: '① 跨应用任务割裂', body: '同一个业务目标被拆散在多个产品中，用户需要自己协调步骤、同步信息并处理异常。' },
        { heading: '② 复杂任务表达成本高', body: '自然语言适合表达目标，但复合经营任务同时包含条件、依赖和异常规则，用户很难一次性描述完整。' },
        { heading: '③ AI 执行边界不透明', body: '用户难以判断哪些步骤可以由 AI 自动执行、哪些操作需要人工确认，也不清楚自己应该在什么时候介入。' },
        { heading: '④ 任务状态缺少全局视图', body: '当任务出现依赖和并行，以及条件分支、失败与重试后，连续对话很难同时呈现完整任务结构和当前状态。' },
      ],
      businessProblem: '自动化能力增加后，跨工具协调、状态同步和异常处理仍然需要商家自己承担。',
      designChallenge: '让用户看懂任务状态，知道何时介入，并在失败后找到继续处理的方法。',
    },

    /* ── My Role ── */
    myRole: {
      responsibilities: [
        {
          task: 'AI 任务交互模型',
          contribution: '主导',
          confidence: 'confirmed',
          detail: '「触发 → 理解 → 规划 → 确认 → 执行 → 恢复 → 完成」人机协作主线定义',
        },
        {
          task: '任务规划与上下文',
          contribution: '主导',
          confidence: 'confirmed',
          detail: '任务树、店铺 / 任务 / 会话三层上下文面板',
        },
        {
          task: '风险确认机制',
          contribution: '主导',
          confidence: 'confirmed',
          detail: '影响范围 × 可恢复性 → R1–R4 风险分级与风险预览',
        },
        {
          task: '跨应用工作流',
          contribution: '主导',
          confidence: 'confirmed',
          detail: '主导一键连接向导、引导式任务构建、任务状态与失败恢复体验',
        },
        {
          task: '设计验证',
          contribution: '主导',
          confidence: 'confirmed',
          detail: '主导 5 位目标商家的无引导任务测试，并根据实际操作结果完成方案迭代',
        },
      ],
      note: '我负责用户侧的任务结构、状态反馈、风险确认、异常处理与恢复路径设计；底层任务调度、工具调用、运行时与执行机制由研发和算法团队协同实现。',
    },

    /* ── Design Approach (调查 → 定义 → 原型 → 验证) ── */
    designApproach: {
      state: 'confirmed',
      note: null,
      phases: [
        {
          title: '调研与问题收敛',
          summary:
            '本阶段结合三类输入进行分析：用户反馈与客服工单、产品行为数据，以及竞品与生态产品走查。相关内容均已脱敏。\n\n反馈主要集中在三类问题：担心 AI 修改错误的商品、价格或业务数据；不清楚任务执行到了哪一步，以及接下来还会发生什么；任务失败后不知道应该重试、跳过还是人工接管。\n\n产品行为数据中出现部分复杂任务中途退出的情况，结合用户反馈与任务路径分析，任务状态可见性被列为本轮体验优化的重点。\n\n对 Shopify Sidekick、Shopify Flow 及相关 AI / 自动化产品进行走查后，形成判断：自然语言能够快速表达目标，但随着任务依赖、分支和异常状态增加，仅靠连续对话很难保持完整的结构认知；工作流画布能够表达节点与依赖，但要求用户理解结构化操作；跨应用任务状态分散在不同工具中，用户需要自己拼接整体进度。\n\n问题最终收敛到三个体验维度：计划是否看得懂、关键节点是否管得住、任务失败后是否能够恢复。',
          confidence: 'confirmed',
        },
        {
          title: '定义设计原则',
          summary:
            '围绕「AI 自主性与用户控制权」，将设计原则收敛为三条：\n\n可预测 Predictable：用户能够看懂 AI 的任务计划、依赖关系、当前状态和下一步动作。\n\n可控制 Controllable：风险越高，用户拥有越强的确认、暂停和干预权。\n\n可恢复 Recoverable：任务出现异常后，系统提供明确的重试、跳过和补救路径。\n\n在此基础上定义 AI 任务交互主线：触发 → 理解 → 规划 → 确认 → 执行 → 恢复 → 完成，并明确每个阶段中 AI 与用户各自负责什么。',
          confidence: 'confirmed',
        },
        {
          title: '方案设计',
          summary:
            '围绕三条设计原则，方案最终形成 6 项核心机制：任务树、店铺 / 任务 / 会话三层上下文、一键连接向导、引导式任务构建、R1–R4 风险分级与失败恢复面板。任务树展示任务层级、依赖、状态与风险，硬依赖锁定、软依赖允许调整；连接向导将技术连接转化为选择应用 → 授权 → 权限确认 → 完成；引导式任务构建通过系统反问补齐条件、约束和异常规则；风险分级根据影响范围与可恢复性调整自动执行和人工确认强度；失败恢复面板提供重试、跳过和补救动作。',
          confidence: 'confirmed',
        },
        {
          title: '跨职能评审与用户验证',
          summary:
            '早期方案允许用户自由调整任务顺序，研发评估指出完全自由调整会破坏部分必要的执行依赖，因此最终将依赖分为两类：硬依赖锁定，软依赖允许用户调整顺序。R1–R4 风险分级由用户风险、业务要求和技术能力三类约束共同推导，以影响范围 × 可恢复性作为判断维度。\n\n5 位符合目标用户特征的跨境商家参与无引导任务测试，完成任务树理解、风险确认理解和失败恢复三类任务。观察结果为：4 / 5 能正确说明任务顺序与依赖关系；4 / 5 能判断高风险操作何时需要人工确认；4 / 5 能在任务失败后找到并完成重试或补救入口。\n\n基于验证完成三项迭代：增加任务依赖关系解释；补充更接近真实业务的案例提示；将「补偿操作」统一调整为「补救动作」。',
          confidence: 'confirmed',
        },
      ],
    },

    /* ── Key Decisions (5 项设计决策) ── */
    keyDecisions: [
      {
        id: 1,
        title: '对话入口 + 结构化任务界面',
        state: 'confirmed',
        problem:
          '复杂任务既需要自然语言表达目标，也需要结构化方式呈现依赖、状态与风险。\n\n当任务出现多层依赖、分支和异常状态后，纯对话很难同时呈现完整的任务结构与当前状态；独立的全屏工作区又会打断商家原有的业务操作。',
        decision:
          '保留自然语言作为低门槛入口，并根据任务复杂度按需唤起任务树、上下文面板、风险预览和恢复面板。',
        reason: '自然语言负责表达目标，结构化界面负责呈现任务状态、依赖关系和控制入口。',
        alternative: {
          state: 'confirmed',
          text: '纯对话更适合简单任务，复杂任务则需要结构化界面补充状态和依赖信息。工作流画布定位为高级模式，默认交互采用「自然语言 + 结构化任务面板」。',
        },
      },
      {
        id: 2,
        title: '店铺 / 任务 / 会话三层上下文',
        state: 'confirmed',
        problem:
          'AI 长期保留全部历史信息时，旧规则和无关内容会干扰当前任务；完全没有持续上下文时，用户又需要反复输入业务背景和限制条件。',
        decision:
          '将上下文拆分为：店铺上下文、任务上下文、会话上下文。不同层级对应不同生命周期，并允许用户查看、编辑与暂停使用。',
        reason: '把上下文从后台记忆转化为用户可以查看、编辑和控制的工作材料，再通过店铺 / 任务 / 会话三个生命周期进行管理。',
        alternative: {
          state: 'confirmed',
          text: '全量长期记忆容易混入无关信息，完全无记忆又会增加重复输入，因此最终采用分层上下文。',
        },
      },
      {
        id: 3,
        title: '可展开任务树',
        state: 'confirmed',
        problem:
          '复杂任务包含顺序依赖、并行分支、条件分支与异常状态，简单线性步骤无法完整表达这些关系。',
        decision:
          '使用可展开任务树展示：\n\n- 任务层级\n- 依赖关系\n- 执行状态\n- 风险标识\n\n硬依赖锁定，软依赖允许调整，并支持展开、收起、查看依赖、调整顺序、跳过与重试。',
        reason: '任务树是用户理解 AI 如何拆解、安排和执行复杂任务的操作界面。',
        alternative: {
          state: 'confirmed',
          text: '线性步骤适合简单流程，但难以表达复杂依赖；流程图在层级增加后阅读成本较高；时间线更适合展示已经发生的状态变化。最终采用任务树作为复杂任务的主要结构。',
        },
      },
      {
        id: 4,
        title: 'R1–R4 风险分级确认',
        state: 'confirmed',
        problem:
          '查询库存与批量修改价格具有不同的业务影响。\n\n统一确认会增加低风险操作中的交互中断，统一自动执行又无法区分不同操作的影响范围和恢复成本。',
        decision:
          '根据「影响范围 × 可恢复性」建立四级风险机制：\n\nR1｜只读\n自动执行。\n\nR2｜低影响且易恢复\n自动执行，并在执行后通知。\n\nR3｜中影响或恢复成本较高\n执行前需要人工确认。\n\nR4｜高影响且恢复困难\n二次确认，并默认提供预演（Dry Run）。',
        reason: '风险越高，用户拥有越强的控制权，在自动化效率和业务安全之间建立清晰的控制边界。',
        alternative: {
          state: 'confirmed',
          text: '统一确认会增加低风险操作中的交互中断，统一自动执行又会削弱高风险操作的控制边界。',
        },
      },
      {
        id: 5,
        title: '跨应用任务统一状态',
        state: 'confirmed',
        problem:
          '原流程中，各应用独立呈现任务状态，用户需要自行拼接整体进度。\n\n当局部步骤失败时，也缺少统一视角判断失败位置、影响范围，以及后续任务应该如何处理。',
        decision:
          '通过统一任务状态视图，让用户能够看到：\n\n- 跨应用任务整体进度\n- 当前执行步骤\n- 局部失败\n- 受影响的后续任务\n- 可用的恢复操作\n\n同时提供：\n\n- 重试\n- 跳过\n- 补救动作',
        reason: '把分散在不同应用里的状态收拢到一个任务视角中，让用户能看清整体进度，也能在异常发生时直接处理。\n\n设计与工程分工：围绕跨应用任务异常，我负责定义用户侧状态反馈、失败影响、重试、跳过与补救路径；底层任务隔离、调度、重试及运行时机制由工程团队协同实现。',
        alternative: {
          state: 'confirmed',
          text: '各应用独立呈现状态会让整体进度和异常影响再次分散，因此需要统一任务状态视图。',
        },
      },
    ],
    decisionsNote: null,

    /* ── Outcome (方向性验证，无上线量化数据) ── */
    outcome: {
      quantitative: [],
      qualitative: [],
      validationResults: [
        '任务树理解：4 / 5 能正确说明主要执行顺序与关键依赖。',
        '风险确认理解：4 / 5 能判断高风险操作何时需要人工确认。',
        '失败恢复：4 / 5 能在任务失败后找到并完成重试或补救入口。',
      ],
      iterations: [
        '增加任务依赖关系解释，让用户更容易理解为什么某些步骤不能调整。',
        '补充更接近真实业务场景的案例提示，帮助用户理解 AI 如何拆解目标。',
        '将「补偿操作」统一调整为更容易理解的「补救动作」。',
      ],
    },

    /* Capability scoring intentionally omitted for this directionally validated case. */

    /* ── Reflection ── */
    reflection: {
      state: 'confirmed',
      methodology: [
        '可预测：让用户知道 AI 准备怎么做、当前做到哪一步，以及下一步会发生什么。对应设计：任务树、任务状态、依赖关系说明。',
        '可控制：风险越高，用户拥有越强的确认、暂停和干预权。对应设计：R1–R4 风险分级、风险预览、人工确认。',
        '可恢复：任务失败后，用户能够快速判断问题所在，并选择重试、跳过或补救。对应设计：恢复面板、异常状态、重试 / 跳过 / 补救动作。',
      ],
      lessonsIfRedo: { state: 'present' },
      note:
        '核心认知\n\n当 AI 开始承担跨应用复杂任务后，用户真正需要的是看得懂任务，也管得住风险，出错后有路可退。\n\n本项目将原本的：\n\n用户下达指令 → AI 执行\n\n扩展为：\n\n用户提出目标 → AI 理解与规划 → 自动执行 → 关键节点交还控制权 → 异常时支持恢复。',
    },
  },

  /* ================================================================
     Case 05 — Novabot 智能割草机 App 体验重构
     Source: novabot-case5-restructured-lieflat.md
     ================================================================ */
  novabot: {
    slug: 'novabot',
    priority: 'P1',
    featured: false,

    title: 'NOVABOT 智能割草机 App 体验重构',
    nda: null,
    tags: ['智能硬件', 'UX / UI', '体验重构'],
    confidence: 'confirmed',
    role: 'UX / UI 设计师',
    timeline: '2025',
    platform: 'App',
    industry: '智能硬件 / 户外设备',
    team: '设计团队',
    cardAccent: 'var(--color-accent)',
    coverImage: 'optimized/case-novabot.jpg',

    portfolioRole: '商业项目 · 已脱敏',
    narrativeHook: null,
    summary: '围绕设备激活、空间建图、任务控制与异常恢复，重构从首次接入到自主割草的关键体验。',
    publicSummary: '围绕设备激活、空间建图、任务控制与异常恢复，重构从首次接入到自主割草的关键体验。',

    cardMetrics: [],
    featuredMetrics: [],
    cardVisualPills: [
      { label: '设备激活', metric: '连续接入' },
      { label: '空间建图', metric: '边界可验证' },
      { label: '异常恢复', metric: '路径可执行' },
    ],

    background: {
      state: 'confirmed',
      note: null,
      why: 'NOVABOT 是面向家庭草坪维护场景的智能割草机器人。\n\n从设备安装到首次自主割草，用户需要连续完成设备绑定和网络连接，并确认定位、创建地图，最后启动任务。原有流程分散在不同页面和功能入口中，关键状态反馈不足；一旦连接、定位或建图出现异常，用户很难快速判断当前状态以及下一步该做什么。\n\n本次重构聚焦首次使用和日常任务中的关键链路，在不增加额外学习成本的前提下，重新组织设备接入和空间建图，也重构任务状态与异常恢复体验。',
      targetUsers: '主要面向北美家庭用户，这些用户拥有独立庭院，需要长期维护草坪。\n\n用户购买自动割草机器人是为了减少日常维护投入，但首次使用仍需要完成设备安装和网络配置，同时处理空间建图与状态确认等复杂任务。如何降低首次设置成本，并建立对设备状态和自主作业的理解，是本项目需要解决的核心问题。',
      businessGoals: '缩短从设备安装到首次自主割草的关键路径\n降低设备激活、连接与地图创建的操作门槛\n减少因状态不清导致的重复确认与任务中断\n提升首次任务与后续自主作业的连续性',
      constraints: [
        '户外强光、行走状态和单手操作会影响信息读取与触控准确性',
        '连接与定位状态同时受到设备、网络和真实庭院环境影响',
        '数字地图中的边界、禁区与通道需要与真实空间保持清晰对应',
        '异常发生后，用户需要在当前任务中快速理解原因并完成恢复',
      ],
    },

    challenge: {
      state: 'confirmed',
      userProblem: '01｜设备接入缺乏连续性\n\n安装与绑定、网络连接和设备准备被拆分为多个独立步骤。用户需要自己判断已经完成什么、还缺少什么，中断后也缺乏明确的继续路径。\n\n02｜空间建图反馈不足\n\n建图发生在真实庭院中。用户需要同时确认机器人位置与草坪边界，以及地图变化和当前进度，但原有信息之间缺少稳定的空间对应关系。\n\n03｜任务异常缺少恢复路径\n\n连接、定位或作业异常发生后，界面能够告知失败结果，却无法帮助用户快速判断原因、影响范围和下一步操作。',
      businessProblem: '如果用户在设备接入、空间建图和任务执行中持续承担状态判断与异常排查，自动割草带来的价值就会被首次使用和日常操作成本抵消。',
      designChallenge: '如何在不增加额外学习成本的前提下，让用户持续理解设备状态、确认真实空间与数字地图的关系，并在异常发生后快速完成恢复？',
    },

    myRole: {
      responsibilities: [
        { task: '核心体验设计', contribution: '负责', confidence: 'confirmed', detail: '负责从设备激活到首次自主割草的核心体验设计，重点覆盖设备连接与空间建图，以及任务状态与异常恢复；参与用户访谈与调研整理，完成核心流程、高保真界面与交互原型，并与业务、运营和研发团队协同推进交付。' },
      ],
      note: null,
    },

    designApproach: {
      state: 'confirmed',
      note: null,
      phases: [
        { title: '重构连续的设备激活流程', summary: '将安装与绑定、联网和设备准备重新组织为一条连续的激活路径，界面同步呈现当前步骤、完成状态和下一步操作；任务中断后保留已完成进度，让用户能够从未完成节点继续，并弱化不同连接机制之间的技术差异。', confidence: 'confirmed' },
        { title: '把失败提示转化为可执行的恢复路径', summary: '连接与设备异常统一采用“原因 + 当前状态 + 恢复操作”的反馈结构，在失败状态中直接说明问题原因，并结合当前网络或设备状态提供重新连接、检查设备或查看指引等对应操作，让用户尽量在原任务中完成恢复。', confidence: 'confirmed' },
        { title: '建立真实庭院与数字地图之间的稳定对应', summary: '建图过程中持续呈现机器人位置、当前边界和建图进度，使用户能够边移动边确认数字地图与真实庭院的对应关系；常规跟随与状态查看保持竖屏，需要更大空间进行边界调整和发布前检查时切换至横屏，并在发布前检查边界、禁区、通道和未覆盖区域。', confidence: 'confirmed' },
        { title: '用任务状态驱动首页信息与操作优先级', summary: '将设备状态与任务状态分层表达，并根据待机、作业、回充和异常状态动态调整首页信息与操作优先级，让用户进入 App 后首先看到当前任务，减少重新寻找功能入口。', confidence: 'confirmed' },
      ],
    },

    keyDecisions: [
      { id: 1, title: '重构连续的设备激活流程', state: 'confirmed', problem: '设备安装与扫码绑定、Wi-Fi 连接和设备准备分散在多个页面中。用户需要在不同步骤之间自行建立关系，一旦流程中断，也很难判断应该从哪里继续。', decision: '将安装与绑定、联网和设备准备重新组织为一条连续的激活路径。界面同步呈现当前步骤、完成状态和下一步操作；任务中断后保留已完成进度，让用户能够从未完成节点继续，而不是重新进入整个流程。同时弱化不同连接机制之间的技术差异，让用户把注意力集中在当前任务和设备是否准备就绪。', reason: '把物理设备、网络环境和 App 配置收束成同一个目标：让机器人准备好开始工作。', alternative: { state: 'confirmed', text: '没有继续沿用“一个连接动作对应一个独立页面”的结构，避免把流程关系和失败后的恢复成本重新留给用户。' } },
      { id: 2, title: '把失败提示转化为可执行的恢复路径', state: 'confirmed', problem: '连接失败只展示结果时，用户很难判断问题究竟来自 Wi-Fi 或密码，还是信号、设备状态或连接距离，只能反复尝试或离开当前任务自行排查。', decision: '连接与设备异常统一采用“原因 + 当前状态 + 恢复操作”的反馈结构。在失败状态中直接说明问题原因，并结合当前网络或设备状态提供重新连接、检查设备或查看指引等对应操作，让用户尽量在原任务中完成恢复。', reason: '对于首次使用用户，任务能否继续取决于是否能立即判断下一步，错误信息本身的优先级更低。', alternative: { state: 'confirmed', text: '减少错误码和通用失败弹窗作为主要反馈方式。' } },
      { id: 3, title: '建立真实庭院与数字地图之间的稳定对应', state: 'confirmed', problem: '建图过程中，用户需要同时关注机器人位置与真实边界，以及障碍区域和地图变化。如果屏幕中的地图状态无法与现实空间及时对应，就很难判断当前建图是否正确。', decision: '在建图过程中持续呈现机器人位置、当前边界和建图进度，使用户能够边移动边确认数字地图与真实庭院的对应关系。常规跟随与状态查看保持竖屏操作，需要更大空间进行边界调整和发布前检查时切换至横屏；发布前进一步检查边界、禁区、通道和未覆盖区域。', reason: '界面优先表达空间关系和地图状态，而不是增加更多遥控操作。', alternative: { state: 'confirmed', text: '将整个建图过程固定为横屏，或把重点放在持续控制机器人移动。' } },
      { id: 4, title: '用任务状态驱动首页信息与操作优先级', state: 'confirmed', problem: '机器人可能处于待机或作业状态，也可能处于回充或异常状态，用户关注的信息和需要执行的操作完全不同。固定功能入口会让当前最重要的任务与普通功能处于同一层级。', decision: '将设备状态与任务状态分层表达，并根据当前任务动态调整首页的信息和操作优先级：待机优先展示开始割草、计划任务与地图相关操作；作业优先展示任务进度，并提供暂停、继续与回充；回充突出回充进度与设备当前状态；异常集中呈现异常原因、影响范围和对应恢复操作。', reason: '让用户进入 App 后首先看到当前任务，减少重新寻找功能入口。', alternative: { state: 'confirmed', text: '继续使用固定功能入口式首页，让所有状态共享同一组操作优先级。' } },
    ],
    decisionsNote: null,

    outcome: {
      quantitative: [],
      qualitative: [
        '完成从设备激活、扫码绑定到网络连接的接入链路，以及空间建图、任务控制与异常恢复等核心链路的高保真设计与关键交互原型。',
        '同步梳理设备连接与任务状态，以及异常反馈与恢复操作等关键交互规则，使不同流程中的状态表达和操作逻辑保持一致。',
        '除核心任务链路外，还完成认证、帮助内容和个人中心等基础模块的体验设计，保证首次使用到日常管理之间的体验连续性。',
      ],
      baselineNote: null,
    },

    competencies: [
      { dimension: '智能硬件体验设计', strength: 0, note: '将物理设备、网络环境、空间地图与移动端界面放在同一个体验系统中进行设计。' },
      { dimension: '复杂任务流设计', strength: 0, note: '从首次激活、设备连接、空间建图到任务执行和异常恢复，建立连续且可恢复的任务路径。' },
      { dimension: '交互与信息架构', strength: 0, note: '通过状态优先级、诊断反馈、任务进度和恢复机制降低复杂系统的理解成本。' },
      { dimension: 'UX / UI 设计', strength: 0, note: '针对户外使用场景处理可读性、触控反馈、状态表达、横竖屏切换与移动端高保真体验。' },
    ],
    disclaimer: null,

    reflection: {
      state: 'confirmed',
      methodology: [
        '智能硬件体验需要让用户持续把屏幕中的状态与真实设备、空间环境建立对应。',
        '设备连接、空间建图和异常恢复属于不同功能，但用户面对的是同一个问题：机器人现在处于什么状态，这个状态意味着什么，接下来应该做什么。',
        '后续方案围绕任务连续性、状态反馈和异常恢复重新组织核心链路。',
      ],
      lessonsIfRedo: { state: 'present' },
      note: '对于智能硬件产品，只有当用户能够理解设备正在发生什么，并在需要时快速介入，自动化体验才真正成立。',
    },
  },

  /* ================================================================
     Case 04 — Shopify Sidekick AI App
     Source: Shopify_Sidekick_AI_App_案例4_大厂标准重构版_去AI味.md
     ================================================================ */
  'sidekick-ai-app': {
    slug: 'sidekick-ai-app',
    priority: 'P0',
    featured: false,
    title: 'Shopify Sidekick AI App',
    nda: null,
    tags: ['体验探索', 'AI Agent', '移动端产品设计'],
    confidence: 'confirmed',
    role: '产品设计师（AI 方向）',
    timeline: '体验探索',
    platform: 'Shopify App × 实际用户商店（开店准备阶段）',
    industry: 'AI Agent · 移动端产品设计',
    team: '设计与研发团队',
    cardAccent: 'var(--card-accent-sidekick-agent)',
    coverImage: 'optimized/case-sidekick-ai-app.jpg',
    portfolioRole: '真实商业项目 · 内容已脱敏',
    narrativeHook: null,
    summary: '基于 Shopify App 与实际用户商店的开店准备场景，围绕店铺上线、商品修复和首页调整 3 类连续任务，重新组织 Sidekick 在移动端的状态判断与任务规划，以及执行确认与结果反馈，让商家能够持续理解当前状态、下一步行动，以及 AI 即将执行的变更。',
    publicSummary: '基于 Shopify App 与实际用户商店的开店准备场景，围绕店铺上线、商品修复和首页调整 3 类连续任务，重新组织 Sidekick 在移动端的状态判断与任务规划，以及执行确认与结果反馈，让商家能够持续理解当前状态、下一步行动，以及 AI 即将执行的变更。',
    cardMetrics: [],
    featuredMetrics: [],
    cardVisualPills: [
      { label: '状态判断', metric: '经营就绪' },
      { label: '任务规划', metric: '计划可解释' },
      { label: '执行反馈', metric: '结果可验证' },
    ],
    background: {
      state: 'confirmed',
      note: null,
      why: '在 Shopify App 的实际使用过程中，开店准备、商品修复和首页调整存在连续关联。\n\n支付是否可用、商店是否公开，商品是否可售以及库存是否正常，首页是否具备基础转化条件，最终都指向同一个核心问题：\n\n这家商店是否已经具备开始交易的条件？\n\nSidekick 已经能够通过对话帮助商家查询信息、生成建议并执行部分操作。但当任务开始跨越多个对象和步骤，并涉及真实数据修改时，经营状态和任务计划，以及关键确认与执行结果会持续堆叠在聊天流中。\n\n此时，「AI 能不能完成任务」仍然需要考虑，体验问题进一步集中在：\n\n商家能否快速理解当前经营状态，并在关键节点保持对 AI 行为的判断权和控制权。',
      targetUsers: '处于开店准备和早期运营阶段的 Shopify 商家。\n\n这类用户通常需要同时处理店铺设置与商品、库存，以及主题和内容等多类任务，但未必熟悉 Shopify 的完整后台结构。他们希望 AI 能够帮助发现问题、组织任务并完成部分操作，同时在涉及真实数据修改时保留明确的确认权。',
      businessGoals: '围绕「商店进入可交易状态」这一核心目标，探索 Sidekick 在移动端承担连续经营任务时更合适的交互方式：\n\n- 快速识别影响交易的关键阻塞；\n- 将零散问题组织为有优先级的任务计划；\n- 解释任务为什么新增、调整或改变顺序；\n- 在真实数据修改前提供充分的决策信息；\n- 将工具执行结果转译为商家能够理解的业务反馈；\n- 保证关键操作可查看、可确认，并具备明确的恢复路径。',
      constraints: [
        '基于 Shopify App × 实际用户商店的开店准备阶段进行完整体验走查',
        '任务 1｜检查上线条件：支付、公开访问、店铺政策与基础销售条件',
        '任务 2｜修复商品状态：库存、媒体、无标题草稿及商品可售性',
        '任务 3｜规划首页调整：读取主题结构、检查商品状态与商业信息，并规划有限范围内的首页调整',
        '本轮不纳入订单、发货、退款、真实支付提交，以及复杂主题代码编辑',
      ],
    },
    challenge: {
      state: 'confirmed',
      userProblem: '状态缺少业务层级\n\n现有任务主要通过通用待办与聊天消息持续展开。用户能够看到「还有事情没有完成」，但很难快速判断商店现在能否开始交易、哪些问题会直接阻塞上线、哪些问题属于后续优化，以及当前最应该先处理哪一项。\n\n计划变化缺少解释\n\n随着 Sidekick 持续读取商店信息，任务数量和顺序可能发生变化。任务增加本身并不是问题，真正影响信任的是用户无法理解为什么增加、新任务来自什么信息、是否影响当前目标，以及为什么需要现在处理。\n\n执行确认信息不足\n\n当 AI 从「提供建议」进入「修改真实数据」阶段，仅提供一个确认按钮并不足以支撑用户决策。用户需要知道修改哪个商品、当前库存是多少、修改后的库存是多少、修改发生在哪个库存地点、哪些字段不会受到影响，以及如果结果不符合预期如何恢复。\n\n执行结果偏向系统表达\n\n部分操作完成后，结果仍然以工具状态、英文日志、JSON 或内部标识呈现。这些信息能够证明系统执行过，却没有直接回答用户真正关心的问题：事情是否已经处理完成？当前状态是什么？接下来还需要做什么？',
      businessProblem: '聊天流同时承载经营状态、任务计划、关键确认与执行结果，商家无法稳定识别经营阻塞、理解计划变化、判断真实数据修改并核验操作结果。',
      designChallenge: '先建立经营状态判断，再展开具体任务；让计划变化可解释；让真实数据修改可判断；让执行结果可验证，并将这些环节组织成一条可预测、可控制、可恢复的 Agent 任务链路。',
    },
    myRole: {
      responsibilities: [
        { task: '体验走查', contribution: '独立负责', detail: '基于 Shopify App 与实际用户商店，对开店准备、商品修复和首页调整 3 类连续任务进行完整走查，记录经营状态识别、计划变化、信息补充、执行确认和结果反馈中的关键断点。', confidence: 'confirmed' },
        { task: '问题定义', contribution: '独立负责', detail: '将零散问题重新组织为围绕「商店能否开始交易」展开的连续经营任务，明确店铺经营就绪、商品就绪、动态计划、执行确认与结果反馈之间的关系。', confidence: 'confirmed' },
        { task: '交互架构', contribution: '独立负责', detail: '设计从状态诊断、任务规划、信息补充、执行确认到结果反馈的完整任务链路，使 AI 行为从连续聊天内容转变为可理解、可操作、可追踪的任务过程。', confidence: 'confirmed' },
        { task: '界面设计', contribution: '独立负责', detail: '针对移动端场景，将经营状态、任务优先级、变更内容、影响范围和执行结果转化为适合快速浏览与判断的信息界面。', confidence: 'confirmed' },
      ],
      note: null,
    },
    designApproach: {
      state: 'confirmed',
      note: null,
      phases: [
        { title: '状态先于任务', summary: '先回答「现在是否具备交易条件」，再告诉用户「接下来需要处理什么」。避免将所有待办放在同一层级，优先建立业务状态和问题优先级。', confidence: 'confirmed' },
        { title: '计划必须可解释', summary: '任务新增、删除、调整顺序或改变优先级时，同步说明变化原因和判断依据。用户还应理解计划为什么发生变化。', confidence: 'confirmed' },
        { title: '执行必须可判断', summary: '涉及真实数据修改时，确认界面明确展示对象、前后差异、影响范围和不受影响的内容。用户确认的是一次具体变更，而不是抽象的「允许 AI 执行」。', confidence: 'confirmed' },
        { title: '结果必须可验证', summary: '操作完成后，将底层工具响应转化为用户能够理解的业务结果，并同步更新相关任务状态。', confidence: 'confirmed' },
      ],
    },
    keyDecisions: [
      { id: 1, title: '店铺经营就绪检查', state: 'confirmed', problem: '现有任务以通用待办方式展示，例如 0 / 5。不同事项之间缺少业务优先级，用户虽然知道还有任务没有完成，却无法快速判断这些任务是否会直接影响交易。', decision: '建立店铺经营就绪检查（Store Readiness Check），先判断商店是否具备开始交易的必要条件，再进入商品和页面层面的进一步优化；将结果按交易阻塞 → 需要处理 → 可继续优化组织。', reason: '先建立经营状态判断，再展开具体任务。', alternative: { state: 'confirmed', text: '继续以同权重的通用 Checklist 展示所有检查项。' } },
      { id: 2, title: '动态任务计划', state: 'confirmed', problem: '随着系统持续读取商店状态，任务数量和优先级会发生变化，但聊天流无法稳定说明计划为什么改变。', decision: '将静态任务清单升级为动态任务计划（Dynamic Plan），每次新增或调整任务时同步呈现任务变化、优先级、变化原因、判断依据、是否阻塞当前目标和下一步行动。', reason: 'AI 可以调整计划，但不能无解释地改变计划。', alternative: { state: 'confirmed', text: '让任务数量和顺序随数据变化自动更新，但不提供变化解释。' } },
      { id: 3, title: '商品经营就绪规则', state: 'confirmed', problem: '单纯判断商品是否存在库存，并不能代表商品已经具备销售条件。库存、商品状态、媒体完整度和基础信息缺失，对交易的影响程度并不相同。', decision: '将商品检查拆分为交易条件与展示质量两个维度：优先处理可售状态、有效库存、库存地点与基础销售条件，再处理标题、媒体、基础描述和页面展示完整性。', reason: '避免 AI 将所有“不完整”统一判断为同等级问题。', alternative: { state: 'confirmed', text: '将所有商品信息缺失视为同等级问题，并按后台模块逐项处理。' } },
      { id: 4, title: '分级信息收集', state: 'confirmed', problem: '执行任务前可能缺少库存地点、目标商品、主题区块或其他必要信息。一次性补齐会增加任务开始时间，完全交给 AI 猜测又会提高误操作风险。', decision: '根据信息是否影响当前任务执行，将信息分为阻塞信息与非阻塞信息：阻塞信息缺失时暂停执行，非阻塞信息随任务推进逐步补充。', reason: '只在真正影响当前执行时打断用户，其余信息逐步补充。', alternative: { state: 'confirmed', text: '要求用户在任务开始前一次性补齐全部信息。' } },
      { id: 5, title: '结构化执行确认', state: 'confirmed', problem: '原有确认仅展示商品名称、目标数字和操作按钮，用户无法完整判断本次修改的实际影响。', decision: '在库存等真实数据修改前增加结构化确认卡片，明确展示商品、库存变化、库存地点、本次修改、不会修改的字段和恢复方式。', reason: '让用户明确回答改什么、改成什么、影响哪里、哪些内容不会改变。', alternative: { state: 'confirmed', text: '继续只展示商品名称、目标数字和确认按钮。' } },
      { id: 6, title: '业务结果回执', state: 'confirmed', problem: '工具调用完成后，原始反馈可能包含系统状态、内部字段和结构化数据，无法直接帮助商家判断经营任务是否完成。', decision: '增加结果回执（Result Receipt），将工具结果转译为执行结果、当前状态和下一步行动三层信息。', reason: '系统执行成功并不等于用户已经理解任务结果。', alternative: { state: 'confirmed', text: '直接展示工具原始响应、英文日志、JSON 或内部标识。' } },
      { id: 7, title: '主题调整前置诊断与改动预览', state: 'confirmed', problem: '首页调整很容易直接进入内容生成和页面修改，但主题结构、商品状态和商业信息并不一定已经准备完整。', decision: '在首页调整前完成读取主题结构、检查商品状态、校验商业信息三步诊断；实际改动采用移动端轻量预览，只展示修改区块、当前状态、调整后状态、影响范围、保留内容和执行确认。', reason: '移动端 Sidekick 不需要复制完整的 Theme Editor，更适合承担范围明确、影响可预览、结果可恢复的轻量调整任务。', alternative: { state: 'confirmed', text: '将完整 Theme Editor 搬到移动端，或直接执行所有首页修改。' } },
    ],
    decisionsNote: null,
    outcome: {
      quantitative: [],
      qualitative: [
        '核心体验闭环：识别经营状态 → 判断关键阻塞 → 生成任务计划 → 补齐必要信息 → 展示变更范围 → 用户确认 → AI 执行 → 返回业务结果 → 更新经营状态。',
        '验证场景：检查商店上线条件、修复商品与库存问题、规划并预览首页调整。',
        '验证重点：状态是否清楚、计划是否可理解、修改是否可判断、结果是否可确认。',
        '设计产出：店铺经营就绪检查、动态任务计划、商品经营就绪规则、分级信息收集、结构化执行确认、业务结果回执、主题调整前置诊断与轻量改动预览。',
        '体验价值：从回答问题转向推进经营任务；从告诉用户做什么转向解释为什么这样做；从确认操作转向判断变更影响；从工具执行成功转向用户确认业务结果。',
      ],
      baselineNote: null,
    },
    competencies: [
      { dimension: 'Agent 任务架构', strength: 0, note: '将状态判断、任务计划、确认、执行和结果反馈组织为连续的移动端任务链路。' },
      { dimension: 'AI 可解释交互', strength: 0, note: '解释任务新增、调整和排序变化的原因与判断依据。' },
      { dimension: '安全执行设计', strength: 0, note: '在真实数据修改前展示对象、差异、影响范围和恢复方式。' },
      { dimension: '业务结果转译', strength: 0, note: '将工具响应转化为商家能够理解、核验和继续处理的业务反馈。' },
    ],
    disclaimer: null,
    reflection: {
      state: 'confirmed',
      methodology: [
        '对话适合表达意图、解释原因和处理不确定信息；任务界面更适合承载经营状态、任务计划、执行确认和结果反馈。',
        '当 AI 持续读取业务状态、修改真实数据并推进多个步骤时，仅靠聊天流很难同时满足信息可见性、任务连续性和执行可控性。',
        '将用户提问 → AI 回答，重构为用户提出经营目标 → AI 判断状态 → 形成计划 → 用户确认关键变更 → AI 执行 → 系统反馈结果 → 更新任务状态。',
      ],
      lessonsIfRedo: { state: 'present' },
      note: 'Agent 体验的核心，是让用户在整个任务过程中持续理解目标和状态，以及变更范围与执行结果，并知道自己应该在什么时候介入。把更多能力塞进聊天窗口不是本项目的重点。',
    },
  },
};

/** Helper: get ordered array of case slugs for iteration */
export const caseOrder = ['sidekick', 'sidekick-agent', 'lowcode', 'sidekick-ai-app', 'novabot', 'template'];

/** Metrics temporarily withheld from public presentation; retain source data for later restoration. */
export const hiddenMetricValues = ['↓50%', '↓60%', '↑30–45%', '70%+', '70%', '↓30%'];

export function hasHiddenMetric(value) {
  return hiddenMetricValues.some((metric) => String(value).includes(metric));
}

/** Helper: get case by slug */
export function getCase(slug) {
  return cases[slug] || null;
}
