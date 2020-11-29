import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

import { Taxonomy } from '../../interfaces/taxonomy';

import { device } from '../../share/media-query';

interface Props {
  categories: Taxonomy[];
}

const HeaderNav: React.FC<Props> = ({ categories }) => {
  return (
    <HeaderNavBar>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <Link href="/category/[id]" as={`/category/${category.id}`}>
              <a>{category.name}</a>
            </Link>
          </li>
        ))}
        <li>
          <Link href="/sitemap" as="/sitemap">
            <a>サイトマップ</a>
          </Link>
        </li>
      </ul>
    </HeaderNavBar>
  );
};

const HeaderNavBar = styled.nav`
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  margin-bottom: 25px;
  ${device.mobileM} {
    width: 100%;
    overflow-x: auto;
    ::-webkit-scrollbar {
      display: none;
    }
    scrollbar-width: none;
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
