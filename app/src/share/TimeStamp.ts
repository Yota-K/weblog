import styled from 'styled-components';

import { device } from '@/share/media-query';
import { colorObj } from '@/share/variables';

export const TimeStamp = styled.span`
  color: ${colorObj.infoColor};

  ${device.mobileM} {
    font-size: 14px;
  }
`;
