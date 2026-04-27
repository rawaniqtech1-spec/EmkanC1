import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [65, 70, 75, 85],
  },
  compiler: {
    // Strip console.* calls from the production bundle but keep error/warn
    // so real problems still surface.
    removeConsole: {
      exclude: ['error', 'warn'],
    },
  },
  experimental: {
    optimizeCss: true,
    // Tree-shake these barrel imports so only the used exports ship.
    optimizePackageImports: [
      'gsap',
      'gsap/ScrollTrigger',
      'lenis',
      '@tsparticles/react',
      '@tsparticles/slim',
      'three',
      '@react-three/fiber',
      '@react-three/drei',
    ],
  },
};

export default nextConfig;
