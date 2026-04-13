'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from '@/components/shared/SectionHeading';
import { IconPhone, IconAssessment, IconPlan, IconJourney } from '@/components/shared/BrandIcons';
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const STEPS = [
  {
    number: '١',
    title: 'التواصل الأول',
    desc: 'تواصل معنا عبر الهاتف أو الواتساب. فريقنا مستعد للإجابة على جميع استفساراتك وتحديد موعد مناسب.',
    Icon: IconPhone,
    detail: 'مجاني وبدون التزام',
  },
  {
    number: '٢',
    title: 'التقييم الشامل',
    desc: 'يقوم فريق متعدد التخصصات بتقييم شامل لطفلك لتحديد نقاط القوة والاحتياجات بدقة.',
    Icon: IconAssessment,
    detail: 'فريق من ٣+ أخصائيين',
  },
  {
    number: '٣',
    title: 'الخطة العلاجية',
    desc: 'نصمم خطة علاجية فردية مخصصة لطفلك بالتعاون معك، مع أهداف واضحة وقابلة للقياس.',
    Icon: IconPlan,
    detail: 'مخصصة ١٠٠٪ لطفلك',
  },
  {
    number: '٤',
    title: 'بداية الرحلة',
    desc: 'تبدأ الجلسات العلاجية مع متابعة مستمرة للتقدم وتحديث الخطة حسب تطور طفلك.',
    Icon: IconJourney,
    detail: 'متابعة أسبوعية مع الأسرة',
  },
];

export default function JourneySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const useScrub = window.innerWidth >= 1024;
    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: useScrub ? 1.5 : 1,
            ease: 'none',
            transformOrigin: 'top',
            scrollTrigger: useScrub
              ? { trigger: sectionRef.current, start: 'top 60%', end: 'bottom 60%', scrub: 1 }
              : { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
          }
        );
      }

      gsap.fromTo(
        '.journey-step',
        { opacity: 0, x: (i: number) => (i % 2 === 0 ? 60 : -60) },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        '.journey-icon',
        { scale: 0 },
        {
          scale: 1,
          duration: 0.5,
          stagger: 0.2,
          delay: 0.3,
          ease: 'back.out(2)',
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
    <section className="force-light py-12 md:py-20 lg:py-28 px-4 sm:px-6 md:px-12 bg-surface-primary relative overflow-hidden">
      {/* Gradient bottom-left blob */}
      <div className="absolute -bottom-20 -left-20 w-[350px] h-[350px] bg-brand-purple/[0.03] rounded-full blur-[100px]" />
      {/* Dotted arc */}
      <div className="absolute top-20 right-10 w-[200px] h-[200px] rounded-full border border-dashed border-brand-teal/[0.06] hidden md:block" />
      {/* Brand-inspired decorative elements — sound wave bars — now floating */}
      <div className="absolute top-16 right-4 sm:right-8 flex gap-1.5 opacity-[0.18] animate-float">
        {[12, 20, 28, 20, 12].map((h, i) => (
          <div key={i} className="w-1.5 sm:w-2 rounded-full bg-brand-purple" style={{ height: h }} />
        ))}
      </div>
      <div className="absolute bottom-16 left-4 sm:left-8 flex gap-1.5 opacity-[0.18] animate-float-reverse">
        {[8, 16, 24, 16, 8].map((h, i) => (
          <div key={i} className="w-1.5 sm:w-2 rounded-full bg-brand-teal" style={{ height: h }} />
        ))}
      </div>

      <div className="relative max-w-[800px] mx-auto">
        <SectionHeading
          label="كيف نعمل"
          title="رحلة طفلك معنا"
          subtitle="أربع خطوات بسيطة نحو مستقبل أفضل"
        />

        <div ref={sectionRef} className="relative mt-16">
          <div
            ref={lineRef}
            className="absolute right-1/2 translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-brand-teal via-brand-purple-light to-brand-teal hidden md:block"
          />

          <div className="space-y-8 md:space-y-0">
            {STEPS.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <div
                  key={i}
                  className={`journey-step relative md:flex items-center gap-8 md:py-10 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Mobile icon — shown above card on mobile */}
                  <div className="journey-icon flex md:hidden w-11 h-11 rounded-full bg-brand-purple dark:bg-surface-elevated border-4 border-surface-secondary items-center justify-center mb-3 shadow-lg text-white dark:text-brand-teal">
                    <step.Icon size={20} />
                  </div>

                  <div className={`flex-1 ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                    <div className="bg-white dark:bg-surface-card rounded-2xl p-4 sm:p-6 md:p-8 border border-[var(--border-subtle)] hover:border-[var(--border-hover)] transition-all duration-500 hover:-translate-y-1 group">
                      <span className="text-[11px] sm:text-xs text-brand-teal-dark font-bold tracking-wider block mb-2 sm:mb-3">
                        الخطوة {step.number}
                      </span>
                      <h3 className="font-display font-bold text-base sm:text-lg md:text-xl text-brand-text mb-2 sm:mb-3">
                        {step.title}
                      </h3>
                      <p className="text-[13px] sm:text-sm text-brand-text-muted leading-relaxed mb-3 sm:mb-4">
                        {step.desc}
                      </p>
                      <span className="inline-flex items-center gap-2 text-xs text-brand-teal bg-brand-teal/10 dark:bg-brand-teal/5 px-3 py-1.5 rounded-full font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-teal" />
                        {step.detail}
                      </span>
                    </div>
                  </div>

                  {/* Center icon — brand SVG (desktop only) */}
                  <div className="journey-icon hidden md:flex w-14 h-14 rounded-full bg-brand-purple dark:bg-surface-elevated border-4 border-surface-secondary shrink-0 items-center justify-center z-10 shadow-lg text-white dark:text-brand-teal">
                    <step.Icon size={24} />
                  </div>

                  <div className="flex-1 hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
