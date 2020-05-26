import styled from 'styled-components';
import { device } from './media-query';
import { colorObj } from './variables';

export const TimeStamp = styled.span`
  color: ${colorObj.infoColor};
  font-size: 1rem;
  ${device.mobileM} {
    font-size: 0.8rem;
  }
`;
