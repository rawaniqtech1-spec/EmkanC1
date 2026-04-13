'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const stripeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !stripeRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        stripeRef.current,
        { xPercent: 0 },
        {
          xPercent: -55,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-hidden
      dir="ltr"
      className="relative overflow-hidden bg-surface-primary py-12 md:py-20"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-teal/25 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-teal/25 to-transparent" />

      <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-surface-primary to-transparent pointer-events-none z-[2]" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-surface-primary to-transparent pointer-events-none z-[2]" />

      <div
        ref={stripeRef}
        className="flex whitespace-nowrap will-change-transform"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            dir="rtl"
            className="font-display font-bold tracking-tight shrink-0 leading-[0.95] px-8 md:px-14 select-none"
            style={{
              fontSize: 'clamp(72px, 14vw, 200px)',
              color: 'var(--brand-text)',
              opacity: 0.08,
            }}
          >
            إمكان المستقبل
          </span>
        ))}
      </div>
    </section>
  );
}
