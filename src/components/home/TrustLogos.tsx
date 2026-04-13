'use client';

const PARTNERS = [
  { name: 'وزارة التعليم', abbr: 'وت' },
  { name: 'وزارة الصحة', abbr: 'وص' },
  { name: 'مدارس الرياض', abbr: 'مر' },
  { name: 'جامعة الملك سعود', abbr: 'جس' },
  { name: 'مستشفى الأطفال', abbr: 'مط' },
  { name: 'مدارس المعرفة', abbr: 'مم' },
  { name: 'المركز الوطني', abbr: 'مو' },
  { name: 'جمعية التأهيل', abbr: 'جت' },
];

function LogoCard({ partner }: { partner: { name: string; abbr: string } }) {
  return (
    <div className="flex-shrink-0 w-[140px] sm:w-[160px] md:w-[180px] h-[70px] sm:h-[80px] md:h-[90px] rounded-xl bg-white dark:bg-surface-card border border-[var(--border-default)] flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 hover:border-brand-teal hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer mx-2 sm:mx-3">
      <div className="w-10 h-10 rounded-lg bg-brand-teal/10 flex items-center justify-center flex-shrink-0">
        <span className="font-display font-bold text-sm text-brand-text">
          {partner.abbr}
        </span>
      </div>
      <span className="text-xs font-medium text-brand-text-muted leading-tight">
        {partner.name}
      </span>
    </div>
  );
}

export default function TrustLogos() {
  return (
    <section className="py-8 sm:py-10 md:py-14 bg-surface-primary overflow-hidden relative">
      <p className="text-center text-xs font-display font-bold text-brand-text tracking-[0.15em] mb-6 sm:mb-8">
        شركاؤنا في النجاح
      </p>

      {/* Scrolling strip with fade edges */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-24 md:w-40 bg-gradient-to-l from-surface-secondary to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-24 md:w-40 bg-gradient-to-r from-surface-secondary to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <div className="flex animate-marquee hover:[animation-play-state:paused]" style={{ animationDuration: '35s' }}>
          {PARTNERS.map((p, i) => (
            <LogoCard key={`a-${i}`} partner={p} />
          ))}
          {PARTNERS.map((p, i) => (
            <LogoCard key={`b-${i}`} partner={p} />
          ))}
          {PARTNERS.map((p, i) => (
            <LogoCard key={`c-${i}`} partner={p} />
          ))}
          {PARTNERS.map((p, i) => (
            <LogoCard key={`d-${i}`} partner={p} />
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-brand-text-muted mt-6">
        * شعارات مؤقتة — سيتم استبدالها بشعارات الشركاء الفعليين
      </p>
    </section>
  );
}
