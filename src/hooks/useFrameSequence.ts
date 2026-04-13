'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface FrameSequenceOptions {
  frameCount: number;
  directory: string;
  prefix: string;
  extension: string;
  padLength: number;
  // When false, the hook won't subscribe to scroll — caller drives frames
  // manually via the returned `drawFrame(index)`. Used by mobile auto-play.
  enableScrollDriven?: boolean;
}

interface NetworkInfo {
  effectiveType?: string;
  saveData?: boolean;
}

function detectNetwork(): NetworkInfo {
  if (typeof navigator === 'undefined') return {};
  const conn = (navigator as Navigator & { connection?: NetworkInfo }).connection;
  return {
    effectiveType: conn?.effectiveType,
    saveData: conn?.saveData,
  };
}

export function useFrameSequence(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  sectionRef: React.RefObject<HTMLElement | null>,
  options: FrameSequenceOptions
) {
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(-1);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  // First-frame state lets the loader hide and the canvas show as soon as
  // frame 0 is decoded — instead of waiting for ALL 91 frames to download.
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);
  // On 2g/save-data we ship just the assembled end frame as a static poster
  // (graceful fallback so we don't burn 5MB on slow connections).
  const [staticFallback, setStaticFallback] = useState(false);

  // Preload all frames — frame 0 first, then the rest in parallel.
  useEffect(() => {
    const net = detectNetwork();
    const isSlowNet = net.effectiveType === '2g' || net.effectiveType === 'slow-2g' || net.saveData === true;

    if (isSlowNet) {
      // Static-fallback path: load only the final assembled frame.
      const lastNum = String(options.frameCount).padStart(options.padLength, '0');
      const img = new Image();
      img.src = `${options.directory}${options.prefix}${lastNum}${options.extension}`;
      img.fetchPriority = 'high';
      img.onload = () => {
        framesRef.current = [img];
        setStaticFallback(true);
        setFirstFrameLoaded(true);
        setIsLoaded(true);
        setLoadProgress(1);
      };
      return;
    }

    const frames: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= options.frameCount; i++) {
      const img = new Image();
      const num = String(i).padStart(options.padLength, '0');
      img.src = `${options.directory}${options.prefix}${num}${options.extension}`;
      // Boost the first 8 frames so the reveal can start instantly even on
      // mid-tier connections — the rest fill in as the user begins to scroll.
      if (i <= 8) {
        img.fetchPriority = 'high';
      } else if (i > options.frameCount - 4) {
        // The held end-state frames also get a small boost so the final
        // assembled-logo state is ready when scrolling completes.
        img.fetchPriority = 'high';
      } else {
        img.fetchPriority = 'low';
      }

      img.onload = () => {
        loaded++;
        setLoadProgress(loaded / options.frameCount);
        if (i === 1) setFirstFrameLoaded(true);
        if (loaded === options.frameCount) setIsLoaded(true);
      };

      img.onerror = () => {
        loaded++;
        if (i === 1) setFirstFrameLoaded(true); // unblock UI even on first-frame error
        if (loaded === options.frameCount) setIsLoaded(true);
      };

      frames.push(img);
    }

    framesRef.current = frames;
  }, [options.frameCount, options.directory, options.prefix, options.extension, options.padLength]);

  // Draw a frame on the canvas
  const drawFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // In static-fallback mode there's only one image; clamp the index
      const img = staticFallback ? framesRef.current[0] : framesRef.current[index];
      if (!img || !img.complete || !img.naturalWidth) return;

      // Use CSS pixel dimensions (canvas was scaled by DPR in resize)
      const cssW = canvas.clientWidth;
      const cssH = canvas.clientHeight;

      // Fill with the unified site background so the canvas section blends
      // seamlessly into its neighbors. The HeroCanvas top/bottom scrims hide
      // the slightly-warmer video rim at the edges.
      ctx.fillStyle = '#F7F4EE';
      ctx.fillRect(0, 0, cssW, cssH);

      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = cssW / cssH;
      const isMobile = window.innerWidth < 768;
      let drawW: number, drawH: number;

      if (isMobile) {
        // Cover-fit so the landscape video fills the portrait viewport
        if (canvasRatio > imgRatio) {
          drawW = cssW;
          drawH = cssW / imgRatio;
        } else {
          drawH = cssH;
          drawW = cssH * imgRatio;
        }
      } else {
        // Contain-fit at 94% for breathing room on desktop
        const scale = 0.94;
        if (canvasRatio > imgRatio) {
          drawH = cssH * scale;
          drawW = drawH * imgRatio;
        } else {
          drawW = cssW * scale;
          drawH = drawW / imgRatio;
        }
      }

      const drawX = (cssW - drawW) / 2;
      const drawY = (cssH - drawH) / 2;

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    },
    [canvasRef, staticFallback]
  );

  // Resize canvas — DPR-aware so retina phones get sharp logo edges.
  // Cap at 2x DPR (a 3x phone with 2x scaling looks identical to native eyes
  // but uses 44% less GPU memory than full 3x).
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function resize() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cssW = window.innerWidth;
      const cssH = window.innerHeight;
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      if (currentFrameRef.current >= 0) {
        drawFrame(currentFrameRef.current);
      }
    }

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [canvasRef, drawFrame]);

  // Draw first frame as soon as it loads (don't wait for the whole sequence).
  useEffect(() => {
    if (firstFrameLoaded && currentFrameRef.current < 0) {
      drawFrame(0);
      currentFrameRef.current = 0;
    }
  }, [firstFrameLoaded, drawFrame]);

  // Scroll-driven frame updates — gated by IntersectionObserver so we don't
  // burn CPU on every scroll tick after the user has scrolled past the canvas.
  useEffect(() => {
    if (!firstFrameLoaded || staticFallback) return;
    if (options.enableScrollDriven === false) return; // caller drives manually
    const section = sectionRef.current;
    if (!section) return;

    let ticking = false;
    let isInView = true;

    function handleScroll() {
      if (!isInView || ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (!section) { ticking = false; return; }
        const rect = section.getBoundingClientRect();
        const scrollableHeight = section.offsetHeight - window.innerHeight;
        if (scrollableHeight > 0) {
          const progress = Math.min(1, Math.max(0, -rect.top / scrollableHeight));
          const frameIndex = Math.min(
            options.frameCount - 1,
            Math.floor(progress * options.frameCount)
          );
          if (frameIndex !== currentFrameRef.current && frameIndex >= 0) {
            currentFrameRef.current = frameIndex;
            drawFrame(frameIndex);
          }
        }
        ticking = false;
      });
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting;
        if (isInView) handleScroll();
      },
      { rootMargin: '50% 0px' }
    );
    observer.observe(section);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [firstFrameLoaded, staticFallback, sectionRef, options.frameCount, options.enableScrollDriven, drawFrame]);

  return {
    loadProgress,
    isLoaded,
    firstFrameLoaded,
    staticFallback,
    currentFrame: currentFrameRef,
    drawFrame,
  };
}
