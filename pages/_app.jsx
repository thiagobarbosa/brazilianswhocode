import Head from "next/head";
import Script from "next/script";
import "reset-css";
import "../styles/global.css";
import "../styles/index.scss";

export default function BraziliansWhoCode({ Component, pageProps }) {
  const title = "Brazilians Who Code";
  const description =
    "A Twitter directory of accomplished Brazilians in the tech industry.";
  const image = "https://pbs.twimg.com/profile_images/1576311847006994434/8cey6S8A_400x400.jpg";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content="https://brazilianswhocode.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={title} />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:site" content="@BR_whocode" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:creator" content="@BR_whocode" />
        <meta property="twitter:image" content={image} />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </Head>
      <Component {...pageProps} />

      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-G6YNC8RLFH"
        strategy="afterInteractive"
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-G6YNC8RLFH');
        `}
      </Script>
    </>
  );
}
