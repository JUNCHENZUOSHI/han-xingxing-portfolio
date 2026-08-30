import { useEffect, useRef } from 'react';

/**
 * ParticleField — subtle floating-particle effect for section backgrounds.
 * Soft blue "embers" drift slowly upward and twinkle. Pauses off-screen,
 * respects reduced motion, dpr capped at 2.
 */
export default function ParticleField({ className = 'particle-field', density = 20000 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let particles = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    let running = true;
    let visible = true;

    const build = () => {
      const count = Math.max(20, Math.min(70, Math.floor((width * height) / density)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.8 + Math.random() * 1.9,
        vx: (Math.random() - 0.5) * 0.16,
        vy: -(0.06 + Math.random() * 0.28),
        base: 0.12 + Math.random() * 0.34,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };
    resize();

    let last = 0;
    const cadence = 1000 / 30;
    const tick = (now) => {
      if (!running) return;
      raf = requestAnimationFrame(tick);
      if (!visible || now - last < cadence) return;
      last = now - ((now - last) % cadence);

      if (canvas.clientWidth !== width || canvas.clientHeight !== height) {
        width = canvas.clientWidth;
        height = canvas.clientHeight;
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#7aa7ff';
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -12) { p.y = height + 12; p.x = Math.random() * width; }
        if (p.x < -12) p.x = width + 12;
        else if (p.x > width + 12) p.x = -12;

        const twinkle = 0.55 + 0.45 * Math.sin(now * 0.0012 + p.phase);
        ctx.globalAlpha = p.base * twinkle;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    if (!reduceMotion) raf = requestAnimationFrame(tick);

    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0 });
    io.observe(canvas);
    window.addEventListener('resize', resize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, [density]);

  return (
    <div className={className} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
