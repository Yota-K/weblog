import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';

import { colorObj } from '../share/variables';
import { device } from '../share/media-query';

interface Props {
    siteTitle: React.ReactNode;
}

const Header: React.FC<Props> = ({ siteTitle }) => {
    const getPathName = () => {
        const router = useRouter();
        return router.asPath;
    };

    return (
        <HeaderBar>
            {
                getPathName() === '/'
                ? <SiteTitleTop><Link href="/"><a>{siteTitle}</a></Link></SiteTitleTop>
                : <SiteTitle><Link href="/"><a>{siteTitle}</a></Link></SiteTitle>
            }
        </HeaderBar>
    );
}

const HeaderBar = styled.header`
    margin-bottom: 30px;
    padding: 14px;
    background: ${colorObj.baseBlack};
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
    text-align: center;
    a {
        color: #fff;
    }
`

const SiteTitleTop = styled.h1`
    display: inline-block;
    font-size: 2rem;
    font-weight: 600;
    ${device.mobileM} {
        font-size: 1.8rem;
    }
`

const SiteTitle = SiteTitleTop.withComponent('div');

export default Header;
