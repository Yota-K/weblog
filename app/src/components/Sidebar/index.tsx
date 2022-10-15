import React from 'react';
import styled from 'styled-components';

import { CategoriesAndTags } from '@/types/taxonomy';
import { SearchJson } from '@/types/search-posts';

import { device } from '@/share/media-query';

// TODO: 身分証明がなくて、アドセンスが消えた（なる早で身分証明証を取得する）
// import GoogleAdsense from '@/components/GoogleAdsense';
import SearchBox from '@/components/Sidebar/SearchBox';
import Profile from '@/components/Sidebar/Profile';
import CategoryList from '@/components/Sidebar/CategoryList';
import TagList from '@/components/Sidebar/TagList';

type Props = {
  taxonomies: CategoriesAndTags;
  searchPosts: SearchJson[];
};

const Sidebar: React.FC<Props> = ({ taxonomies, searchPosts }) => {
  return (
    <BlogSidebar>
      <SearchBox searchPosts={searchPosts} />
      <Profile />
      <CategoryList categories={taxonomies.categories} />
      <TagList tags={taxonomies.tags} />
    </BlogSidebar>
  );
};

const BlogSidebar = styled.aside`
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
