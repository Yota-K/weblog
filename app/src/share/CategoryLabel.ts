import styled from 'styled-components';

import { device } from '@/share/media-query';
import { colorObj } from '@/share/variables';

export const CategoryLabel = styled.div`
  display: block;
  margin: 12px 0;
  line-height: 2;

  ${device.mobileM} {
    font-size: 14px;
  }

  a {
    color: ${colorObj.infoColor};

    &:hover {
      color: ${colorObj.baseBlue};
    }
  }
`;
