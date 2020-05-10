import styled from 'styled-components';
import { device } from '../MediaQuery';

const baseStyle = `
    display: inline-block;
    font-size: 2rem;
    font-weight: 600;
    ${device.mobileM} {
        font-size: 1.8rem;
    }
`;

export const SiteTitleTop = styled.h1`
    ${baseStyle}
`;

export const SiteTitle = styled.div`
    ${baseStyle}
`;
