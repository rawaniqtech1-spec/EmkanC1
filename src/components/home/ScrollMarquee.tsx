'use client';

import { useRef, useEffect, useState } from 'react';

export default function ScrollMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '100px 0px' }
    );
    observer.observe(section);
    return () => observer.disconnect();
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
        className="flex animate-marquee whitespace-nowrap will-change-transform"
        style={{
          animationDuration: '4s',
          animationPlayState: inView ? 'running' : 'paused',
        }}
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
