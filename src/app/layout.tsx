import { Inter } from 'next/font/google'
import AuthProvider from './context/AuthProvider'
import AuthWrapper from './components/container/AuthWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ThreeO'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
            <AuthWrapper>
              {children}
            </AuthWrapper>
        </AuthProvider>
      </body>
    </html>
  )
}
