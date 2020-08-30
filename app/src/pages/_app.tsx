import React, { useState, useEffect } from 'react';
import { AppProps } from 'next/app';
import styled from 'styled-components';
import 'highlight.js/styles/dracula.css';

import { Taxonomy } from '../../interfaces/taxonomy';

import { getRequestHeader } from '../../scripts/get-request-header';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

import { GlobalStyle } from '../../share/GlobalStyle';
import { device } from '../../share/media-query';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const siteTitle = 'カルキチのブログ';

  const [taxonomyList, setTaxonomyList] = React.useState<Taxonomy>({
    tags: [],
    categories: [],
  });

  // サイドバーのカテゴリー・タグ一覧の取得
  useEffect(() => {
    const getTaxonomyList = async () => {
      const header = getRequestHeader();
      const res = await fetch(`${process.env.ENDPOINT}/taxonomy`, header);
      const data = await res.json();

      setTaxonomyList({
        tags: data.tags,
        categories: data.categories,
      });
    };

    getTaxonomyList();
  }, []);

  return (
    <>
      <GlobalStyle />
      <Header siteTitle={siteTitle} />
      <Wrapper>
        <Component {...pageProps} />
        <Sidebar taxonomyList={taxonomyList} />
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
