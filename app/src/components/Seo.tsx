import Head from 'next/head';
import React from 'react';

import { config } from '../../config/app';

import { pathNameChecker } from '../../utils/path-name-checker';

interface Props {
  title: string;
  description?: string;
  url?: string;
  thumbnail?: string;
}

const Seo: React.FC<Props> = ({ title, description, url, thumbnail }) => {
  const { ogpImage } = config.siteInfo;
  const { defaultDescription } = config.siteInfo;

  const isBlogPage = pathNameChecker();

  return (
    <Head>
      <title>{title}</title>
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@karukichi_yah" />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content="ja_JP" />
      {isBlogPage ? (
        <>
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={thumbnail} />
          <meta property="og:type" content="article" />
        </>
      ) : (
        <>
          <meta name="description" content={defaultDescription} />
          <meta property="og:description" content={defaultDescription} />
          <meta property="og:image" content={ogpImage} />
          <meta property="og:type" content="website" />
        </>
      )}
      {process.env.NEXT_STAGING_ENV === 'staging' && <meta name="robots" content="noindex,nofollow" />}
    </Head>
  );
};

export default Seo;
