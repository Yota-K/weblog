import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

// MEMO: SSR時のみ実行される
class MyDocument extends Document {
  // SSR実行時に生成されるページの処理をカスタマイズする
  // css-in-js系のライブラリを使用する場合にカスタマイズが必要になる
  //
  // 公式: https://nextjs.org/docs/advanced-features/custom-document#customizing-renderpage
  // https://dev.to/aprietof/nextjs--styled-components-the-really-simple-guide----101c
  static async getInitialProps(context: DocumentContext) {
    const sheet = new ServerStyleSheet();

    try {
      // SSRを行うページ？？
      const page = context.renderPage;

      // ページ内のコンポーネントからスタイルを取得する
      context.renderPage = () =>
        page({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      // 継承元のクラスのgetInitialPropsを実行する
      const initialProps = await Document.getInitialProps(context);

      // スプレッド構文で上書き
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {/* スタイルをスタイルタグとして出力する */}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    const GA_TRACKING_ID = 'G-Y2MDQ3RC4V';
    const AD_CLIENT = 'ca-pub-1412340494644518';

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
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
            data-ad-client={AD_CLIENT}
          />
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
