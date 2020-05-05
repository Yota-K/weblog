import * as React from 'react';
import Head from 'next/head';

interface Props {
  title: string;
  description?: string;
}

export default ({ title, description }: Props): JSX.Element => {
  return (
    <Head>
        <title>{title}</title>
        <meta name="Description" content={description} />
    </Head>
  );
};
