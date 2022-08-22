import Head from 'next/head'
import { AppProps } from 'next/app'

import ErrorBoundary from 'core/ErrorBoundary'
import { ErrorFallback } from 'components/ErrorFallback'

import GlobalStyles from 'styles/global'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>React Starter</title>
        <link rel="shortcut icon" href="/img/icon-512.png" />
        <link rel="apple-touch-icon" href="/img/icon-512.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="description"
          content="A simple project starter to work with TypeScript, React, Storybook, NextJS and Styled Components"
        />
      </Head>
      <GlobalStyles />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Component {...pageProps} />
      </ErrorBoundary>
    </>
  )
}

export default App
