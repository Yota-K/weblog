import React from 'react';
import styled from 'styled-components';

import Header from './Header';
import Sidebar from './Sidebar/index';
import Footer from './Footer';

import { device } from '../../share/media-query';

const Layout: React.FC = ({ children }) => {
  const siteTitle = 'カルキチのブログ';

  return (
    <>
      <Header siteTitle={siteTitle} />
      <Wrapper>
        <Main>{children}</Main>
        <Sidebar />
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

const Main = styled.main`
  width: 740px;
  ${device.laptop} {
    width: 100%;
  }
`;

export default Layout;
