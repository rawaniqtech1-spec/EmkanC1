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
import LazyVideo from '@/components/shared/LazyVideo';
import {
  IconPhone,
  IconEmail,
  IconLocation,
  IconChat,
} from '@/components/shared/BrandIcons';
import {
  SoundWaveBars,
  SwooshCurve,
} from '@/components/shared/BrandDecor';
import { content } from '@/content/ar';
import { FORMSUBMIT_ENDPOINT, FORMSUBMIT_FORM_ENDPOINT } from '@/lib/constants';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <QuickContactStrip />
      <ContactContent />
      <WorkingHours />
      <RegistrationSection />
      <EmploymentSection />
      <PartnershipSection />
      <FaqSection />
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
    <section className="pt-20 pb-6 md:pt-28 md:pb-10 px-5 md:px-6 relative overflow-hidden bg-surface-primary section-vignette">
      {/* Background video — warm parent + child footage */}
      <LazyVideo
        src="/videos/contact-hero.mp4"
        className="absolute inset-0 w-full h-full object-cover"
        overlayClassName="absolute inset-0 bg-surface-primary/85 dark:bg-[#0F0B1A]/78"
      />
      {/* Layered background decor over the video */}
      <div className="absolute -top-32 -right-32 w-[700px] h-[700px] bg-brand-teal/12 rounded-full blur-[140px] animate-blob-2 pointer-events-none" />
      <div className="absolute -bottom-40 -left-32 w-[600px] h-[600px] bg-brand-purple/10 rounded-full blur-[130px] animate-blob-4 pointer-events-none" />
      <SoundWaveBars color="teal" size="lg" className="absolute top-32 right-12 opacity-[0.22] animate-float hidden md:flex" />
      <SoundWaveBars color="purple" size="md" className="absolute bottom-20 left-12 opacity-[0.2] animate-float-reverse hidden md:flex" />
      <SwooshCurve color="teal" width={360} className="absolute top-24 left-20 opacity-[0.15] hidden lg:block" />

      <div ref={ref} className="relative z-[2] max-w-3xl mx-auto text-center">
        <span className="contact-hero-el inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-teal/10 border border-brand-teal/25 mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-teal" />
          </span>
          <span className="text-xs text-brand-teal font-medium">نحن هنا من أجلك</span>
        </span>

        <div className="contact-hero-el w-12 h-[2px] bg-brand-teal mx-auto mb-4" />

        <h1 className="contact-hero-el font-display font-bold text-3xl sm:text-4xl md:text-5xl text-brand-text mb-3 leading-[1.1]">
          {content.contact.hero.title}
        </h1>

        <TypeAnimation
          sequence={[content.contact.hero.subtitle]}
          wrapper="p"
          speed={30}
          className="contact-hero-el text-brand-text-muted text-sm sm:text-base max-w-xl mx-auto leading-relaxed"
        />

        {/* Stats row */}
        <div className="contact-hero-el mt-6 grid grid-cols-3 max-w-lg mx-auto gap-4">
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
    <section className="py-6 md:py-8 px-4 md:px-12 bg-surface-primary relative overflow-hidden">
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
    <section className="py-8 md:py-12 px-4 md:px-12 bg-surface-primary relative overflow-hidden section-vignette">
      {/* Layered texture */}
      <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-brand-teal/10 rounded-full blur-[140px] animate-blob-2 pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-brand-purple/8 rounded-full blur-[130px] animate-blob-4 pointer-events-none" />
      <SoundWaveBars color="teal" size="md" className="absolute top-12 right-8 md:top-16 md:right-16 opacity-[0.2] animate-float" />
      <SoundWaveBars color="purple" size="sm" className="absolute bottom-12 left-8 md:bottom-16 md:left-16 opacity-[0.18] animate-float-reverse" />
      <SwooshCurve color="teal" width={320} className="absolute top-20 left-20 opacity-[0.12] hidden lg:block" />

      <div
        ref={ref}
        className="relative z-[2] max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-6 md:gap-10"
      >
        <div>
          <div className="mb-5">
            <span className="text-xs text-brand-teal font-medium mb-2 block">أرسل رسالة</span>
            <h2 className="font-display font-bold text-xl md:text-3xl text-brand-text leading-tight">
              نسعد بسماع قصّتك
            </h2>
            <p className="text-brand-text-muted mt-2 text-sm">
              املأ النموذج وسيتواصل معك فريقنا خلال ٢٤ ساعة.
            </p>
          </div>
          <ContactForm />
        </div>

        <div className="space-y-3">
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
    <div className="info-card aspect-[16/7] md:aspect-[16/9] rounded-2xl border border-[var(--border-subtle)] hover:border-brand-teal/60 overflow-hidden relative group transition-colors duration-300">
      {/* Live Google Maps embed — no API key needed for the basic embed. */}
      <iframe
        title="موقع إمكان المستقبل في تبوك"
        src="https://maps.google.com/maps?q=28.400143,36.564665&t=&z=16&ie=UTF8&iwloc=&output=embed"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 w-full h-full border-0"
        allowFullScreen
      />

      {/* Floating "open in Google Maps" pill — anchors the canonical mapLink */}
      <a
        href={content.contact.info.mapLink}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-3 right-3 z-[2] inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/95 backdrop-blur-sm border border-[var(--border-default)] shadow-[0_4px_14px_-4px_rgba(59,44,89,0.25)] text-[12px] font-medium text-brand-text hover:bg-brand-teal hover:text-white hover:border-brand-teal hover:-translate-y-0.5 transition-all duration-300"
      >
        <IconLocation size={14} />
        <span>افتح في خرائط Google</span>
      </a>
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
  const [submitError, setSubmitError] = useState<string | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const formId = useId();

  const messageCount = fields.message.length;
  const messageMax = 500;

  const preferredTimeLabels: Record<string, string> = {
    morning: 'صباحًا',
    afternoon: 'ظهرًا',
    evening: 'مساءً',
    anytime: 'أي وقت',
  };

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
      if (submitError) setSubmitError(null);
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const v = validate();
    if (Object.keys(v).length > 0) {
      setErrors(v);
      return;
    }
    setIsSubmitting(true);
    try {
      // Arabic field names become the labels in the delivered email.
      // Emoji prefixes add visual hierarchy inside FormSubmit's fixed template.
      // Metadata fields (prefixed with _) configure the FormSubmit delivery.
      const payload: Record<string, string> = {
        '👤 الاسم': fields.name,
        '📱 رقم الجوال': fields.phone,
        '📧 البريد الإلكتروني': fields.email || '—',
        '🎯 الخدمة المطلوبة': fields.service || '—',
        '🕐 الوقت المفضل للتواصل': preferredTimeLabels[fields.preferredTime] ?? fields.preferredTime,
        '💬 الرسالة': fields.message,
        _subject: `📬 رسالة جديدة من موقع إمكان المستقبل — ${fields.name}`,
        _template: 'table',
        _captcha: 'false',
        _honey: honeypotRef.current?.value ?? '',
      };
      if (fields.email) payload._replyto = fields.email;

      const res = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
      setIsSubmitting(false);
      setSubmitted(true);
      setFields({ name: '', phone: '', email: '', service: '', message: '', preferredTime: 'anytime' });
      setTimeout(() => setSubmitted(false), 6000);
    } catch {
      setIsSubmitting(false);
      setSubmitError(content.contact.form.error);
    }
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
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Honeypot — off-screen, hidden from humans and AT tools.
          Bots that fill every input trip this and FormSubmit drops the submission. */}
      <input
        ref={honeypotRef}
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] w-px h-px opacity-0 pointer-events-none"
      />

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

      {submitError && (
        <div
          className="form-field bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 text-center text-sm text-red-700 dark:text-red-300 flex items-center justify-center gap-2"
          role="alert"
        >
          <span className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-red-600 dark:text-red-400">
            !
          </span>
          {submitError}
        </div>
      )}
    </form>
  );
}

/* ─────────────────── FAQ ─────────────────── */

const FAQS = [
  {
    q: 'هل تأخر الكلام عند طفلي طبيعي أم يحتاج تدخل؟',
    a: 'في بعض الحالات يكون التأخر طبيعيًا، لكن إذا لاحظت أن طفلك لا يتكلم مثل أقرانه أو لا يستطيع التعبير عن احتياجاته بوضوح، فمن الأفضل إجراء تقييم مبكر للاطمئنان وتحديد الخطوة المناسبة.',
  },
  {
    q: 'ماذا يحدث إذا تأخرت في علاج طفلي؟',
    a: 'التأخر في التدخل قد يؤدي إلى صعوبة أكبر في اكتساب اللغة والتواصل، وقد يؤثر على التحصيل الدراسي والثقة بالنفس، لذلك يُنصح دائمًا بالتدخل المبكر لتحقيق أفضل النتائج.',
  },
  {
    q: 'كيف يتم تقييم الطفل داخل المركز؟',
    a: 'نقوم بجلسة تقييم شاملة باستخدام أدوات واختبارات متخصصة لتحديد مستوى الطفل بدقة، وبعدها يتم وضع خطة علاجية فردية تناسب احتياجاته.',
  },
  {
    q: 'هل الخطة العلاجية تكون مخصصة لكل طفل؟',
    a: 'نعم، كل طفل له خطة علاجية خاصة به، يتم تصميمها بناءً على نتائج التقييم، مع متابعة مستمرة وتحديثها حسب تقدم الحالة.',
  },
  {
    q: 'هل يمكن أن يتحسن طفلي بشكل كامل؟',
    a: 'في كثير من الحالات، يحقق الأطفال تحسنًا كبيرًا وقد يصلون إلى مستوى طبيعي، خاصة مع الالتزام بالجلسات وتنفيذ التمارين المنزلية.',
  },
  {
    q: 'متى أبدأ ألاحظ التحسن؟',
    a: 'يختلف ذلك حسب حالة الطفل، لكن في الغالب يبدأ ظهور التحسن خلال الأسابيع الأولى مع الانتظام في الجلسات والمتابعة المنزلية.',
  },
  {
    q: 'كم تستغرق مدة العلاج؟',
    a: 'تختلف مدة العلاج من طفل لآخر حسب درجة الحالة، ولكن يتم توضيح المدة المتوقعة بعد التقييم، مع خطة واضحة لتحقيق الأهداف.',
  },
  {
    q: 'ما دور الأسرة في نجاح العلاج؟',
    a: 'دور الأسرة أساسي جدًا، حيث نقوم بتدريب الأهل على تمارين وأنشطة بسيطة يمكن تطبيقها في المنزل لدعم تقدم الطفل بشكل أسرع.',
  },
  {
    q: 'كم تكلفة الجلسات؟ وهل توجد باقات؟',
    a: 'نقدم أسعارًا مناسبة مع إمكانية الاشتراك في باقات شهرية، ويتم تحديد التكلفة بناءً على عدد الجلسات والخطة العلاجية المناسبة للطفل.',
  },
  {
    q: 'كيف أبدأ حجز جلسة لطفلي؟',
    a: 'يمكنك الحجز بسهولة من خلال التواصل معنا عبر الهاتف أو الواتساب، وسيقوم فريقنا بالرد عليك فورًا وتحديد أقرب موعد مناسب.',
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
    <section className="py-8 md:py-12 px-4 md:px-12 bg-surface-secondary relative overflow-hidden section-vignette">
      <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-brand-teal/10 rounded-full blur-[140px] animate-blob-1 pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-brand-purple/8 rounded-full blur-[130px] animate-blob-3 pointer-events-none" />
      <SoundWaveBars color="purple" size="md" className="absolute top-12 right-8 md:top-16 md:right-16 opacity-[0.2] animate-float" />
      <SwooshCurve color="teal" width={280} className="absolute bottom-20 left-20 opacity-[0.12] hidden lg:block" />

      <div ref={ref} className="relative z-[2] max-w-[820px] mx-auto">
        <div className="text-center mb-6">
          <span className="text-xs text-brand-teal font-medium mb-2 block">الأسئلة الشائعة</span>
          <h2 className="font-display font-bold text-xl md:text-3xl text-brand-text leading-tight">
            قد تكون إجابتك هنا
          </h2>
          <p className="text-brand-text-muted mt-2 text-sm max-w-lg mx-auto">
            إجابات سريعة على الأسئلة الأكثر تكراراً. لم تجد ما تبحث عنه؟ راسلنا مباشرة.
          </p>
        </div>

        <div className="space-y-2">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`faq-item rounded-xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-surface-card border-brand-teal/40 shadow-lg shadow-brand-purple/5'
                    : 'bg-surface-card border-[var(--border-default)] hover:border-brand-teal/30'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full text-right p-4 md:p-5 flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-bold text-brand-text text-sm flex-1">
                    {item.q}
                  </span>
                  <span
                    className={`w-7 h-7 rounded-full bg-brand-teal/10 border border-brand-teal/25 flex items-center justify-center text-brand-teal text-lg font-bold shrink-0 transition-transform duration-300 ${
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
                    <p className="px-4 md:px-5 pb-4 md:pb-5 text-sm text-brand-text-muted leading-relaxed border-t border-[var(--border-subtle)] pt-3">
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
    // Split shifts: morning 9-12, evening 16-22 (4 PM - 10 PM)
    return (hour >= 9 && hour < 12) || (hour >= 16 && hour < 22);
  }, [dayIndex, hour]);

  return (
    <section className="py-8 md:py-12 px-4 md:px-12 bg-surface-secondary relative overflow-hidden section-vignette">
      <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-brand-teal/10 rounded-full blur-[130px] animate-blob-1 pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-brand-purple/8 rounded-full blur-[120px] animate-blob-3 pointer-events-none" />
      <SoundWaveBars color="purple" size="sm" className="absolute top-8 right-8 opacity-[0.18] animate-float hidden md:flex" />
      <SoundWaveBars color="teal" size="sm" className="absolute bottom-8 left-8 opacity-[0.2] animate-float-reverse hidden md:flex" />

      <div className="relative z-[2] max-w-[560px] mx-auto">
        <div className="text-center mb-4">
          <span className="text-xs text-brand-teal font-medium mb-2 block">ساعات العمل</span>
          <h3 className="font-display font-bold text-xl md:text-2xl text-brand-text mb-3 inline-block">
            {content.contact.hours.title}
          </h3>

          {/* Live open/closed badge — on the same line as the title on desktop */}
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-medium ms-3 border ${
              isOpen
                ? 'bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400'
                : 'bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400'
            }`}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isOpen ? 'bg-green-500' : 'bg-red-500'
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
                  isOpen ? 'bg-green-500' : 'bg-red-500'
                }`}
              />
            </span>
            {isOpen ? 'مفتوح الآن' : 'مغلق حالياً'}
          </div>
        </div>

        {/* Days — side by side on md+ instead of stacked */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {content.contact.hours.days.map((d, i) => (
            <div
              key={i}
              className={`flex sm:flex-col items-center sm:items-center justify-between sm:justify-center gap-1 py-2.5 px-4 rounded-xl transition-colors duration-200 border ${
                d.hours === 'مغلق'
                  ? 'bg-red-50/50 dark:bg-red-900/10 text-red-500 border-red-200/40 dark:border-red-800/30'
                  : 'bg-surface-card text-brand-text border-[var(--border-subtle)] hover:border-brand-teal/40 hover:bg-brand-teal/5'
              }`}
            >
              <span className="font-medium text-xs sm:text-[11px] opacity-70">{d.day}</span>
              <span className="text-sm font-display font-bold">{d.hours}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── REGISTRATION / APPLICATION ─────────────────── */

const REG_REQUIREMENTS = [
  {
    number: '٠١',
    title: 'الأوراق المطلوبة',
    desc: 'نسخة من شهادة ميلاد الطفل، أي تقارير طبية سابقة، وتقارير مدرسية إن وُجدت.',
  },
  {
    number: '٠٢',
    title: 'الفئة العمرية',
    desc: 'نستقبل الأطفال من عمر سنتين فما فوق، مع برامج متخصصة لكل مرحلة عمرية.',
  },
  {
    number: '٠٣',
    title: 'جلسة التقييم الأولى',
    desc: 'جلسة شاملة مدتها ٤٥–٦٠ دقيقة مع فريق متعدد التخصصات لتحديد خطة علاج مخصصة.',
  },
  {
    number: '٠٤',
    title: 'حجز الموعد',
    desc: 'عبر الهاتف، الواتساب، أو نموذج التواصل أعلاه — ونعاود الاتصال بك خلال ٢٤ ساعة.',
  },
];

function RegistrationSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.reg-card',
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

  return (
    <section id="registration" className="scroll-mt-20 md:scroll-mt-24 py-8 md:py-12 px-4 md:px-12 bg-surface-primary relative overflow-hidden section-vignette">
      <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-brand-teal/10 rounded-full blur-[140px] animate-blob-2 pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-brand-purple/8 rounded-full blur-[130px] animate-blob-4 pointer-events-none" />
      <SoundWaveBars color="purple" size="md" className="absolute top-12 left-8 md:top-16 md:left-16 opacity-[0.2] animate-float hidden md:flex" />
      <SoundWaveBars color="teal" size="sm" className="absolute bottom-10 right-8 md:bottom-16 md:right-16 opacity-[0.18] animate-float-reverse hidden md:flex" />
      <SwooshCurve color="teal" width={300} className="absolute top-20 left-20 opacity-[0.12] hidden lg:block" />

      <div ref={ref} className="relative z-[2] max-w-[1000px] mx-auto">
        <div className="text-center mb-6">
          <span className="text-xs text-brand-teal font-medium mb-2 block">التسجيل والتقديم</span>
          <h2 className="font-display font-bold text-xl md:text-3xl text-brand-text mb-2 leading-tight">
            كيف تسجل طفلك معنا
          </h2>
          <p className="text-brand-text-muted max-w-lg mx-auto text-sm">
            أربع خطوات بسيطة للبدء — شفافة وواضحة من البداية.
          </p>
          <div className="w-10 h-[2px] bg-brand-teal mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-6">
          {REG_REQUIREMENTS.map((step, i) => (
            <div
              key={i}
              className="reg-card bg-surface-card rounded-xl p-4 md:p-5 border border-[var(--border-default)] hover:border-brand-teal hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-brand-teal/10 border border-brand-teal/20 flex items-center justify-center text-brand-teal font-display font-bold text-xs shrink-0">
                  {step.number}
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-brand-text text-sm md:text-base mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs md:text-sm text-brand-text-muted leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button href={content.contact.info.whatsapp} size="md">
            احجز موعد التقييم الآن
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── EMPLOYMENT ─────────────────── */

const EMPLOYMENT_PERKS = [
  {
    title: 'بيئة عمل داعمة',
    desc: 'فريق متعدد التخصصات يعمل بروح التعاون وشغف حقيقي تجاه الأطفال.',
  },
  {
    title: 'تدريب وتطوير مستمر',
    desc: 'برامج تدريبية داخلية وورش عمل دورية لرفع كفاءة الأخصائيين.',
  },
  {
    title: 'فرص نمو مهني',
    desc: 'مسار وظيفي واضح وفرصة للتخصص في مجالات علاج النطق والسلوك والتعلم.',
  },
];

function EmploymentSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.emp-item',
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

  return (
    <section id="employment" className="scroll-mt-20 md:scroll-mt-24 py-8 md:py-12 px-4 md:px-12 bg-surface-secondary relative overflow-hidden section-vignette">
      <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-brand-teal/10 rounded-full blur-[130px] animate-blob-1 pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-brand-purple/8 rounded-full blur-[120px] animate-blob-3 pointer-events-none" />
      <SoundWaveBars color="teal" size="md" className="absolute top-10 right-8 md:top-16 md:right-16 opacity-[0.2] animate-float hidden md:flex" />
      <SoundWaveBars color="purple" size="sm" className="absolute bottom-12 left-8 md:bottom-16 md:left-16 opacity-[0.18] animate-float-reverse hidden md:flex" />
      <SwooshCurve color="purple" width={280} className="absolute bottom-20 right-20 opacity-[0.12] rotate-180 hidden lg:block" />

      <div ref={ref} className="relative z-[2] max-w-[1000px] mx-auto">
        {/* Heading row — description on the right, perks on the left */}
        <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-6 md:gap-10 items-start mb-8">
          <div className="emp-item">
            <span className="inline-block text-xs text-brand-teal font-medium mb-2">
              {content.contact.cvForm.sectionLabel}
            </span>
            <h2 className="font-display font-bold text-xl md:text-3xl text-brand-text mb-3 leading-tight">
              انضم إلى فريقنا
            </h2>
            <p className="text-brand-text-muted leading-relaxed mb-4 text-sm">
              نبحث باستمرار عن أخصائيين متميزين في مجالات النطق والتخاطب، تعديل السلوك،
              التأهيل السمعي، والتدخل المبكر — ليكونوا جزءاً من رحلة تطوير حقيقية لكل طفل.
            </p>
          </div>

          <div className="space-y-2">
            {EMPLOYMENT_PERKS.map((perk, i) => (
              <div
                key={i}
                className="emp-item flex items-start gap-3 bg-surface-card rounded-xl p-4 md:p-5 border border-[var(--border-default)] hover:border-brand-teal/40 transition-all duration-300"
              >
                <span className="w-2 h-2 rounded-full bg-brand-teal shrink-0 mt-2" />
                <div>
                  <h4 className="font-display font-bold text-brand-text text-sm mb-0.5">
                    {perk.title}
                  </h4>
                  <p className="text-xs text-brand-text-muted leading-relaxed">
                    {perk.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application form — full width below the heading row */}
        <div className="emp-item bg-surface-card rounded-2xl md:rounded-3xl p-5 sm:p-7 md:p-9 border border-[var(--border-default)]">
          <div className="mb-5 md:mb-6">
            <h3 className="font-display font-bold text-lg md:text-2xl text-brand-text mb-2 leading-tight">
              {content.contact.cvForm.title}
            </h3>
            <p className="text-brand-text-muted text-xs md:text-sm leading-relaxed">
              {content.contact.cvForm.description}
            </p>
          </div>
          <CVApplicationForm />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── CV APPLICATION FORM ─────────────────── */

type CVFields = { name: string; email: string; phone: string; position: string; message: string };
type CVErrors = Partial<Record<keyof CVFields | 'cv', string>>;
const CV_MAX_SIZE = 5 * 1024 * 1024; // 5 MB
const CV_MIME_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const CV_EXTENSIONS = ['.pdf', '.docx'];

function CVApplicationForm() {
  const [fields, setFields] = useState<CVFields>({
    name: '',
    email: '',
    phone: '',
    position: '',
    message: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<CVErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  // Tracks whether we're actively waiting for the hidden-iframe submission
  // response. Using a ref avoids stale-closure issues in the iframe onLoad.
  const waitingForIframe = useRef(false);
  const formId = useId();
  const t = content.contact.cvForm;

  const inputBase =
    'w-full px-4 py-3.5 md:py-3 rounded-xl border bg-[var(--surface-input)] text-brand-text placeholder:text-brand-text-muted/50 focus:ring-2 focus:ring-brand-teal/20 outline-none transition-all text-base md:text-sm';
  const inputClasses = (err?: string) =>
    `${inputBase} ${err ? 'border-red-400 focus:border-red-500' : 'border-[var(--border-default)] focus:border-brand-teal'}`;

  const validateFile = (f: File): string | null => {
    if (f.size > CV_MAX_SIZE) return t.errors.cvSize;
    const nameLower = f.name.toLowerCase();
    const extOk = CV_EXTENSIONS.some((ext) => nameLower.endsWith(ext));
    const mimeOk = CV_MIME_TYPES.includes(f.type);
    if (!extOk && !mimeOk) return t.errors.cvType;
    return null;
  };

  const handleFileSelected = (f: File | null) => {
    setSubmitError(null);
    if (!f) {
      setFile(null);
      return;
    }
    const err = validateFile(f);
    if (err) {
      setErrors((prev) => ({ ...prev, cv: err }));
      setFile(null);
      return;
    }
    setErrors((prev) => ({ ...prev, cv: undefined }));
    setFile(f);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    handleFileSelected(f);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files?.[0] ?? null;
    // For the file to be included in the native form submission we must
    // also write it into the real <input type="file"> element using a
    // DataTransfer — setting .files directly isn't allowed.
    if (f && fileInputRef.current) {
      try {
        const dt = new DataTransfer();
        dt.items.add(f);
        fileInputRef.current.files = dt.files;
      } catch {
        // Older browsers without DataTransfer support fall back to just
        // updating the React state, meaning the user will need to click
        // the drop zone and re-pick the file. Safe degradation.
      }
    }
    handleFileSelected(f);
  };

  const handleChange =
    (field: keyof CVFields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFields((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
      if (submitError) setSubmitError(null);
    };

  const validate = (): CVErrors => {
    const e: CVErrors = {};
    if (!fields.name.trim()) e.name = t.errors.name;
    if (!fields.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
      e.email = t.errors.email;
    if (!fields.phone.trim()) e.phone = t.errors.phone;
    if (!file) e.cv = t.errors.cv;
    return e;
  };

  // The CV form uses a NATIVE HTML form submit targeted at a hidden iframe
  // because FormSubmit's AJAX endpoint silently drops file uploads. The
  // standard endpoint handles multipart attachments correctly, and the
  // hidden iframe keeps the user on our page instead of redirecting to
  // FormSubmit's thank-you page.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setSubmitError(null);
    const v = validate();
    if (Object.keys(v).length > 0) {
      e.preventDefault();
      setErrors(v);
      return;
    }
    // Let the browser submit natively (no preventDefault) — the form's
    // target="cv-submit-target" routes the POST into the hidden iframe.
    setIsSubmitting(true);
    waitingForIframe.current = true;
  };

  const handleIframeLoad = () => {
    // The iframe fires onLoad once when it first mounts (about:blank) and
    // again when the form POST response loads. Ignore the first.
    if (!waitingForIframe.current) return;
    waitingForIframe.current = false;
    setIsSubmitting(false);
    setSubmitted(true);
    setFields({ name: '', email: '', phone: '', position: '', message: '' });
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (formRef.current) formRef.current.reset();
    setTimeout(() => setSubmitted(false), 6000);
  };

  const formatBytes = (b: number) => {
    if (b < 1024) return `${b} B`;
    if (b < 1024 * 1024) return `${(b / 1024).toFixed(0)} KB`;
    return `${(b / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <>
      {/* Hidden iframe target for the native form submit. FormSubmit's
          response page loads here (invisibly) and onLoad signals success. */}
      <iframe
        name="cv-submit-target"
        title="cv submit target"
        onLoad={handleIframeLoad}
        className="hidden"
        aria-hidden="true"
      />
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        action={FORMSUBMIT_FORM_ENDPOINT}
        method="POST"
        encType="multipart/form-data"
        target="cv-submit-target"
        className="space-y-4"
        noValidate
      >
        {/* FormSubmit metadata — hidden fields so the standard endpoint
            knows subject, reply address, template, and captcha behavior. */}
        <input type="hidden" name="_subject" value={`💼 طلب توظيف جديد — ${fields.name || 'متقدم جديد'}`} />
        <input type="hidden" name="_replyto" value={fields.email} />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_captcha" value="false" />

        {/* Honeypot */}
        <input
          ref={honeypotRef}
          type="text"
          name="_honey"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] w-px h-px opacity-0 pointer-events-none"
        />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`${formId}-name`} className="block text-sm font-medium text-brand-text mb-2">
            {t.name} <span className="text-red-400">*</span>
          </label>
          <input
            id={`${formId}-name`}
            type="text"
            name="👤 الاسم"
            value={fields.name}
            onChange={handleChange('name')}
            className={inputClasses(errors.name)}
            placeholder="أدخل اسمك الكامل"
            autoComplete="name"
          />
          {errors.name && <p className="text-xs text-red-500 mt-1.5">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor={`${formId}-position`} className="block text-sm font-medium text-brand-text mb-2">
            {t.position}
          </label>
          <input
            id={`${formId}-position`}
            type="text"
            name="🎓 التخصص"
            value={fields.position}
            onChange={handleChange('position')}
            className={inputClasses()}
            placeholder={t.positionPlaceholder}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`${formId}-email`} className="block text-sm font-medium text-brand-text mb-2">
            {t.email} <span className="text-red-400">*</span>
          </label>
          <input
            id={`${formId}-email`}
            type="email"
            name="📧 البريد الإلكتروني"
            dir="ltr"
            value={fields.email}
            onChange={handleChange('email')}
            className={`${inputClasses(errors.email)} text-left`}
            placeholder="example@email.com"
            autoComplete="email"
          />
          {errors.email && <p className="text-xs text-red-500 mt-1.5">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor={`${formId}-phone`} className="block text-sm font-medium text-brand-text mb-2">
            {t.phone} <span className="text-red-400">*</span>
          </label>
          <input
            id={`${formId}-phone`}
            type="tel"
            name="📱 رقم الجوال"
            dir="ltr"
            value={fields.phone}
            onChange={handleChange('phone')}
            className={`${inputClasses(errors.phone)} text-left`}
            placeholder="+966 57 970 3017"
            autoComplete="tel"
          />
          {errors.phone && <p className="text-xs text-red-500 mt-1.5">{errors.phone}</p>}
        </div>
      </div>

      {/* Custom styled drop zone — the native file input is hidden behind it but still focusable */}
      <div>
        <label className="block text-sm font-medium text-brand-text mb-2">
          {t.cv} <span className="text-red-400">*</span>
        </label>
        <input
          ref={fileInputRef}
          id={`${formId}-cv`}
          type="file"
          name="📎 السيرة الذاتية"
          accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={handleFileInputChange}
          className="sr-only"
        />
        {!file ? (
          <label
            htmlFor={`${formId}-cv`}
            onDragOver={handleDragOver}
            onDragEnter={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`flex flex-col items-center justify-center gap-2 min-h-[120px] md:min-h-[140px] rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300 px-4 py-5 text-center ${
              errors.cv
                ? 'border-red-400 bg-red-50/40 dark:bg-red-900/10'
                : isDragging
                  ? 'border-brand-teal bg-brand-teal/10'
                  : 'border-brand-teal/40 bg-brand-teal/[0.04] hover:border-brand-teal hover:bg-brand-teal/10'
            }`}
          >
            <span className="w-11 h-11 rounded-full bg-brand-teal/15 flex items-center justify-center text-brand-teal">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </span>
            <span className="text-sm font-medium text-brand-text">{t.cvDropzoneIdle}</span>
            <span className="text-[11px] text-brand-text-muted">{t.cvHelp}</span>
          </label>
        ) : (
          <div className="flex items-center justify-between gap-3 rounded-xl border border-brand-teal/40 bg-brand-teal/[0.06] px-4 py-3">
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-10 h-10 rounded-lg bg-brand-teal/15 flex items-center justify-center text-brand-teal shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-brand-text truncate">{file.name}</p>
                <p className="text-[11px] text-brand-text-muted tabular-nums">{formatBytes(file.size)}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleFileSelected(null)}
              className="text-xs text-brand-text-muted hover:text-red-500 transition-colors px-2 py-1 rounded-md shrink-0"
              aria-label={t.cvRemove}
            >
              {t.cvRemove}
            </button>
          </div>
        )}
        {errors.cv && <p className="text-xs text-red-500 mt-1.5">{errors.cv}</p>}
      </div>

      <div>
        <label htmlFor={`${formId}-message`} className="block text-sm font-medium text-brand-text mb-2">
          {t.message}
        </label>
        <textarea
          id={`${formId}-message`}
          name="📄 نبذة عنك"
          rows={4}
          value={fields.message}
          onChange={handleChange('message')}
          className={`${inputClasses()} resize-none`}
          placeholder={t.messagePlaceholder}
          maxLength={500}
        />
      </div>

      <div>
        <Button
          type="submit"
          size="lg"
          className={`w-full ${isSubmitting ? 'opacity-70 pointer-events-none' : ''}`}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2 justify-center">
              <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              {t.sending}
            </span>
          ) : (
            t.submit
          )}
        </Button>
      </div>

      {submitted && (
        <div
          className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 text-center text-sm text-green-700 dark:text-green-300 flex items-center justify-center gap-2"
          role="alert"
        >
          <span className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-600 dark:text-green-400">
            ✓
          </span>
          {t.success}
        </div>
      )}

      {submitError && (
        <div
          className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 text-center text-sm text-red-700 dark:text-red-300 flex items-center justify-center gap-2"
          role="alert"
        >
          <span className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-red-600 dark:text-red-400">
            !
          </span>
          {submitError}
        </div>
      )}
      </form>
    </>
  );
}

/* ─────────────────── PARTNERSHIP ─────────────────── */

function PartnershipSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.partner-item',
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

  const t = content.contact.partnerForm;

  return (
    <section id="partnership" className="scroll-mt-20 md:scroll-mt-24 py-8 md:py-12 px-4 md:px-12 bg-surface-primary relative overflow-hidden section-vignette">
      <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-brand-teal/10 rounded-full blur-[140px] animate-blob-2 pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-brand-purple/8 rounded-full blur-[130px] animate-blob-4 pointer-events-none" />
      <SoundWaveBars color="purple" size="md" className="absolute top-12 left-8 md:top-16 md:left-16 opacity-[0.2] animate-float hidden md:flex" />
      <SoundWaveBars color="teal" size="sm" className="absolute bottom-10 right-8 md:bottom-16 md:right-16 opacity-[0.18] animate-float-reverse hidden md:flex" />
      <SwooshCurve color="teal" width={320} className="absolute top-20 left-20 opacity-[0.14] hidden lg:block" />

      <div ref={ref} className="relative z-[2] max-w-[1000px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-6 md:gap-10 items-start">
          <div className="partner-item">
            <span className="inline-block text-xs text-brand-teal font-medium mb-2">
              {t.sectionLabel}
            </span>
            <h2 className="font-display font-bold text-xl md:text-3xl text-brand-text mb-3 leading-tight">
              {t.title}
            </h2>
            <p className="text-brand-text-muted leading-relaxed mb-4 text-sm">
              {t.description}
            </p>
            <ul className="space-y-2.5 mt-4">
              {['مدارس وروضات', 'مراكز صحية وعيادات', 'جمعيات ومؤسسات غير ربحية', 'جهات حكومية وتعليمية'].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-brand-text-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-teal shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="partner-item bg-surface-card rounded-2xl md:rounded-3xl p-5 sm:p-7 md:p-9 border border-[var(--border-default)]">
            <PartnerForm />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── PARTNER FORM ─────────────────── */

type PartnerFields = { organization: string; contactPerson: string; email: string; phone: string; message: string };
type PartnerErrors = Partial<Record<keyof PartnerFields | 'contact', string>>;

function PartnerForm() {
  const [fields, setFields] = useState<PartnerFields>({
    organization: '',
    contactPerson: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<PartnerErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const formId = useId();
  const t = content.contact.partnerForm;

  const inputBase =
    'w-full px-4 py-3.5 md:py-3 rounded-xl border bg-[var(--surface-input)] text-brand-text placeholder:text-brand-text-muted/50 focus:ring-2 focus:ring-brand-teal/20 outline-none transition-all text-base md:text-sm';
  const inputClasses = (err?: string) =>
    `${inputBase} ${err ? 'border-red-400 focus:border-red-500' : 'border-[var(--border-default)] focus:border-brand-teal'}`;

  const handleChange =
    (field: keyof PartnerFields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFields((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
      if (errors.contact && (field === 'email' || field === 'phone')) {
        setErrors((prev) => ({ ...prev, contact: undefined }));
      }
      if (submitError) setSubmitError(null);
    };

  const validate = (): PartnerErrors => {
    const e: PartnerErrors = {};
    if (!fields.organization.trim()) e.organization = t.errors.organization;
    if (!fields.contactPerson.trim()) e.contactPerson = t.errors.contactPerson;
    if (!fields.email.trim() && !fields.phone.trim()) {
      e.contact = t.errors.contact;
    } else if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      e.email = t.errors.email;
    }
    if (!fields.message.trim()) e.message = t.errors.message;
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const v = validate();
    if (Object.keys(v).length > 0) {
      setErrors(v);
      return;
    }
    setIsSubmitting(true);
    try {
      const payload: Record<string, string> = {
        '🏢 اسم الجهة': fields.organization,
        '👤 الشخص المسؤول': fields.contactPerson,
        '📧 البريد الإلكتروني': fields.email || '—',
        '📱 رقم الجوال': fields.phone || '—',
        '📝 تفاصيل الشراكة': fields.message,
        _subject: `🤝 طلب شراكة جديد — ${fields.organization}`,
        _template: 'table',
        _captcha: 'false',
        _honey: honeypotRef.current?.value ?? '',
      };
      if (fields.email) payload._replyto = fields.email;

      const res = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
      setIsSubmitting(false);
      setSubmitted(true);
      setFields({ organization: '', contactPerson: '', email: '', phone: '', message: '' });
      setTimeout(() => setSubmitted(false), 6000);
    } catch {
      setIsSubmitting(false);
      setSubmitError(t.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Honeypot */}
      <input
        ref={honeypotRef}
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] w-px h-px opacity-0 pointer-events-none"
      />

      <div>
        <label htmlFor={`${formId}-organization`} className="block text-sm font-medium text-brand-text mb-2">
          {t.organization} <span className="text-red-400">*</span>
        </label>
        <input
          id={`${formId}-organization`}
          type="text"
          value={fields.organization}
          onChange={handleChange('organization')}
          className={inputClasses(errors.organization)}
          placeholder={t.organizationPlaceholder}
          autoComplete="organization"
        />
        {errors.organization && <p className="text-xs text-red-500 mt-1.5">{errors.organization}</p>}
      </div>

      <div>
        <label htmlFor={`${formId}-contactPerson`} className="block text-sm font-medium text-brand-text mb-2">
          {t.contactPerson} <span className="text-red-400">*</span>
        </label>
        <input
          id={`${formId}-contactPerson`}
          type="text"
          value={fields.contactPerson}
          onChange={handleChange('contactPerson')}
          className={inputClasses(errors.contactPerson)}
          placeholder="الاسم الكامل"
          autoComplete="name"
        />
        {errors.contactPerson && <p className="text-xs text-red-500 mt-1.5">{errors.contactPerson}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`${formId}-p-email`} className="block text-sm font-medium text-brand-text mb-2">
            {t.email}
          </label>
          <input
            id={`${formId}-p-email`}
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
        <div>
          <label htmlFor={`${formId}-p-phone`} className="block text-sm font-medium text-brand-text mb-2">
            {t.phone}
          </label>
          <input
            id={`${formId}-p-phone`}
            type="tel"
            dir="ltr"
            value={fields.phone}
            onChange={handleChange('phone')}
            className={`${inputClasses()} text-left`}
            placeholder="+966 57 970 3017"
            autoComplete="tel"
          />
        </div>
      </div>
      {errors.contact && <p className="text-xs text-red-500 -mt-2">{errors.contact}</p>}
      {!errors.contact && (
        <p className="text-[11px] text-brand-text-muted/70 -mt-2">{t.contactHelp}</p>
      )}

      <div>
        <label htmlFor={`${formId}-p-message`} className="block text-sm font-medium text-brand-text mb-2">
          {t.message} <span className="text-red-400">*</span>
        </label>
        <textarea
          id={`${formId}-p-message`}
          rows={4}
          value={fields.message}
          onChange={handleChange('message')}
          className={`${inputClasses(errors.message)} resize-none`}
          placeholder={t.messagePlaceholder}
          maxLength={800}
        />
        {errors.message && <p className="text-xs text-red-500 mt-1.5">{errors.message}</p>}
      </div>

      <div>
        <Button
          type="submit"
          size="lg"
          className={`w-full ${isSubmitting ? 'opacity-70 pointer-events-none' : ''}`}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2 justify-center">
              <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              {t.sending}
            </span>
          ) : (
            t.submit
          )}
        </Button>
      </div>

      {submitted && (
        <div
          className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 text-center text-sm text-green-700 dark:text-green-300 flex items-center justify-center gap-2"
          role="alert"
        >
          <span className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-600 dark:text-green-400">
            ✓
          </span>
          {t.success}
        </div>
      )}

      {submitError && (
        <div
          className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 text-center text-sm text-red-700 dark:text-red-300 flex items-center justify-center gap-2"
          role="alert"
        >
          <span className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-red-600 dark:text-red-400">
            !
          </span>
          {submitError}
        </div>
      )}
    </form>
  );
}

