import { useEffect, useRef } from 'react';
import './ConstellationBackground.css';

const stars = [
  { side: 'left', top: '8%', size: 40, drift: 18, depth: 1.3, delay: '-1.8s' },
  { side: 'left', top: '25%', size: 18, drift: -13, depth: 0.7, delay: '-4.1s' },
  { side: 'left', top: '48%', size: 30, drift: 16, depth: 1.1, delay: '-2.6s' },
  { side: 'left', top: '73%', size: 22, drift: -11, depth: 0.8, delay: '-5.3s' },
  { side: 'left', top: '90%', size: 36, drift: 14, depth: 1.2, delay: '-.7s' },
  { side: 'right', top: '13%', size: 24, drift: -15, depth: 0.9, delay: '-3.4s' },
  { side: 'right', top: '31%', size: 42, drift: 17, depth: 1.35, delay: '-.9s' },
  { side: 'right', top: '55%', size: 19, drift: -12, depth: 0.7, delay: '-4.8s' },
  { side: 'right', top: '76%', size: 32, drift: 15, depth: 1.15, delay: '-2.1s' },
  { side: 'right', top: '93%', size: 17, drift: -10, depth: 0.65, delay: '-5.8s' },
];

function Star() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <path d="M50 0 56 40 75 6 62 43 93 25 66 48 100 50 66 56 94 75 61 62 75 94 55 61 50 100 44 61 25 94 39 62 6 75 34 56 0 50 34 44 7 25 38 43 25 6 44 40Z" />
    </svg>
  );
}

export default function ConstellationBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const onPointerMove = (event) => {
      const el = ref.current;
      if (!el) return;
      el.style.setProperty('--constellation-x', `${(event.clientX / window.innerWidth - 0.5).toFixed(3)}`);
      el.style.setProperty('--constellation-y', `${(event.clientY / window.innerHeight - 0.5).toFixed(3)}`);
      el.style.setProperty('--constellation-pointer-x', `${(event.clientX / window.innerWidth * 100).toFixed(2)}%`);
      el.style.setProperty('--constellation-pointer-y', `${(event.clientY / window.innerHeight * 100).toFixed(2)}%`);
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, []);

  return (
    <div className="constellation" ref={ref} aria-hidden="true">
      {stars.map((star, index) => (
        <span
          className={`constellation__star constellation__star--${star.side}`}
          key={index}
          style={{
            '--star-top': star.top,
            '--star-size': `${star.size}px`,
            '--star-drift': `${star.drift}px`,
            '--star-depth': star.depth,
            '--star-delay': star.delay,
          }}
        >
          <Star />
        </span>
      ))}
    </div>
  );
}
