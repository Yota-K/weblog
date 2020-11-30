import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

import { SearchJson } from '../../interfaces/search-posts';
import { Taxonomy } from '../../interfaces/taxonomy';

import { device } from '../../share/media-query';
import { colorObj } from '../../share/variables';

import HeaderNav from './HeaderNav';
import SearchArea from './Search/SearchArea';

interface Props {
  siteTitle: React.ReactNode;
  categories: Taxonomy[];
  searchPosts: SearchJson[];
}

const Header: React.FC<Props> = ({ siteTitle, categories, searchPosts }) => {
  const getPathName = () => {
    const router = useRouter();
    return router.asPath;
  };

  return (
    <>
      <HeaderBar>
        {getPathName() === '/' ? (
          <SiteTitleTop>
            <Link href="/">
              <a>{siteTitle}</a>
            </Link>
          </SiteTitleTop>
        ) : (
          <SiteTitle>
            <Link href="/">
              <a>{siteTitle}</a>
            </Link>
          </SiteTitle>
        )}
      </HeaderBar>
      <HeaderNav categories={categories} />
      <SpSearchArea>
        <SearchArea searchPosts={searchPosts} />
      </SpSearchArea>
    </>
  );
};

const HeaderBar = styled.header`
  padding: 14px;
  background: ${colorObj.baseBlack};
  text-align: center;
  a {
    color: #fff;
  }
`;

const SiteTitleTop = styled.h1`
  display: inline-block;
  font-size: 2rem;
  font-weight: 600;
  ${device.mobileM} {
    font-size: 1.8rem;
  }
`;

const SiteTitle = SiteTitleTop.withComponent('div');

const SpSearchArea = styled.div`
  display none;
  width: 96%;
  margin: auto;
  ${device.mobileM} {
    display: block;
  }
`;

export default Header;
