import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { SearchJson } from '../../../interfaces/search-posts';

import { H4 } from '../../../share/Heading';

import { SidebarBox } from './SidebarBox';

import SearchArea from './SearchArea';

interface Props {
  searchPosts: SearchJson[];
}

const SearchWindow: React.FC<Props> = ({ searchPosts }) => {
  return (
    <SidebarBox>
      <H4>検索</H4>
      <SearchArea searchPosts={searchPosts} />
    </SidebarBox>
  );
};

export default SearchWindow;
