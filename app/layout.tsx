import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/NavBar'
import ManagerLink from '@/components/ManagerLink'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <div className='flex-grow flex flex-col bg-blue-700'>
          <ManagerLink/>
          {children}
          <NavBar/>
        </div>
      </body>
    </html>
  )
}

