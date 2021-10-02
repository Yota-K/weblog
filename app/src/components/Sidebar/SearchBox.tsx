import React from 'react';

import { SearchJson } from '@/interfaces/search-posts';

import { H4 } from '@/share/Heading';

import { SidebarBox } from '@/components/Sidebar/SidebarBox';

import SearchArea from '@/components/Search/SearchArea';

interface Props {
  searchPosts: SearchJson[];
}

const SearchBox: React.FC<Props> = ({ searchPosts }) => {
  return (
    <SidebarBox>
      <H4>検索</H4>
      <SearchArea searchPosts={searchPosts} />
    </SidebarBox>
  );
};

export default SearchBox;
