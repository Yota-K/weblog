import React from 'react';
import styled from 'styled-components';

import { colorObj } from '@/share/variables';

import { SearchJson } from '@/interfaces/search-posts';

interface Props {
  results: SearchJson[];
}

const SearchView: React.FC<Props> = ({ results }) => {
  return (
    <SearchUl resultsLength={results.length}>
      {results.length === 0 ? (
        <NotFoundList>記事が見つかりませんでした</NotFoundList>
      ) : (
        results.map((post, i) => (
          <PostList key={i}>
            <a href={`/blogs/${post.id}`}>{post.title}</a>
          </PostList>
        ))
      )}
    </SearchUl>
  );
};

type ModalHeight = {
  resultsLength: number;
};

const SearchUl = styled.ul<ModalHeight>`
  position: absolute;
  top: 15px;
  left: 0;
  border: 1px solid ${colorObj.borderGray};
  list-style: none;
  background: #fff;
  width: 100%;
  height: ${(props) => (props.resultsLength <= 3 ? 'auto' : '220px')};
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  padding-top: 30px;
  scrollbar-width: none;
  box-sizing: border-box;
  z-index: 998;
`;

const BaseStyle = `
  padding: 10px;
  color: #504b4b;
  font-size: 14px;
`;

const PostList = styled.li`
  border-bottom: 1px solid ${colorObj.borderGray};
  a {
    ${BaseStyle}
    display: block;
    cursor: pointer;

    &:hover {
      transition: 0.4s;
      background: rgba(216, 228, 239, 0.7);
    }
  }

  &:last-child {
    border-bottom: none;
  }
`;

const NotFoundList = styled.li`
  ${BaseStyle}
`;

export default SearchView;
