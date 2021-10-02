import styled from 'styled-components';

import { device } from '@/share/media-query';
import { colorObj } from '@/share/variables';

export const CategoryLabel = styled.span`
  display: block;
  margin-top: 10px;
  font-size: 1rem;
  line-height: 2;

  a {
    color: ${colorObj.infoColor};

    &:hover {
      color: ${colorObj.baseBlue};
    }
  }

  ${device.mobileM} {
    font-size: 0.8rem;
  }
`;
