import styled from 'styled-components';
import { device } from '@/share/media-query';

export const H1 = styled.h1`
  font-size: 32px;

  ${device.mobileM} {
    font-size: 24px;
  }
`;

export const H2 = styled.h2`
  font-size: 22px;
  margin-bottom: 20px;

  ${device.mobileM} {
    font-size: 20px;
  }
`;

export const H3 = styled.h3`
  font-size: 20px;
  line-height: 1.4;

  ${device.mobileM} {
    font-size: 18px;
  }
`;

export const H4 = styled.h4`
  font-size: 18px;
`;
