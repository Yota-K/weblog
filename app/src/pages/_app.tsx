import { AppProps } from 'next/app';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Taxonomy } from '../../interfaces/taxonomy';

import { getRequestHeader } from '../../scripts/get-request-header';

import { GlobalStyle } from '../../share/GlobalStyle';
import { device } from '../../share/media-query';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

import 'highlight.js/styles/dracula.css';

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
      <Header siteTitle={siteTitle} categories={taxonomyList.categories} />
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
