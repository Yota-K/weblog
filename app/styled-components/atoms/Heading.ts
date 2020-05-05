import styled from 'styled-components';

export const H1 = styled.h1<{fontsize: string}>`
    font-size: ${props => props.fontsize}
`;

export const H2 = styled.h2`
    font-size: 1.8rem;
`;

export const H3 = styled.h3`
    font-size: 1.6rem;
`;

export const H4 = styled.h4`
    font-size: 1.2rem;
`;
