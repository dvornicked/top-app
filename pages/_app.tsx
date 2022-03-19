import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import ym from 'react-yandex-metrika'
import { YMInitializer } from 'react-yandex-metrika'

function MyApp({ Component, pageProps, router }: AppProps) {
  router.events.on('routeChangeComplete', (url: string) => {
    if (typeof window !== 'undefined') {
      ym('hit', url)
    }
  })
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://mc.yandex.ru" />
        <meta property="og:locale" content="ru_RU" />
      </Head>
      <YMInitializer
        accounts={[]}
        options={{ webvisor: true, defer: true }}
        version="2"
      />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
