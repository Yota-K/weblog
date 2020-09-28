import { AppProps } from 'next/app';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { config } from '../../config/app';

import { CategoriesAndTags } from '../../interfaces/taxonomy';

import { getRequestHeader } from '../../scripts/get-request-header';

import { GlobalStyle } from '../../share/GlobalStyle';
import { device } from '../../share/media-query';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

import 'highlight.js/styles/dracula.css';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const { siteTitle } = config.siteInfo;

  const [taxonomies, setTaxonomies] = React.useState<CategoriesAndTags>({
    categories: [],
    tags: [],
  });

  // サイドバーのカテゴリー・タグ一覧の取得
  useEffect(() => {
    const getTaxonomies = async () => {
      const header = getRequestHeader();
      const res = await fetch(`${process.env.ENDPOINT}/taxonomy`, header);
      const data = await res.json();

      setTaxonomies({
        categories: data.categories,
        tags: data.tags,
      });
    };

    getTaxonomies();
  }, []);

  return (
    <>
      <GlobalStyle />
      <Header siteTitle={siteTitle} categories={taxonomies.categories} />
      <Wrapper>
        <Component {...pageProps} />
        <Sidebar taxonomies={taxonomies} />
      </Wrapper>
      <Footer siteTitle={siteTitle} />
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 80px auto 0;
  ${device.laptop} {
    display: block;
    margin: 60px auto 0;
  }
  ${device.mobileM} {
    display: block;
    margin: 40px auto 0;
  }
`;

export default MyApp;
