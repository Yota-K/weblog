import React from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends NextDocument {
    render() {
        return (
            <Html lang="ja">
                <Head>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <style>{
                        `html,body,h1,h2,h3,h4,p {
                            padding: 0;
                            margin: 0;
                        }
                        body {
                            font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,YuGothic,ヒラギノ角ゴ ProN W3,Hiragino Kaku Gothic ProN,Arial,メイリオ,Meiryo,sans-serif;
                            line-height: 1.5;
                            color: #2b2c30;
                        }
                        a {
                            text-decoration: none;
                        }
                        .lazy-load-image-background.blur {
                            filter: blur(15px);
                        }
                        .lazy-load-image-background.blur.lazy-load-image-loaded {
                            filter: blur(0);
                            transition: filter .3s;
                        }
                        .lazy-load-image-background.blur > img {
                            opacity: 0;
                        }
                        .lazy-load-image-background.blur.lazy-load-image-loaded > img {
                            opacity: 1;
                            transition: opacity .3s;
                        }
                        `
                    }</style>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument;
