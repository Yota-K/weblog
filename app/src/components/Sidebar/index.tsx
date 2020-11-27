import React from 'react';
import styled from 'styled-components';

import { CategoriesAndTags } from '../../../interfaces/taxonomy';

import { device } from '../../../share/media-query';

import SearchWindow from './SearchWindow';
import Profile from './Profile';
import CategoryList from './CategoryList';
import TagList from './TagList';

interface Props {
  taxonomies: CategoriesAndTags;
}

const Sidebar: React.FC<Props> = ({ taxonomies }) => {
  return (
    <BlogSidebar>
      <SearchWindow />
      <Profile />
      <CategoryList categories={taxonomies.categories} />
      <TagList tags={taxonomies.tags} />
    </BlogSidebar>
  );
};

const BlogSidebar = styled.article`
  width: 100%;
  max-width: 320px;
  margin-left: 40px;
  ${device.laptop} {
    width: 100%;
    max-width: initial;
    margin: 80px 0 0 0;
  }
`;

export default Sidebar;
