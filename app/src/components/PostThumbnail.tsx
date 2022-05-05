import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import styled from 'styled-components';

import { device } from '@/share/media-query';

type Props = {
  className?: string;
  thumbnailUrl: string;
  width: string;
  height: string;
};

const PostThumbnail: React.FC<Props> = ({ className, thumbnailUrl, width, height }) => {
  return (
    <Thumbnail className={className}>
      <LazyLoadImage src={thumbnailUrl} width={width} height={height} alt="サムネイル" effect="blur" />
    </Thumbnail>
  );
};

export const Thumbnail = styled.div`
  width: 40%;

  ${device.mobileS} {
    width: 100%;
  }

  img {
    width: 100%;
    height: auto;
  }

  /* 記事ページのサムネイル */
  &.post-thumbnail {
    width: 100%;
    margin-top: 30px;

    img {
      margin: 0 0 60px 0;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

      ${device.mobileM} {
        margin: 0 0 30px 0;
      }
    }
  }
`;

export default PostThumbnail;
