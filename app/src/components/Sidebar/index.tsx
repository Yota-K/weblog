import React from 'react';
import styled from 'styled-components';

import { Taxonomy } from '../../../interfaces/taxonomy';

import { device } from '../../../share/media-query';

import CategoryList from './CategoryList';
import Profile from './Profile';
import TagList from './TagList';

interface Props {
  taxonomyList: Taxonomy;
}

const Sidebar: React.FC<Props> = ({ taxonomyList }) => {
  return (
    <BlogSidebar>
      <Profile />
      <CategoryList categories={taxonomyList.categories} />
      <TagList tags={taxonomyList.tags} />
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
