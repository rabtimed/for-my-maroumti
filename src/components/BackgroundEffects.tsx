import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  pulseSpeed: number;
  isHeart: boolean;
}

export const BackgroundEffects: React.FC<{ intensity?: 'subtle' | 'warm' | 'celebration' }> = ({
  intensity = 'subtle',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particleCount = intensity === 'celebration' ? 45 : intensity === 'warm' ? 30 : 20;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.5 + 1,
        speedY: -(Math.random() * 0.4 + 0.15),
        speedX: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.5 + 0.15,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        isHeart: Math.random() > 0.7,
      });
    }

    const drawHeart = (c: CanvasRenderingContext2D, x: number, y: number, size: number, alpha: number) => {
      c.save();
      c.translate(x, y);
      c.scale(size * 0.08, size * 0.08);
      c.beginPath();
      c.moveTo(0, 0);
      c.bezierCurveTo(-5, -5, -10, 0, 0, 10);
      c.bezierCurveTo(10, 0, 5, -5, 0, 0);
      c.fillStyle = `rgba(243, 176, 190, ${alpha * 0.7})`;
      c.fill();
      c.restore();
    };

    let time = 0;
    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(time + p.y * 0.01) * 0.15;

        // Wrap around screen
        if (p.y < -20) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 10;
        if (p.x > width + 20) p.x = -10;

        const currentOpacity = p.opacity + Math.sin(time * 2 + p.x) * 0.12;
        const clampedOpacity = Math.max(0.05, Math.min(0.7, currentOpacity));

        if (p.isHeart && p.size > 2) {
          drawHeart(ctx, p.x, p.y, p.size * 1.5, clampedOpacity);
        } else {
          // Soft golden/rose glowing particle
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(248, 215, 218, ${clampedOpacity})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = 'rgba(212, 175, 55, 0.4)';
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep Burgundy & Editorial Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0205] via-[#15040a] to-[#0a0104]" />
      <div className="absolute top-12 right-12 w-80 h-80 rounded-full bg-[#800020] blur-[130px] opacity-25 pointer-events-none" />
      <div className="absolute bottom-16 left-12 w-64 h-64 rounded-full bg-[#d4af37] blur-[120px] opacity-15 pointer-events-none" />
      <div className="absolute top-[45%] left-[-10%] w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full bg-[#4a0112] blur-[110px] opacity-20 pointer-events-none" />

      {/* Subtle Editorial Grain Overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
