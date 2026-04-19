'use client';

import { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { content } from '@/content/ar';
import Button from '@/components/shared/Button';
import ScrollHighlight from '@/components/shared/ScrollHighlight';
import { SoundWaveBars } from '@/components/shared/BrandDecor';
import { useInView } from '@/hooks/useInView';
import { useCountUp } from '@/hooks/useCountUp';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

const Scene3D = dynamic(() => import('@/components/articles/Scene3D'), { ssr: false });

// Item type — covers both blog and event articles with optional event fields.
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

const articles = content.articles.items as readonly ArticleItem[];
const t = content.articles;
const blogArticles = articles.filter(a => a.category === 'blog');
const eventArticles = articles.filter(a => a.category === 'events');

/* ─── Stat counter component ─── */
function StatBridge() {
  const { ref, isInView } = useInView(0.3);
  const count = useCountUp(500, isInView);
  return (
    <section ref={ref} className="relative z-[1] py-20 md:py-28 px-4 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-brand-teal/[0.07] blur-[40px] pointer-events-none" />
      <div className="relative z-[1] text-center">
        <div className="font-display font-bold text-6xl sm:text-8xl md:text-9xl text-brand-teal tabular-nums leading-none mb-4">
          +{count}
        </div>
        <p className="text-brand-text-muted text-sm md:text-base">مستفيد ساعدناه في رحلتهم</p>
      </div>
    </section>
  );
}

export default function ArticlesPage() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = mainRef.current;
    if (!root) return;

    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        /* ── Opening entrance ── */
        gsap.from('.opening-line', { scaleX: 0, duration: 0.6, delay: 0 });
        gsap.from('.opening-label', { opacity: 0, y: 20, duration: 0.6, delay: 0.15 });
        gsap.from('.opening-word', { opacity: 0, y: 60, rotateX: 40, stagger: 0.06, duration: 0.8, ease: 'power3.out', delay: 0.3 });
        gsap.from('.opening-sub', { opacity: 0, y: 30, duration: 0.6, delay: 0.9 });

        /* ── Opening scroll exit ── */
        gsap.to('.opening-content', {
          opacity: 0, y: -80, scale: 0.95, ease: 'none',
          scrollTrigger: { trigger: '#journey-opening', start: 'top top', end: 'bottom top', scrub: 1 },
        });

        /* ── Journey cards: one-shot entrance + lightweight image parallax ── */
        document.querySelectorAll<HTMLElement>('.journey-card').forEach((card) => {
          const img = card.querySelector('.journey-card-img');
          const text = card.querySelector('.journey-card-text');

          // One-shot scale entrance (NOT scrub — fires once, no continuous cost)
          gsap.fromTo(card,
            { scale: 0.94, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.7, ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' },
            }
          );

          // Image parallax — scrub but only on desktop (mobile skips for perf)
          if (img && window.innerWidth >= 768) {
            gsap.fromTo(img, { y: '-8%' }, { y: '8%', ease: 'none',
              scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 2 },
            });
          }

          if (text) {
            gsap.fromTo(text, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 75%', toggleActions: 'play none none none' },
            });
          }
        });

        /* ── Event cards from alternating sides ── */
        document.querySelectorAll<HTMLElement>('.event-card').forEach((card, i) => {
          gsap.fromTo(card,
            { opacity: 0, x: i % 2 === 0 ? -60 : 60, y: 30 },
            { opacity: 1, x: 0, y: 0, duration: 0.7, ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
            }
          );
        });

        /* ── Split card: image wipe ── */
        // Split card image wipe — desktop only (mobile shows image immediately)
        if (window.innerWidth >= 768) {
          const splitImg = document.querySelector('.split-img-wrap');
          if (splitImg) {
            gsap.fromTo(splitImg,
              { clipPath: 'inset(0 100% 0 0)' },
              { clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: 'power3.inOut',
                scrollTrigger: { trigger: splitImg, start: 'top 75%', toggleActions: 'play none none none' },
              }
            );
          }
        }

        ScrollTrigger.refresh();
      }, root);

      return () => ctx.revert();
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const titleWords = t.hero.title.split(' ').filter(Boolean);

  return (
    <>
      <Scene3D />

      <div ref={mainRef}>
        {/* ═══════════════════════════════════════════════
            ACT 1 — الاكتشاف (DISCOVERY)
            ═══════════════════════════════════════════════ */}

        {/* Opening */}
        <section id="journey-opening" className="relative z-[1] min-h-dvh flex items-center justify-center overflow-hidden py-20">
          {/* Background layers */}
          <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: 'url(/images/logo-pattern.jpg)', backgroundSize: '180px', backgroundRepeat: 'repeat' }} />
          <div className="absolute top-[15%] right-[8%] w-40 md:w-72 h-40 md:h-72 rounded-full bg-brand-teal/[0.1] blur-[40px] pointer-events-none animate-float-slow" />
          <div className="absolute bottom-[20%] left-[8%] w-44 md:w-80 h-44 md:h-80 rounded-full bg-brand-purple/[0.08] blur-[40px] pointer-events-none animate-float-reverse" />
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[280px] md:w-[500px] h-[280px] md:h-[500px] rounded-full bg-brand-teal/[0.04] blur-[60px] pointer-events-none" />

          {/* Decorative corner elements */}
          <div className="absolute top-24 right-6 md:right-12 flex gap-1 opacity-[0.15]">
            {[8, 14, 22, 14, 8].map((h, i) => (
              <div key={i} className="w-1 rounded-full bg-brand-teal" style={{ height: h }} />
            ))}
          </div>
          <div className="absolute bottom-24 left-6 md:left-12 flex gap-1 opacity-[0.12]">
            {[6, 12, 18, 12, 6].map((h, i) => (
              <div key={i} className="w-1 rounded-full bg-brand-purple" style={{ height: h }} />
            ))}
          </div>

          {/* Decorative circles */}
          <div className="absolute top-[18%] left-[18%] w-20 h-20 md:w-28 md:h-28 rounded-full border border-brand-teal/[0.08] pointer-events-none" />
          <div className="absolute bottom-[22%] right-[15%] w-16 h-16 md:w-24 md:h-24 rounded-full border border-brand-purple/[0.06] pointer-events-none" />
          <div className="absolute top-[35%] right-[25%] w-3 h-3 rounded-full bg-brand-teal/20 pointer-events-none animate-float" />
          <div className="absolute bottom-[35%] left-[22%] w-2 h-2 rounded-full bg-brand-purple/20 pointer-events-none animate-float-reverse" />

          {/* Vertical decorative lines */}
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[1px] h-12 bg-gradient-to-b from-transparent via-brand-teal/20 to-transparent pointer-events-none" />

          <div className="opening-content relative z-[2] text-center max-w-3xl px-5">
            <div className="opening-line w-14 h-[2px] bg-brand-teal mx-auto mb-5 md:mb-8 origin-center" />
            <span className="opening-label block text-[11px] sm:text-xs text-brand-teal font-medium mb-4 sm:mb-6">{t.hero.label}</span>
            <h1 className="font-display font-bold text-[30px] sm:text-5xl md:text-6xl lg:text-7xl text-brand-text leading-[1.15] mb-5 sm:mb-8" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
              {titleWords.map((word, i) => (
                <span key={i} className="opening-word inline-block will-change-transform" style={{ whiteSpace: 'nowrap' }}>
                  {word}{i < titleWords.length - 1 ? <span>&nbsp;</span> : null}
                </span>
              ))}
            </h1>
            <p className="opening-sub text-brand-text-muted text-[13px] sm:text-base md:text-lg max-w-md mx-auto leading-relaxed mb-8">{t.hero.subtitle}</p>

            {/* Mini preview of what's below — category pills */}
            <div className="opening-sub flex items-center justify-center gap-2 mb-8">
              <span className="px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-medium bg-brand-teal/10 text-brand-teal border border-brand-teal/20">المدونة</span>
              <span className="w-1 h-1 rounded-full bg-brand-text-muted/30" />
              <span className="px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-medium bg-brand-purple/10 text-brand-purple dark:text-brand-teal border border-brand-purple/20 dark:border-brand-teal/20">فعاليات</span>
            </div>

            <div className="opening-sub flex flex-col items-center gap-2">
              <span className="text-[10px] sm:text-xs text-brand-text-muted">مرّر للاكتشاف</span>
              <div className="w-[1px] h-7 bg-brand-teal animate-breathe origin-top" />
            </div>
          </div>

          {/* Bottom gradient fade into next section */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-surface-primary to-transparent pointer-events-none" />
        </section>

        {/* Narrative bridge 1 — connects opening to first article */}
        <section className="relative z-[1] py-20 md:py-32 px-4 md:px-6 overflow-hidden">
          <div className="absolute top-8 right-8 flex gap-1 opacity-[0.15]">
            {[10, 18, 26, 18, 10].map((h, i) => (
              <div key={i} className="w-1 rounded-full bg-brand-teal" style={{ height: h }} />
            ))}
          </div>
          <div className="relative z-[2] max-w-[700px] mx-auto text-center">
            <ScrollHighlight
              as="h2"
              className="font-display font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-brand-text leading-relaxed"
            >
              نؤمن أن لكل طفل إمكانات فريدة... لهذا نبدأ بالاكتشاف المبكر ونرافق كل أسرة في رحلتها
            </ScrollHighlight>
            <div className="w-12 h-[2px] bg-brand-teal mx-auto mt-10" />
          </div>
        </section>

        {/* Article 1 — WIDE CARD (featured blog) */}
        {blogArticles[0] && (
          <section className="relative z-[2] px-4 md:px-8 lg:px-16 pb-6">
            <div className="max-w-[1200px] mx-auto">
              <Link href={`/articles/${blogArticles[0].slug}`}
                className="journey-card group block rounded-3xl md:rounded-[2rem] overflow-hidden relative will-change-transform"
                style={{ minHeight: 'clamp(420px, 75vh, 750px)' }}
              >
                <div className="journey-card-img absolute inset-0 will-change-transform" style={{ top: '-12%', bottom: '-12%' }}>
                  <Image src={blogArticles[0].image} alt={blogArticles[0].title} fill sizes="(max-width: 768px) 100vw, 80vw" quality={85} className="object-cover" priority />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1535] via-[#1E1535]/50 to-transparent" />
                <div className="journey-card-text absolute inset-x-0 bottom-0 p-6 md:p-10 lg:p-14">
                  <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-brand-teal/90 text-white backdrop-blur-sm mb-4">المدونة</span>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl md:text-5xl text-white leading-tight mb-3 group-hover:text-brand-teal transition-colors duration-300">{blogArticles[0].title}</h3>
                  <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-xl mb-4">{blogArticles[0].excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-white/50">
                    <span>{blogArticles[0].date}</span>
                    {blogArticles[0].readTime && <><span className="w-1 h-1 rounded-full bg-white/30" /><span>{blogArticles[0].readTime}</span></>}
                  </div>
                </div>
                <div className="absolute inset-0 bg-brand-teal/0 group-hover:bg-brand-teal/10 transition-[background-color] duration-500 pointer-events-none" />
              </Link>
            </div>
          </section>
        )}

        {/* Stat counter bridge */}
        <StatBridge />

        {/* ═══════════════════════════════════════════════
            ACT 2 — الرحلة (THE JOURNEY)
            ═══════════════════════════════════════════════ */}

        {/* Narrative bridge 2 */}
        <section className="relative z-[1] py-16 md:py-28 px-4 md:px-6 overflow-hidden">
          <div className="absolute bottom-8 left-8 flex gap-1 opacity-[0.15]">
            {[8, 14, 22, 14, 8].map((h, i) => (
              <div key={i} className="w-1 rounded-full bg-brand-purple" style={{ height: h }} />
            ))}
          </div>
          <div className="relative z-[2] max-w-[700px] mx-auto text-center">
            <ScrollHighlight
              as="h2"
              className="font-display font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-brand-text leading-relaxed"
            >
              لكن الرحلة لا تنتهي بالاكتشاف... بل تمتد إلى الأسرة والمنزل لبناء مستقبل أكثر ثقة
            </ScrollHighlight>
            <div className="w-12 h-[2px] bg-brand-teal mx-auto mt-10" />
          </div>
        </section>

        {/* Article 2 — SPLIT LAYOUT (visually different from Article 1) */}
        {blogArticles[1] && (
          <section className="relative z-[2] px-4 md:px-8 lg:px-16 pb-8 md:pb-12">
            <div className="max-w-[1200px] mx-auto">
              <Link href={`/articles/${blogArticles[1].slug}`} className="journey-card group block will-change-transform">
                <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-0 rounded-3xl md:rounded-[2rem] overflow-hidden bg-surface-card border border-[var(--border-default)] group-hover:border-brand-teal/60 transition-colors duration-500" style={{ minHeight: 'clamp(350px, 55vh, 550px)' }}>
                  {/* Image side — wipes in on scroll */}
                  <div className="split-img-wrap relative overflow-hidden md:[clip-path:inset(0_100%_0_0)]" style={{ minHeight: '250px' }}>
                    <div className="journey-card-img absolute inset-0 will-change-transform" style={{ top: '-12%', bottom: '-12%' }}>
                      <Image src={blogArticles[1].image} alt={blogArticles[1].title} fill sizes="(max-width: 768px) 100vw, 55vw" quality={85} className="object-cover" />
                    </div>
                  </div>
                  {/* Text side */}
                  <div className="journey-card-text flex flex-col justify-center p-6 md:p-10 lg:p-14">
                    <span className="inline-block w-fit px-4 py-1.5 rounded-full text-xs font-medium bg-brand-teal/10 text-brand-teal border border-brand-teal/20 mb-5">المدونة</span>
                    <h3 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-brand-text leading-tight mb-4 group-hover:text-brand-teal transition-colors duration-300">{blogArticles[1].title}</h3>
                    <p className="text-brand-text-muted text-sm md:text-base leading-relaxed mb-5">{blogArticles[1].excerpt}</p>
                    <div className="flex items-center gap-3 text-xs text-brand-text-muted mb-6">
                      <span>{blogArticles[1].date}</span>
                      {blogArticles[1].readTime && <><span className="w-1 h-1 rounded-full bg-brand-text-muted/30" /><span>{blogArticles[1].readTime}</span></>}
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-brand-teal group-hover:gap-3 transition-all duration-300">
                      <span>اقرأ المقال</span>
                      <span className="text-lg leading-none">←</span>
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* Article 3 — TEXT-FIRST LAYOUT (visually different from both) */}
        {blogArticles[2] && (
          <section className="relative z-[2] px-4 md:px-8 lg:px-16 pb-8 md:pb-12">
            <div className="max-w-[1200px] mx-auto">
              <Link href={`/articles/${blogArticles[2].slug}`} className="journey-card group block will-change-transform">
                <div className="rounded-3xl md:rounded-[2rem] overflow-hidden bg-brand-teal/[0.06] border border-brand-teal/10 group-hover:border-brand-teal/40 transition-colors duration-500">
                  {/* Image strip at top — shorter, cinematic aspect */}
                  <div className="relative h-[200px] md:h-[280px] overflow-hidden">
                    <div className="journey-card-img absolute inset-0 will-change-transform" style={{ top: '-20%', bottom: '-20%' }}>
                      <Image src={blogArticles[2].image} alt={blogArticles[2].title} fill sizes="(max-width: 768px) 100vw, 80vw" quality={85} className="object-cover" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-teal/10" />
                  </div>
                  {/* Text-dominant area */}
                  <div className="journey-card-text p-6 md:p-10 lg:p-14">
                    <div className="flex items-start gap-4 md:gap-8">
                      <span className="font-display font-bold text-6xl md:text-8xl text-brand-teal/15 leading-none select-none shrink-0 hidden sm:block">
                        {blogArticles[2].title.charAt(0)}
                      </span>
                      <div>
                        <span className="inline-block w-fit px-4 py-1.5 rounded-full text-xs font-medium bg-brand-teal/10 text-brand-teal border border-brand-teal/20 mb-4">المدونة</span>
                        <h3 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-brand-text leading-tight mb-4 group-hover:text-brand-teal transition-colors duration-300">{blogArticles[2].title}</h3>
                        <p className="text-brand-text-muted text-sm md:text-base leading-relaxed mb-5 max-w-xl">{blogArticles[2].excerpt}</p>
                        <div className="flex items-center gap-3 text-xs text-brand-text-muted">
                          <span>{blogArticles[2].date}</span>
                          {blogArticles[2].readTime && <><span className="w-1 h-1 rounded-full bg-brand-text-muted/30" /><span>{blogArticles[2].readTime}</span></>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════
            ACT 3 — المجتمع (COMMUNITY)
            ═══════════════════════════════════════════════ */}

        {/* Category bridge */}
        <section id="journey-bridge" className="relative z-[1] py-24 md:py-36 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-surface-primary via-brand-teal/[0.03] to-surface-primary pointer-events-none" />
          <SoundWaveBars color="teal" size="lg" className="absolute top-1/2 left-8 -translate-y-1/2 opacity-[0.1] animate-float hidden md:flex" />
          <div className="relative z-[1] text-center px-4">
            <span className="bridge-text block font-display font-bold text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-transparent leading-none" style={{ WebkitTextStroke: '2px var(--brand-teal)', color: 'transparent' }}>
              فعاليات
            </span>
            <p className="text-brand-text-muted text-sm md:text-base mt-6 max-w-md mx-auto">
              ونشارك رحلتنا مع مجتمعنا في تبوك
            </p>
          </div>
        </section>

        {/* Event cards — consistent style, staggered from alternating sides */}
        <section className="relative z-[2] px-4 md:px-8 lg:px-16 pb-8 md:pb-12 [content-visibility:auto] [contain-intrinsic-size:0_800px]">
          <div className="max-w-[1200px] mx-auto space-y-8 md:space-y-12">
            {eventArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="event-card group block rounded-3xl md:rounded-[2rem] overflow-hidden relative will-change-transform"
                style={{ minHeight: 'clamp(380px, 60vh, 600px)' }}
              >
                <div className="journey-card-img absolute inset-0 will-change-transform" style={{ top: '-12%', bottom: '-12%' }}>
                  <Image src={article.image} alt={article.title} fill sizes="(max-width: 768px) 100vw, 80vw" quality={85} className="object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1535] via-[#1E1535]/60 to-transparent" />

                {/* Event metadata — glassmorphism badge */}
                {(article.eventDate || article.eventTime) && (
                  <div className="absolute top-5 right-5 z-[2] inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                    {article.eventDate && <span className="text-brand-teal font-display font-bold text-sm">{article.eventDate}</span>}
                    {article.eventTime && <span className="text-white/60 text-xs">{article.eventTime}</span>}
                  </div>
                )}

                <div className="journey-card-text absolute inset-x-0 bottom-0 p-6 md:p-10 lg:p-14">
                  <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-brand-purple/80 text-white backdrop-blur-sm mb-4">فعاليات</span>
                  <h3 className="font-display font-bold text-xl sm:text-3xl md:text-4xl text-white leading-tight mb-3 group-hover:text-brand-teal transition-colors duration-300">{article.title}</h3>
                  <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-xl mb-4 line-clamp-2">{article.excerpt}</p>
                  {article.location && (
                    <div className="flex items-center gap-2 text-xs text-white/50">
                      <span>📍 {article.location}</span>
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 bg-brand-teal/0 group-hover:bg-brand-teal/10 transition-[background-color] duration-500 pointer-events-none" />
              </Link>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            CLOSING CTA
            ═══════════════════════════════════════════════ */}
        <section className="relative z-[1] py-20 md:py-32 px-4 md:px-12 bg-surface-primary section-vignette overflow-hidden">
          <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-brand-teal/[0.05] rounded-full blur-[80px] pointer-events-none" />
          <div className="max-w-[700px] mx-auto text-center">
            <span className="text-xs text-brand-teal font-medium mb-3 block">ابقَ على اطلاع</span>
            <h2 className="font-display font-bold text-2xl md:text-4xl text-brand-text mb-4 leading-tight">تابع جديدنا</h2>
            <p className="text-brand-text-muted text-sm md:text-base leading-relaxed mb-8 max-w-lg mx-auto">
              نشارك مقالات جديدة وفعاليات مجتمعية بشكل دوري. تابعنا لتكون أول من يعرف.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button href={content.contact.info.instagram} variant="primary" size="lg">تابعنا على انستغرام</Button>
              <Button href="/contact" variant="secondary" size="lg">تواصل معنا</Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
