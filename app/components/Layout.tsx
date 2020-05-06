import React from 'react';

import Header from './Header';
import Sidebar from './Sidebar/index';
import Footer from './Footer';

import { Wrapper } from '../styled-components/Wrapper';
import { Main } from '../styled-components/Main';

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
    )
}

export default Layout;
