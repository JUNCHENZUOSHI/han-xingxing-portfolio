import { useEffect, useRef } from 'react';
import './ConstellationBackground.css';

const colors = ['255,255,255', '194,228,255', '104,191,245', '255,188,120'];

const mulberry32 = (seed) => () => {
  let t = seed += 0x6D2B79F5;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const crossStar = (ctx, x, y, radius, color, alpha) => {
  const glow = ctx.createRadialGradient(x, y, 0, x, y, radius * 7);
  glow.addColorStop(0, `rgba(${color},${alpha})`); glow.addColorStop(.16, `rgba(${color},${alpha * .5})`); glow.addColorStop(1, `rgba(${color},0)`);
  ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(x, y, radius * 7, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = `rgba(${color},${alpha})`; ctx.lineWidth = .8; ctx.beginPath(); ctx.moveTo(x - radius * 4, y); ctx.lineTo(x + radius * 4, y); ctx.moveTo(x, y - radius * 4); ctx.lineTo(x, y + radius * 4); ctx.stroke();
};

export default function ConstellationBackground({ variant = 'sides' }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current; const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0; let height = 0; let frame; let startedAt = 0; let pointer = { x: 0, y: 0 }; const particles = [];
    const resize = () => {
      const rect = canvas.getBoundingClientRect(); const scale = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width; height = rect.height; canvas.width = Math.round(width * scale); canvas.height = Math.round(height * scale); ctx.setTransform(scale, 0, 0, scale, 0, 0); particles.length = 0;
      if (variant === 'sides') {
        const count = Math.max(260, Math.min(620, Math.round(width * height / 3400)));
        for (let i = 0; i < count; i += 1) { const left = Math.random() < .5; const edge = Math.pow(Math.random(), 1.65); particles.push({ x: left ? width * (.006 + edge * .3) : width * (.994 - edge * .3), y: Math.random() * height, r: .26 + Math.pow(Math.random(), 3.2) * 1.9, a: .12 + Math.random() * .62, d: .15 + Math.random() * 1.15, c: colors[Math.floor(Math.random() * colors.length)], phase: Math.random() * 7, speed: .3 + Math.random() }); }
      } else {
        const random = mulberry32(Math.round(width * 31 + height * 17));
        const count = Math.max(900, Math.min(1900, Math.round(width * height / 880)));
        for (let i = 0; i < count; i += 1) {
          const angle = random() * Math.PI * 2;
          const radius = Math.pow(random(), 1.7);
          const spreadX = width * .48;
          const spreadY = Math.min(height * .42, width * .24);
          const x = width * .5 + Math.cos(angle) * radius * spreadX + (random() - .5) * 34;
          const y = height * .43 + Math.sin(angle) * radius * spreadY + (random() - .5) * 28;
          particles.push({
            x, y,
            fromX: width * .5 + (random() - .5) * width * .08,
            fromY: height * .43 + (random() - .5) * height * .08,
            r: .25 + Math.pow(random(), 3.4) * 3.25,
            a: .16 + random() * .82,
            d: .2 + random() * 1.5,
            c: colors[Math.floor(random() * colors.length)],
            phase: random() * 7,
            speed: .25 + random() * 1.25,
            delay: random() * .28,
          });
        }
        startedAt = performance.now();
      }
    };
    const move = (event) => { const rect = canvas.getBoundingClientRect(); pointer = { x: (event.clientX - rect.left) / rect.width - .5, y: (event.clientY - rect.top) / rect.height - .5 }; };
    const draw = (now) => {
      ctx.clearRect(0, 0, width, height);
      if (variant === 'hero') { const haze = ctx.createRadialGradient(width * .5, height * .5, 0, width * .5, height * .5, Math.min(width, height) * .43); haze.addColorStop(0, 'rgba(53,116,158,.19)'); haze.addColorStop(.55, 'rgba(9,32,49,.1)'); haze.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = haze; ctx.fillRect(0, 0, width, height); }
      particles.forEach((p, i) => { const pulse = reduced ? 1 : .72 + Math.sin(now * .001 * p.speed + p.phase) * .28; let baseX = p.x; let baseY = p.y; if (variant === 'hero' && !reduced) { const raw = Math.max(0, Math.min(1, (now - startedAt) / 2600 - p.delay)); const enter = 1 - Math.pow(1 - raw, 4); baseX = p.fromX + (p.x - p.fromX) * enter; baseY = p.fromY + (p.y - p.fromY) * enter; } const x = baseX + pointer.x * -p.d * (variant === 'hero' ? 34 : 20); const y = baseY + pointer.y * -p.d * (variant === 'hero' ? 26 : 14); const alpha = p.a * pulse; ctx.globalAlpha = alpha; if (p.r > 1.65) crossStar(ctx, x, y, p.r, p.c, alpha); ctx.fillStyle = `rgb(${p.c})`; ctx.beginPath(); ctx.arc(x, y, Math.max(.28, p.r), 0, Math.PI * 2); ctx.fill(); if (variant === 'hero' && i % 137 === 0) crossStar(ctx, x, y, Math.max(1.5, p.r), p.c, alpha); });
      ctx.globalAlpha = 1; frame = requestAnimationFrame(draw);
    };
    resize(); window.addEventListener('resize', resize); window.addEventListener('pointermove', move, { passive: true }); frame = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); window.removeEventListener('pointermove', move); };
  }, [variant]);
  return <div className={`constellation constellation--${variant}`} aria-hidden="true"><canvas ref={canvasRef} /></div>;
}
