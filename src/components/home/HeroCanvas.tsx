'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrameSequence } from '@/hooks/useFrameSequence';
import { FRAME_CONFIG } from '@/lib/constants';

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mobilePlayed, setMobilePlayed] = useState(false);

  // Detect mobile once on mount. Auto-play is only used on phones because
  // touch scroll flicks cover the whole section in one motion, which would
  // otherwise skip through all 91 frames before the user sees any of them.
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const {
    loadProgress,
    firstFrameLoaded,
    staticFallback,
    drawFrame,
  } = useFrameSequence(canvasRef, sectionRef, {
    frameCount: FRAME_CONFIG.count,
    directory: FRAME_CONFIG.directory,
    prefix: FRAME_CONFIG.prefix,
    extension: FRAME_CONFIG.extension,
    padLength: FRAME_CONFIG.padLength,
    enableScrollDriven: !isMobile, // desktop: scroll-linked, mobile: auto-play
  });

  // ── Mobile auto-play ──────────────────────────────────────────
  // When the canvas section enters view, lock body scroll, run the full
  // reveal over 2.8s via RAF, then unlock. Subsequent re-entries don't
  // re-play — the final assembled-logo frame stays on screen.
  useEffect(() => {
    if (!isMobile || !firstFrameLoaded || staticFallback || mobilePlayed) return;
    const section = sectionRef.current;
    if (!section) return;

    let rafId = 0;
    let startTime = 0;
    const duration = 2800;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < 0.85 || mobilePlayed) return;
        observer.disconnect();

        // Lock scroll — body + html to catch iOS Safari edge case
        const prevBodyOverflow = document.body.style.overflow;
        const prevHtmlOverflow = document.documentElement.style.overflow;
        const prevBodyTouch = document.body.style.touchAction;
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        document.body.style.touchAction = 'none';

        const totalFrames = FRAME_CONFIG.count;
        const tick = (now: number) => {
          if (!startTime) startTime = now;
          const elapsed = now - startTime;
          const p = Math.min(1, elapsed / duration);
          // Ease-out cubic — starts fast, settles gently at the end
          const eased = 1 - Math.pow(1 - p, 3);
          const frameIndex = Math.min(totalFrames - 1, Math.floor(eased * totalFrames));
          drawFrame(frameIndex);

          if (p < 1) {
            rafId = requestAnimationFrame(tick);
          } else {
            // Animation done — unlock and mark played
            document.body.style.overflow = prevBodyOverflow;
            document.documentElement.style.overflow = prevHtmlOverflow;
            document.body.style.touchAction = prevBodyTouch;
            setMobilePlayed(true);
          }
        };
        rafId = requestAnimationFrame(tick);
      },
      { threshold: [0, 0.5, 0.85, 1] }
    );
    observer.observe(section);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isMobile, firstFrameLoaded, staticFallback, mobilePlayed, drawFrame]);

  return (
    <section
      ref={sectionRef}
      className="h-screen md:h-[340vh] lg:h-[440vh] relative section-vignette overflow-x-clip"
      style={{ backgroundColor: '#F6F2E6' }}
    >
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ backgroundColor: '#F6F2E6' }}
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Pre-first-frame loader — hides as soon as frame 1 paints */}
        {!firstFrameLoaded && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: '#F6F2E6' }}
          >
            <div className="text-center px-6">
              <div className="font-display font-bold text-2xl md:text-3xl text-brand-purple mb-2">
                إمكان المستقبل
              </div>
              <p className="text-brand-text-muted text-xs md:text-sm mb-6">
                جاري تحميل التجربة
              </p>
              <div className="w-44 md:w-48 h-[2px] bg-brand-purple/10 mx-auto overflow-hidden rounded-full">
                <div
                  className="h-full bg-brand-teal transition-all duration-300 rounded-full"
                  style={{ width: `${loadProgress * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
