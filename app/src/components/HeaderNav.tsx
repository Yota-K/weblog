import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

import { config } from '@/config/app';
import { device } from '@/share/media-query';

const HeaderNav: React.FC = () => {
  const { headerNavLinks } = config;

  return (
    <HeaderNavBar>
      <ul>
        {headerNavLinks.map((el, i) => (
          <li key={i}>
            <Link href={el.link}>{el.title}</Link>
          </li>
        ))}
      </ul>
    </HeaderNavBar>
  );
};

const HeaderNavBar = styled.nav`
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  margin-bottom: 25px;
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 999;

  ${device.mobileM} {
    width: 100%;
    overflow-x: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
  ul {
    display: flex;
    justify-content: space-around;
    padding: 10px;
    max-width: 1024px;
    margin: 0 auto;

    ${device.mobileM} {
      display: table;
      width: 100%;
    }

    li {
      list-style: none;
      display: table-cell;
      white-space: nowrap;

      ${device.mobileM} {
        padding: 0 5px;
      }

      a {
        color: #2b2c30;
        font-weight: bold;
      }
    }
  }
`;

export default HeaderNav;
