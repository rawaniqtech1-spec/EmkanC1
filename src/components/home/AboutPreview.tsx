'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '@/components/shared/Button';
import ParallaxImage from '@/components/shared/ParallaxImage';
import LazyVideo from '@/components/shared/LazyVideo';
import { SoundWaveBars } from '@/components/shared/BrandDecor';
import { content } from '@/content/ar';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Text slides in from right (RTL layout)
      gsap.fromTo(
        '.about-text',
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Video scales up into view
      gsap.fromTo(
        '.about-video',
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-12 md:py-20 lg:py-28 px-4 sm:px-6 md:px-12 bg-surface-primary relative overflow-hidden">
      {/* Decorative gradient blob top-right */}
      <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-brand-teal/[0.04] rounded-full blur-[80px]" />
      <SoundWaveBars color="purple" size="sm" className="absolute top-12 left-8 opacity-[0.18] animate-float hidden md:flex" />
      <div ref={sectionRef} className="relative z-[2] max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-6 sm:gap-10 md:gap-16 items-center">
          <div>
            <span className="about-text inline-block text-xs text-brand-teal tracking-[0.2em] font-medium mb-4">
              {content.home.aboutPreview.sectionLabel}
            </span>
            <h2 className="about-text font-display font-bold text-2xl sm:text-3xl md:text-4xl text-brand-text mb-4 sm:mb-6 leading-tight">
              {content.home.aboutPreview.title}
            </h2>
            <p className="about-text text-brand-text-muted leading-relaxed text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-lg">
              {content.home.aboutPreview.text}
            </p>
            <div className="about-text">
              <Button href="/about" variant="secondary" size="sm">
                {content.home.aboutPreview.link}
              </Button>
            </div>
          </div>

          {/* Parallax image with video overlay */}
          <div className="about-video relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden border-2 border-brand-teal/20 relative">
              <LazyVideo
                src="/videos/children-classroom.mp4"
                className="absolute inset-0 w-full h-full object-cover"
                overlayClassName="absolute inset-0 bg-gradient-to-t from-brand-purple/30 to-transparent"
              />
            </div>

            {/* Floating parallax card */}
            <div className="absolute -bottom-4 sm:-bottom-6 left-2 sm:-left-6 md:-left-10 z-10">
              <ParallaxImage
                src="/images/card-3.jpg"
                alt="أطفال يتعلمون"
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-xl shadow-xl border-4 border-white dark:border-brand-purple-dark"
                speed={0.3}
              />
            </div>

            {/* Decorative element */}
            <div className="absolute -top-4 -right-4 w-16 sm:w-24 h-16 sm:h-24 border-2 border-brand-teal/20 rounded-xl -z-10 hidden sm:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
