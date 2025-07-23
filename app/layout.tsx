import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Snake Game Mobile',
  description: 'Classic Snake game optimized for mobile devices with touch controls',
  keywords: 'snake game, mobile game, classic game, retro game, browser game',
  authors: [{ name: 'Snake Game Mobile' }],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  icons: {
    icon: '/favicon.ico',
  },
  manifest: '/manifest.json',
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="min-h-screen bg-game-bg text-score-text font-mono">
        {children}
      </body>
    </html>
  )
}