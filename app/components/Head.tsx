import React, { useState, useEffect } from 'react';
import Head from 'next/head';

interface Props {
    title: string;
    description?: string;
    thumbnail?: string;
}

export default ({ title, description, thumbnail }: Props): JSX.Element => {
    const [url, setUrl] = React.useState<string>('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setUrl(window.location.href);
        }
    }, [url])

    return (
        <Head>
            <title>{title}</title>
            <meta name="Description" content={description} />
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
