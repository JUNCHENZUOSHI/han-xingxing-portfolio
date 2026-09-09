export default function HeroScene() {
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
        <img
          className="hero__visual__guardians"
          src={`${import.meta.env.BASE_URL}hero/Guardian Group.png`}
          alt=""
          aria-hidden="true"
          draggable="false"
          decoding="async"
        />
        <img
          className="hero__visual__brantley"
          src={`${import.meta.env.BASE_URL}hero/Brantley.png`}
          alt=""
          aria-hidden="true"
          draggable="false"
          decoding="async"
          fetchpriority="high"
        />
      </div>
      <svg className="hero__ai-path" viewBox="0 0 1000 900" preserveAspectRatio="none" focusable="false">
        <defs>
          <radialGradient id="hero-ai-origin-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d6e5f3" stopOpacity=".26" />
            <stop offset="34%" stopColor="#9cb6cf" stopOpacity=".12" />
            <stop offset="100%" stopColor="#71869d" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle className="hero__ai-path-origin-glow" cx="472" cy="646" r="18" />
        <g className="hero__ai-path-lines">
          <path pathLength="1" className="hero__ai-path-main" d="M472 646 C468 670 486 687 474 710 C464 727 480 734 478 748" />
          <path pathLength="1" className="hero__ai-path-branch" style={{ '--path-delay': '2.55s' }} d="M478 748 C448 754 435 769 408 774 C373 782 360 804 327 808 C292 812 272 835 237 839 C205 842 183 861 148 866 C108 871 82 858 42 877" />
          <path pathLength="1" className="hero__ai-path-branch" style={{ '--path-delay': '2.82s' }} d="M408 774 C389 752 360 745 335 728 C305 708 278 712 248 700 C214 686 183 698 150 711" />
          <path pathLength="1" className="hero__ai-path-far" style={{ '--path-delay': '3.32s' }} d="M327 808 C310 830 291 849 263 853 C235 857 217 878 186 886" />
          <path pathLength="1" className="hero__ai-path-branch" style={{ '--path-delay': '2.62s' }} d="M478 748 C513 745 530 760 558 772 C588 786 607 778 635 790 C664 803 678 826 708 833 C742 840 756 860 789 864 C824 868 846 855 880 870 C909 882 941 875 974 888" />
          <path pathLength="1" className="hero__ai-path-branch" style={{ '--path-delay': '2.95s' }} d="M558 772 C577 748 602 739 625 724 C649 709 671 711 693 691 C715 672 744 676 771 660 C800 643 829 656 854 645" />
          <path pathLength="1" className="hero__ai-path-far" style={{ '--path-delay': '3.25s' }} d="M708 833 C726 811 751 804 775 793 C800 781 814 757 844 747 C873 737 894 741 922 724" />
          <path pathLength="1" className="hero__ai-path-far" style={{ '--path-delay': '3.48s' }} d="M789 864 C810 845 840 844 865 829 C891 814 914 823 940 806" />
        </g>
        <g className="hero__ai-path-nodes">
          <circle className="hero__ai-path-origin" cx="472" cy="646" r="2.4" />
          <circle style={{ '--node-delay': '2.35s' }} cx="478" cy="748" r="1.55" />
          <circle style={{ '--node-delay': '2.8s' }} cx="408" cy="774" r="1.1" />
          <circle style={{ '--node-delay': '3.08s' }} cx="327" cy="808" r="1.35" />
          <circle style={{ '--node-delay': '3.22s' }} cx="248" cy="700" r=".8" />
          <circle style={{ '--node-delay': '3.62s' }} className="hero__ai-path-node--far" cx="150" cy="711" r=".7" />
          <circle style={{ '--node-delay': '3.9s' }} className="hero__ai-path-node--far" cx="42" cy="877" r=".6" />
          <circle style={{ '--node-delay': '3.7s' }} className="hero__ai-path-node--far" cx="186" cy="886" r=".75" />
          <circle style={{ '--node-delay': '2.88s' }} cx="558" cy="772" r="1.3" />
          <circle style={{ '--node-delay': '3.12s' }} cx="635" cy="790" r="1.05" />
          <circle style={{ '--node-delay': '3.35s' }} cx="708" cy="833" r="1.25" />
          <circle style={{ '--node-delay': '3.58s' }} cx="789" cy="864" r=".9" />
          <circle style={{ '--node-delay': '3.26s' }} cx="693" cy="691" r="1.1" />
          <circle style={{ '--node-delay': '3.6s' }} className="hero__ai-path-node--far" cx="854" cy="645" r=".72" />
          <circle style={{ '--node-delay': '3.84s' }} className="hero__ai-path-node--far" cx="922" cy="724" r=".65" />
          <circle style={{ '--node-delay': '4.06s' }} className="hero__ai-path-node--far" cx="974" cy="888" r=".7" />
          <circle style={{ '--node-delay': '4.18s' }} className="hero__ai-path-node--far" cx="940" cy="806" r=".58" />
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
