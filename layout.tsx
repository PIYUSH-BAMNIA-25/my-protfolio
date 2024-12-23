import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Piyush\'s Portfolio',
  description: 'A protfolio website for data science student',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Responsive meta tag */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Add other necessary meta tags */}
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}

