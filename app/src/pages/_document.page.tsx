import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';
import { globalStyles } from '@/share/GlobalStyle';

// MEMO: SSR時のみ実行される
class MyDocument extends Document {
  render() {
    const GA_TRACKING_ID = 'G-Y2MDQ3RC4V';

    return (
      <Html lang="ja">
        <Head>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          {
            // <!-- Global site tag (gtag.js) - Google Analytics -->
          }
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
          {
            // <!-- Google AdSense -->
          }
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_TRACKING_ID}');
            `,
            }}
          />
          <style>{globalStyles}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
