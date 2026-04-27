'use client';

import { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from '@/components/shared/SectionHeading';
import Button from '@/components/shared/Button';
import { IconSpeech, IconTherapy, IconHearing, IconEarly, IconBehavior, IconLearning, IconFamily, IconGov, IconScreening, IconGlobe } from '@/components/shared/BrandIcons';
import LazyVideo from '@/components/shared/LazyVideo';
import { content } from '@/content/ar';
import { useInView } from '@/hooks/useInView';
import { useCountUp } from '@/hooks/useCountUp';
import { CARD_DIRECTIONS, CARD_EASINGS } from '@/lib/animations';
import { SoundWaveRow, SwooshCurve, SoundWaveBars } from '@/components/shared/BrandDecor';

const TiltCard = dynamic(() => import('@/components/shared/TiltCard'), { ssr: false });
const ParticlesBackground = dynamic(() => import('@/components/shared/ParticlesBackground'), { ssr: false });
const ScrollMarquee = dynamic(() => import('@/components/shared/ScrollMarquee'));
const WaveTransition = dynamic(() => import('@/components/shared/WaveTransition'));
const TypeAnimation = dynamic(
  () => import('react-type-animation').then((m) => m.TypeAnimation),
  { ssr: false }
);

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SERVICE_ICONS = [IconSpeech, IconTherapy, IconHearing, IconEarly, IconBehavior, IconLearning, IconFamily];
const PARTNER_ICONS = [IconGov, IconScreening, IconGlobe];

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <SoundWaveRow color="teal" />
      <ServicesIntro />
      <ServicesList />
      <SwooshCurve color="teal" width={500} className="mx-auto opacity-[0.25]" />
      <ProcessSteps />
      <SoundWaveRow color="purple" />
      <ServicesStats />
      <ScrollMarquee text="خدماتنا" />
      <SchoolPartners />
    </>
  );
}

/* ── HERO with video background ── */
function ServicesHero() {
  return (
    <section className="relative min-h-[50vh] md:min-h-[70vh] flex items-center justify-center pt-20 overflow-hidden">
      <LazyVideo
        src="/videos/services-hero.mp4"
        className="absolute inset-0 w-full h-full object-cover"
        overlayClassName="absolute inset-0 bg-brand-purple/80 dark:bg-brand-purple-dark/85"
      />
      <ParticlesBackground />
      <div className="relative text-center px-4 md:px-6 max-w-3xl">
        <span className="inline-block text-xs text-brand-teal font-medium mb-6">
          {content.services.hero.label}
        </span>
        <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-brand-text mb-6 leading-[1.1]">
          {content.services.hero.title}
        </h1>
        <TypeAnimation sequence={[content.services.hero.subtitle]} wrapper="p" speed={30} className="text-white/70 text-base md:text-xl max-w-xl mx-auto" />
        <div className="w-16 h-[2px] bg-brand-teal mx-auto my-8" />
        <div className="flex gap-4 justify-center flex-wrap">
          <Button href="/contact" variant="white" size="md">احجز استشارة</Button>
          <Button href="#services" variant="ghost" size="md" className="text-white border-white/20 hover:bg-white/10">استكشف الخدمات</Button>
        </div>
      </div>
    </section>
  );
}

/* ── INTRO — what we offer at a glance ── */
function ServicesIntro() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const icons = ref.current!.querySelectorAll('.intro-icon');
      icons.forEach((icon, i) => {
        const dir = CARD_DIRECTIONS[i % CARD_DIRECTIONS.length];
        gsap.fromTo(icon,
          { opacity: 0, x: dir.x, y: dir.y, scale: 0.9 },
          { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.5, delay: i * 0.06, ease: CARD_EASINGS[i % 2],
            scrollTrigger: { trigger: icon, start: 'top 90%', toggleActions: 'play none none none' }
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-12 md:py-20 lg:py-24 px-4 md:px-12 bg-surface-primary relative overflow-hidden">
      <SoundWaveBars color="purple" size="sm" className="absolute top-8 right-8 opacity-[0.18] animate-float hidden md:flex" />
      <div ref={ref} className="max-w-[1100px] mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display font-bold text-2xl md:text-4xl text-brand-text mb-4">٧ خدمات متخصصة لطفلك</h2>
          <p className="text-brand-text-muted max-w-xl mx-auto">نقدم مجموعة متكاملة من الخدمات المتخصصة في النطق والتخاطب والتأهيل</p>
          <div className="w-12 h-[2px] bg-brand-teal mx-auto mt-6" />
        </div>

        {/* Quick service icons grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4">
          {content.services.items.map((service, i) => {
            const Icon = SERVICE_ICONS[i];
            return (
              <TiltCard key={i} intensity={6} shadow={false} highlight={false}>
                <a href={`#service-${service.id}`} className="intro-icon group text-center p-3 sm:p-4 rounded-2xl bg-surface-card border border-[var(--border-default)] hover:border-brand-teal hover:shadow-lg transition-all duration-300 block">
                  <div className="w-12 h-12 rounded-xl bg-brand-teal/10 border border-brand-teal/20 flex items-center justify-center mx-auto mb-3 text-brand-teal group-hover:scale-110 transition-transform duration-300">
                    <Icon size={24} />
                  </div>
                  <p className="text-xs font-medium text-brand-text leading-tight">{service.title.split(' ').slice(0, 2).join(' ')}</p>
                </a>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── SERVICES LIST — all 7 with alternating layouts ── */
function ServiceItem({ service, index }: { service: typeof content.services.items[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = SERVICE_ICONS[index];
  const isEven = index % 2 === 0;
  // One unique, context-matched video per service — no more duplicates.
  const videos = [
    '/videos/service-assessment.mp4',  // 0 — التقييم والتشخيص
    '/videos/children-learning.mp4',   // 1 — العلاج والتأهيل
    '/videos/service-hearing.mp4',     // 2 — التأهيل السمعي
    '/videos/children-playing.mp4',    // 3 — التدخل المبكر
    '/videos/service-behavior.mp4',    // 4 — تعديل السلوك
    '/videos/service-education.mp4',   // 5 — الخدمات التعليمية المساندة
    '/videos/service-family.mp4',      // 6 — خدمات الأسر
  ];

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.svc-content',
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 90%', toggleActions: 'play none none none' } }
      );
      gsap.fromTo('.svc-media',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 90%', toggleActions: 'play none none none' } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} id={`service-${service.id}`} className="py-14 md:py-20 border-b border-[var(--border-subtle)] last:border-b-0">
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center ${!isEven ? 'md:[direction:ltr]' : ''}`}>
        {/* Content */}
        <div className={`svc-content ${!isEven ? 'md:[direction:rtl]' : ''}`}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-xl bg-brand-teal/10 border border-brand-teal/20 flex items-center justify-center text-brand-teal">
              <Icon size={26} />
            </div>
            <span className="text-xs text-brand-teal font-bold">الخدمة {`٠${index + 1}`.replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)])}</span>
          </div>

          <h3 className="font-display font-bold text-xl md:text-3xl text-brand-text mb-4 leading-tight">{service.title}</h3>
          <p className="text-brand-text-muted leading-relaxed mb-6">{service.desc}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {service.features.map((f, j) => (
              <div key={j} className="flex items-center gap-2 text-sm text-brand-text-muted py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-teal shrink-0" />
                {f}
              </div>
            ))}
          </div>
        </div>

        {/* Video/Media */}
        <div className={`svc-media ${!isEven ? 'md:[direction:rtl] md:order-first' : ''}`}>
          <div className="aspect-[4/3] rounded-2xl overflow-hidden relative border border-[var(--border-default)]">
            <LazyVideo
              src={videos[index]}
              className="absolute inset-0 w-full h-full object-cover"
              overlayClassName="absolute inset-0 bg-gradient-to-t from-brand-purple/20 to-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ServicesList() {
  return (
    <section id="services" className="px-4 md:px-12 bg-surface-secondary relative overflow-hidden section-vignette">
      {/* Layered texture */}
      <div className="absolute top-[10%] -right-32 w-[600px] h-[600px] bg-brand-teal/10 rounded-full blur-[140px] animate-blob-2 pointer-events-none" />
      <div className="absolute bottom-[10%] -left-32 w-[500px] h-[500px] bg-brand-purple/8 rounded-full blur-[130px] animate-blob-4 pointer-events-none" />
      <SoundWaveBars color="teal" size="md" className="absolute top-20 left-8 md:top-24 md:left-16 opacity-[0.18] animate-float hidden md:flex" />
      <SoundWaveBars color="purple" size="sm" className="absolute bottom-24 right-8 md:bottom-32 md:right-16 opacity-[0.2] animate-float-reverse hidden md:flex" />
      <SwooshCurve color="teal" width={320} className="absolute top-32 right-20 opacity-[0.12] hidden lg:block" />

      <div className="relative z-[2] max-w-[1100px] mx-auto">
        {content.services.items.map((service, i) => (
          <ServiceItem key={service.id} service={service} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ── PROCESS STEPS ── */
function ProcessSteps() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.process-step',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.process-step', start: 'top 90%', toggleActions: 'play none none none' } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-12 md:py-20 lg:py-24 px-4 md:px-12 bg-surface-secondary relative overflow-hidden section-vignette">
      {/* Layered texture */}
      <div className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-brand-teal/10 rounded-full blur-[140px] animate-blob-1 pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-brand-purple/8 rounded-full blur-[130px] animate-blob-3 pointer-events-none" />
      <SoundWaveBars color="purple" size="md" className="absolute top-10 right-8 md:top-16 md:right-16 opacity-[0.2] animate-float" />
      <SoundWaveBars color="teal" size="sm" className="absolute bottom-10 left-8 md:bottom-16 md:left-16 opacity-[0.18] animate-float-reverse" />
      <SwooshCurve color="purple" width={280} className="absolute bottom-20 right-20 opacity-[0.12] rotate-180 hidden lg:block" />

      <div ref={ref} className="relative z-[2] max-w-[900px] mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs text-brand-teal font-medium mb-3 block">{content.services.process.sectionLabel}</span>
          <h2 className="font-display font-bold text-2xl md:text-4xl text-brand-text">{content.services.process.title}</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {content.services.process.steps.map((step, i) => (
            <div key={i} className="process-step text-center bg-surface-card border border-[var(--border-default)] rounded-2xl p-4 sm:p-6 md:p-8 hover:bg-surface-secondary transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-brand-purple text-white flex items-center justify-center mx-auto mb-4 font-display font-bold text-xl">
                {step.number}
              </div>
              <h4 className="font-display font-bold text-brand-text text-sm md:text-base mb-2">{step.title}</h4>
              <p className="text-[12px] md:text-sm text-brand-text-muted leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── STATS ── */
function ServicesStats() {
  const { ref, isInView } = useInView(0.3);

  const stats = [
    { number: 7, suffix: '', label: 'خدمات متخصصة' },
    { number: 500, suffix: '+', label: 'مستفيد' },
    { number: 25, suffix: '+', label: 'أخصائي' },
    { number: 95, suffix: '%', label: 'نسبة رضا' },
  ];

  return (
    <section ref={ref} className="py-12 md:py-20 px-4 md:px-12 bg-surface-primary relative overflow-hidden section-vignette">
      {/* Layered texture */}
      <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-brand-teal/10 rounded-full blur-[130px] animate-blob-2 pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-brand-purple/8 rounded-full blur-[120px] animate-blob-4 pointer-events-none" />
      <SoundWaveBars color="teal" size="sm" className="absolute top-8 left-8 opacity-[0.18] animate-float hidden md:flex" />
      <SoundWaveBars color="purple" size="sm" className="absolute bottom-8 right-8 opacity-[0.18] animate-float-reverse hidden md:flex" />

      <div className="relative z-[2] max-w-[900px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        {stats.map((s, i) => (
          <ServiceStatCard key={i} {...s} isActive={isInView} delay={i * 200} />
        ))}
      </div>
    </section>
  );
}

function ServiceStatCard({ number, suffix, label, isActive, delay }: { number: number; suffix: string; label: string; isActive: boolean; delay: number }) {
  const value = useCountUp(number, isActive, 1800 + delay);
  return (
    <div className="text-center py-6 px-3 bg-surface-card rounded-2xl border border-[var(--border-default)]">
      <span className="font-display font-bold text-2xl md:text-3xl text-brand-text">{value}<span className="text-brand-teal">{suffix}</span></span>
      <p className="text-xs text-brand-text-muted mt-2">{label}</p>
    </div>
  );
}

/* ── SCHOOL PARTNERS ── */
function SchoolPartners() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const cards = ref.current!.querySelectorAll('.partner-card');
      cards.forEach((card, i) => {
        const dir = CARD_DIRECTIONS[i % CARD_DIRECTIONS.length];
        gsap.fromTo(card,
          { opacity: 0, x: dir.x, y: dir.y },
          { opacity: 1, x: 0, y: 0, duration: 0.6, delay: i * 0.1, ease: CARD_EASINGS[i % 2],
            scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' }
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-12 md:py-20 lg:py-24 px-4 md:px-12 bg-surface-secondary relative overflow-hidden">
      <div ref={ref} className="max-w-[900px] mx-auto">
        <SectionHeading label={content.services.schoolPartners.sectionLabel} title={content.services.schoolPartners.title} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {content.services.schoolPartners.categories.map((cat, i) => {
            const Icon = PARTNER_ICONS[i];
            return (
              <div key={i} className="partner-card bg-surface-card rounded-2xl p-7 border border-[var(--border-default)] hover:border-brand-teal hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center">
                <div className="w-14 h-14 rounded-xl bg-brand-teal/10 border border-brand-teal/20 flex items-center justify-center mb-5 mx-auto text-brand-teal">
                  <Icon size={30} />
                </div>
                <h4 className="font-display font-bold text-brand-text text-lg mb-2">{cat.title}</h4>
                <p className="text-sm text-brand-text-muted">{cat.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

