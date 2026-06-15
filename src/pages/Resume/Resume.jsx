import { profile } from '../../data/profile';
import './Resume.css';

const resumeData = {
  targetPosition: 'UX/交互设计师',
  salaryExpectation: '30–60K',
  targetCity: '上海',
  gender: '男',
  strengths: [
    {
      title: '业务主导与增长结果导向',
      desc: '拥有6年B端/SaaS全链路经验，深度理解业务模型与增长杠杆。尤其在跨境电商与Shopify生态中，成功主导以AI（如Shopify Sidekick）驱动业务增长的策略，能将设计目标与业务KPI（如转化率、效率、GMV）强关联，实现从体验优化到商业增长的闭环驱动。',
    },
    {
      title: '数据驱动与AI赋能决策',
      desc: '精通用户研究，擅长将ChatGPT/Claude/Gemini及Shopify Sidekick等AI工具深度融入洞察与决策流程。具备高数据敏感度，能主导构建涵盖AI输出质量、用户行为及业务结果的多层度量体系，通过数据验证提升方案确定性，并建立可持续的AI能力调优闭环。',
    },
    {
      title: '设计体系治理与资产化建设',
      desc: '主导Design System的搭建与跨端落地，所构建的体系全面支持AI生成逻辑与国际化扩展。通过组件抽象、规范沉淀，推动团队从"人力驱动"转向"体系驱动"，为全球化业务的快速迭代提供稳定基础设施。',
    },
    {
      title: '全链路体验设计与交付落地',
      desc: '具备从业务洞察到高保真交付的全链路能力。擅长将如Shopify Sidekick等复杂AI能力抽象、转化为直观高效的商家工作流，并与产研团队深度协作，确保智能体验的高质量落地与业务目标同步。',
    },
  ],
  experience: [
    {
      company: '艾德领客（上海）数字技术有限公司',
      role: '交互设计专家',
      period: '2023.06 – 至今',
      summary:
        '主导面向 Shopify 商家的跨境电商营销 SaaS 平台全链路体验设计。通过将 Shopify Sidekick 的生成式 AI、策略建议与自动化执行能力系统性融入广告创意、商品优化与店铺运营等关键增长链路，主导重构智能工作流、制定业务级 AI 应用策略，并建立体验–业务的量化与调优闭环，持续提升商家运营效率、投放效果与平台国际化竞争力。',
      achievements: [
        {
          title: 'AI 驱动效率与成本优化（效率 + ROI + Sidekick 落地）',
          desc: '基于 Shopify Sidekick 的生成式能力与智能建议机制，主导广告素材自动化项目，系统性重构"素材生成 → 投放配置"链路：创意准备效率整体提升 25%，其中 AI 自动生成流程贡献约 60% 的效率增幅；单次素材生产周期平均缩短约 4 小时，显著降低跨境投放过程中的人力成本与启动成本。',
        },
        {
          title: '全球化设计促进营收增长（国际化 + GMV 增长）',
          desc: '主导高转化 Shopify 模板站体系，通过跨文化验证、多市场数据反馈与 Sidekick 文案/素材建议自动化适配：客户平均首次购买转化率提升 8%；在北美/东南亚等重点市场带动初期 GMV 增长，为平台国际化增长提供直接业务贡献。',
        },
        {
          title: '体验基建赋能组织协同（DesignOps + 多语种基础设施）',
          desc: '从 0 到 1 搭建公司级 B 端设计系统，并全面支持 AI 生成逻辑：组件复用率达到 70%；国际化版本的设计迭代周期缩短 30%。',
        },
      ],
      responsibilities: [
        '围绕跨境商家在营销、分析与日常运营中的关键痛点，将 Shopify Sidekick 的三类核心 AI 能力（内容生成、策略建议、自动化执行）抽象为可复用的 AI 能力模型，并系统性嵌入广告创建、商品优化与工作流自动化等关键路径。',
        '构建设计与 AI 体验评估体系，引入跨层级指标监控 Sidekick 的真实业务贡献：AI 质量层（生成一致性率、意图理解成功率、AI 建议可执行率、幻觉率控制）、体验行为层（AI 功能使用覆盖率、侧边栏 Sidekick 的主动触发率与任务成功率），建立从问题发现、数据诊断到 AI 能力微调的持续交付机制。',
        '主导构建并治理多语言、多市场适配的 B 端设计系统，全面兼容 AI 生成界面结构、文本变体与布局自动化能力，通过组件规范化、资产沉淀、国际化 token 体系与设计–开发联动流程，使跨团队协作效率大幅提升。',
      ],
    },
    {
      company: '上海博科资讯股份有限公司',
      role: '交互设计师',
      period: '2019.10 – 2023.06',
      summary:
        '负责公司核心低代码平台的智能体验策略、AI 能力规划与端到端交付。以生成式 AI、语义化模型和数据体系为底座，将高复杂度企业配置、业务编排和操作链路抽象为可规模化复用的智能平台能力，显著提升平台易用性、构建效率与跨行业拓展能力。',
      achievements: [
        {
          title: 'AI 驱动的构建效率提升（核心业务 KPI）',
          desc: '引入生成式 AI 与行为意图识别，重构"页面搭建-组件选择-逻辑配置"全链路：典型应用构建效率提升 30–45%；智能模板推荐命中率提升至 70%+；用户满意度（NPS/CSAT）提升 10–15%。',
        },
        {
          title: '从 0 到 1 构建平台级智能体验体系（Design × AI Scorecard）',
          desc: '建立覆盖关键场景的 AI 能力清单、指标体系（Precision、Coverage、Confidence）及可解释性规则，并与业务 KPI 深度挂钩：关键任务完成率提升 15%+；用户错误率下降 20%；实现 AI 体验"效果可度量、优化可追踪"。',
        },
        {
          title: '智能化设计系统（AI 生成 × 组件化架构）',
          desc: '升级设计系统为"AI 可生成/AI 可理解"的双向语义体系，构建覆盖 60+ 组件的语义设计系统：AI 自动生成界面准确率提升 25–30%；设计–研发一致性提升 30%。',
        },
        {
          title: '跨团队推动 AI 战略落地（PM × FE × AI Lab）',
          desc: '主导平台级 AI 体验策略与交互模式基线制定，构建 AI 安全与反馈机制，通过共创推进页面构建、业务编排与配置托管等核心场景的智能化改造：整体产研协作效率提升 20–25%。',
        },
      ],
    },
  ],
  education: {
    school: '南京大学',
    degree: '本科',
    major: '人力资源',
    period: '2018 – 2022',
  },
};

export default function Resume() {
  return (
    <section className="section">
    <div className="resume-page">
      {/* ═══════════════════════════════════════════════════════════
          Print Header — visible only when printing
          ═══════════════════════════════════════════════════════════ */}
      <header className="resume-print-header">
        <h1>{t('common.name')}</h1>
        <p>
          {resumeData.targetPosition} · {resumeData.salaryExpectation} · {resumeData.targetCity}
          &nbsp;|&nbsp; {resumeData.gender} · {profile.age}{t('common.name') === 'Han Xingxing' ? '' : '岁'} · {profile.phone} · {profile.email}
        </p>
      </header>

      {/* ═══════════════════════════════════════════════════════════
          Screen Header
          ═══════════════════════════════════════════════════════════ */}
      <header className="resume-header no-print">
        <h1 className="resume-header__name">{t('common.name')}</h1>
        <p className="resume-header__title">
          {resumeData.targetPosition}&nbsp;&nbsp;·&nbsp;&nbsp;
          {profile.yearsOfExperience}年工作经验&nbsp;&nbsp;·&nbsp;&nbsp;
          {resumeData.targetCity}
        </p>
        <p className="resume-header__meta">
          <span>{resumeData.gender}</span>
          <span>{profile.age}岁</span>
          <span>{profile.phone}</span>
          <span>{profile.email}</span>
          <span>期望薪资：{resumeData.salaryExpectation}</span>
        </p>
        <p className="resume-header__status">
          📍 {profile.location} · {profile.status}
        </p>
      </header>

      {/* ═══════════════════════════════════════════════════════════
          Strengths
          ═══════════════════════════════════════════════════════════ */}
      <section className="resume-section">
        <h2 className="resume-section__heading">个人优势</h2>
        <p className="resume-section__summary">
          6年资深B端/SaaS产品设计专家，擅长以AI驱动业务增长，主导复杂系统与全球化产品的全链路策略与设计体系构建。
        </p>
        <ol className="resume-strengths">
          {resumeData.strengths.map((s, i) => (
            <li key={i} className="resume-strength-item">
              <strong>{s.title}：</strong>
              {s.desc}
            </li>
          ))}
        </ol>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          Experience
          ═══════════════════════════════════════════════════════════ */}
      <section className="resume-section">
        <h2 className="resume-section__heading">工作经历</h2>
        {resumeData.experience.map((exp, i) => (
          <div key={i} className="resume-experience">
            <div className="resume-experience__header">
              <h3 className="resume-experience__company">{exp.company}</h3>
              <span className="resume-experience__role">{exp.role}</span>
              <span className="resume-experience__period">{exp.period}</span>
            </div>
            <p className="resume-experience__summary">{exp.summary}</p>

            {exp.achievements && exp.achievements.length > 0 && (
              <div className="resume-experience__block">
                <h4 className="resume-experience__block-title">核心成果与价值量化</h4>
                <ol className="resume-achievements">
                  {exp.achievements.map((a, j) => (
                    <li key={j}>
                      <strong>{a.title}</strong>
                      <p>{a.desc}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {exp.responsibilities && exp.responsibilities.length > 0 && (
              <div className="resume-experience__block">
                <h4 className="resume-experience__block-title">关键职责与能力沉淀</h4>
                <ol className="resume-responsibilities">
                  {exp.responsibilities.map((r, j) => (
                    <li key={j}>{r}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* ═══════════════════════════════════════════════════════════
          Education
          ═══════════════════════════════════════════════════════════ */}
      <section className="resume-section">
        <h2 className="resume-section__heading">教育经历</h2>
        <div className="resume-education">
          <span className="resume-education__school">{resumeData.education.school}</span>
          <span>{resumeData.education.degree}</span>
          <span>{resumeData.education.major}</span>
          <span className="resume-education__period">{resumeData.education.period}</span>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          Download CTA (screen only)
          ═══════════════════════════════════════════════════════════ */}
      <section className="resume-section no-print">
        <div className="resume-download-cta">
          <p>需要 PDF 版本？</p>
          <a href={`${import.meta.env.BASE_URL}resume.pdf`} className="btn-primary" download>
            Download Resume (PDF)
          </a>
        </div>
      </section>
    </div>
    </section>
  );
}
