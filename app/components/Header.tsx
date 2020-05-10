import React from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';

import { HeaderBar } from '../styled-components/organisms/AppBar';
import { SiteTitleTop, SiteTitle } from '../styled-components/atoms/SiteTitle';

interface Props {
    siteTitle: React.ReactNode;
}

const Header: React.FC<Props> = ({ siteTitle }) => {
    const getPathName = () => {
        const router = useRouter();
        return router.asPath;
    }

    return (
        <HeaderBar>
            {
                getPathName() === '/'
                ? <SiteTitleTop><Link href="/"><a>{siteTitle}</a></Link></SiteTitleTop>
                : <SiteTitle><Link href="/"><a>{siteTitle}</a></Link></SiteTitle>
            }
        </HeaderBar>
    )
}


export default Header;
