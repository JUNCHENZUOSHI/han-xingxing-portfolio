import { useEffect, useRef } from 'react';
import './ConstellationBackground.css';

const colors = ['255,255,255', '194,228,255', '104,191,245', '255,188,120'];

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
    let width = 0; let height = 0; let frame; let pointer = { x: 0, y: 0 }; const particles = [];
    const resize = () => {
      const rect = canvas.getBoundingClientRect(); const scale = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width; height = rect.height; canvas.width = Math.round(width * scale); canvas.height = Math.round(height * scale); ctx.setTransform(scale, 0, 0, scale, 0, 0); particles.length = 0;
      if (variant === 'sides') {
        const count = Math.max(260, Math.min(620, Math.round(width * height / 3400)));
        for (let i = 0; i < count; i += 1) { const left = Math.random() < .5; const edge = Math.pow(Math.random(), 1.65); particles.push({ x: left ? width * (.006 + edge * .3) : width * (.994 - edge * .3), y: Math.random() * height, r: .26 + Math.pow(Math.random(), 3.2) * 1.9, a: .12 + Math.random() * .62, d: .15 + Math.random() * 1.15, c: colors[Math.floor(Math.random() * colors.length)], phase: Math.random() * 7, speed: .3 + Math.random() }); }
      } else {
        const mask = document.createElement('canvas'); const mw = Math.min(width * .62, 720); const mh = Math.min(height * .76, 780); mask.width = mw; mask.height = mh; const mctx = mask.getContext('2d');
        mctx.strokeStyle = '#fff'; mctx.lineWidth = Math.max(22, mw * .048); mctx.font = `700 ${Math.round(mh * .9)}px Arial`; mctx.textAlign = 'center'; mctx.textBaseline = 'middle'; mctx.strokeText('6', mw * .5, mh * .51);
        const pixels = mctx.getImageData(0, 0, mw, mh).data; const candidates = [];
        for (let y = 0; y < mh; y += 3) for (let x = 0; x < mw; x += 3) if (pixels[(y * mw + x) * 4 + 3] > 100) candidates.push([x, y]);
        for (let i = 0; i < 950; i += 1) { const p = candidates[Math.floor(Math.random() * candidates.length)]; particles.push({ x: width * .5 + p[0] - mw * .5, y: height * .51 + p[1] - mh * .5, r: .32 + Math.pow(Math.random(), 3) * 2.25, a: .24 + Math.random() * .72, d: .35 + Math.random() * 1.25, c: colors[Math.floor(Math.random() * colors.length)], phase: Math.random() * 7, speed: .35 + Math.random() * 1.3, hero: true }); }
        for (let i = 0; i < 250; i += 1) { const angle = Math.random() * Math.PI * 2; const radius = Math.pow(Math.random(), .55) * Math.min(width, height) * .43; particles.push({ x: width * .5 + Math.cos(angle) * radius, y: height * .51 + Math.sin(angle) * radius * .75, r: .22 + Math.random() * 1.1, a: .1 + Math.random() * .35, d: .1 + Math.random() * .9, c: colors[Math.floor(Math.random() * colors.length)], phase: Math.random() * 7, speed: .25 + Math.random() }); }
      }
    };
    const move = (event) => { const rect = canvas.getBoundingClientRect(); pointer = { x: (event.clientX - rect.left) / rect.width - .5, y: (event.clientY - rect.top) / rect.height - .5 }; };
    const draw = (now) => {
      ctx.clearRect(0, 0, width, height);
      if (variant === 'hero') { const haze = ctx.createRadialGradient(width * .5, height * .5, 0, width * .5, height * .5, Math.min(width, height) * .43); haze.addColorStop(0, 'rgba(53,116,158,.19)'); haze.addColorStop(.55, 'rgba(9,32,49,.1)'); haze.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = haze; ctx.fillRect(0, 0, width, height); }
      particles.forEach((p, i) => { const pulse = reduced ? 1 : .72 + Math.sin(now * .001 * p.speed + p.phase) * .28; const x = p.x + pointer.x * -p.d * (variant === 'hero' ? 30 : 20); const y = p.y + pointer.y * -p.d * (variant === 'hero' ? 22 : 14); const alpha = p.a * pulse; ctx.globalAlpha = alpha; if (p.r > 1.5) crossStar(ctx, x, y, p.r, p.c, alpha); ctx.fillStyle = `rgb(${p.c})`; ctx.beginPath(); ctx.arc(x, y, Math.max(.28, p.r), 0, Math.PI * 2); ctx.fill(); if (variant === 'hero' && i % 103 === 0) crossStar(ctx, x, y, Math.max(1.4, p.r), p.c, alpha); });
      ctx.globalAlpha = 1; frame = requestAnimationFrame(draw);
    };
    resize(); window.addEventListener('resize', resize); window.addEventListener('pointermove', move, { passive: true }); frame = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); window.removeEventListener('pointermove', move); };
  }, [variant]);
  return <div className={`constellation constellation--${variant}`} aria-hidden="true"><canvas ref={canvasRef} /></div>;
}
