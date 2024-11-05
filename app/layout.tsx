import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

const font = Inter({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Finance.io',
  description: 'Gestor de finanças desenvolvido com o Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className={`${font.className} dark antialiased`}>
        <ClerkProvider appearance={{ baseTheme: dark }}>{children}</ClerkProvider>
      </body>
    </html>
  )
}
