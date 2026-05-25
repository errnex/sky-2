'use client'

import type { ReactNode } from 'react'
import './globals.css'

export const metadata = {
  title: 'ASTOR - Web3 & RealFi Assistant',
  description: 'AI-powered Web3 and RealFi assistant for the Pharos Network',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-astor-dark text-white">
        {children}
      </body>
    </html>
  )
}
