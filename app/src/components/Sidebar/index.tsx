import React from 'react';
import styled from 'styled-components';
import GoogleAdsense from '@/components/GoogleAdsense';
import SearchBox from '@/components/Sidebar/SearchBox';
import Profile from '@/components/Sidebar/Profile';
import TaxonomyList from '@/components/Sidebar/TaxonomyList';
import { SidebarTaxonomies } from '@/lib/cms/taxonomy/type';
import { device } from '@/share/media-query';
import { SearchJson } from '@/types/search-posts';

type Props = {
  taxonomies: SidebarTaxonomies;
  searchPosts: SearchJson[];
};

const Sidebar: React.FC<Props> = ({ taxonomies, searchPosts }) => {
  const { categories, tags } = taxonomies;

  return (
    <BlogSidebar>
      <GoogleAdsense />
      <SearchBox searchPosts={searchPosts} />
      <Profile />
      <TaxonomyList title="カテゴリー" categories={categories} />
      <TaxonomyList title="タグ" tags={tags} />
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
