import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { AppProps } from 'next/app';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { config } from '@/config/app';
import { device } from '@/share/media-query';
import { SidebarTaxonomies } from '@/lib/cms/taxonomy/type';
import { SearchJson } from '@/types/search-posts';
import 'highlight.js/styles/base16/materia.css';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const { siteTitle } = config.siteInfo;

  const [searchPosts, setSearchPosts] = useState<SearchJson[]>([
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

  const [taxonomies, setTaxonomies] = useState<SidebarTaxonomies>({
    categories: [],
    tags: [],
  });

  useEffect(() => {
    // サイドバーのカテゴリー・タグ一覧の取得
    const getTaxonomies = async () => {
      const url = location.origin;
      const res = await fetch(`${url}/taxonomy.json`);
      const data = await res.json();

      setTaxonomies({
        categories: data.categories,
        tags: data.tags,
      });
    };

    // 検索用のJSONを取得
    const getSearchPosts = async () => {
      const url = location.origin;
      const res = await fetch(`${url}/search.json`);
      const data = await res.json();

      setSearchPosts(data);
    };

    getTaxonomies();
    getSearchPosts();
  }, []);

  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.RECAPTCHA_KEY || ''} language="ja">
      <Header siteTitle={siteTitle} searchPosts={searchPosts} />
      <Wrapper>
        <Component {...pageProps} />
        <Sidebar taxonomies={taxonomies} searchPosts={searchPosts} />
      </Wrapper>
      <Footer siteTitle={siteTitle} />
    </GoogleReCaptchaProvider>
  );
};

const Wrapper = styled.main`
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
