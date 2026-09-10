import ConstellationBackground from '../ConstellationBackground/ConstellationBackground';

export default function HeroScene() {
  const heroBase = `${import.meta.env.BASE_URL}hero/`;
  const heroImageSizes = '(max-width: 700px) min(149.5vw, 585px), min(55.9vw, 806px)';

  return (
    <div className="hero__scene" aria-hidden="true">
      <div className="hero__background"><div className="hero__floor" /></div>
      <div className="hero__atmosphere">
        <div className="hero__fog" />
        <div className="hero__dust">{Array.from({ length: 28 }, (_, i) => <i key={i} style={{ left: `${8 + i * 137 % 84}%`, top: `${12 + i * 71 % 64}%`, '--delay': `${-i * 1.7}s`, '--size': `${i % 5 === 0 ? 2 : 1}px` }} />)}</div>
      </div>
      <ConstellationBackground variant="hero-sides" />
      <div className="hero__visual">
        <div className="hero__grounding" aria-hidden="true">
          <i className="hero__grounding-shadow hero__grounding-shadow--collective" />
          <i className="hero__grounding-shadow hero__grounding-shadow--brantley" />
          <i className="hero__grounding-shadow hero__grounding-shadow--lion" />
          <i className="hero__grounding-shadow hero__grounding-shadow--scorpio" />
        </div>
        <picture>
          <source
            type="image/avif"
            srcSet={`${heroBase}Guardian%20Group-640.avif 640w, ${heroBase}Guardian%20Group-960.avif 960w, ${heroBase}Guardian%20Group-1600.avif 1600w, ${heroBase}Guardian%20Group.avif 3652w`}
            sizes={heroImageSizes}
          />
          <img
            className="hero__visual__guardians"
            src={`${heroBase}Guardian Group.png`}
            width="3652"
            height="3072"
            alt=""
            aria-hidden="true"
            draggable="false"
            decoding="async"
            loading="lazy"
          />
        </picture>
        <picture>
          <source
            type="image/avif"
            srcSet={`${heroBase}Brantley-640.avif 640w, ${heroBase}Brantley-960.avif 960w, ${heroBase}Brantley-1600.avif 1600w, ${heroBase}Brantley.avif 3652w`}
            sizes={heroImageSizes}
          />
          <img
            className="hero__visual__brantley"
            src={`${heroBase}Brantley.png`}
            width="3652"
            height="3072"
            alt=""
            aria-hidden="true"
            draggable="false"
            decoding="async"
            loading="eager"
            fetchpriority="high"
          />
        </picture>
        <div className="hero__reflection" aria-hidden="true">
          <picture>
            <source
              type="image/avif"
              srcSet={`${heroBase}Guardian%20Group-640.avif 640w, ${heroBase}Guardian%20Group-960.avif 960w, ${heroBase}Guardian%20Group-1600.avif 1600w, ${heroBase}Guardian%20Group.avif 3652w`}
              sizes={heroImageSizes}
            />
            <img className="hero__reflection__guardians" src={`${heroBase}Guardian Group.png`} width="3652" height="3072" alt="" draggable="false" />
          </picture>
          <picture>
            <source
              type="image/avif"
              srcSet={`${heroBase}Brantley-640.avif 640w, ${heroBase}Brantley-960.avif 960w, ${heroBase}Brantley-1600.avif 1600w, ${heroBase}Brantley.avif 3652w`}
              sizes={heroImageSizes}
            />
            <img className="hero__reflection__brantley" src={`${heroBase}Brantley.png`} width="3652" height="3072" alt="" draggable="false" />
          </picture>
        </div>
      </div>
      <svg className="hero__ai-path" viewBox="0 0 1000 900" preserveAspectRatio="none" focusable="false">
        <defs>
          <linearGradient id="hero-ai-path-fade" x1="0" y1="600" x2="0" y2="900" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#9cb1c8" stopOpacity="1" />
            <stop offset="42%" stopColor="#8ea5bc" stopOpacity=".5" />
            <stop offset="100%" stopColor="#788b9e" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g className="hero__ai-path-lines">
          <path pathLength="1" className="hero__ai-path-main" d="M600 600 C592 613 602 625 593 639" />
          <path pathLength="1" className="hero__ai-path-branch" style={{ '--path-delay': '2.35s', '--path-duration': '1.65s' }} d="M593 639 C558 655 543 680 508 691 C472 703 455 734 416 747 C375 761 353 790 310 805 C282 815 258 837 229 858" />
          <path pathLength="1" className="hero__ai-path-branch" style={{ '--path-delay': '2.55s', '--path-duration': '1.8s' }} d="M593 639 C626 653 643 677 677 689 C712 701 730 728 767 741 C807 755 827 785 868 800 C905 813 937 838 972 862" />
          <path pathLength="1" className="hero__ai-path-far" style={{ '--path-delay': '2.78s', '--path-duration': '1.55s' }} d="M677 689 C698 676 719 680 740 665 C762 650 785 655 807 643" />
        </g>
      </svg>
      <svg className="hero__system-texture" viewBox="0 0 1000 900" preserveAspectRatio="none" focusable="false">
        <g className="hero__system-links">
          <path d="M78 318 142 283 206 305 252 270" />
          <path d="M118 366 176 337 231 356" />
          <path d="M104 535h62m-62 0v44m62-44v22" />
        </g>
        <g className="hero__system-nodes">
          <circle cx="78" cy="318" r="2" /><circle cx="142" cy="283" r="1.5" /><circle cx="206" cy="305" r="1.2" /><circle cx="252" cy="270" r="1" />
          <circle cx="118" cy="366" r="1.4" /><circle cx="176" cy="337" r="1" /><circle cx="231" cy="356" r="1.6" />
        </g>
      </svg>
      <div className="hero__foreground"><i /><i /><i /></div>
    </div>
  );
}
