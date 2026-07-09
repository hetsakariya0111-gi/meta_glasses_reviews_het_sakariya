import { useEffect, useMemo, useRef, useState } from 'react';

const themeGroups = [
  { key: 'battery', label: 'Battery', color: '#c084fc', keywords: ['battery', 'charge', 'power', 'drain', 'lasting'] },
  { key: 'camera', label: 'Camera', color: '#38bdf8', keywords: ['camera', 'photo', 'video', 'capture', 'lens'] },
  { key: 'audio', label: 'Audio', color: '#f59e0b', keywords: ['audio', 'sound', 'mic', 'speaker', 'voice'] },
  { key: 'comfort', label: 'Comfort', color: '#22c55e', keywords: ['comfort', 'fit', 'weight', 'wear', 'pressure'] },
  { key: 'privacy', label: 'Privacy', color: '#f472b6', keywords: ['privacy', 'security', 'data', 'camera', 'visibility'] }
];

const positiveWords = ['great', 'excellent', 'smooth', 'easy', 'clear', 'fast', 'strong', 'good', 'perfect', 'love', 'bright', 'responsive'];
const negativeWords = ['bad', 'slow', 'hard', 'glitch', 'drain', 'poor', 'heavy', 'annoy', 'loud', 'noise', 'scratch', 'fuzzy'];

function getSentimentScore(text) {
  const normalized = text?.toLowerCase() || '';
  let score = 0;
  positiveWords.forEach((word) => { if (normalized.includes(word)) score += 1; });
  negativeWords.forEach((word) => { if (normalized.includes(word)) score -= 1; });
  return Math.max(-1, Math.min(1, score / 4));
}

function detectTheme(text) {
  const normalized = text?.toLowerCase() || '';
  const matches = themeGroups.map((theme) => ({
    theme: theme.key,
    count: theme.keywords.reduce((count, keyword) => count + (normalized.includes(keyword) ? 1 : 0), 0)
  }));
  const best = matches.reduce((prev, current) => (current.count > prev.count ? current : prev), { theme: 'comfort', count: 0 });
  return best.count > 0 ? best.theme : 'comfort';
}

function buildParticles(reviews) {
  return reviews.slice(0, 280).map((review, index) => {
    const text = review.review || review.title || '';
    const sentiment = getSentimentScore(text);
    const rating = Number(review.rating) || 3;
    const theme = detectTheme(text);

    return {
      id: review._id || `review-${index}`,
      title: review.title || 'Untitled field note',
      snippet: text.slice(0, 88),
      sentiment,
      rating,
      theme,
      color: themeGroups.find((item) => item.key === theme)?.color || '#38bdf8',
      label: review.country || review.name || 'Unknown',
      helpful: review.helpful || 0
    };
  });
}

export default function Observatory({ reviews = [], onDescend }) {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const particlesRef = useRef([]);
  const themeCentersRef = useRef([]);
  const cameraRef = useRef({ x: 0, y: 0, zoom: 1, targetX: 0, targetY: 0, targetZoom: 1 });
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, review: null });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const particles = useMemo(() => buildParticles(reviews), [reviews]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      canvas.width = rect.width * ratio;
      canvas.height = rect.height * ratio;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      setDimensions({ width: canvas.width, height: canvas.height });
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [reviews.length]);

  useEffect(() => {
    if (!dimensions.width || !dimensions.height) return;

    const pixelRatio = window.devicePixelRatio || 1;
    const width = dimensions.width;
    const height = dimensions.height;
    const centerX = width / 2;
    const centerY = height / 2;

    particlesRef.current = particles.map((item) => {
      const themeIndex = themeGroups.findIndex((group) => group.key === item.theme);
      const baseX = width * (0.12 + (themeIndex / (themeGroups.length - 1)) * 0.74);
      const baseY = height * (0.88 - (item.rating / 5) * 0.56);
      const jitterX = (Math.random() - 0.5) * width * 0.06;
      const jitterY = (Math.random() - 0.5) * height * 0.05;

      return {
        ...item,
        x: baseX + jitterX,
        y: baseY + jitterY,
        baseX,
        baseY,
        radius: 2.5 + Math.random() * 1.5,
        driftX: (Math.random() - 0.5) * 0.1,
        driftY: (Math.random() - 0.5) * 0.05,
        screenX: 0,
        screenY: 0
      };
    });

    themeCentersRef.current = themeGroups.map((theme, index) => ({
      ...theme,
      x: width * (0.12 + (index / (themeGroups.length - 1)) * 0.74),
      y: height * 0.92
    }));
  }, [dimensions.width, dimensions.height, particles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const draw = () => {
      const camera = cameraRef.current;
      camera.x += (camera.targetX - camera.x) * 0.075;
      camera.y += (camera.targetY - camera.y) * 0.075;
      camera.zoom += (camera.targetZoom - camera.zoom) * 0.08;

      const width = canvas.width;
      const height = canvas.height;
      const pixelRatio = window.devicePixelRatio || 1;

      ctx.clearRect(0, 0, width, height);

      const gradient = ctx.createRadialGradient(width * 0.5, height * 0.25, width * 0.03, width * 0.5, height * 0.25, width * 0.9);
      gradient.addColorStop(0, 'rgba(56, 189, 248, 0.15)');
      gradient.addColorStop(0.5, 'rgba(15, 23, 42, 0.18)');
      gradient.addColorStop(1, 'rgba(2, 8, 23, 0.95)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.scale(camera.zoom, camera.zoom);
      ctx.translate(-camera.x, -camera.y);

      particlesRef.current.forEach((particle) => {
        particle.x += particle.driftX;
        particle.y += particle.driftY;
        if (particle.x < 0 || particle.x > width) particle.driftX *= -1;
        if (particle.y < 0 || particle.y > height) particle.driftY *= -1;

        const screenX = (particle.x - camera.x) * camera.zoom + width / 2;
        const screenY = (particle.y - camera.y) * camera.zoom + height / 2;
        particle.screenX = screenX;
        particle.screenY = screenY;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 14;
        ctx.fill();
      });

      ctx.restore();

      ctx.save();
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.12)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(32, height - 54);
      ctx.lineTo(width - 32, height - 54);
      ctx.moveTo(32, height - 54);
      ctx.lineTo(32, 32);
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.fillStyle = 'rgba(148, 163, 184, 0.8)';
      ctx.font = `${Math.round(12 * pixelRatio)}px Inter`;
      ctx.fillText('Negative', 24, height - 18);
      ctx.fillText('Positive', width - 90, height - 18);
      ctx.fillText('High rating', 36, 40);
      ctx.fillText('Low rating', 36, height - 28);
      ctx.restore();

      themeCentersRef.current.forEach((center) => {
        const sx = (center.x - camera.x) * camera.zoom + width / 2;
        const sy = (center.y - camera.y) * camera.zoom + height / 2;
        ctx.save();
        ctx.beginPath();
        ctx.arc((center.x), center.y, 18, 0, Math.PI * 2);
        ctx.strokeStyle = `${center.color}22`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      });
    };

    const animate = () => {
      draw();
      frameRef.current = window.requestAnimationFrame(animate);
    };

    animate();
    return () => window.cancelAnimationFrame(frameRef.current);
  }, [dimensions.width, dimensions.height]);

  const pointerToCanvas = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((event.clientY - rect.top) / rect.height) * canvas.height;
    return { x, y };
  };

  const handlePointerMove = (event) => {
    const point = pointerToCanvas(event);
    if (!point) return;

    const nearest = particlesRef.current.reduce((best, particle) => {
      const dx = particle.screenX - point.x;
      const dy = particle.screenY - point.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < best.distance ? { particle, distance } : best;
    }, { particle: null, distance: Infinity });

    if (nearest.particle && nearest.distance < 28) {
      setTooltip({
        visible: true,
        x: event.clientX + 18,
        y: event.clientY + 18,
        review: nearest.particle
      });
    } else {
      setTooltip((prev) => (prev.visible ? { ...prev, visible: false } : prev));
    }
  };

  const handlePointerLeave = () => {
    setTooltip((prev) => (prev.visible ? { ...prev, visible: false } : prev));
  };

  const handleClick = () => {
    if (!tooltip.review) return;
    const target = tooltip.review;
    cameraRef.current.targetX = target.x;
    cameraRef.current.targetY = target.y;
    cameraRef.current.targetZoom = 1.8;
  };

  const handleWheel = (event) => {
    if (event.deltaY > 14) {
      event.preventDefault();
      onDescend?.();
    }
  };

  const averageRating = reviews.length ? (reviews.reduce((sum, review) => sum + (Number(review.rating) || 3), 0) / reviews.length).toFixed(1) : '4.3';

  return (
    <div className="relative h-full overflow-hidden rounded-[2.5rem] bg-[#02050c] shadow-[0_40px_120px_rgba(2,8,23,0.45)]">
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
        onWheel={handleWheel}
        style={{ touchAction: 'none' }}
      />

      <div className="pointer-events-none absolute inset-x-0 top-6 z-20 flex flex-wrap items-center justify-between gap-3 px-6 text-xs uppercase tracking-[0.35em] text-slate-300">
        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">Observatory active • {reviews.length || 0} signals</div>
        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">Avg. signal rating {averageRating} ★</div>
        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">Scroll down to descend</div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-6 right-6 z-20 flex flex-wrap gap-3">
        {themeGroups.map((theme) => (
          <span key={theme.key} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-2 text-xs text-slate-200 backdrop-blur-md">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: theme.color }} />
            {theme.label}
          </span>
        ))}
      </div>

      {tooltip.visible && tooltip.review ? (
        <div
          className="pointer-events-none absolute z-30 max-w-xs rounded-3xl border border-white/10 bg-[#020812]/95 p-4 text-sm text-slate-100 shadow-[0_30px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl"
          style={{ left: tooltip.x, top: tooltip.y, transform: 'translate(-4px, -4px)' }}
        >
          <p className="text-[11px] uppercase tracking-[0.35em] text-slate-400">Live signal</p>
          <h3 className="mt-2 font-semibold text-white">{tooltip.review.title}</h3>
          <p className="mt-2 text-xs leading-5 text-slate-300">{tooltip.review.snippet}…</p>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
            <span>{tooltip.review.label}</span>
            <span>{tooltip.review.rating}/5</span>
          </div>
          <div className="mt-3 rounded-full bg-white/5 px-3 py-2 text-[11px] uppercase tracking-[0.35em] text-slate-300">Click to zoom in</div>
        </div>
      ) : null}
    </div>
  );
}
