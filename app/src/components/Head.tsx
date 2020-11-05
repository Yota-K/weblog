import Head from 'next/head';
import React from 'react';

import { config } from '../../config/app';

import { pathNameChecker } from '../../scripts/path-name-checker';

interface Props {
  title: string;
  description?: string;
  url?: string;
  thumbnail?: string;
}

// eslint-disable-next-line react/display-name
export default ({ title, description, url, thumbnail }: Props): JSX.Element => {
  const { defaultDescription } = config.siteInfo;

  const isBlogPage = pathNameChecker('blogs');

  return (
    <Head>
      <title>{title}</title>
      <link rel="shortcut icon" href="/favicon.ico" />
      {isBlogPage ? (
        <>
          <meta name="Description" content={description} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@karukichi_yah" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:url" content={url} />
          <meta property="og:image" content={thumbnail} />
        </>
      ) : (
        <meta name="Description" content={defaultDescription} />
      )}
      {process.env.NEXT_STAGING_ENV === 'staging' && <meta name="robots" content="noindex,nofollow" />}
    </Head>
  );
};
