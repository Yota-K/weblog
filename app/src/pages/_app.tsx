import React from 'react';
import { AppProps } from 'next/app';
import 'highlight.js/styles/dracula.css';

import { GlobalStyle } from '../../share/GlobalStyle';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
