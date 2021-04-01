import styled from 'styled-components';

import { colorObj } from '../share/variables';
import { device } from '../share/media-query';

export const BlogCard = styled.div`
  display: flex;
  align-items: start;
  margin-bottom: 20px;
  padding: 10px 0;
  border-top: 1px solid ${colorObj.borderGray};
  border-bottom: 1px solid ${colorObj.borderGray};

  a {
    color: ${colorObj.baseBlack};
  }

  &:nth-child(1) {
    margin-bottom: 20px;
  }

  ${device.mobileS} {
    display: block;
    margin-bottom: 10px;
  }
`;

export const PostThumbnail = styled.div`
  width: 40%;
  img {
    width: 100%;
  }
  ${device.mobileS} {
    width: 100%;
  }
`;

export const PostInfo = styled.div`
  width: 60%;
  margin-left: 20px;
  ${device.mobileS} {
    width: 100%;
    margin-left: 0px;
  }
`;
