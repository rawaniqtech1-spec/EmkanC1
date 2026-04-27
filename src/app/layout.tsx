import type { Metadata, Viewport } from 'next';
import dynamic from 'next/dynamic';
import { hacenMaghreb, tajawal, ibmPlexArabic } from '@/lib/fonts';
import { SITE_METADATA } from '@/lib/constants';
import { content } from '@/content/ar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LenisProvider from '@/components/layout/LenisProvider';
import ThemeProvider from '@/components/layout/ThemeProvider';
import BackgroundTexture from '@/components/shared/BackgroundTexture';
import './globals.css';

const ScrollDots = dynamic(() => import('@/components/shared/ScrollDots'));
const ScrollToTop = dynamic(() => import('@/components/shared/ScrollToTop'));
const WhatsAppButton = dynamic(() => import('@/components/shared/WhatsAppButton'));
const PageLoader = dynamic(() => import('@/components/shared/PageLoader'));

export const metadata: Metadata = {
  metadataBase: new URL(SITE_METADATA.url),
  title: {
    default: SITE_METADATA.title,
    template: `%s | ${SITE_METADATA.title}`,
  },
  description: SITE_METADATA.description,
  applicationName: SITE_METADATA.title,
  keywords: [
    'إمكان المستقبل',
    'Future Emkan',
    'علاج النطق',
    'تخاطب',
    'تعديل السلوك',
    'تنمية مهارات التعلم',
    'تأهيل سمعي',
    'تدخل مبكر',
    'أطفال',
    'تأهيل',
    'تبوك',
    'المملكة العربية السعودية',
    'speech therapy Tabuk',
  ],
  authors: [{ name: 'Future Emkan', url: SITE_METADATA.url }],
  creator: 'Future Emkan',
  publisher: 'Future Emkan',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  alternates: {
    canonical: '/',
    languages: {
      'ar-SA': '/',
    },
  },
  openGraph: {
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    url: SITE_METADATA.url,
    siteName: SITE_METADATA.title,
    locale: 'ar_SA',
    type: 'website',
    images: [
      {
        url: '/images/logo-purple-bg.jpg',
        width: 1200,
        height: 630,
        alt: SITE_METADATA.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    images: ['/images/logo-purple-bg.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/icon.jpg',
    apple: '/apple-icon.jpg',
    shortcut: '/icon.jpg',
  },
  category: 'healthcare',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F7F4EE' },
    { media: '(prefers-color-scheme: dark)', color: '#1E1535' },
  ],
  colorScheme: 'light dark',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: SITE_METADATA.title,
  alternateName: 'Future Emkan',
  description: SITE_METADATA.description,
  url: SITE_METADATA.url,
  logo: `${SITE_METADATA.url}/images/logo-icon.jpg`,
  image: `${SITE_METADATA.url}/images/logo-purple-bg.jpg`,
  telephone: content.contact.info.phone,
  email: content.contact.info.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Tabuk',
    addressRegion: 'Tabuk',
    addressCountry: 'SA',
    streetAddress: content.contact.info.address,
  },
  hasMap: content.contact.info.mapLink,
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
      opens: '09:00',
      closes: '12:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
      opens: '16:00',
      closes: '22:00',
    },
  ],
  sameAs: [
    content.contact.info.instagram,
    content.contact.info.tiktok,
    content.contact.info.linktree,
  ],
  medicalSpecialty: [
    'SpeechLanguagePathology',
    'Pediatrics',
    'Audiology',
    'BehavioralHealth',
  ],
  areaServed: {
    '@type': 'Country',
    name: 'Saudi Arabia',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${hacenMaghreb.variable} ${tajawal.variable} ${ibmPlexArabic.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{const t=localStorage.getItem('theme');if(t!=='light'){document.documentElement.classList.add('dark')}}catch(e){document.documentElement.classList.add('dark')}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-body" suppressHydrationWarning>
        <BackgroundTexture />
        <ThemeProvider>
          <LenisProvider>
            <PageLoader />
            <Navbar />
            <ScrollDots />
            <main className="flex-1 overflow-x-clip">{children}</main>
            <Footer />
            <ScrollToTop />
            <WhatsAppButton href={content.contact.info.whatsapp} />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
