import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { SidebarBox } from '@/components/Sidebar/SidebarBox';
import { SidebarTaxonomies } from '@/lib/cms/taxonomy/type';
import { H4 } from '@/share/Heading';
import { TagArea } from '@/share/TagArea';
import { TagLabel } from '@/share/TagLabel';
import { colorObj } from '@/share/variables';

type Props = {
  title: string;
  categories?: SidebarTaxonomies['categories'];
  tags?: SidebarTaxonomies['tags'];
};

const TaxonomyList: React.FC<Props> = ({ title, categories, tags }) => {
  return (
    <SidebarBox>
      <H4>{title}</H4>
      {categories && (
        <CategoryUl>
          {categories.map((category) => (
            <li key={category.id}>
              <Link href="/category/[id]" as={`/category/${category.id}`}>
                {category.name} ({category.posts.length})
              </Link>
            </li>
          ))}
        </CategoryUl>
      )}
      {tags && (
        <TagArea padding="0 7px">
          {tags.map((tag) => (
            <TagLabel margin="4px" key={tag.id}>
              <Link href="/tags/[id]" as={`/tags/${tag.id}`}>
                {tag.name}
              </Link>
            </TagLabel>
          ))}
        </TagArea>
      )}
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

export default TaxonomyList;
