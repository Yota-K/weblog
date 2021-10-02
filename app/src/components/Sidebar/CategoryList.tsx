import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

import { Taxonomy } from '@/interfaces/taxonomy';

import { H4 } from '@/share/Heading';
import { colorObj } from '@/share/variables';

import { SidebarBox } from '@/components/Sidebar/SidebarBox';

interface Props {
  categories: Taxonomy[];
}

const CategoryList: React.FC<Props> = ({ categories }) => {
  return (
    <SidebarBox>
      <H4>カテゴリー</H4>
      <CategoryUl>
        {categories.map((category) => (
          <li key={category.id}>
            <Link href="/category/[id]" as={`/category/${category.id}`}>
              <a>
                {category.name} ({category.posts.length})
              </a>
            </Link>
          </li>
        ))}
      </CategoryUl>
    </SidebarBox>
  );
};

const CategoryUl = styled.ul`
  list-style: none;

  li {
    padding: 10px;
    font-size: 1rem;
    border-bottom: 1px solid #ddd;

    a {
      color: ${colorObj.fontColor};
    }
  }
`;

export default CategoryList;
