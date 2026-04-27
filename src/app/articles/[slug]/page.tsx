'use client';

import { useRef, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { content } from '@/content/ar';
import Button from '@/components/shared/Button';
import { SoundWaveBars, SwooshCurve } from '@/components/shared/BrandDecor';

// All event-only fields are optional from the union's perspective —
// declare an item type so TS doesn't complain when we read them.
type ArticleItem = {
  slug: string;
  category: 'blog' | 'events';
  title: string;
  excerpt: string;
  body: string;
  image: string;
  date: string;
  readTime?: string;
  location?: string;
  eventDate?: string;
  eventTime?: string;
  featured: boolean;
};

export default function ArticleDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;
  const ref = useRef<HTMLElement>(null);

  const allItems = content.articles.items as readonly ArticleItem[];
  const article = allItems.find((a) => a.slug === slug);

  // ── Scroll to top on every article navigation ──
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  // ── GSAP entrance animations ──
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.detail-el',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out', delay: 0.15 }
      );
    }, ref);
    return () => ctx.revert();
  }, [slug]);

  if (!article) {
    notFound();
    return null;
  }

  const t = content.articles.detail;
  const isEvent = article.category === 'events';

  const related = allItems
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 3);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const whatsappShare = `https://wa.me/?text=${encodeURIComponent(`${article.title}\n${shareUrl}`)}`;

  const copyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const paragraphs = article.body.split('\n\n');

  return (
    <article ref={ref} className="bg-surface-primary min-h-screen">
      {/* ═══════════ HERO IMAGE ═══════════ */}
      <div className="detail-el relative w-full min-h-[480px] sm:min-h-0 aspect-[3/2] sm:aspect-[16/8] md:aspect-[16/6] overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E1535] via-[#1E1535]/60 to-[#1E1535]/20" />

        {/* Title overlay */}
        <div className="absolute inset-x-0 bottom-0 z-[2] px-5 md:px-12 pb-8 md:pb-14">
          <div className="max-w-[820px] mx-auto">
            <Link
              href="/articles"
              className="detail-el hidden sm:flex w-fit items-center gap-1.5 text-white/70 hover:text-white text-xs md:text-sm mb-3 md:mb-4 transition-colors duration-300"
            >
              <span>→</span>
              <span>{t.backLink}</span>
            </Link>

            <span className="detail-el inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[11px] md:text-xs font-medium bg-brand-teal/90 text-white backdrop-blur-sm mb-3 md:mb-4">
              {isEvent ? 'فعاليات' : 'المدونة'}
            </span>

            <h1 className="detail-el font-display font-bold text-2xl sm:text-3xl md:text-5xl text-white leading-[1.15] mb-5">
              {article.title}
            </h1>

            {/* Metadata bar */}
            <div className="detail-el flex flex-wrap items-center gap-4 text-sm text-white/70">
              <span className="inline-flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                {article.date}
              </span>
              {article.readTime && (
                <span className="inline-flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                  {article.readTime}
                </span>
              )}
              {article.location && (
                <span className="inline-flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  {article.location}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════ BODY CONTENT ═══════════ */}
      <div className="relative px-5 md:px-12 py-12 md:py-20">
        <SoundWaveBars color="teal" size="sm" className="absolute top-14 left-8 opacity-[0.08] animate-float hidden md:flex" />
        <SwooshCurve color="purple" width={200} className="absolute bottom-20 right-8 opacity-[0.06] hidden lg:block" />

        <div className="max-w-[720px] mx-auto">
          {/* Event details card */}
          {isEvent && (article.eventDate || article.eventTime || article.location) && (
            <div className="detail-el mb-10 md:mb-14">
              <div className="bg-brand-teal/[0.08] border border-brand-teal/20 rounded-2xl md:rounded-3xl p-6 md:p-8">
                <h3 className="font-display font-bold text-sm text-brand-teal mb-5 flex items-center gap-2">
                  <span className="w-6 h-[2px] bg-brand-teal" />
                  {t.eventDetails}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {article.eventDate && (
                    <div className="bg-surface-primary/50 rounded-xl p-4">
                      <span className="block text-[11px] text-brand-text-muted mb-1.5">{t.eventDate}</span>
                      <span className="font-display font-bold text-brand-text text-sm">{article.eventDate}</span>
                    </div>
                  )}
                  {article.eventTime && (
                    <div className="bg-surface-primary/50 rounded-xl p-4">
                      <span className="block text-[11px] text-brand-text-muted mb-1.5">{t.eventTime}</span>
                      <span className="font-display font-bold text-brand-text text-sm">{article.eventTime}</span>
                    </div>
                  )}
                  {article.location && (
                    <div className="bg-surface-primary/50 rounded-xl p-4">
                      <span className="block text-[11px] text-brand-text-muted mb-1.5">{t.eventLocation}</span>
                      <span className="font-display font-bold text-brand-text text-sm">{article.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Article body — proper editorial typography */}
          <div className="detail-el">
            {paragraphs.map((paragraph, i) => (
              <div key={i} className={i === 0 ? 'mb-8 md:mb-10' : 'mb-6 md:mb-8 last:mb-0'}>
                {i === 0 ? (
                  // First paragraph — larger, with a drop-cap-style accent
                  <p className="text-brand-text text-lg md:text-xl leading-[2] md:leading-[2.1] font-medium first-letter:text-4xl first-letter:md:text-5xl first-letter:font-display first-letter:font-bold first-letter:text-brand-teal first-letter:float-right first-letter:ml-3 first-letter:mt-1">
                    {paragraph}
                  </p>
                ) : (
                  <p className="text-brand-text text-base md:text-lg leading-[1.95] md:leading-[2.1]">
                    {paragraph}
                  </p>
                )}

                {/* Decorative divider between some paragraphs */}
                {i === 0 && paragraphs.length > 2 && (
                  <div className="flex items-center justify-center gap-3 my-8 md:my-10">
                    <span className="w-2 h-2 rounded-full bg-brand-teal/30" />
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-teal/20" />
                    <span className="w-2 h-2 rounded-full bg-brand-teal/30" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Teal accent bar before share section */}
          <div className="w-16 h-[2px] bg-brand-teal mx-auto mt-12 md:mt-16 mb-8 md:mb-10" />

          {/* Share bar */}
          <div className="detail-el text-center">
            <span className="text-xs text-brand-text-muted font-medium mb-5 block">{t.shareLabel}</span>
            <div className="flex items-center justify-center gap-3">
              <a
                href={whatsappShare}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-brand-teal/10 border border-brand-teal/20 text-brand-teal text-sm hover:bg-brand-teal/20 transition-colors duration-300 min-h-[44px]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" /></svg>
                واتساب
              </a>
              <button
                onClick={copyLink}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-surface-secondary border border-[var(--border-default)] text-brand-text-muted text-sm hover:border-brand-teal hover:text-brand-teal transition-colors duration-300 min-h-[44px]"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                نسخ الرابط
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════ RELATED ARTICLES ═══════════ */}
      {related.length > 0 && (
        <section className="py-12 md:py-20 px-4 md:px-12 bg-surface-secondary section-vignette relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-brand-teal/[0.04] rounded-full blur-[80px] pointer-events-none" />
          <div className="max-w-[1100px] mx-auto">
            <div className="text-center mb-10 md:mb-14">
              <span className="text-xs text-brand-teal font-medium mb-3 block">اقرأ أيضاً</span>
              <h2 className="font-display font-bold text-xl md:text-3xl text-brand-text">
                {t.relatedTitle}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/articles/${r.slug}`}
                  className="group block rounded-2xl md:rounded-3xl overflow-hidden bg-surface-card border border-[var(--border-default)] hover:border-brand-teal/60 transition-colors duration-300"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={r.image} alt={r.title} fill sizes="(max-width: 768px) 100vw, 33vw" quality={75} className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-[11px] font-medium bg-brand-teal/90 text-white backdrop-blur-sm">
                      {r.category === 'events' ? 'فعاليات' : 'المدونة'}
                    </span>
                  </div>
                  <div className="p-4 md:p-5">
                    <div className="flex items-center gap-2 text-[11px] text-brand-text-muted mb-2">
                      <span>{r.date}</span>
                      {r.readTime && <><span>·</span><span>{r.readTime}</span></>}
                    </div>
                    <h3 className="font-display font-bold text-sm md:text-base text-brand-text leading-tight group-hover:text-brand-teal transition-colors duration-300 line-clamp-2">
                      {r.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Button href="/articles" variant="secondary" size="md">
                {t.backLink}
              </Button>
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
