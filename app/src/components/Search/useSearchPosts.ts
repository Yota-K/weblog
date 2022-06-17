import React, { useState, useEffect, useCallback } from 'react';

import { SearchJson } from '@/types/search-posts';

export const useSearchPosts = (searchJson: SearchJson[]) => {
  const [results, setResults] = useState<SearchJson[]>([
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
  const [searchWord, setSearchWord] = useState('');

  // 検索対象のキーワードを含む配列を生成する
  const searchPosts = useCallback(
    (keyword: string) => {
      return searchJson.filter((post) => {
        const tags = post.tag_field.map((tag) => tag.name);
        // ,で区切ると検索フィールドに,が入力されると全データがヒットしてしまうので、
        // 意図的に入力するのが難しいタブ文字で区切る
        const tagStr = tags.join('\t');

        const target = `${post.title.toLowerCase()}\t${tagStr.toLowerCase()}`;

        return target.includes(keyword);
      });
    },
    [searchJson]
  );

  // 複数キーワードによるAND検索を行う処理
  const searchByMultipleWords = useCallback(
    (keywordAry: string[]) => {
      // 検索対象のキーワードを含む投稿データの配列を生成する
      const posts = keywordAry.map((keyword) => {
        return searchPosts(keyword);
      });

      const flatSearchResultPosts = posts.flat();

      // 重複するオブジェクトの除外を実施
      return flatSearchResultPosts.filter((post, index, self) => {
        return self.findIndex((e) => e.id === post.id) === index;
      });
    },
    [searchPosts]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value.trimStart());
  };

  const searchFunc = useCallback(() => {
    // 半角文字列に変換
    const keyword = searchWord.trim().toLowerCase();
    const keywordAry = keyword.replace(/\s/g, '\t').split('\t');

    // 1つの単語で検索された時の処理
    if (keywordAry.length === 0) {
      setResults(searchPosts(keywordAry[0]));
      return;
    }

    setResults(searchByMultipleWords(keywordAry));
  }, [searchWord, searchPosts, searchByMultipleWords]);

  useEffect(() => {
    if (searchWord !== '') searchFunc();
  }, [searchWord, searchFunc]);

  return {
    results,
    searchWord,
    handleChange,
  };
};
