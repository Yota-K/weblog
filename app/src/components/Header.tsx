import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

import { TaxonomyList } from '../../interfaces/taxonomy';

import { device } from '../../share/media-query';
import { colorObj } from '../../share/variables';

import HeaderNav from './HeaderNav';

interface Props {
  siteTitle: React.ReactNode;
  categories: TaxonomyList[];
}

const Header: React.FC<Props> = ({ siteTitle, categories }) => {
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

export default Header;
