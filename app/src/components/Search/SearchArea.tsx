import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { colorObj } from '../../../share/variables';

import { SearchJson } from '../../../interfaces/search-posts';

import SearchView from './SearchView';

interface Props {
  searchPosts: SearchJson[];
}

const SearchArea: React.FC<Props> = ({ searchPosts }) => {
  const [results, setResults] = React.useState<SearchJson[]>([
    {
      id: '',
      title: '',
      tag_field: [
        {
          name: '',
        },
      ],
    },
  ]);

  const [searchWord, setSearchWord] = React.useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  const searchFunc = () => {
    // 半角文字列に変換
    const value = searchWord.toLowerCase();

    const genarateNewAry = searchPosts.filter((e) => {
      const tags = e.tag_field.map((e) => e.name);
      const tagStr = tags.join(',');

      // タイトル・記事のURL・タグの配列を文字列として連結
      const target = `
        ${e.title.toLowerCase()}
        ${e.id.toLowerCase()}
        ${tagStr.toLowerCase()}
      `;

      // 生成した配列に検索ワードが含まれる場合は-1以外が返る
      return target.indexOf(value) !== -1;
    });

    setResults(genarateNewAry);
  };

  useEffect(() => {
    if (searchWord !== '') {
      searchFunc();
    }
  }, [searchWord]);

  return (
    <>
      <InputWrapper>
        <SearchInput onChange={handleChange} value={searchWord} type="text" placeholder="キーワード" />
        <SearchIcon>
          <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" version="1.1" viewBox="-1 0 136 136.21852">
            <path d="M 93.148438 80.832031 C 109.5 57.742188 104.03125 25.769531 80.941406 9.421875 C 57.851562 -6.925781 25.878906 -1.460938 9.53125 21.632812 C -6.816406 44.722656 -1.351562 76.691406 21.742188 93.039062 C 38.222656 104.707031 60.011719 105.605469 77.394531 95.339844 L 115.164062 132.882812 C 119.242188 137.175781 126.027344 137.347656 130.320312 133.269531 C 134.613281 129.195312 134.785156 122.410156 130.710938 118.117188 C 130.582031 117.980469 130.457031 117.855469 130.320312 117.726562 Z M 51.308594 84.332031 C 33.0625 84.335938 18.269531 69.554688 18.257812 51.308594 C 18.253906 33.0625 33.035156 18.269531 51.285156 18.261719 C 69.507812 18.253906 84.292969 33.011719 84.328125 51.234375 C 84.359375 69.484375 69.585938 84.300781 51.332031 84.332031 C 51.324219 84.332031 51.320312 84.332031 51.308594 84.332031 Z M 51.308594 84.332031 " />
          </svg>
        </SearchIcon>
        {searchWord !== '' && <SearchView results={results} />}
      </InputWrapper>
    </>
  );
};

const InputWrapper = styled.div`
  position: relative;
`;

const SearchInput = styled.input`
  position: relative;
  margin-top: 5px;
  padding: 8px;
  border: 1px solid #ddd;
  width: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  height: 40px;
  font-size: 16px;
  box-shadow: none;
  transition: box-shadow 0.2s ease;
  z-index: 9999;

  &[type='text']:focus {
    border: 1px solid ${colorObj.baseBlue};
    outline: 0;
  }
`;

const SearchIcon = styled.span`
  display: block;
  position: absolute;
  top: 15px;
  right: 12px;
  background: transparent;
  border: none;
  z-index: 10000;
`;

export default SearchArea;
