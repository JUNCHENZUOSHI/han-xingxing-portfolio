import { useParams, Link } from 'react-router-dom';
import { useI18n, useCaseI18n } from '../../i18n/context';
import { getCase, caseOrder } from '../../data/cases';
import './CaseDetail.css';

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

export default function CaseDetail() {
  const { t } = useI18n();
  const { slug } = useParams();
  const caseData = getCase(slug);
  const caseI18n = useCaseI18n(slug);

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
  const displayTitle = caseI18n.title || t(`caseTitles.${slug}`) || caseData.title;
  const displaySummary = ci('summary', caseData.summary);
  const displayTags = ci('tags', caseData.tags);
  const displayBackgroundWhy = ci('background.why', caseData.background.why);
  const displayBackgroundTargetUsers = ci('background.targetUsers', caseData.background.targetUsers);
  const displayBackgroundBusinessGoals = ci('background.businessGoals', caseData.background.businessGoals);
  const displayBackgroundConstraints = ci('background.constraints', caseData.background.constraints);
  const displayChallengeUserProblem = ci('challenge.userProblem', caseData.challenge.userProblem);
  const displayChallengeBusinessProblem = ci('challenge.businessProblem', caseData.challenge.businessProblem);
  const displayChallengeDesignChallenge = ci('challenge.designChallenge', caseData.challenge.designChallenge);
  const displayMyRoleNote = ci('myRole.note', caseData.myRole.note);
  const displayApproachNote = ci('designApproach.note', caseData.designApproach.note);
  const displayBaselineNote = ci('outcome.baselineNote', caseData.outcome.baselineNote);
  const displayDisclaimer = ci('disclaimer', caseData.disclaimer);
  const displayReflectionNote = ci('reflection.note', caseData.reflection.note);

  // Merge array fields by index
  const responsibilities = caseData.myRole.responsibilities.map((r, i) => ({
    task: ci(`myRole.responsibilities.${i}.task`, r.task),
    contribution: ci(`myRole.responsibilities.${i}.contribution`, r.contribution),
    detail: ci(`myRole.responsibilities.${i}.detail`, r.detail),
    confidence: r.confidence,
  }));

  const phases = caseData.designApproach.phases.map((p, i) => ({
    title: ci(`designApproach.phases.${i}.title`, p.title),
    summary: ci(`designApproach.phases.${i}.summary`, p.summary),
    confidence: p.confidence,
  }));

  const keyDecisions = caseData.keyDecisions.map((d, i) => ({
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

  const outcomeQuant = caseData.outcome.quantitative.map((m, i) => ({
    ...m,
    label: ci(`outcome.quantitative.${i}.label`, m.label),
    note: ci(`outcome.quantitative.${i}.note`, m.note || ''),
  }));

  const outcomeQual = caseData.outcome.qualitative.map((item, i) =>
    ci(`outcome.qualitative.${i}`, item)
  );

  const competencies = caseData.competencies.map((c, i) => ({
    ...c,
    dimension: ci(`competencies.${i}.dimension`, c.dimension),
    note: ci(`competencies.${i}.note`, c.note),
  }));

  const reflectionMethodology = caseData.reflection.methodology.map((item, i) =>
    ci(`reflection.methodology.${i}`, item)
  );

  return (
    <div className="cd-page">
      {/* ═══════════════════════════════════════
          Hero
          ═══════════════════════════════════════ */}
      <section className="cd-hero">
        <div className="container">
          <div className="cd-hero__badge-row">
            {caseData.nda && (
              <span className="cd-hero__nda-badge">{displayNdaBadge}</span>
            )}
          </div>

          {displayPortfolioRole && (
            <div className="cd-content-note cd-content-note--partial" style={{ marginBottom: 'var(--space-24)' }}>
              <p>{displayPortfolioRole}</p>
            </div>
          )}

          {displayNarrativeHook && (
            <p className="cd-hero__hook">{displayNarrativeHook}</p>
          )}

          <h1 className="cd-hero__title">{displayTitle}</h1>
          <p className="cd-hero__subtitle">{displaySummary}</p>

          <div className="cd-hero__tags">
            {displayTags.map((tag) => (
              <span className="cd-hero__tag" key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          Hero Image
          ═══════════════════════════════════════ */}
      {caseData.coverImage && (
        <div className="container">
          <img
            src={`${import.meta.env.BASE_URL}${caseData.coverImage}`}
            alt={caseData.title}
            className="cd-hero-img"
          />
        </div>
      )}

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
            <h3 className="cd-subheading">Why This Project</h3>
            <p className="cd-text">{displayBackgroundWhy}</p>

            <h3 className="cd-subheading">Target Users</h3>
            <p className="cd-text">{displayBackgroundTargetUsers}</p>

            <h3 className="cd-subheading">Business Goals</h3>
            <p className="cd-text">{displayBackgroundBusinessGoals}</p>

            <h3 className="cd-subheading">Constraints</h3>
            <ul className="cd-list">
              {displayBackgroundConstraints.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
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
            <h3 className="cd-subheading">User Problem</h3>
            <p className="cd-text">{displayChallengeUserProblem}</p>

            <h3 className="cd-subheading">Business Problem</h3>
            <p className="cd-text">{displayChallengeBusinessProblem}</p>

            <h3 className="cd-subheading">Design Challenge</h3>
            <p className="cd-text">{displayChallengeDesignChallenge}</p>
          </ConfidenceMarker>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          03 My Role
          ═══════════════════════════════════════ */}
      <section className="cd-section">
        <div className="container">
          <div className="cd-section-header">
            <span className="cd-section-header__number">03</span>
            <h2 className="cd-section-header__title">{t('case.role')}</h2>
          </div>

          {/* Meta Grid — Glass Bar */}
          <div className="cd-meta-grid">
            <div className="cd-meta-grid__item">
              <span className="cd-meta-grid__label">Role</span>
              <span className="cd-meta-grid__value">{caseData.role}</span>
            </div>
            <div className="cd-meta-grid__item">
              <span className="cd-meta-grid__label">Timeline</span>
              <span className="cd-meta-grid__value">{caseData.timeline}</span>
            </div>
            <div className="cd-meta-grid__item">
              <span className="cd-meta-grid__label">Platform</span>
              <span className="cd-meta-grid__value">{caseData.platform}</span>
            </div>
            <div className="cd-meta-grid__item">
              <span className="cd-meta-grid__label">Team</span>
              <span className="cd-meta-grid__value">{caseData.team}</span>
            </div>
          </div>

          <h3 className="cd-subheading">Responsibilities</h3>

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

          {displayMyRoleNote && (
            <p className="cd-note">{displayMyRoleNote}</p>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          04 Design Approach
          ═══════════════════════════════════════ */}
      <section className="cd-section">
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

          <div className="cd-phases">
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
                    Phase {i + 1}: {heading}
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
          </div>
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

          <div className="cd-decisions">
            {keyDecisions.map((d) => (
              <div className="cd-decision" key={d.id}>
                <span className="cd-decision__number">Decision {String(d.id).padStart(2, '0')}</span>
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
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          06 Outcome
          ═══════════════════════════════════════ */}
      <section className="cd-section">
        <div className="container">
          <div className="cd-section-header">
            <span className="cd-section-header__number">06</span>
            <h2 className="cd-section-header__title">{t('case.impact')}</h2>
          </div>

          <h3 className="cd-subheading">Quantitative Results</h3>

          <div className="cd-metrics-grid">
            {outcomeQuant.map((m, i) => (
              <div className="cd-metric-card" key={i}>
                <span className="cd-metric-card__value">{m.after}</span>
                <span className="cd-metric-card__label">{m.label}</span>
                <span className="cd-metric-card__note">{t('case.baselineMissing')}</span>
              </div>
            ))}
          </div>

          <p className="cd-note" style={{ marginTop: 0 }}>{displayBaselineNote}</p>

          <h3 className="cd-subheading">Qualitative Results</h3>
          <ul className="cd-qual-list">
            {outcomeQual.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          07 Reflection
          ═══════════════════════════════════════ */}
      <section className="cd-section">
        <div className="container">
          <div className="cd-section-header">
            <span className="cd-section-header__number">07</span>
            <h2 className="cd-section-header__title">Reflection</h2>
          </div>

          {/* Reusable Methodology */}
          {reflectionMethodology.length > 0 && (
            <>
              <h3 className="cd-subheading">Reusable Methodology</h3>
              <ul className="cd-qual-list" style={{ marginBottom: 'var(--space-40)' }}>
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
            <p className="cd-note">{displayReflectionNote}</p>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          08 What This Demonstrates
          ═══════════════════════════════════════ */}
      <section className="cd-section">
        <div className="container">
          <div className="cd-section-header">
            <span className="cd-section-header__number">08</span>
            <h2 className="cd-section-header__title">What This Demonstrates</h2>
          </div>

          {/* Competency Grid */}
          <div className="cd-competency-grid">
            {competencies.map((c, i) => (
              <div className="cd-competency-card" key={i}>
                <div className="cd-competency-card__dimension">{c.dimension}</div>
                <div className="cd-competency-card__stars">{'⭐'.repeat(c.strength)}</div>
                <div className="cd-competency-card__note">{c.note}</div>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="cd-disclaimer">
            <p><strong>{t('case.doesNotDemonstrate')}</strong>{displayDisclaimer}</p>
          </div>

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
    </div>
  );
}