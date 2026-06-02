/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Optimize the externally-hosted planet imagery instead of shipping it raw.
    remotePatterns: [
      { protocol: 'https', hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com' },
      { protocol: 'https', hostname: 'space-cosmic.vercel.app' },
    ],
  },
}

export default nextConfig
