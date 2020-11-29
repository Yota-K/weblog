import React from 'react';
import styled from 'styled-components';

import { colorObj } from '../../../share/variables';

import { SearchJson } from '../../../interfaces/search-posts';

interface Props {
  results: SearchJson[];
}

const SearchModal: React.FC<Props> = ({ results }) => {
  return (
    <>
      <Modal resultsLength={results.length}>
        {results.length === 0 ? (
          <NotFoundList>記事が見つかりませんでした</NotFoundList>
        ) : (
          results.map((post, i) => (
            <PostList key={i}>
              <a href={`/blogs/${post.id}`}>{post.title}</a>
            </PostList>
          ))
        )}
      </Modal>
    </>
  );
};

type ModalHeight = {
  resultsLength: number;
};

const Modal = styled.ul<ModalHeight>`
  border: 1px solid ${colorObj.borderGray};
  margin-top: 20px;
  list-style: none;
  height: ${(props) => (props.resultsLength === 0 ? 'auto' : '200px')};
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

const BaseStyle = `
  padding: 8px;
  color: #504b4b;
  font-size: 14px;
`;

const PostList = styled.li`
  border-bottom: 1px solid ${colorObj.borderGray};
  a {
    display: block;
    ${BaseStyle}
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

export default SearchModal;
