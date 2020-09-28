import React from 'react';
import styled from 'styled-components';

import { CategoriesAndTags } from '../../../interfaces/taxonomy';

import { device } from '../../../share/media-query';

import CategoryList from './CategoryList';
import Profile from './Profile';
import TagList from './TagList';

interface Props {
  taxonomies: CategoriesAndTags;
}

const Sidebar: React.FC<Props> = ({ taxonomies }) => {
  return (
    <BlogSidebar>
      <Profile />
      <CategoryList categories={taxonomies.categories} />
      <TagList tags={taxonomies.tags} />
    </BlogSidebar>
  );
};

const BlogSidebar = styled.article`
  width: 340px;
  margin-left: 50px;
  ${device.laptop} {
    width: 100%;
    margin: 80px 0 0 0;
  }
`;

export default Sidebar;
