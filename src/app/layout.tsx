import './globals.css'
import './theme.css'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'WeGame',
  description: 'Game Types Guide',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="ma-0">{children}</body>
    </html>
  )
}
