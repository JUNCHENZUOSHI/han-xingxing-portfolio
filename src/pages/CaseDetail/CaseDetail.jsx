import { useParams, Link } from 'react-router-dom';
import { useI18n } from '../../i18n/context';
import { getCase, caseOrder } from '../../data/cases';
import './CaseDetail.css';

function ConfidenceMarker({ state, note, children }) {
  if (!state || state === 'confirmed') return children;
  const className = `content-state content-state--${state}`;
  return (
    <>
      {note && (
        <div className={className}>
          <p className="content-state__note">{note}</p>
        </div>
      )}
      {children}
    </>
  );
}

export default function CaseDetail() {
  const { t } = useI18n();
  const { slug } = useParams();
  const caseData = getCase(slug);

  if (!caseData) {
    return (
      <section className="section">
        <div className="container">
          <p>Case not found.</p>
          <Link to="/" className="text-link">{t('case.back')}</Link>
        </div>
      </section>
    );
  }

  const currentIdx = caseOrder.indexOf(slug);
  const prevSlug = currentIdx > 0 ? caseOrder[currentIdx - 1] : null;
  const nextSlug = currentIdx < caseOrder.length - 1 ? caseOrder[currentIdx + 1] : null;

  return (
    <>
      {/* ── Title + Summary + Tags ── */}
      <section className="section">
        <div className="container">
          <div className="text-container">
            {caseData.nda && (
              <span className="badge badge--nda" style={{ marginBottom: 'var(--space-16)' }}>
                {caseData.nda.badge}
              </span>
            )}
            {caseData.portfolioRole && (
              <div className="content-state content-state--partial" style={{ marginTop: 'var(--space-8)' }}>
                <p className="content-state__note">{caseData.portfolioRole}</p>
              </div>
            )}
            {caseData.narrativeHook && (
              <p className="case-narrative-hook">{caseData.narrativeHook}</p>
            )}
            <h1 className="case-title">{caseData.title}</h1>
            <p className="case-subtitle">{caseData.summary}</p>
            <div className="case-tags">
              {caseData.tags.map((tag) => (
                <span className="tag" key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 01 Background ── */}
      <section className="section">
        <div className="container">
          <h2 className="section-heading">
            <span className="section-heading__number">01</span>{t('case.context')}
          </h2>
          <div className="text-container">
            <ConfidenceMarker state={caseData.background.state} note={caseData.background.note}>
              <h3 className="case-h3">Why This Project</h3>
              <p className="case-text">{caseData.background.why}</p>

              <h3 className="case-h3">Target Users</h3>
              <p className="case-text">{caseData.background.targetUsers}</p>

              <h3 className="case-h3">Business Goals</h3>
              <p className="case-text">{caseData.background.businessGoals}</p>

              <h3 className="case-h3">Constraints</h3>
              <ul className="case-list">
                {caseData.background.constraints.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </ConfidenceMarker>
          </div>
        </div>
      </section>

      {/* ── 02 Challenge ── */}
      <section className="section">
        <div className="container">
          <h2 className="section-heading">
            <span className="section-heading__number">02</span>{t('case.challenge')}
          </h2>
          <div className="text-container">
            <ConfidenceMarker state={caseData.challenge.state}>
              <h3 className="case-h3">User Problem</h3>
              <p className="case-text">{caseData.challenge.userProblem}</p>

              <h3 className="case-h3">Business Problem</h3>
              <p className="case-text">{caseData.challenge.businessProblem}</p>

              <h3 className="case-h3">Design Challenge</h3>
              <p className="case-text">{caseData.challenge.designChallenge}</p>
            </ConfidenceMarker>
          </div>
        </div>
      </section>

      {/* ── 03 My Role ── */}
      <section className="section">
        <div className="container">
          <h2 className="section-heading">
            <span className="section-heading__number">03</span>{t('case.role')}
          </h2>
          <div className="text-container">
            <div className="case-meta-grid">
              <div className="case-meta-item">
                <span className="case-meta-item__label">Role</span>
                <span className="case-meta-item__value">{caseData.role}</span>
              </div>
              <div className="case-meta-item">
                <span className="case-meta-item__label">Timeline</span>
                <span className="case-meta-item__value">{caseData.timeline}</span>
              </div>
              <div className="case-meta-item">
                <span className="case-meta-item__label">Platform</span>
                <span className="case-meta-item__value">{caseData.platform}</span>
              </div>
              <div className="case-meta-item">
                <span className="case-meta-item__label">Team</span>
                <span className="case-meta-item__value">{caseData.team}</span>
              </div>
            </div>

            <h3 className="case-h3">Responsibilities</h3>
            <table className="case-table">
              <thead>
                <tr>
                  <th>职责</th>
                  <th>贡献类型</th>
                  <th>具体内容</th>
                </tr>
              </thead>
              <tbody>
                {caseData.myRole.responsibilities.map((r, i) => (
                  <tr key={i}>
                    <td>{r.task}</td>
                    <td>
                      {r.contribution}
                      {r.confidence === 'unconfirmed' && (
                        <span className="content-state__inline-mark" title="贡献比例待本人确认"> ⚠️</span>
                      )}
                    </td>
                    <td>{r.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {caseData.myRole.note && (
              <p className="case-note">{caseData.myRole.note}</p>
            )}
          </div>
        </div>
      </section>

      {/* ── 04 Design Approach ── */}
      <section className="section">
        <div className="container">
          <h2 className="section-heading">
            <span className="section-heading__number">04</span>{t('case.approach')}
          </h2>
          <div className="text-container">
            {caseData.designApproach.state === 'empty' && (
              <div className="content-state content-state--empty">
                <p className="content-state__note">
                  🚧 设计过程材料待补充。以下为通用设计流程框架，具体方法、关键发现和产出物将在原始材料到位后填充。
                </p>
              </div>
            )}
            {caseData.designApproach.state === 'partial' && caseData.designApproach.note && (
              <div className="content-state content-state--inferred">
                <p className="content-state__note">{caseData.designApproach.note}</p>
              </div>
            )}
            {caseData.designApproach.phases.map((phase, i) => {
              const isString = typeof phase === 'string';
              const heading = isString ? phase : phase.title;
              const hasContent = !isString && phase.summary;
              const phaseState = caseData.designApproach.state;
              return (
                <div
                  className={`approach-phase${phaseState === 'empty' ? ' approach-phase--empty' : ''}`}
                  key={i}
                >
                  <h3 className="approach-phase__heading">
                    Phase {i + 1}: {heading}
                    {!isString && phase.confidence === 'inferred' && (
                      <span className="content-state__field-mark" title="基于结果反推的过程描述"> 🔮</span>
                    )}
                  </h3>
                  {hasContent && (
                    <p className="case-text">{phase.summary}</p>
                  )}
                  {phaseState === 'empty' && (
                    <p className="case-note">🚧 待补充</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 05 Key Decisions ── */}
      <section className="section">
        <div className="container">
          <h2 className="section-heading">
            <span className="section-heading__number">05</span>{t('case.solution')}
          </h2>

          {caseData.decisionsNote && (
            <div className="content-state content-state--partial">
              <p className="content-state__note">{caseData.decisionsNote}</p>
            </div>
          )}

          {caseData.keyDecisions.map((d) => (
            <div className="key-decision" key={d.id}>
              <span className="key-decision__number">Decision {String(d.id).padStart(2, '0')}</span>
              <h3 className="key-decision__title">{d.title}</h3>

              <div className="key-decision__block">
                <span className="key-decision__label">问题</span>
                <p className="key-decision__text">{d.problem}</p>
              </div>

              <div className="key-decision__block">
                <span className="key-decision__label">决策</span>
                <p className="key-decision__text">{d.decision}</p>
              </div>

              <div className="key-decision__block">
                <span className="key-decision__label">理由</span>
                <p className="key-decision__text">{d.reason}</p>
              </div>

              <div className="key-decision__block">
                <span className="key-decision__label">替代方案</span>
                {d.alternative.state === 'unconfirmed' ? (
                  <p className="key-decision__text key-decision__text--alternative">
                    {d.alternative.text}
                  </p>
                ) : (
                  <p className="key-decision__text key-decision__text--alternative">
                    {d.alternative.text}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 06 Outcome ── */}
      <section className="section">
        <div className="container">
          <h2 className="section-heading">
            <span className="section-heading__number">06</span>{t('case.impact')}
          </h2>
          <div className="text-container">
            <h3 className="case-h3">Quantitative Results</h3>
            {caseData.outcome.quantitative.map((m, i) => (
              <div className="metric-bar metric-bar--baseline-missing" key={i}>
                <span className="metric-bar__label">{m.label}</span>
                <span className="metric-bar__after">{m.after}</span>
                <span className="metric-bar__note">基线数据缺失，变化幅度为估算值</span>
              </div>
            ))}
            <p className="case-note">{caseData.outcome.baselineNote}</p>

            <h3 className="case-h3">Qualitative Results</h3>
            <ul className="case-list">
              {caseData.outcome.qualitative.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 07 Reflection ── */}
      <section className="section">
        <div className="container">
          <h2 className="section-heading">
            <span className="section-heading__number">07</span>Reflection
          </h2>
          <div className="text-container">

            {/* Reusable Methodology — from confirmed data */}
            {caseData.reflection.methodology.length > 0 && (
              <>
                <h3 className="case-h3">Reusable Methodology</h3>
                <ul className="case-list">
                  {caseData.reflection.methodology.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </>
            )}

            {/* Lessons & If Redo — empty state */}
            {caseData.reflection.lessonsIfRedo.state === 'empty' && (
              <div className="content-state content-state--empty">
                <p className="content-state__note">
                  🚧 项目经验教训与「如果重做」反思待补充。
                </p>
              </div>
            )}

            {caseData.reflection.note && (
              <p className="case-note">{caseData.reflection.note}</p>
            )}
          </div>
        </div>
      </section>

      {/* ── 08 What This Demonstrates ── */}
      <section className="section">
        <div className="container">
          <h2 className="section-heading">
            <span className="section-heading__number">08</span>What This Demonstrates
          </h2>
          <div className="text-container">
            <table className="case-table">
              <thead>
                <tr>
                  <th>能力维度</th>
                  <th>证据强度</th>
                  <th>说明</th>
                </tr>
              </thead>
              <tbody>
                {caseData.competencies.map((c, i) => (
                  <tr key={i}>
                    <td>{c.dimension}</td>
                    <td>{'⭐'.repeat(c.strength)}</td>
                    <td>{c.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="capability-disclaimer">
              <p><strong>本案例不能证明：</strong>{caseData.disclaimer}</p>
            </div>

            <nav className="case-nav">
              {prevSlug ? (
                <Link to={`/case/${prevSlug}`} className="text-link">← Previous Case</Link>
              ) : <span />}
              <Link to="/" className="text-link">All Cases</Link>
              {nextSlug ? (
                <Link to={`/case/${nextSlug}`} className="text-link">Next Case →</Link>
              ) : <span />}
            </nav>
          </div>
        </div>
      </section>
    </>
  );
}
