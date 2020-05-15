import React from 'react';
import styled from 'styled-components';

interface Props {
    siteTitle: React.ReactNode;
}

const Footer: React.FC<Props> = ({ siteTitle }) => {
    const year = new Date().getFullYear();

    return (
        <FooterBar>
            <p>© {year} {siteTitle}</p>
        </FooterBar>
    );
}

const FooterBar = styled.footer`
    margin-top: 50px;
    padding: 20px;
    p {
        text-align: center;
    }
`

export default Footer;
