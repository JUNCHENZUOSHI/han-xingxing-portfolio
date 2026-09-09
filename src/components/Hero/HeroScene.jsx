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
      </div>
      <svg className="hero__ai-path" viewBox="0 0 1000 900" preserveAspectRatio="none" focusable="false">
        <defs>
          <radialGradient id="hero-ai-origin-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d6e5f3" stopOpacity=".26" />
            <stop offset="34%" stopColor="#9cb6cf" stopOpacity=".12" />
            <stop offset="100%" stopColor="#71869d" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hero-ai-path-fade" x1="0" y1="646" x2="0" y2="1322" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#9cb1c8" stopOpacity="1" />
            <stop offset="46%" stopColor="#8ea5bc" stopOpacity=".72" />
            <stop offset="76%" stopColor="#8499ae" stopOpacity=".42" />
            <stop offset="100%" stopColor="#788b9e" stopOpacity=".16" />
          </linearGradient>
        </defs>
        <circle className="hero__ai-path-origin-glow" cx="472" cy="646" r="18" />
        <g className="hero__ai-path-lines">
          <path pathLength="1" className="hero__ai-path-main" d="M472 646 C466 670 483 687 474 710 C466 730 480 744 468 766" />
          <path pathLength="1" className="hero__ai-path-branch" style={{ '--path-delay': '2.42s', '--path-duration': '2.2s' }} d="M468 766 C430 773 418 801 378 812 C337 824 325 858 282 875 C241 892 226 930 184 953 C143 976 132 1021 91 1048 C54 1072 31 1111 8 1164" />
          <path pathLength="1" className="hero__ai-path-branch" style={{ '--path-delay': '2.72s', '--path-duration': '2s' }} d="M378 812 C354 790 326 786 300 767 C270 744 242 754 212 739 C178 722 145 735 109 718 C79 704 51 711 21 694" />
          <path pathLength="1" className="hero__ai-path-far" style={{ '--path-delay': '3.12s', '--path-duration': '2.1s' }} d="M282 875 C264 910 233 921 218 957 C201 998 168 1015 150 1054 C131 1095 97 1126 75 1182 C63 1211 57 1236 49 1272" />
          <path pathLength="1" className="hero__ai-path-far" style={{ '--path-delay': '3.38s', '--path-duration': '1.8s' }} d="M184 953 C208 978 211 1014 237 1038 C266 1065 262 1102 288 1134 C310 1161 309 1207 334 1251" />
          <path pathLength="1" className="hero__ai-path-branch" style={{ '--path-delay': '2.5s', '--path-duration': '2.35s' }} d="M468 766 C510 761 531 786 566 799 C604 813 620 847 659 861 C699 875 716 910 754 930 C790 949 805 987 847 1005 C889 1023 916 1060 958 1081 C978 1091 990 1110 998 1137" />
          <path pathLength="1" className="hero__ai-path-branch" style={{ '--path-delay': '2.83s', '--path-duration': '2.15s' }} d="M566 799 C587 775 616 770 640 746 C666 720 699 729 725 706 C750 684 782 691 808 671 C833 652 864 661 892 640" />
          <path pathLength="1" className="hero__ai-path-far" style={{ '--path-delay': '3.18s', '--path-duration': '2.1s' }} d="M659 861 C641 895 650 928 635 960 C618 996 630 1035 615 1070 C599 1108 610 1150 590 1192 C578 1218 577 1248 571 1284" />
          <path pathLength="1" className="hero__ai-path-far" style={{ '--path-delay': '3.42s', '--path-duration': '2.25s' }} d="M754 930 C779 958 776 997 804 1023 C835 1052 831 1090 862 1121 C890 1149 889 1190 919 1225 C940 1250 954 1284 968 1322" />
          <path pathLength="1" className="hero__ai-path-far" style={{ '--path-delay': '3.62s', '--path-duration': '1.85s' }} d="M847 1005 C866 988 889 982 906 960 C925 936 950 937 968 917 C980 903 989 883 997 858" />
        </g>
        <g className="hero__ai-path-nodes">
          <circle className="hero__ai-path-origin" cx="472" cy="646" r="2.4" />
          <circle style={{ '--node-delay': '2.3s' }} cx="468" cy="766" r="1.55" />
          <circle style={{ '--node-delay': '2.72s' }} cx="378" cy="812" r="1.15" />
          <circle style={{ '--node-delay': '2.98s' }} cx="282" cy="875" r="1.3" />
          <circle style={{ '--node-delay': '3.2s' }} cx="184" cy="953" r=".92" />
          <circle style={{ '--node-delay': '3.48s' }} className="hero__ai-path-node--far" cx="91" cy="1048" r=".68" />
          <circle style={{ '--node-delay': '3.82s' }} className="hero__ai-path-node--far" cx="8" cy="1164" r=".48" />
          <circle style={{ '--node-delay': '3.24s' }} cx="300" cy="767" r=".82" />
          <circle style={{ '--node-delay': '3.58s' }} className="hero__ai-path-node--far" cx="109" cy="718" r=".58" />
          <circle style={{ '--node-delay': '3.72s' }} className="hero__ai-path-node--far" cx="150" cy="1054" r=".62" />
          <circle style={{ '--node-delay': '4.02s' }} className="hero__ai-path-node--far" cx="49" cy="1272" r=".42" />
          <circle style={{ '--node-delay': '3.55s' }} className="hero__ai-path-node--far" cx="237" cy="1038" r=".6" />
          <circle style={{ '--node-delay': '4.06s' }} className="hero__ai-path-node--far" cx="334" cy="1251" r=".44" />
          <circle style={{ '--node-delay': '2.75s' }} cx="566" cy="799" r="1.35" />
          <circle style={{ '--node-delay': '3.02s' }} cx="659" cy="861" r="1.05" />
          <circle style={{ '--node-delay': '3.26s' }} cx="754" cy="930" r="1.18" />
          <circle style={{ '--node-delay': '3.5s' }} cx="847" cy="1005" r=".78" />
          <circle style={{ '--node-delay': '3.82s' }} className="hero__ai-path-node--far" cx="958" cy="1081" r=".58" />
          <circle style={{ '--node-delay': '4.04s' }} className="hero__ai-path-node--far" cx="998" cy="1137" r=".42" />
          <circle style={{ '--node-delay': '3.16s' }} cx="640" cy="746" r=".88" />
          <circle style={{ '--node-delay': '3.5s' }} className="hero__ai-path-node--far" cx="808" cy="671" r=".55" />
          <circle style={{ '--node-delay': '3.76s' }} className="hero__ai-path-node--far" cx="892" cy="640" r=".48" />
          <circle style={{ '--node-delay': '3.62s' }} className="hero__ai-path-node--far" cx="615" cy="1070" r=".56" />
          <circle style={{ '--node-delay': '4.12s' }} className="hero__ai-path-node--far" cx="571" cy="1284" r=".4" />
          <circle style={{ '--node-delay': '3.7s' }} className="hero__ai-path-node--far" cx="862" cy="1121" r=".54" />
          <circle style={{ '--node-delay': '4.2s' }} className="hero__ai-path-node--far" cx="968" cy="1322" r=".4" />
          <circle style={{ '--node-delay': '3.9s' }} className="hero__ai-path-node--far" cx="968" cy="917" r=".46" />
        </g>
      </svg>
      <svg className="hero__system-texture" viewBox="0 0 1000 900" preserveAspectRatio="none" focusable="false">
        <g className="hero__system-links">
          <path d="M78 318 142 283 206 305 252 270" />
          <path d="M118 366 176 337 231 356" />
          <path d="M748 286 806 312 871 278 927 301" />
          <path d="M784 351 839 328 913 362" />
          <path d="M104 535h62m-62 0v44m62-44v22" />
          <path d="M846 511h71m-47-24v62m24-47v33" />
        </g>
        <g className="hero__system-nodes">
          <circle cx="78" cy="318" r="2" /><circle cx="142" cy="283" r="1.5" /><circle cx="206" cy="305" r="1.2" /><circle cx="252" cy="270" r="1" />
          <circle cx="118" cy="366" r="1.4" /><circle cx="176" cy="337" r="1" /><circle cx="231" cy="356" r="1.6" />
          <circle cx="748" cy="286" r="1" /><circle cx="806" cy="312" r="1.6" /><circle cx="871" cy="278" r="1.2" /><circle cx="927" cy="301" r="2" />
          <circle cx="784" cy="351" r="1.3" /><circle cx="839" cy="328" r="1" /><circle cx="913" cy="362" r="1.5" />
        </g>
      </svg>
      <div className="hero__foreground"><i /><i /><i /></div>
    </div>
  );
}
