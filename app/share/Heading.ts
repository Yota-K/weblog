import styled from 'styled-components';
import { device } from './media-query';

export const H1 = styled.h1`
  font-size: 2rem;

  ${device.mobileM} {
    font-size: 1.6rem;
  }
`;

export const H2 = styled.h2`
  font-size: 1.6rem;
  margin-bottom: 20px;

  ${device.mobileM} {
    font-size: 1.4rem;
  }
`;

export const H3 = styled.h3`
  font-size: 1.3rem;
  line-height: 1.4;

  ${device.mobileM} {
    font-size: 1.2rem;
  }

  ${device.mobileS} {
    font-size: 1rem;
  }
`;

export const H4 = styled.h4`
  font-size: 1.2rem;
`;
