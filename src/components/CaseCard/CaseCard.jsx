import { Link } from 'react-router-dom';
import './CaseCard.css';

export default function CaseCard({ caseData, variant = 'standard' }) {
  const {
    slug,
    title,
    tags,
    summary,
    nda,
    cardAccent,
    coverImage,
    cardVisualPills,
    cardMetrics,
    featuredMetrics,
  } = caseData;

  const isFeatured = variant === 'featured';
  const metrics = isFeatured && featuredMetrics.length > 0
    ? featuredMetrics
    : cardMetrics;

  const summaryClass = isFeatured
    ? 'case-card__summary case-card__summary--expanded'
    : 'case-card__summary';

  return (
    <Link
      to={`/case/${slug}`}
      className={`case-card${isFeatured ? ' case-card--featured' : ''}`}
      style={{ '--card-accent': cardAccent }}
    >
      <div className={`case-card__visual${coverImage ? ' case-card__visual--has-image' : ''}`}>
        {coverImage ? (
          <img
            src={`${import.meta.env.BASE_URL}${coverImage}`}
            alt=""
            className="case-card__img"
            loading="lazy"
          />
        ) : cardVisualPills && cardVisualPills.length > 0 ? (
          <div className="case-card__visual-inner">
            <div className="capability-pills">
              {cardVisualPills.map((pill) => (
                <div className="capability-pill" key={pill.label}>
                  <span className="capability-pill__label">{pill.label}</span>
                  <span className="capability-pill__metric">{pill.metric}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="case-card__body">
        {nda && (
          <span className="badge badge--nda" style={{ marginBottom: 'var(--space-8)' }}>
            {nda.badge}
          </span>
        )}
        <div className="case-card__tags">
          {tags.slice(0, isFeatured ? 4 : 2).map((tag) => (
            <span className="tag" key={tag}>{tag}</span>
          ))}
        </div>
        <h3 className="case-card__title">{title}</h3>
        <p className={summaryClass}>{summary}</p>
        <div className="case-card__metrics">
          {metrics.slice(0, isFeatured ? 3 : 2).map((m) => (
            <span className="metric-value" key={m.label}>
              {m.value}
            </span>
          ))}
        </div>
        <span className="case-card__cta">View Case →</span>
      </div>
    </Link>
  );
}
