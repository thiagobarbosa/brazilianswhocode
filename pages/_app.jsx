import Head from "next/head";
import Script from "next/script";
import "reset-css";
import "../styles/global.css";
import "../styles/index.scss";

export default function WomenWhoDesign({ Component, pageProps }) {
  const title = "Women Who Design";
  const description =
    "A Twitter directory of accomplished women in the design industry.";
  const image = "https://womenwho.design/opengraph.png";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content="https://womenwho.design" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={title} />
        <meta property="twitter:site" content="@womenwhodesign" />
        <meta property="twitter:creator" content="@julesforrest" />
        <meta property="twitter:card" content="summary_large_image" />
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
        src="https://www.googletagmanager.com/gtag/js?id=UA-99095616-1"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'UA-99095616-1');
        `}
      </Script>
    </>
  );
}
