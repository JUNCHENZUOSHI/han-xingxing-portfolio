import ConstellationBackground from '../ConstellationBackground/ConstellationBackground';

export default function HeroScene() {
  const heroBase = `${import.meta.env.BASE_URL}hero/`;
  const heroImageSizes = '(max-width: 700px) min(149.5vw, 585px), min(55.9vw, 806px)';

  return (
    <div className="hero__scene" aria-hidden="true">
      <div className="hero__background"><div className="hero__floor" /></div>
      <div className="hero__intro-light" aria-hidden="true"><i /><i /></div>
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
        <div className="hero-art-motion">
        <svg className="hero__contour-scan" viewBox="0 0 3652 3072" aria-hidden="true" focusable="false">
          <defs>
            <filter id="hero-scan-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <g className="hero__contour-scan__glow" filter="url(#hero-scan-glow)">
            <path pathLength="1" d="M1675 455 C1588 530 1550 640 1574 760 C1590 846 1548 910 1476 980 C1404 1050 1340 1114 1278 1210" />
            <path pathLength="1" d="M1675 455 C1765 528 1818 640 1800 760 C1787 842 1842 914 1916 986 C1984 1050 2040 1120 2100 1228" />
            <path pathLength="1" d="M1278 1210 C1188 1324 1114 1450 1038 1578 C980 1676 930 1768 900 1884 C872 2000 828 2118 742 2238" />
            <path pathLength="1" d="M2100 1228 C2190 1340 2250 1454 2320 1588 C2380 1700 2442 1816 2472 1938 C2498 2048 2570 2160 2670 2248" />
            <path pathLength="1" d="M742 2238 C700 2310 680 2380 704 2450 C728 2518 774 2560 842 2586" />
            <path pathLength="1" d="M2670 2248 C2726 2320 2770 2398 2752 2464 C2738 2520 2698 2566 2634 2590" />
          </g>
          <g className="hero__contour-scan__guardians">
            <path pathLength="1" d="M760 920 C654 842 574 770 504 672 C450 596 404 526 350 446" />
            <path pathLength="1" d="M730 1120 C626 1088 548 1032 484 952 C438 894 406 836 374 760" />
            <path pathLength="1" d="M2700 760 C2824 696 2938 650 3058 650 C3160 650 3236 688 3310 748" />
            <path pathLength="1" d="M2860 902 C2980 860 3082 864 3180 918 C3252 958 3304 1010 3348 1082" />
          </g>
        </svg>
        <img className="hero__visual__glow hero__visual__glow--guardians" src={`${heroBase}Guardian Group.png`} width="3652" height="3072" alt="" aria-hidden="true" draggable="false" />
        <img className="hero__visual__glow hero__visual__glow--brantley" src={`${heroBase}Brantley.png`} width="3652" height="3072" alt="" aria-hidden="true" draggable="false" />
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
        </div>
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
      <div className="hero__foreground"><i /><i /><i /></div>
    </div>
  );
}
