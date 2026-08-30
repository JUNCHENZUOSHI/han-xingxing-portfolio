/**
 * WireframePlaceholder — line-frame mockups standing in for real product
 * screenshots. One distinct layout per capability (variant 0–4). Pure CSS
 * skeletons: gray bars, dashed borders, placeholder blocks and simple shapes.
 * Swap for real screenshots later.
 */
export default function WireframePlaceholder({ variant = 0 }) {
  switch (variant) {
    case 0: // UX Strategy — dashboard
      return (
        <div className="wf">
          <div className="wf__bar" />
          <div className="wf__body">
            <div className="wf__sidebar" />
            <div className="wf__main">
              <div className="wf__line wf__line--long" />
              <div className="wf__line wf__line--short" />
              <div className="wf__grid">
                <div className="wf__block" />
                <div className="wf__block" />
                <div className="wf__block" />
                <div className="wf__block" />
              </div>
            </div>
          </div>
        </div>
      );

    case 1: // Enterprise SaaS — data table
      return (
        <div className="wf">
          <div className="wf__bar" />
          <div className="wf__chips">
            <div className="wf__chip" />
            <div className="wf__chip" />
            <div className="wf__chip" />
          </div>
          <div className="wf__table">
            <div className="wf__row" />
            <div className="wf__row" />
            <div className="wf__row" />
            <div className="wf__row" />
          </div>
        </div>
      );

    case 2: // AI Product Experience — chat
      return (
        <div className="wf">
          <div className="wf__bar" />
          <div className="wf__chat">
            <div className="wf__bubble wf__bubble--left" />
            <div className="wf__bubble wf__bubble--right" />
            <div className="wf__bubble wf__bubble--left" />
          </div>
          <div className="wf__input" />
        </div>
      );

    case 3: // Design System — components
      return (
        <div className="wf">
          <div className="wf__bar" />
          <div className="wf__components">
            <div className="wf__btn" />
            <div className="wf__input-sm" />
            <div className="wf__toggle" />
            <div className="wf__chip" />
          </div>
        </div>
      );

    case 4: // Growth Design — metrics / funnel
      return (
        <div className="wf">
          <div className="wf__bar" />
          <div className="wf__metrics">
            <div className="wf__block" />
            <div className="wf__block" />
            <div className="wf__block" />
          </div>
          <div className="wf__chart">
            <div className="wf__circle" />
            <div className="wf__line wf__line--short" />
          </div>
        </div>
      );

    default:
      return null;
  }
}
