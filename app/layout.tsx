import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Infinite Walima — Akhi & Habibi',
  description: 'An interactive bromance Walima archive.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>
}
