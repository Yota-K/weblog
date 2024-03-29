import React from 'react';
import { Link } from 'react-scroll';
import styled from 'styled-components';

import { H2 } from '@/share/Heading';
import { colorObj } from '@/share/variables';

type Props = {
  toc: {
    id: string;
    text: string;
    type: string;
  }[];
}

const Toc: React.FC<Props> = ({ toc }) => {
  const headingScroll = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
  };

  return (
    <TocArea>
      <H2>目次</H2>
      {toc.map((el) => (
        <li key={el.id} onClick={headingScroll} className={`toc-${el.type}`}>
          <Link to={el.id} smooth={true} offset={-70} duration={600}>
            {el.text}
          </Link>
        </li>
      ))}
    </TocArea>
  );
};

const TocArea = styled.ul`
  background: #f1f1f1 !important;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.1);
  border: none !important;
  border-top: 6px solid ${colorObj.baseBlue} !important;

  h2 {
    margin: 0 !important;
    border-radius: 0 !important;
    background: transparent !important;
  }

  .toc-h3 {
    margin-left: 20px;
  }

  li {
    cursor: pointer;
    line-height: 2;

    a {
      text-decoration: none;
      color: ${colorObj.fontColor} !important;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export default Toc;
