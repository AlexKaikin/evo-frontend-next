import '@/assets/scss/index.scss'
import Providers from '@/hocs/Providers'
import type { Metadata } from 'next'
import { Jost } from 'next/font/google'
import Header from './(components)/layout/Header/Header'

const jost = Jost({
  weight: ['300', '400', '700'],
  subsets: ['cyrillic'],
  variable: '--font-jost',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'EVO PLACE',
  description:
    'Веб-приложение сообщества EVO, включающее интернет-магазин, блог и социальную сеть.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" data-theme="light">
      <body className={jost.className}>
        <Providers>
          <div id="root">
            <Header />
            <main>{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
