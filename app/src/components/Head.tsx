import React, { useState, useEffect } from 'react';
import Head from 'next/head';

import { pathNameChecker } from '../../scripts/path-name-checker';

interface Props {
  title: string;
  description?: string;
  thumbnail?: string;
}

export default ({ title, description, thumbnail }: Props): JSX.Element => {
  const [url, setUrl] = React.useState<string>('');
  const defaultDescription = '駆け出しウェブエンジニアカルキチ副島が運営するウェブ系の技術をメインに書くブログです。';
  const descriptionCheck = pathNameChecker('blog');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUrl(window.location.href);
    }
  }, [url]);

  return (
    <Head>
      <title>{title}</title>
      {descriptionCheck !== null ? (
        <meta name="Description" content={description} />
      ) : (
        <meta name="Description" content={defaultDescription} />
      )}
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@karukichi_yah" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={thumbnail} />
    </Head>
  );
};
