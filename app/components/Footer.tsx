import React from 'react';

import { FooterBar } from '../styled-components/organisms/AppBar';
import { TextCenter } from '../styled-components/atoms/textCenter';

interface Props {
    siteTitle: React.ReactNode;
}

const Footer: React.FC<Props> = ({ siteTitle }) => {
    const year = new Date().getFullYear();

    return (
        <FooterBar>
            <TextCenter>© {year} {siteTitle}</TextCenter>
        </FooterBar>
    )
}

export default Footer;
