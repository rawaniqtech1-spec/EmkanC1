'use client';

import { useRef, useEffect, useState, useId, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const TypeAnimation = dynamic(
  () => import('react-type-animation').then((m) => m.TypeAnimation),
  { ssr: false }
);
import Button from '@/components/shared/Button';
import {
  IconPhone,
  IconEmail,
  IconLocation,
  IconChat,
} from '@/components/shared/BrandIcons';
import {
  SoundWaveRow,
  SoundWaveBars,
  SwooshCurve,
} from '@/components/shared/BrandDecor';
import { content } from '@/content/ar';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <SoundWaveRow color="teal" />
      <QuickContactStrip />
      <ContactContent />
      <FaqSection />
      <SwooshCurve color="teal" width={500} className="mx-auto opacity-[0.25]" />
      <WorkingHours />
      <SoundWaveRow color="purple" />
      <ContactBottomCTA />
    </>
  );
}

/* ─────────────────────── HERO ─────────────────────── */

function ContactHero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-hero-el',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const stats = [
    { value: '< ٢٤س', label: 'متوسط وقت الرد' },
    { value: '+٥٠٠', label: 'مستفيد سعيد' },
    { value: '٧', label: 'أيام دعم' },
  ];

  return (
    <section className="pt-24 pb-12 md:pt-40 md:pb-24 px-5 md:px-6 relative overflow-hidden bg-surface-primary section-vignette">
      {/* Layered background */}
      <div className="absolute -top-32 -right-32 w-[700px] h-[700px] bg-brand-teal/12 rounded-full blur-[140px] animate-blob-2 pointer-events-none" />
      <div className="absolute -bottom-40 -left-32 w-[600px] h-[600px] bg-brand-purple/10 rounded-full blur-[130px] animate-blob-4 pointer-events-none" />
      <SoundWaveBars color="teal" size="lg" className="absolute top-32 right-12 opacity-[0.22] animate-float hidden md:flex" />
      <SoundWaveBars color="purple" size="md" className="absolute bottom-20 left-12 opacity-[0.2] animate-float-reverse hidden md:flex" />
      <SwooshCurve color="teal" width={360} className="absolute top-24 left-20 opacity-[0.15] hidden lg:block" />

      <div ref={ref} className="relative z-[2] max-w-3xl mx-auto text-center">
        <span className="contact-hero-el inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-teal/10 border border-brand-teal/25 mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-teal" />
          </span>
          <span className="text-xs text-brand-teal font-medium tracking-wider">نحن هنا من أجلك</span>
        </span>

        <div className="contact-hero-el w-12 h-[2px] bg-brand-teal mx-auto mb-6" />

        <h1 className="contact-hero-el font-display font-bold text-3xl sm:text-4xl md:text-6xl text-brand-text mb-5 leading-[1.1]">
          {content.contact.hero.title}
        </h1>

        <TypeAnimation
          sequence={[content.contact.hero.subtitle]}
          wrapper="p"
          speed={30}
          className="contact-hero-el text-brand-text-muted text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
        />

        {/* Stats row */}
        <div className="contact-hero-el mt-12 grid grid-cols-3 max-w-lg mx-auto gap-4">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-display font-bold text-xl md:text-3xl text-brand-teal">{s.value}</div>
              <div className="text-xs md:text-sm text-brand-text-muted mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── QUICK CONTACT STRIP ─────────────────── */

function QuickContactStrip() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.qc-tile',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 85%', toggleActions: 'play none none none' },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const tiles = [
    {
      icon: <IconPhone size={22} />,
      label: 'اتصل بنا مباشرة',
      value: content.contact.info.phone,
      href: `tel:${content.contact.info.phone.replace(/\s+/g, '')}`,
      accent: 'teal' as const,
      note: 'الردّ فوري خلال ساعات العمل',
    },
    {
      icon: <IconChat size={22} />,
      label: 'راسلنا على واتساب',
      value: 'WhatsApp',
      href: content.contact.info.whatsapp,
      accent: 'green' as const,
      note: 'متاح ٢٤/٧',
    },
    {
      icon: <IconEmail size={22} />,
      label: 'أرسل لنا بريداً',
      value: content.contact.info.email,
      href: `mailto:${content.contact.info.email}`,
      accent: 'purple' as const,
      note: 'للاستفسارات التفصيلية',
    },
  ];

  return (
    <section className="py-10 md:py-16 px-4 md:px-12 bg-surface-primary relative overflow-hidden">
      <div ref={ref} className="relative z-[2] max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
        {tiles.map((tile, i) => (
          <QuickContactTile key={i} {...tile} />
        ))}
      </div>
    </section>
  );
}

function QuickContactTile({
  icon,
  label,
  value,
  href,
  accent,
  note,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  accent: 'teal' | 'green' | 'purple';
  note: string;
}) {
  const accents = {
    teal: {
      iconBg: 'bg-brand-teal/10 border-brand-teal/25 text-brand-teal',
      border: 'hover:border-brand-teal',
      glow: 'from-brand-teal/15',
    },
    green: {
      iconBg: 'bg-green-500/10 border-green-500/25 text-green-600 dark:text-green-400',
      border: 'hover:border-green-500',
      glow: 'from-green-500/15',
    },
    purple: {
      iconBg: 'bg-brand-purple/10 border-brand-purple/25 text-brand-purple dark:text-brand-teal',
      border: 'hover:border-brand-purple dark:hover:border-brand-teal',
      glow: 'from-brand-purple/15',
    },
  };
  const a = accents[accent];

  const isExternal = href.startsWith('http');

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={`qc-tile group relative overflow-hidden block rounded-2xl p-6 bg-surface-card border border-[var(--border-default)] ${a.border} transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-purple/5`}
    >
      {/* Hover gradient sheen */}
      <div
        className={`absolute inset-0 bg-gradient-to-bl ${a.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
      />

      <div className="relative flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${a.iconBg} group-hover:scale-110 group-hover:rotate-[-6deg] transition-transform duration-500`}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-brand-text-muted mb-1">{label}</p>
          <p className="font-display font-bold text-brand-text text-base md:text-lg truncate" dir="ltr">
            {value}
          </p>
          <p className="text-xs text-brand-text-muted/80 mt-2">{note}</p>
        </div>
        <span
          className="text-brand-text-muted/40 group-hover:text-brand-teal group-hover:-translate-x-1 transition-all duration-300 shrink-0"
          aria-hidden="true"
        >
          ←
        </span>
      </div>
    </a>
  );
}

/* ─────────────────── CONTACT CONTENT (form + info) ─────────────────── */

function ContactContent() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.form-field',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 90%', toggleActions: 'play none none none' },
        }
      );
      gsap.fromTo(
        '.info-card',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 90%', toggleActions: 'play none none none' },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-12 md:py-20 lg:py-24 px-4 md:px-12 bg-surface-primary relative overflow-hidden section-vignette">
      {/* Layered texture */}
      <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-brand-teal/10 rounded-full blur-[140px] animate-blob-2 pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-brand-purple/8 rounded-full blur-[130px] animate-blob-4 pointer-events-none" />
      <SoundWaveBars color="teal" size="md" className="absolute top-12 right-8 md:top-16 md:right-16 opacity-[0.2] animate-float" />
      <SoundWaveBars color="purple" size="sm" className="absolute bottom-12 left-8 md:bottom-16 md:left-16 opacity-[0.18] animate-float-reverse" />
      <SwooshCurve color="teal" width={320} className="absolute top-20 left-20 opacity-[0.12] hidden lg:block" />

      <div
        ref={ref}
        className="relative z-[2] max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-8 md:gap-14"
      >
        <div>
          <div className="mb-8">
            <span className="text-xs text-brand-teal tracking-[0.2em] font-medium mb-3 block">أرسل رسالة</span>
            <h2 className="font-display font-bold text-2xl md:text-4xl text-brand-text leading-tight">
              نسعد بسماع قصّتك
            </h2>
            <p className="text-brand-text-muted mt-3 text-sm md:text-base">
              املأ النموذج وسيتواصل معك فريقنا خلال ٢٤ ساعة.
            </p>
          </div>
          <ContactForm />
        </div>

        <div className="space-y-5">
          <MapCard />

          <ContactInfoCard
            icon={<IconPhone size={20} />}
            label="الجوال"
            value={content.contact.info.phone}
            dir="ltr"
            href={`tel:${content.contact.info.phone.replace(/\s+/g, '')}`}
          />
          <ContactInfoCard
            icon={<IconEmail size={20} />}
            label="البريد الإلكتروني"
            value={content.contact.info.email}
            href={`mailto:${content.contact.info.email}`}
          />
          <ContactInfoCard
            icon={<IconLocation size={20} />}
            label="العنوان"
            value={content.contact.info.address}
          />

          {/* Socials */}
          <div className="info-card rounded-xl p-5 bg-surface-secondary border border-[var(--border-subtle)]">
            <p className="text-xs text-brand-text-muted mb-3">تابعنا على</p>
            <div className="flex items-center gap-3">
              {[
                { name: 'instagram', href: content.contact.info.instagram, label: 'Instagram' },
                { name: 'tiktok', href: content.contact.info.tiktok, label: 'TikTok' },
                { name: 'linktree', href: content.contact.info.linktree, label: 'Linktree' },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-11 h-11 rounded-xl bg-surface-card border border-[var(--border-default)] flex items-center justify-center text-brand-text-muted hover:text-brand-teal hover:border-brand-teal hover:-translate-y-0.5 transition-all duration-300"
                >
                  <SocialDot name={s.name} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialDot({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    instagram: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
    tiktok: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005.8 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.84-.1z" />
      </svg>
    ),
    linktree: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.736 5.853L17.834 1.59l2.341 2.388-4.308 4.057H22v3.28h-6.14l4.315 4.066-2.344 2.309-6.428-6.452-6.427 6.452-2.344-2.309 4.315-4.066H0v-3.28h6.133L1.825 3.978 4.166 1.59l4.098 4.263V0h5.472v5.853zM8.264 14.834h5.472V24H8.264v-9.166z" />
      </svg>
    ),
  };
  return <>{paths[name]}</>;
}

function MapCard() {
  return (
    <div className="info-card aspect-[16/10] md:aspect-[4/3] rounded-2xl bg-surface-secondary border border-[var(--border-subtle)] flex items-center justify-center overflow-hidden relative group">
      {/* Grid lines pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(var(--brand-teal) 1px, transparent 1px), linear-gradient(90deg, var(--brand-teal) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.08,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/5 via-transparent to-brand-teal/10" />

      {/* Pin with ping */}
      <div className="relative z-[2] text-center">
        <div className="relative inline-flex">
          <span className="absolute inset-0 rounded-full bg-brand-teal opacity-30 animate-ping" />
          <div className="relative w-14 h-14 rounded-full bg-brand-teal/15 border-2 border-brand-teal flex items-center justify-center text-brand-teal">
            <IconLocation size={26} />
          </div>
        </div>
        <p className="text-sm text-brand-text font-medium mt-4">الرياض، المملكة العربية السعودية</p>
        <p className="text-xs text-brand-text-muted mt-1">قريباً: خريطة تفاعلية</p>
      </div>
    </div>
  );
}

function ContactInfoCard({
  icon,
  label,
  value,
  dir,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  dir?: string;
  href?: string;
}) {
  const Tag = (href ? 'a' : 'div') as 'a' | 'div';
  return (
    <Tag
      {...(href ? { href } : {})}
      className="info-card flex items-center gap-4 bg-surface-secondary rounded-xl p-5 border border-[var(--border-subtle)] hover:border-brand-teal transition-all duration-300 hover:-translate-y-0.5 group"
    >
      <div className="w-10 h-10 rounded-lg bg-brand-teal/10 border border-brand-teal/20 flex items-center justify-center text-brand-teal group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-brand-text-muted mb-0.5">{label}</p>
        <p className="font-medium text-brand-text text-sm truncate" dir={dir}>
          {value}
        </p>
      </div>
      {href && (
        <span
          className="text-brand-text-muted/40 group-hover:text-brand-teal group-hover:-translate-x-1 transition-all duration-300"
          aria-hidden="true"
        >
          ←
        </span>
      )}
    </Tag>
  );
}

/* ─────────────────── FORM ─────────────────── */

type FormFields = { name: string; phone: string; email: string; service: string; message: string; preferredTime: string };
type FormErrors = Partial<Record<keyof FormFields, string>>;

function ContactForm() {
  const [fields, setFields] = useState<FormFields>({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
    preferredTime: 'anytime',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formId = useId();

  const messageCount = fields.message.length;
  const messageMax = 500;

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!fields.name.trim()) e.name = content.contact.form.errors.name;
    if (!fields.phone.trim()) e.phone = content.contact.form.errors.phone;
    if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
      e.email = content.contact.form.errors.email;
    if (!fields.message.trim()) e.message = content.contact.form.errors.message;
    return e;
  };

  const handleChange =
    (field: keyof FormFields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFields((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length > 0) {
      setErrors(v);
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFields({ name: '', phone: '', email: '', service: '', message: '', preferredTime: 'anytime' });
      setTimeout(() => setSubmitted(false), 6000);
    }, 1200);
  };

  // text-base on mobile (16px) prevents iOS Safari from auto-zooming on focus
  const inputBase =
    'w-full px-4 py-3.5 md:py-3 rounded-xl border bg-[var(--surface-input)] text-brand-text placeholder:text-brand-text-muted/50 focus:ring-2 focus:ring-brand-teal/20 outline-none transition-all text-base md:text-sm';
  const inputClasses = (err?: string) =>
    `${inputBase} ${err ? 'border-red-400 focus:border-red-500' : 'border-[var(--border-default)] focus:border-brand-teal'}`;

  const preferredTimes = [
    { value: 'morning', label: 'صباحًا' },
    { value: 'afternoon', label: 'ظهرًا' },
    { value: 'evening', label: 'مساءً' },
    { value: 'anytime', label: 'أي وقت' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="form-field">
        <label htmlFor={`${formId}-name`} className="block text-sm font-medium text-brand-text mb-2">
          {content.contact.form.name} <span className="text-red-400">*</span>
        </label>
        <input
          id={`${formId}-name`}
          type="text"
          value={fields.name}
          onChange={handleChange('name')}
          className={inputClasses(errors.name)}
          placeholder="أدخل اسمك الكامل"
          autoComplete="name"
        />
        {errors.name && <p className="text-xs text-red-500 mt-1.5">{errors.name}</p>}
      </div>

      <div className="form-field grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor={`${formId}-phone`} className="block text-sm font-medium text-brand-text mb-2">
            {content.contact.form.phone} <span className="text-red-400">*</span>
          </label>
          <input
            id={`${formId}-phone`}
            type="tel"
            dir="ltr"
            value={fields.phone}
            onChange={handleChange('phone')}
            className={`${inputClasses(errors.phone)} text-left`}
            placeholder="+966 57 970 3017"
            autoComplete="tel"
          />
          {errors.phone && <p className="text-xs text-red-500 mt-1.5">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor={`${formId}-email`} className="block text-sm font-medium text-brand-text mb-2">
            {content.contact.form.email}
          </label>
          <input
            id={`${formId}-email`}
            type="email"
            dir="ltr"
            value={fields.email}
            onChange={handleChange('email')}
            className={`${inputClasses(errors.email)} text-left`}
            placeholder="example@email.com"
            autoComplete="email"
          />
          {errors.email && <p className="text-xs text-red-500 mt-1.5">{errors.email}</p>}
        </div>
      </div>

      <div className="form-field">
        <label htmlFor={`${formId}-service`} className="block text-sm font-medium text-brand-text mb-2">
          {content.contact.form.service}
        </label>
        <div className="relative">
          <select
            id={`${formId}-service`}
            value={fields.service}
            onChange={handleChange('service')}
            className={`${inputClasses()} appearance-none pe-10 cursor-pointer`}
          >
            <option value="">اختر الخدمة</option>
            {content.contact.form.serviceOptions.map((opt, i) => (
              <option key={i} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <span
            className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-text-muted pointer-events-none text-xs"
            aria-hidden="true"
          >
            ▼
          </span>
        </div>
      </div>

      {/* Preferred contact time */}
      <div className="form-field">
        <label className="block text-sm font-medium text-brand-text mb-2">الوقت المفضل للتواصل</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {preferredTimes.map((t) => (
            <label
              key={t.value}
              className={`relative cursor-pointer rounded-xl border text-center py-3.5 sm:py-2.5 px-2 text-sm min-h-[44px] flex items-center justify-center transition-all duration-300 ${
                fields.preferredTime === t.value
                  ? 'border-brand-teal bg-brand-teal/10 text-brand-teal font-medium'
                  : 'border-[var(--border-default)] bg-surface-card text-brand-text-muted hover:border-brand-teal/50'
              }`}
            >
              <input
                type="radio"
                name="preferredTime"
                value={t.value}
                checked={fields.preferredTime === t.value}
                onChange={handleChange('preferredTime')}
                className="sr-only"
              />
              {t.label}
            </label>
          ))}
        </div>
      </div>

      <div className="form-field">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor={`${formId}-message`} className="block text-sm font-medium text-brand-text">
            {content.contact.form.message} <span className="text-red-400">*</span>
          </label>
          <span
            className={`text-xs ${
              messageCount > messageMax * 0.9 ? 'text-red-400' : 'text-brand-text-muted/70'
            }`}
          >
            {messageCount} / {messageMax}
          </span>
        </div>
        <textarea
          id={`${formId}-message`}
          rows={5}
          value={fields.message}
          onChange={handleChange('message')}
          maxLength={messageMax}
          className={`${inputClasses(errors.message)} resize-none`}
          placeholder="اكتب رسالتك هنا..."
        />
        {errors.message && <p className="text-xs text-red-500 mt-1.5">{errors.message}</p>}
      </div>

      <div className="form-field">
        <Button
          type="submit"
          size="lg"
          className={`w-full ${isSubmitting ? 'opacity-70 pointer-events-none' : ''}`}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2 justify-center">
              <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              جاري الإرسال...
            </span>
          ) : (
            content.contact.form.submit
          )}
        </Button>
        <p className="text-[11px] text-brand-text-muted/70 text-center mt-3">
          بإرسالك هذا النموذج فإنك توافق على تواصلنا معك بخصوص استفسارك.
        </p>
      </div>

      {submitted && (
        <div
          className="form-field bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 text-center text-sm text-green-700 dark:text-green-300 flex items-center justify-center gap-2"
          role="alert"
        >
          <span className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-600 dark:text-green-400">
            ✓
          </span>
          {content.contact.form.success}
        </div>
      )}
    </form>
  );
}

/* ─────────────────── FAQ ─────────────────── */

const FAQS = [
  {
    q: 'كيف أحجز أول جلسة تقييم لطفلي؟',
    a: 'يمكنك التواصل معنا عبر النموذج أو الاتصال مباشرة، وسنقوم بترتيب موعد تقييم مبدئي خلال ٤٨ ساعة لمناقشة احتياجات طفلك.',
  },
  {
    q: 'ما هي مدة الجلسة العلاجية؟',
    a: 'تتراوح مدة الجلسات بين ٣٠ و ٦٠ دقيقة حسب عمر المستفيد ونوع الخدمة. يحدد الأخصائي المدة المناسبة بعد التقييم الأولي.',
  },
  {
    q: 'هل تقدمون خدمات للكبار أيضاً؟',
    a: 'نعم، نقدم خدمات التقييم والعلاج لمختلف الفئات العمرية، بما في ذلك البالغين الذين يعانون من اضطرابات النطق واللغة.',
  },
  {
    q: 'كم تستغرق رحلة العلاج عادة؟',
    a: 'تختلف المدة من حالة لأخرى حسب طبيعة الاضطراب وعمر المستفيد ومدى استجابته. نضع خطة فردية مع أهداف واضحة قابلة للقياس.',
  },
  {
    q: 'هل تتعاونون مع المدارس والحضانات؟',
    a: 'نعم، لدينا أكثر من ٥٠ مدرسة شريكة نقدم لها خدمات الفحص المدرسي والاستشارات التربوية والبرامج المتخصصة.',
  },
];

function FaqSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.faq-item',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 85%', toggleActions: 'play none none none' },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-12 md:py-20 lg:py-24 px-4 md:px-12 bg-surface-secondary relative overflow-hidden section-vignette">
      <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-brand-teal/10 rounded-full blur-[140px] animate-blob-1 pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-brand-purple/8 rounded-full blur-[130px] animate-blob-3 pointer-events-none" />
      <SoundWaveBars color="purple" size="md" className="absolute top-12 right-8 md:top-16 md:right-16 opacity-[0.2] animate-float" />
      <SwooshCurve color="teal" width={280} className="absolute bottom-20 left-20 opacity-[0.12] hidden lg:block" />

      <div ref={ref} className="relative z-[2] max-w-[820px] mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs text-brand-teal tracking-[0.2em] font-medium mb-3 block">الأسئلة الشائعة</span>
          <h2 className="font-display font-bold text-2xl md:text-4xl text-brand-text leading-tight">
            قد تكون إجابتك هنا
          </h2>
          <p className="text-brand-text-muted mt-3 text-sm md:text-base max-w-lg mx-auto">
            إجابات سريعة على الأسئلة الأكثر تكراراً. لم تجد ما تبحث عنه؟ راسلنا مباشرة.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`faq-item rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-surface-card border-brand-teal/40 shadow-lg shadow-brand-purple/5'
                    : 'bg-surface-card border-[var(--border-default)] hover:border-brand-teal/30'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full text-right p-5 md:p-6 flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-bold text-brand-text text-sm md:text-base flex-1">
                    {item.q}
                  </span>
                  <span
                    className={`w-8 h-8 rounded-full bg-brand-teal/10 border border-brand-teal/25 flex items-center justify-center text-brand-teal text-lg font-bold shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                <div
                  className="grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 md:px-6 pb-5 md:pb-6 text-sm md:text-base text-brand-text-muted leading-relaxed border-t border-[var(--border-subtle)] pt-4">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── WORKING HOURS ─────────────────── */

function WorkingHours() {
  const now = useMemo(() => new Date(), []);
  const dayIndex = now.getDay(); // 0 = Sun, 5 = Fri, 6 = Sat
  const hour = now.getHours();

  const isOpen = useMemo(() => {
    if (dayIndex === 5) return false; // Friday closed
    if (dayIndex === 6) return hour >= 9 && hour < 17; // Saturday 9-5
    return hour >= 8 && hour < 20; // Sun-Thu 8-8
  }, [dayIndex, hour]);

  return (
    <section className="py-12 md:py-20 lg:py-24 px-4 md:px-12 bg-surface-secondary relative overflow-hidden section-vignette">
      <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-brand-teal/10 rounded-full blur-[130px] animate-blob-1 pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-brand-purple/8 rounded-full blur-[120px] animate-blob-3 pointer-events-none" />
      <SoundWaveBars color="purple" size="sm" className="absolute top-8 right-8 opacity-[0.18] animate-float hidden md:flex" />
      <SoundWaveBars color="teal" size="sm" className="absolute bottom-8 left-8 opacity-[0.2] animate-float-reverse hidden md:flex" />

      <div className="relative z-[2] max-w-md mx-auto text-center">
        <span className="text-xs text-brand-teal tracking-[0.2em] font-medium mb-3 block">ساعات العمل</span>
        <h3 className="font-display font-bold text-2xl md:text-3xl text-brand-text mb-4">
          {content.contact.hours.title}
        </h3>

        {/* Live open/closed badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-8 border ${
            isOpen
              ? 'bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400'
              : 'bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400'
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isOpen ? 'bg-green-500' : 'bg-red-500'
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                isOpen ? 'bg-green-500' : 'bg-red-500'
              }`}
            />
          </span>
          {isOpen ? 'مفتوح الآن' : 'مغلق حالياً'}
        </div>

        <div className="space-y-3">
          {content.contact.hours.days.map((d, i) => (
            <div
              key={i}
              className={`flex justify-between items-center min-h-[48px] py-3 px-5 rounded-xl transition-colors duration-200 border ${
                d.hours === 'مغلق'
                  ? 'bg-red-50/50 dark:bg-red-900/10 text-red-500 border-red-200/40 dark:border-red-800/30'
                  : 'bg-surface-card text-brand-text border-[var(--border-subtle)] hover:border-brand-teal/40 hover:bg-brand-teal/5'
              }`}
            >
              <span className="font-medium text-sm">{d.day}</span>
              <span className="text-sm font-display font-bold">{d.hours}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── BOTTOM CTA ─────────────────── */

function ContactBottomCTA() {
  return (
    <section className="py-20 md:py-28 px-4 md:px-12 bg-surface-primary relative overflow-hidden section-vignette">
      <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-brand-teal/12 rounded-full blur-[140px] animate-blob-2 pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[130px] animate-blob-4 pointer-events-none" />
      <SoundWaveBars color="teal" size="lg" className="absolute top-16 left-12 opacity-[0.22] animate-float hidden md:flex" />
      <SoundWaveBars color="purple" size="md" className="absolute bottom-16 right-12 opacity-[0.2] animate-float-reverse hidden md:flex" />
      <SwooshCurve color="teal" width={400} className="absolute top-24 right-20 opacity-[0.15] hidden lg:block" />

      <div className="relative z-[2] max-w-[720px] mx-auto text-center">
        <span className="inline-block text-xs text-brand-teal tracking-[0.2em] font-medium mb-4">خطوتك الأولى</span>
        <h2 className="font-display font-bold text-2xl md:text-4xl lg:text-5xl text-brand-text mb-5 leading-tight">
          كل رحلة تبدأ بخطوة.
          <br />
          <span className="text-brand-teal">ابدأ رحلة طفلك اليوم.</span>
        </h2>
        <p className="text-brand-text-muted text-base md:text-lg mb-10 leading-relaxed max-w-xl mx-auto">
          لست متأكداً من أين تبدأ؟ احجز استشارة مجانية لمدة ١٥ دقيقة مع أحد أخصائيينا.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button
            href={content.contact.info.whatsapp}
            size="lg"
          >
            احجز استشارة مجانية
          </Button>
          <Button
            href={`tel:${content.contact.info.phone.replace(/\s+/g, '')}`}
            variant="secondary"
            size="lg"
          >
            اتصل الآن
          </Button>
        </div>
      </div>
    </section>
  );
}
