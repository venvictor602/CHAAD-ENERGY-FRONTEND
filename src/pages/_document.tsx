import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#28325F" />
        <link rel="icon" href="/Logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/Logo.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta
          name="description"
          content="CHAAD Energy - Delivering Engineering Excellence Across Energy & Industrial Landscapes. Expert EPC, commissioning, cathodic protection, and tank services."
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
