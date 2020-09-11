import styled from 'styled-components';

import { device } from './media-query';
import { colorObj } from './variables';

export const CategoryLabel = styled.span`
  font-size: 1rem;
  line-height: 2;
  ${device.mobileM} {
    font-size: 0.8rem;
  }
  a {
    color: ${colorObj.infoColor};
    &:hover {
      color: ${colorObj.baseBlue};
    }
  }
`;
