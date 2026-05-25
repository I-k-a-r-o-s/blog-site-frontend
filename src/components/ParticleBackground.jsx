import { useEffect, useRef } from "react";

const ParticleBackground = () => {
 const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    let dpr = Math.max(window.devicePixelRatio || 1, 1);
    const mouse = { x: -9999, y: -9999 };

    // =====================================================
    // APPEARANCE + BEHAVIOR SETTINGS
    // =====================================================
    // MAIN VISUAL CUSTOMIZATION AREA
    //
    // COLORS USED IN THIS EFFECT:
    //
    // Background Gradient:
    // rgba(8, 12, 20, 1)
    // rgba(11, 16, 28, 1)
    //
    // Connection Lines:
    // rgba(180, 210, 255, alpha)
    // rgba(140, 200, 255, alpha)
    //
    // Particle Glow:
    // rgba(120, 180, 255, alpha)
    //
    // Core Particle:
    // rgba(235, 245, 255, alpha)
    //
    // QUICK THEME IDEAS:
    // Blue      = futuristic/default
    // Green     = matrix/hacker
    // Purple    = cyberpunk/sci-fi
    // Orange    = ember/fire
    // White/Gray= minimalist
    //
    // particleCount      = total particles on screen
    // particleRadius     = particle size range
    // particleSpeed      = movement speed
    // linkDistance       = max distance for particle-to-particle lines
    // mouseRadius        = max distance for mouse interaction
    // baseAlpha          = normal particle visibility
    // highlightAlpha     = particle visibility near cursor
    // lineAlpha          = normal line visibility
    // highlightLineAlpha = line visibility near cursor
    // =====================================================
    const settings = {
      particleCount: 90,
      particleRadius: { min: 1.2, max: 2.8 },
      particleSpeed: 0.35,
      linkDistance: 130,
      mouseRadius: 140,
      baseAlpha: 0.45,
      highlightAlpha: 1,
      lineAlpha: 0.25,
      highlightLineAlpha: 0.7,
    };

    const particles = [];

    const randomBetween = (min, max) => {
      return Math.random() * (max - min) + min;
    }

    const resize = () => {
      dpr = Math.max(window.devicePixelRatio || 1, 1);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < settings.particleCount; i += 1) {
        const radius = randomBetween(settings.particleRadius.min, settings.particleRadius.max);
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: randomBetween(-1, 1) * settings.particleSpeed,
          vy: randomBetween(-1, 1) * settings.particleSpeed,
          r: radius,
        });
      }
    }

    // =====================================================
    // BACKGROUND RENDERING
    // =====================================================
    // Change these colors to match your app theme.
    // Current style = dark blue gradient.
    // =====================================================
    function drawBackground() {
      ctx.clearRect(0, 0, width, height);
      // Subtle dark backdrop so the effect works on bright pages too.
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "rgba(8, 12, 20, 1)");
      gradient.addColorStop(1, "rgba(11, 16, 28, 1)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }

    function drawConnections() {
      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);

          if (dist > settings.linkDistance) continue;

          const nearMouseA = Math.hypot(a.x - mouse.x, a.y - mouse.y) < settings.mouseRadius;
          const nearMouseB = Math.hypot(b.x - mouse.x, b.y - mouse.y) < settings.mouseRadius;
          const isHighlighted = nearMouseA || nearMouseB;

          const alpha = isHighlighted
            ? settings.highlightLineAlpha * (1 - dist / settings.linkDistance)
            : settings.lineAlpha * (1 - dist / settings.linkDistance);

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          // Particle-to-particle line color
          ctx.strokeStyle = `rgba(180, 210, 255, ${alpha})`;
          ctx.lineWidth = isHighlighted ? 1.2 : 0.8;
          ctx.stroke();
        }
      }

      // Cursor-to-particle links
      for (const p of particles) {
        const distToMouse = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (distToMouse > settings.mouseRadius) continue;

        const alpha = settings.highlightLineAlpha * (1 - distToMouse / settings.mouseRadius);
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y);
        ctx.lineTo(p.x, p.y);
        // Cursor-to-particle line color
        ctx.strokeStyle = `rgba(140, 200, 255, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    function drawParticles() {
      for (const p of particles) {
        const nearMouse = Math.hypot(p.x - mouse.x, p.y - mouse.y) < settings.mouseRadius;
        const alpha = nearMouse ? settings.highlightAlpha : settings.baseAlpha;
        const glow = nearMouse ? 14 : 6;

        // Glow
        // =====================================================
        // PARTICLE GLOW EFFECT
        // =====================================================
        // Change these colors for different glow themes:
        // blue = futuristic
        // green = matrix style
        // orange/red = ember/fire effect
        // purple = synthwave/cyberpunk
        // =====================================================
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glow);
        gradient.addColorStop(0, `rgba(120, 180, 255, ${0.8 * alpha})`);
        gradient.addColorStop(1, "rgba(120, 180, 255, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glow, 0, Math.PI * 2);
        ctx.fill();

        // Core particle
        // Core particle color
        ctx.fillStyle = `rgba(235, 245, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function updateParticles() {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
      }
    }

    function animate() {
      drawBackground();
      updateParticles();
      drawConnections();
      drawParticles();
      animationFrameId = window.requestAnimationFrame(animate);
    }

    function onPointerMove(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    function onPointerLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    resize();
    initParticles();
    animate();

    window.addEventListener("resize", () => {
      resize();
      initParticles();
    });
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("touchmove", (e) => {
      const t = e.touches[0];
      if (!t) return;
      mouse.x = t.clientX;
      mouse.y = t.clientY;
    }, { passive: true });
    window.addEventListener("mouseleave", onPointerLeave);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 h-full w-full pointer-events-none"
      style={{ display: "block" }}
    />
  );
}
export default ParticleBackground