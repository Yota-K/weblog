import styled from 'styled-components';
import { device } from '../MediaQuery';

export const H1 = styled.h1<{fontsize: string}>`
    font-size: ${props => props.fontsize}
    ${device.mobileM} {
        font-size: 2rem;
    }
`;

export const H2 = styled.h2`
    font-size: 1.8rem;
`;

export const H3 = styled.h3`
    font-size: 1.3rem;
    ${device.mobileM} {
        font-size: 1rem;
    }
`;

export const H4 = styled.h4`
    font-size: 1.2rem;
`;
