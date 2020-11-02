import Head from 'next/head';
import React, { useState, useEffect } from 'react';

import { config } from '../../config/app';

import { pathNameChecker } from '../../scripts/path-name-checker';

interface Props {
  title: string;
  description?: string;
  thumbnail?: string;
}

// eslint-disable-next-line react/display-name
export default ({ title, description, thumbnail }: Props): JSX.Element => {
  const [url, setUrl] = React.useState<string>('');

  const { defaultDescription } = config.siteInfo;

  const isBlogPage = pathNameChecker('blog');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUrl(window.location.href);
    }
  }, [url]);

  return (
    <Head>
      <title>{title}</title>
      {isBlogPage ? (
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
