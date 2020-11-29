import { AppProps } from 'next/app';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { config } from '../../config/app';

import { CategoriesAndTags } from '../../interfaces/taxonomy';
import { SearchJson } from '../../interfaces/search-posts';

import { getRequestHeader } from '../../scripts/get-request-header';

import { GlobalStyle } from '../../share/GlobalStyle';
import { device } from '../../share/media-query';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

import 'highlight.js/styles/dracula.css';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const { siteTitle } = config.siteInfo;

  const [searchPosts, setSearchPosts] = React.useState<SearchJson[]>([
    {
      id: '',
      title: '',
      tag_field: [
        {
          name: '',
        },
      ],
    },
  ]);

  const [taxonomies, setTaxonomies] = React.useState<CategoriesAndTags>({
    categories: [],
    tags: [],
  });

  useEffect(() => {
    const header = getRequestHeader();

    // サイドバーのカテゴリー・タグ一覧の取得
    const getTaxonomies = async () => {
      const res = await fetch(`${process.env.ENDPOINT}/taxonomy`, header);
      const data = await res.json();

      setTaxonomies({
        categories: data.categories,
        tags: data.tags,
      });
    };

    // 検索用のJSONを取得
    const getSearchPosts = async () => {
      const url = window.location.origin;
      const res = await fetch(`${url}/search.json`);
      const data = await res.json();

      setSearchPosts(data);
    };

    getTaxonomies();
    getSearchPosts();
  }, []);

  return (
    <>
      <GlobalStyle />
      <Header siteTitle={siteTitle} categories={taxonomies.categories} searchPosts={searchPosts} />
      <Wrapper>
        <Component {...pageProps} />
        <Sidebar taxonomies={taxonomies} searchPosts={searchPosts} />
      </Wrapper>
      <Footer siteTitle={siteTitle} />
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 80px auto 0;
  width: 96%;
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
