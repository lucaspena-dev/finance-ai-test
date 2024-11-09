import type { Metadata } from 'next'
import { Mulish } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

const font = Mulish({
  subsets: ['latin-ext'],
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
        <ClerkProvider appearance={{ baseTheme: dark }}>
          <div className="flex h-full flex-col overflow-hidden">{children}</div>
        </ClerkProvider>
      </body>
    </html>
  )
}
