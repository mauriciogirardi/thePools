import { Html, Main, NextScript, Head } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="favicon.svg" type="image/svg+xml" />
      </Head>
      <body className="bg-gray-900 bg-app bg-cover bg-no-repeat text-gray-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
