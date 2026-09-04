import { Link } from 'react-router-dom';
import { useI18n, useCaseI18n } from '../../i18n/context';
import { hasHiddenMetric } from '../../data/cases';
import './CaseCard.css';

export default function CaseCard({ caseData, variant = 'standard' }) {
  const { t } = useI18n();
  const localizedCase = useCaseI18n(caseData.slug);
  const caseI18n = ['sidekick', 'novabot'].includes(caseData.slug) ? {} : localizedCase;
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

  const displayTitle = ['sidekick', 'novabot'].includes(slug)
    ? title
    : caseI18n.title || t(`caseTitles.${slug}`) || title;
  const displaySummary = caseData.publicSummary || caseI18n.summary || summary;
  const displayTags = caseI18n.tags || tags;
  const displayNdaBadge = caseI18n.nda?.badge || nda?.badge;

  const isFeatured = variant === 'featured';
  const metrics = (isFeatured && featuredMetrics.length > 0
    ? featuredMetrics
    : cardMetrics).filter((metric) => !hasHiddenMetric(metric.value));
  const visibleVisualPills = cardVisualPills?.filter(
    (pill) => !hasHiddenMetric(pill.metric)
  );

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
        ) : visibleVisualPills && visibleVisualPills.length > 0 ? (
          <div className="case-card__visual-inner">
            <div className="capability-pills">
              {visibleVisualPills.map((pill) => (
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
            {displayNdaBadge}
          </span>
        )}
        <div className="case-card__tags">
          {displayTags.slice(0, isFeatured ? 4 : 2).map((tag) => (
            <span className="tag" key={tag}>{tag}</span>
          ))}
        </div>
        <h3 className="case-card__title">{displayTitle}</h3>
        <p className={summaryClass}>{displaySummary}</p>
        <div className="case-card__metrics">
          {metrics.slice(0, isFeatured ? 3 : 2).map((m) => (
            <span className="metric-value" key={m.label}>
              {m.value}
            </span>
          ))}
        </div>
        <span className="case-card__cta btn-secondary">{t('common.learnMore')}</span>
      </div>
    </Link>
  );
}
