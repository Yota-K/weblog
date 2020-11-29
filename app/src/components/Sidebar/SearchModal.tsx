import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { SearchJson } from '../../../interfaces/search-posts';

interface Props {
  results: SearchJson[];
}

const SearchModal: React.FC<Props> = ({ results }) => {
  return (
    <>
      <ul>
        {results.map((post, i) => (
          <li key={i}>
            <a href={`/blogs/${post.id}`}>{post.title}</a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SearchModal;
