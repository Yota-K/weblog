import React from 'react';
import { FacebookIcon, FacebookShareButton, TwitterShareButton, XIcon } from 'react-share';

type Props = {
  url: string;
}

const SocialLinks: React.FC<Props> = ({ url }) => {
  return (
    <>
      <TwitterShareButton url={url}>
        <XIcon size={42} round />
      </TwitterShareButton>
      <FacebookShareButton url={url}>
        <FacebookIcon size={42} round />
      </FacebookShareButton>
    </>
  );
};

export default SocialLinks;
