import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
  static async getInitialProps(context: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = context.renderPage;

    context.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: any) => (props: any) => sheet.collectStyles(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(context);

    return {
      ...initialProps,
      styles: [...(initialProps.styles as any), ...sheet.getStyleElement()],
    };
  }

  public render() {
    return (
      <Html lang="ja">
        <Head>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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
