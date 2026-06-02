import type { Metadata, Viewport } from 'next'
import { Orbitron, Rajdhani, Space_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { I18nProvider } from '@/components/providers/i18n-provider'
import './globals.css'

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-display',
  display: 'swap',
  preload: true,
})

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
  preload: true,
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  title: {
    default: 'COSMOS — An Interactive Atlas of the Cosmos',
    template: '%s | COSMOS',
  },
  description:
    'An interactive atlas of the cosmos: planets, moons, dwarf planets, stars, nebulae, black holes, pulsars and galaxies.',
}

export const viewport: Viewport = {
  themeColor: '#04060F',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${rajdhani.variable} ${spaceMono.variable}`}
    >
      <body className="bg-void antialiased">
        <I18nProvider>{children}</I18nProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
