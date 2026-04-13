'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrameSequence } from '@/hooks/useFrameSequence';
import { FRAME_CONFIG } from '@/lib/constants';

/* ─────────────────────── Chapters ─────────────────────── */
// Three-act reveal synced to the 91-frame brand animation:
//   01 [frames  0-30] — anticipation: scattered pieces, before form
//   02 [frames 30-63] — assembly: pieces find their place
//   03 [frames 63-91] — arrival: the logo is whole, the message breathes
// Chapter text overlays fade in/out with the scroll (or auto-play) progress.
const CHAPTERS = [
  {
    number: '٠١',
    label: 'البداية',
    title: 'لكل طفل إمكان',
    subtitle: 'نؤمن أن في داخل كل طفل قدرات كامنة تنتظر من يكتشفها',
    range: [0, 30] as const,
  },
  {
    number: '٠٢',
    label: 'الرحلة',
    title: 'نرعاه ونُطلقه',
    subtitle: 'خطوة بعد خطوة، نبني الثقة ونوقظ الإمكانات',
    range: [30, 63] as const,
  },
  {
    number: '٠٣',
    label: 'الهدف',
    title: 'معًا نصنع المستقبل',
    subtitle: 'رحلة تطوير متكاملة تصنع فرقًا حقيقيًا في حياة كل أسرة',
    range: [63, 91] as const,
  },
] as const;

function chapterIndexFor(frame: number) {
  for (let i = 0; i < CHAPTERS.length; i++) {
    const [from, to] = CHAPTERS[i].range;
    if (frame >= from && frame < to) return i;
  }
  return CHAPTERS.length - 1;
}

/* ─────────────────────── Component ─────────────────────── */
export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [mobilePlayed, setMobilePlayed] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [progress, setProgress] = useState(0);
  const [revealStarted, setRevealStarted] = useState(false);

  // Detect mobile once on mount. Auto-play mode only runs on phones because
  // touch-flick scroll covers the whole section in one motion, which would
  // otherwise skip through all 91 frames before any could paint.
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const {
    loadProgress,
    firstFrameLoaded,
    staticFallback,
    currentFrame,
    drawFrame,
  } = useFrameSequence(canvasRef, sectionRef, {
    frameCount: FRAME_CONFIG.count,
    directory: FRAME_CONFIG.directory,
    prefix: FRAME_CONFIG.prefix,
    extension: FRAME_CONFIG.extension,
    padLength: FRAME_CONFIG.padLength,
    enableScrollDriven: true,
  });

  /* ─── Mobile auto-play with scroll lock (disabled — scroll-driven now) ─── */
  const MOBILE_AUTOPLAY = false;
  useEffect(() => {
    if (!MOBILE_AUTOPLAY) return;
    if (!isMobile || !firstFrameLoaded || staticFallback || mobilePlayed) return;
    const section = sectionRef.current;
    if (!section) return;

    let rafId = 0;
    let startTime = 0;
    const duration = 2800;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < 0.8 || mobilePlayed) return;
        observer.disconnect();

        const prevBodyOverflow = document.body.style.overflow;
        const prevHtmlOverflow = document.documentElement.style.overflow;
        const prevTouch = document.body.style.touchAction;
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        document.body.style.touchAction = 'none';

        const totalFrames = FRAME_CONFIG.count;
        const tick = (now: number) => {
          if (!startTime) startTime = now;
          const elapsed = now - startTime;
          const p = Math.min(1, elapsed / duration);
          // Ease-out cubic — starts brisk, settles with weight
          const eased = 1 - Math.pow(1 - p, 3);
          const frameIndex = Math.min(totalFrames - 1, Math.floor(eased * totalFrames));
          drawFrame(frameIndex);
          currentFrame.current = frameIndex;

          if (p < 1) {
            rafId = requestAnimationFrame(tick);
          } else {
            document.body.style.overflow = prevBodyOverflow;
            document.documentElement.style.overflow = prevHtmlOverflow;
            document.body.style.touchAction = prevTouch;
            setMobilePlayed(true);
          }
        };
        rafId = requestAnimationFrame(tick);
      },
      { threshold: [0, 0.5, 0.8, 1] }
    );
    observer.observe(section);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isMobile, firstFrameLoaded, staticFallback, mobilePlayed, drawFrame, currentFrame]);

  /* ─── Poll currentFrame → derive progress, chapter, revealStarted ─── */
  useEffect(() => {
    if (!firstFrameLoaded) return;
    let rafId = 0;
    let lastChapter = -1;
    let lastProgress = -1;

    const tick = () => {
      const frame = currentFrame.current < 0 ? 0 : currentFrame.current;
      const pct = frame / (FRAME_CONFIG.count - 1);

      // Update progress only when it changes by more than 0.5% — fewer re-renders
      if (Math.abs(pct - lastProgress) > 0.005) {
        setProgress(pct);
        lastProgress = pct;
      }

      const chapter = chapterIndexFor(frame);
      if (chapter !== lastChapter) {
        setActiveChapter(chapter);
        lastChapter = chapter;
      }

      // Fade out the scroll hint once the reveal has actually begun
      if (frame > 3) setRevealStarted(true);

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [firstFrameLoaded, currentFrame]);

  const current = CHAPTERS[activeChapter];

  return (
    <section
      ref={sectionRef}
      className="h-[48vh] md:h-[180vh] lg:h-[220vh] relative overflow-x-clip bg-[#1E1535]"
    >
      <div
        className="static md:sticky md:top-0 h-[48vh] md:h-screen w-full overflow-hidden bg-[#1E1535]"
      >
        {/* ─── The canvas ─────────────────────────────── */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
            firstFrameLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div
          className={`absolute top-6 md:top-10 left-1/2 -translate-x-1/2 z-10 transition-all duration-700 ${
            firstFrameLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] md:bg-brand-purple/10 backdrop-blur-md border border-white/10 md:border-brand-purple/20">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-60 animate-ping" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-teal" />
            </span>
            <span className="text-[11px] md:text-xs font-medium text-white md:text-brand-purple tracking-normal md:tracking-[0.25em] uppercase">
              رحلة إمكان
            </span>
          </div>
        </div>

        {/* ─── Chapter number pills on the right (RTL) ─── */}
        <div className="absolute top-1/2 right-4 md:right-8 -translate-y-1/2 z-10 hidden sm:flex flex-col gap-3 pointer-events-none">
          {CHAPTERS.map((c, i) => {
            const isActive = i === activeChapter;
            return (
              <div
                key={i}
                className={`flex items-center gap-2 justify-end transition-all duration-500 ${
                  isActive ? 'opacity-100' : 'opacity-35'
                }`}
              >
                <span
                  className={`text-[10px] font-display tabular-nums tracking-wider transition-colors duration-500 ${
                    isActive ? 'text-white' : 'text-white/40'
                  }`}
                >
                  {c.number}
                </span>
                <span
                  className={`block rounded-full transition-all duration-500 ${
                    isActive
                      ? 'w-1.5 h-6 bg-brand-teal'
                      : 'w-1.5 h-1.5 bg-white/30'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* ─── Chapter text overlay ────── */}
        <div className="absolute bottom-8 md:bottom-16 left-0 right-0 z-10 px-6 md:px-12 pointer-events-none">
          <div className="max-w-[720px] mx-auto text-center">
            {/* Key forces remount on chapter change for a clean fade/slide */}
            <div key={activeChapter} className="animate-fade-slide-up">
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="block w-6 h-[1px] bg-brand-teal/60" />
                <span className="text-[10px] md:text-xs font-medium text-brand-teal tracking-[0.3em] uppercase">
                  {current.label}
                </span>
                <span className="block w-6 h-[1px] bg-brand-teal/60" />
              </div>

              <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-5xl text-white md:text-brand-purple mb-2 md:mb-3 leading-tight">
                {current.title}
              </h2>

              <p className="text-[13px] sm:text-sm md:text-base text-white/70 md:text-brand-purple/75 leading-relaxed max-w-md mx-auto">
                {current.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* ─── Progress bar at the very bottom ────────── */}
        <div className="absolute bottom-2 md:bottom-6 left-0 right-0 z-10 pointer-events-none">
          <div className="max-w-[720px] mx-auto px-6 md:px-12">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-display tabular-nums text-white/50">
                {String(activeChapter + 1).padStart(2, '0')}
              </span>
              <div className="flex-1 h-[2px] bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-l from-brand-teal to-brand-teal-light rounded-full transition-[width] duration-150 ease-out"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <span className="text-[10px] font-display tabular-nums text-white/50">
                {String(CHAPTERS.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* ─── Scroll hint — fades out once the reveal starts ─── */}
        <div
          className={`absolute bottom-2 left-1/2 -translate-x-1/2 z-10 pointer-events-none hidden md:flex flex-col items-center gap-1 transition-all duration-500 ${
            revealStarted ? 'opacity-0 translate-y-2' : 'opacity-60 translate-y-0'
          }`}
        >
          <span className="text-[9px] text-white/60 tracking-[0.25em] uppercase">
            مرّر
          </span>
          <span className="block w-[1px] h-4 bg-white/30 animate-breathe origin-top" />
        </div>

        {/* ─── Premium loader (pre-first-frame only) ─────── */}
        {!firstFrameLoaded && (
          <div
            className="absolute inset-0 z-20 flex items-center justify-center bg-[#1E1535]"
          >
            <div className="text-center px-6">
              {/* Pulsing orbit */}
              <div className="relative w-14 h-14 mx-auto mb-6">
                <span className="absolute inset-0 rounded-full border border-brand-teal/40 animate-ping" />
                <span className="absolute inset-2 rounded-full border border-white/20" />
                <span className="absolute inset-[22px] rounded-full bg-brand-teal" />
              </div>
              <div className="font-display font-bold text-xl md:text-2xl text-white mb-1.5">
                إمكان المستقبل
              </div>
              <p className="text-white/60 text-[11px] md:text-xs tracking-wider mb-5">
                جاري تحميل التجربة
              </p>
              <div className="w-40 md:w-48 h-[2px] bg-white/10 mx-auto overflow-hidden rounded-full">
                <div
                  className="h-full bg-gradient-to-l from-brand-teal to-brand-teal-light transition-all duration-300 rounded-full"
                  style={{ width: `${loadProgress * 100}%` }}
                />
              </div>
              <p className="text-[10px] font-display tabular-nums text-brand-teal mt-2.5">
                {String(Math.round(loadProgress * 100)).padStart(3, '0')}%
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
