import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

import { Taxonomy } from '@/types/taxonomy';

import { H4 } from '@/share/Heading';
import { colorObj } from '@/share/variables';

import { SidebarBox } from '@/components/Sidebar/SidebarBox';

type Props = {
  categories: Taxonomy[];
};

const CategoryList: React.FC<Props> = ({ categories }) => {
  return (
    <SidebarBox>
      <H4>カテゴリー</H4>
      <CategoryUl>
        {categories.map((category) => (
          <li key={category.id}>
            <Link href="/category/[id]" as={`/category/${category.id}`}>
              {category.name} ({category.posts.length})
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
    border-bottom: 1px solid #ddd;

    a {
      display: block;
      padding: 10px;
      color: ${colorObj.fontColor};
    }
  }
`;

export default CategoryList;
