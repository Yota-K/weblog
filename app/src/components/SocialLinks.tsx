import React from 'react';
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton } from 'react-share';

interface Props {
  url: string;
}

const SocialLinks: React.FC<Props> = ({ url }) => {
  return (
    <>
      <TwitterShareButton url={url}>
        <TwitterIcon size={42} round />
      </TwitterShareButton>
      <FacebookShareButton url={url}>
        <FacebookIcon size={42} round />
      </FacebookShareButton>
    </>
  );
};

export default SocialLinks;
