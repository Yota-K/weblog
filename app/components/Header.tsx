import * as React from 'react';
import Link from 'next/link';

import { HeaderBar } from '../styled-components/organisms/AppBar';
import { H1 } from '../styled-components/atoms/Heading';

interface Props {
    siteTitle: React.ReactNode;
}

const Header: React.FC<Props> = ({ siteTitle }) => {
    return (
        <HeaderBar>
            <H1 fontsize={'2rem'}><Link href="/"><a>{siteTitle}</a></Link></H1>
        </HeaderBar>
    )
}

export default Header;
