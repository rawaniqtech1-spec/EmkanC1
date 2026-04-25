import Link from 'next/link';
import Image from 'next/image';
import { NAV_ITEMS, BRAND } from '@/lib/constants';
import { content } from '@/content/ar';
import { SoundWaveBars, SwooshCurve } from '@/components/shared/BrandDecor';

function IconPhone() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  );
}

function IconPin() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconWhatsapp() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function IconTikTok() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.87a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.3z" />
    </svg>
  );
}

function IconLinktree() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="4" r="2" />
      <circle cx="5" cy="20" r="2" />
      <circle cx="19" cy="20" r="2" />
      <path d="M12 6v6M12 12l-5.5 6M12 12l5.5 6" />
    </svg>
  );
}

function IconArrowLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function IconSparkle() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0l2.5 9.5L24 12l-9.5 2.5L12 24l-2.5-9.5L0 12l9.5-2.5z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { label: 'انستغرام', Icon: IconInstagram, href: 'https://www.instagram.com/emkanspeech' },
  { label: 'تيك توك', Icon: IconTikTok, href: 'https://www.tiktok.com/@emkanspeech' },
  { label: 'لينك تري', Icon: IconLinktree, href: 'https://linktr.ee/emkanspeech' },
];

export default function Footer() {
  const taglineWords = content.footer.tagline.split(' ');

  return (
    <footer
      className="relative overflow-hidden text-white/80 bg-[#1A1130]"
      role="contentinfo"
    >
      {/* Wave divider top */}
      <div className="wave-divider-top" />

      {/* Teal accent line below wave */}
      <div className="absolute top-[58px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-teal/30 to-transparent z-[2]" />

      {/* Decor — gradient orbs */}
      <div className="absolute -top-32 left-1/4 w-[600px] h-[600px] bg-brand-teal/[0.05] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 -right-20 w-[500px] h-[500px] bg-brand-purple/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -left-20 w-[400px] h-[400px] bg-brand-teal/[0.03] rounded-full blur-[100px] pointer-events-none" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 75%)',
        }}
      />

      {/* Floating brand decor */}
      <SoundWaveBars
        color="teal"
        size="lg"
        className="absolute top-32 right-8 md:right-20 opacity-[0.12] animate-float-slow hidden md:flex"
      />
      <SoundWaveBars
        color="purple"
        size="md"
        className="absolute bottom-36 left-8 md:left-20 opacity-[0.18] animate-float hidden md:flex"
      />

      <div className="relative z-[2] max-w-[1280px] mx-auto px-5 md:px-12 pt-20 md:pt-28">
        {/* Top CTA strip */}
        <div className="relative mb-16 md:mb-24">
          <div className="absolute -inset-px bg-gradient-to-r from-brand-teal/40 via-brand-teal/10 to-transparent rounded-[28px] blur-sm opacity-60" />
          <div className="relative rounded-[28px] border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-sm px-6 md:px-12 py-10 md:py-12 overflow-hidden">
            {/* Corner swoosh decor */}
            <SwooshCurve
              color="teal"
              width={240}
              className="absolute -top-10 -left-10 opacity-[0.18] pointer-events-none"
            />
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="flex-1">
                <span className="inline-flex items-center gap-2 text-[11px] text-brand-teal font-medium mb-4 uppercase">
                  <span className="relative flex w-1.5 h-1.5">
                    <span className="absolute inset-0 rounded-full bg-brand-teal animate-ping opacity-60" />
                    <span className="relative w-1.5 h-1.5 rounded-full bg-brand-teal" />
                  </span>
                  متاحون الآن
                </span>
                <h3 className="font-display font-bold text-white text-2xl md:text-3xl lg:text-[34px] leading-[1.2] mb-3">
                  هل أنت مستعد لبدء{' '}
                  <span className="relative inline-block">
                    <span className="relative z-10 text-brand-teal">رحلة طفلك</span>
                    <span className="absolute bottom-1 left-0 right-0 h-2 bg-brand-teal/20 -z-0" />
                  </span>
                  ؟
                </h3>
                <p className="text-white/55 text-sm md:text-base leading-relaxed max-w-lg">
                  فريقنا جاهز للإجابة على جميع استفساراتك. خطوة واحدة تفصلك عن مستقبل أفضل لطفلك.
                </p>
              </div>

              <a
                href={content.contact.info.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 shrink-0 px-7 py-4 rounded-full bg-brand-teal text-[#1A1130] font-bold text-sm hover:bg-white transition-all duration-300 shadow-[0_0_50px_rgba(135,198,199,0.35)] hover:shadow-[0_0_70px_rgba(135,198,199,0.5)] hover:-translate-y-0.5"
              >
                <IconWhatsapp />
                <span>احجز استشارة مجانية</span>
                <span className="w-7 h-7 rounded-full bg-[#1A1130]/10 flex items-center justify-center group-hover:-translate-x-1 transition-transform duration-300">
                  <IconArrowLeft />
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-14">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link
              href="/"
              className="inline-flex items-center gap-4 mb-7 group"
              aria-label="الصفحة الرئيسية"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-brand-teal/30 rounded-lg blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                <Image
                  src="/images/logo-icon.jpg"
                  alt="شعار إمكان المستقبل"
                  width={44}
                  height={44}
                  loading="lazy"
                  quality={75}
                  className="relative rounded-lg transition-transform duration-500 group-hover:scale-95"
                />
              </div>
              <div>
                <p className="font-display font-bold text-white text-base leading-tight">
                  {BRAND.name.ar}
                </p>
                <p className="text-[11px] text-brand-teal/80 tracking-[0.2em] mt-1">
                  {BRAND.name.en}
                </p>
              </div>
            </Link>

            <p className="font-display text-xl md:text-2xl text-white leading-tight mb-5 max-w-md">
              {taglineWords.map((word, i) => {
                const isLast = i === taglineWords.length - 1;
                return (
                  <span key={i}>
                    {isLast ? (
                      <span className="text-brand-teal italic">{word}</span>
                    ) : (
                      word
                    )}
                    {i < taglineWords.length - 1 ? ' ' : ''}
                  </span>
                );
              })}
            </p>

            <p className="text-sm text-white/50 leading-relaxed mb-7 max-w-sm">
              {content.footer.description}
            </p>

            {/* Trust seal */}
            <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
              <span className="text-brand-teal">
                <IconSparkle />
              </span>
              <span className="text-[11px] text-white/55">
                مسجل رسمياً · س.ت{' '}
                <span dir="ltr" className="tabular-nums text-white/80">
                  {content.contact.info.commercialRegistration}
                </span>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <nav className="md:col-span-3" aria-label="روابط سريعة">
            <h4 className="font-display font-bold text-white text-sm mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-gradient-to-l from-brand-teal to-transparent" />
              {content.footer.quickLinks}
            </h4>
            <ul className="flex flex-col gap-3.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group text-sm text-white/55 hover:text-brand-teal transition-colors duration-300 w-fit flex items-center gap-2.5"
                  >
                    <span className="w-0 h-px bg-brand-teal transition-all duration-300 group-hover:w-5" />
                    <span>{item.label}</span>
                  </Link>
                  {item.children && (
                    <ul className="mt-2.5 mr-4 pr-4 border-r border-white/10 flex flex-col gap-2.5">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="group text-[13px] text-white/40 hover:text-brand-teal transition-colors duration-300 w-fit flex items-center gap-2"
                          >
                            <span className="w-0 h-px bg-brand-teal transition-all duration-300 group-hover:w-3" />
                            <span>{child.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="font-display font-bold text-white text-sm mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-gradient-to-l from-brand-teal to-transparent" />
              {content.footer.contactUs}
            </h4>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href={`tel:${content.contact.info.phone.replace(/\s+/g, '')}`}
                  dir="ltr"
                  className="group flex items-center gap-3.5 text-sm text-white/60 hover:text-brand-teal transition-colors duration-300"
                >
                  <span className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-brand-teal group-hover:bg-brand-teal/10 group-hover:border-brand-teal/40 group-hover:scale-105 transition-all duration-300 shrink-0">
                    <IconPhone />
                  </span>
                  <span className="tabular-nums tracking-wide">
                    {content.contact.info.phone}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${content.contact.info.email}`}
                  className="group flex items-center gap-3.5 text-sm text-white/60 hover:text-brand-teal transition-colors duration-300"
                >
                  <span className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-brand-teal group-hover:bg-brand-teal/10 group-hover:border-brand-teal/40 group-hover:scale-105 transition-all duration-300 shrink-0">
                    <IconMail />
                  </span>
                  <span className="break-all">{content.contact.info.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={content.contact.info.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3.5 text-sm text-white/60 hover:text-brand-teal transition-colors duration-300"
                >
                  <span className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-brand-teal group-hover:bg-brand-teal/10 group-hover:border-brand-teal/40 group-hover:scale-105 transition-all duration-300 shrink-0">
                    <IconPin />
                  </span>
                  <span>{content.contact.info.address}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Licensed by — official compliance bar */}
        <div className="border-t border-white/[0.06] pt-10 pb-10">
          <div className="flex flex-col items-center gap-6">
            {/* Label with decorative lines */}
            <div className="flex items-center gap-3">
              <span className="w-10 h-px bg-gradient-to-l from-brand-teal/50 to-transparent" />
              <span className="text-[10px] text-brand-teal uppercase font-medium">
                مرخّص رسمياً
              </span>
              <span className="w-10 h-px bg-gradient-to-r from-brand-teal/50 to-transparent" />
            </div>

            {/* Authority logos */}
            <div className="flex items-center gap-4 sm:gap-6">
              <a
                href="https://business.sa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="المركز السعودي للأعمال"
                className="group relative h-16 w-[150px] sm:h-[72px] sm:w-[180px] rounded-2xl bg-white border border-white/10 flex items-center justify-center px-4 py-3 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-12px_rgba(135,198,199,0.35)] transition-[transform,box-shadow] duration-300"
              >
                <Image
                  src="/images/partners/saudi-business-center.png"
                  alt="المركز السعودي للأعمال"
                  fill
                  sizes="180px"
                  className="object-contain p-3"
                />
              </a>
              <a
                href="https://moe.gov.sa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="وزارة التعليم"
                className="group relative h-16 w-[150px] sm:h-[72px] sm:w-[180px] rounded-2xl bg-white border border-white/10 flex items-center justify-center px-4 py-3 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-12px_rgba(135,198,199,0.35)] transition-[transform,box-shadow] duration-300"
              >
                <Image
                  src="/images/partners/ministry-of-education.png"
                  alt="وزارة التعليم"
                  fill
                  sizes="180px"
                  className="object-contain p-3"
                />
              </a>
            </div>

            {/* License number pill */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
              <span className="text-[10px] text-white/45 uppercase font-medium">
                رقم الترخيص
              </span>
              <span className="w-px h-3 bg-white/15" />
              <span
                dir="ltr"
                className="text-sm font-display tabular-nums text-white/85 tracking-[0.15em]"
              >
                {content.contact.info.licenseNumber}
              </span>
            </div>
          </div>
        </div>

        {/* Social row */}
        <div className="border-t border-white/[0.06] pt-8 pb-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1.5">
            <span className="text-[11px] text-brand-teal uppercase font-medium">
              {content.footer.followUs}
            </span>
            <p className="text-xs text-white/40">تابع رحلتنا اليومية عبر منصاتنا</p>
          </div>
          <div className="flex gap-3" role="list" aria-label="روابط التواصل الاجتماعي">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                role="listitem"
                className="group relative w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm flex items-center justify-center text-white/55 hover:text-brand-teal hover:border-brand-teal/50 hover:-translate-y-0.5 transition-all duration-300"
              >
                <span className="absolute inset-0 rounded-xl bg-brand-teal/0 group-hover:bg-brand-teal/15 blur-md transition-all duration-300" />
                <span className="relative">
                  <s.Icon />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-[2] border-t border-white/[0.06] bg-black/25 backdrop-blur-sm">
        <div className="max-w-[1280px] mx-auto px-5 md:px-12 py-5 flex flex-col-reverse sm:flex-row justify-between items-center gap-3">
          <p className="text-[11px] text-white/30">
            {content.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
