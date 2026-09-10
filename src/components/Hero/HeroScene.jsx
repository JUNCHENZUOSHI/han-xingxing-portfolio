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
