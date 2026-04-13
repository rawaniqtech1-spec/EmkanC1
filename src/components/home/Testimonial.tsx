'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { SoundWaveBars } from '@/components/shared/BrandDecor';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const TESTIMONIALS = [
  {
    quote: 'غيّر مركز إمكان المستقبل حياة طفلي بالكامل. الفريق المتخصص والبيئة الداعمة ساعدا ابني على تجاوز صعوبات النطق وأصبح أكثر ثقة وتفاعلاً مع أقرانه.',
    author: 'أم محمد',
    role: 'ولي أمر — علاج نطق',
    rating: 5,
  },
  {
    quote: 'ابنتي كانت تعاني من صعوبات في التعلم وبعد ٦ أشهر فقط مع فريق المركز لاحظنا تحسناً كبيراً في أدائها المدرسي. شكراً لكل فرد في هذا المركز المتميز.',
    author: 'أبو سارة',
    role: 'ولي أمر — تنمية مهارات',
    rating: 5,
  },
  {
    quote: 'أعجبني جداً أسلوب التعامل مع الأطفال — حب وصبر واحترافية. ابني يحب الذهاب للمركز وهذا أكبر دليل على جودة البيئة التي يوفرونها.',
    author: 'أم عبدالله',
    role: 'ولي أمر — تعديل سلوك',
    rating: 5,
  },
];

export default function Testimonial() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      // Quote fades in and author slides up
      gsap.fromTo(
        '.testimonial-section',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const current = TESTIMONIALS[active];

  return (
    <section ref={ref} className="py-12 md:py-20 lg:py-28 px-4 sm:px-6 md:px-12 bg-surface-primary relative overflow-hidden">
      {/* Decorative large circles */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full border border-brand-teal/[0.05] hidden md:block" />
      <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full border border-brand-purple/[0.04] hidden md:block" />
      {/* Gradient glow center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-brand-teal/[0.03] rounded-full blur-[120px]" />
      {/* Background decoration */}
      <div className="absolute top-10 right-4 sm:right-10 text-[100px] sm:text-[200px] font-display text-brand-teal/[0.06] leading-none pointer-events-none select-none animate-float-slow">
        &ldquo;
      </div>
      {/* Floating brand icons */}
      <SoundWaveBars color="teal" size="sm" className="absolute bottom-12 left-8 opacity-[0.18] animate-float-reverse hidden md:flex" />

      <div className="testimonial-section max-w-[750px] mx-auto text-center relative z-[2]">
        <span className="text-xs text-brand-teal tracking-[0.2em] font-medium mb-6 sm:mb-10 block">
          ماذا يقول الأهل
        </span>

        {/* Stars */}
        <div className="flex justify-center gap-1 mb-5 sm:mb-8">
          {Array.from({ length: current.rating }).map((_, i) => (
            <span key={i} className="text-amber-400 text-lg">★</span>
          ))}
        </div>

        {/* Quote — animate on change */}
        <div className="min-h-[140px] sm:min-h-[140px] md:min-h-[120px] flex items-center justify-center">
          <blockquote
            key={active}
            className="font-display text-[15px] sm:text-lg md:text-2xl lg:text-3xl text-brand-text leading-relaxed font-medium animate-fade-in"
          >
            &ldquo;{current.quote}&rdquo;
          </blockquote>
        </div>

        {/* Author */}
        <div className="mt-8">
          <p className="font-display font-bold text-brand-text text-base">
            {current.author}
          </p>
          <p className="text-sm text-brand-text-muted mt-1">
            {current.role}
          </p>
        </div>

        {/* Navigation dots — padded for 44px touch target */}
        <div className="flex justify-center gap-1 mt-10">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="relative flex items-center justify-center min-w-[44px] min-h-[44px]"
              aria-label={`الشهادة ${i + 1}`}
            >
              <span
                className={`block transition-all duration-300 rounded-full ${
                  i === active
                    ? 'w-8 h-2 bg-brand-teal'
                    : 'w-2 h-2 bg-brand-text-muted/20 hover:bg-brand-teal/50'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
