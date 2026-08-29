import { useEffect, useRef } from 'react';

/**
 * DotGridOverlay — 1:1 recreation of the deepseek.com/harness hero grid layer.
 *
 * A white dot grid on a 90px pitch with faint connecting lines. Dots within
 * 140px of the cursor are pushed away, spring back to their rest position,
 * grow slightly and brighten. Cadence 30fps, idle-stops when nothing moves,
 * hover-capable devices only, dpr capped at 2.
 */
export default function DotGridOverlay() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // hover-capable devices only (matches reference)
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const PITCH = 90;      // grid pitch in CSS px
    const RADIUS = 140;    // cursor disturbance radius
    const LINE_OPACITY = 0.08;
    const DOT_OPACITY = 0.16;

    let dots = [];
    let cols = 0;
    let rows = 0;
    let width = 0;
    let height = 0;
    let stopped = false;
    let resizeTimer = 0;
    let raf = 0;
    let running = true;

    const mouse = { x: NaN, y: NaN };

    const buildGrid = () => {
      cols = Math.ceil(width / PITCH) + 1;
      rows = Math.ceil(height / PITCH) + 1;
      const startX = (width - (cols - 1) * PITCH) / 2;
      const startY = (height - (rows - 1) * PITCH) / 2;
      dots = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const restX = startX + PITCH * c;
          const restY = startY + PITCH * r;
          dots.push({ restX, restY, x: restX, y: restY, vx: 0, vy: 0 });
        }
      }
    };

    const sizeCanvas = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGrid();
    };
    sizeCanvas();

    const kick = () => {
      if (stopped) {
        stopped = false;
        raf = requestAnimationFrame(tick);
      }
    };
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      kick();
    };
    window.addEventListener('mousemove', onMove);

    let last = 0;
    const cadence = 1000 / 30;

    let visible = true;
    const tick = (now) => {
      if (!running) return;
      raf = requestAnimationFrame(tick);
      if (!visible || now - last < cadence) return;
      last = now - ((now - last) % cadence);

      // re-sync canvas size with layout; rebuild grid after a short settle
      if (canvas.clientWidth !== width || canvas.clientHeight !== height) {
        width = canvas.clientWidth;
        height = canvas.clientHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(buildGrid, 150);
      }

      ctx.clearRect(0, 0, width, height);

      // physics: repel from cursor, spring home, damp
      let maxSpeed = 0;
      for (const d of dots) {
        const dx = d.x - mouse.x;
        const dy = d.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < RADIUS && dist > 0.1) {
          const f = (1 - dist / RADIUS) * 30;
          const ux = dx / dist;
          const uy = dy / dist;
          d.vx += ux * f * 0.1;
          d.vy += uy * f * 0.1;
        }
        const sx = d.restX - d.x;
        const sy = d.restY - d.y;
        d.vx += 0.05 * sx;
        d.vy += 0.05 * sy;
        d.vx *= 0.85;
        d.vy *= 0.85;
        d.x += d.vx;
        d.y += d.vy;
        const speed = Math.abs(d.vx) + Math.abs(d.vy);
        if (speed > maxSpeed) maxSpeed = speed;
      }

      // connecting lines: horizontal + vertical neighbours, 10px inset each side
      ctx.strokeStyle = `rgba(255, 255, 255, ${LINE_OPACITY})`;
      ctx.lineWidth = 0.5;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols - 1; c++) {
          const a = dots[r * cols + c];
          const b = dots[r * cols + c + 1];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 20) continue;
          const ux = dx / dist;
          const uy = dy / dist;
          ctx.beginPath();
          ctx.moveTo(a.x + 10 * ux, a.y + 10 * uy);
          ctx.lineTo(b.x - 10 * ux, b.y - 10 * uy);
          ctx.stroke();
        }
      }
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows - 1; r++) {
          const a = dots[r * cols + c];
          const b = dots[(r + 1) * cols + c];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 20) continue;
          const ux = dx / dist;
          const uy = dy / dist;
          ctx.beginPath();
          ctx.moveTo(a.x + 10 * ux, a.y + 10 * uy);
          ctx.lineTo(b.x - 10 * ux, b.y - 10 * uy);
          ctx.stroke();
        }
      }

      // dots: grow + brighten near the cursor
      for (const d of dots) {
        let size = 1.8;
        let opacity = DOT_OPACITY;
        if (!isNaN(mouse.x) && !isNaN(mouse.y)) {
          const dx = d.x - mouse.x;
          const dy = d.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, 1 - dist / RADIUS);
          size = 1.8 + 2 * influence;
          opacity = DOT_OPACITY + 0.4 * influence;
        }
        ctx.globalAlpha = opacity;
        const side = 2 * size;
        ctx.fillRect(d.x - size, d.y - size, side, side);
      }
      ctx.globalAlpha = 1;

      if (maxSpeed < 0.01) {
        stopped = true;
        return; // stop the loop; mousemove restarts it
      }
    };
    raf = requestAnimationFrame(tick);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) kick();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener('mousemove', onMove);
      io.disconnect();
    };
  }, []);

  return (
    <div className="hero__grid" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
