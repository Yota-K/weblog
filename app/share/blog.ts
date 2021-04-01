import styled from 'styled-components';

import { colorObj } from '../share/variables';
import { device } from '../share/media-query';

export const ShareArea = styled.div`
  button {
    margin-right: 8px;
  }
`;

export const MyContent = styled.div`
  margin-top: 35px;
  min-height: 800px;
  word-break: break-all;

  .eyecatch {
    margin: -20px 0 30px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  h2 {
    margin: 20px 0;
    padding: 0.4rem;
    background: #b8d0f5;
    border-radius: 3px;
    font-size: 1.6rem;
    letter-spacing: 0.4px;
    font-size: 1.4rem;
  }

  h3 {
    position: relative;
    margin: 20px 0;
    padding-bottom: 5px;
    border-bottom: 2px solid ${colorObj.borderGray};
    font-size: 1.4rem;

    &::after {
      position: absolute;
      bottom: -2px;
      left: 0;
      content: '';
      width: 30%;
      border-bottom: 2px solid ${colorObj.baseBlue};
    }

    ${device.mobileM} {
      font-size: 1.2rem;
    }
  }

  a {
    color: blue;
    text-decoration: underline;
    font-weight: 600;

    &:hover {
      color: red;
      transition: all 0.4s;
    }
  }

  p {
    font-size: 1.1rem;
    line-height: 1.9;

    code {
      border: 1px solid #ddd;
      background-color: #eee;
      color: #333;
      margin: 0 2px;
      padding: 0.1em 0.4em;
    }

    ${device.mobileS} {
      font-size: 1rem;
    }
  }

  img {
    width: 100%;
    height: auto;
    margin: 30px 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  ul,
  ol {
    margin: 25px 0;
    padding: 0.5em 0.5em 0.5em 2em;
    background: #fffbf4;
    border: 2px solid #f3a6c3;
    border-radius: 3px;

    li {
      font-weight: 600;
      line-height: 1.9;
    }
  }

  blockquote {
    margin: 25px 0;
    padding: 12px;
    background: #ddd;
    border-radius: 3px;
    line-height: 1.9;
  }

  pre {
    margin: 20px 0;
    border-radius: 3px;
    overflow-x: scroll;

    code {
      font-size: 0.9rem;
      line-height: 2.2;
    }
  }

  iframe {
    margin 12px 0;
  }
`;
