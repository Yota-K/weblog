import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

import { SearchJson } from '@/types/search-posts';

import { device } from '@/share/media-query';
import { colorObj } from '@/share/variables';

import HeaderNav from '@/components/HeaderNav';
import SearchArea from '@/components/Search/SearchArea';

type Props = {
  siteTitle: React.ReactNode;
  searchPosts: SearchJson[];
};

const Header: React.FC<Props> = ({ siteTitle, searchPosts }) => {
  const router = useRouter();

  const getPathName = () => {
    return router.asPath;
  };

  // トップページとカテゴリーごとの記事一覧ページのみ検索窓を表示する
  const SpSearchArea = () => {
    if (getPathName() === '/' || getPathName().match(/\/category\/.+$/u)) {
      return (
        <SpSearchDiv>
          <SearchArea searchPosts={searchPosts} />
        </SpSearchDiv>
      );
    }
  };

  return (
    <>
      <HeaderBar>
        {getPathName() === '/' ? (
          <SiteTitleTop>
            <Link href="/">{siteTitle}</Link>
          </SiteTitleTop>
        ) : (
          <SiteTitle>
            <Link href="/">{siteTitle}</Link>
          </SiteTitle>
        )}
      </HeaderBar>
      <HeaderNav />
      {SpSearchArea()}
    </>
  );
};

const HeaderBar = styled.header`
  padding: 14px;
  text-align: center;
  background: ${colorObj.baseBlack};

  a {
    color: #fff;
  }
`;

const SiteTitleTop = styled.h1`
  display: inline-block;
  font-size: 32px;
  font-weight: 600;

  ${device.mobileM} {
    font-size: 28px;
  }
`;

const SiteTitle = SiteTitleTop.withComponent('div');

const SpSearchDiv = styled.div`
  display none;
  width: 96%;
  margin: auto;

  ${device.mobileM} {
    display: block;
  }
`;

export default Header;
