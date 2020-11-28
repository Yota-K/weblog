import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { config } from '../../config/app';

import { Content } from '../../interfaces/content';

import { dateFormat } from '../../scripts/date-format';
import { getRequestHeader } from '../../scripts/get-request-header';

import { BlogCard, PostThumbnail, PostInfo } from '../../share/BlogCard';
import { CategoryLabel } from '../../share/CategoryLabel';
import { H2 } from '../../share/Heading';
import { H3 } from '../../share/Heading';
import { TagArea } from '../../share/TagArea';
import { TagLabel } from '../../share/TagLabel';
import { TimeStamp } from '../../share/TimeStamp';

import Head from '../components/Head';
import Layout from '../components/Layout';
import Paginate from '../components/Paginate';

import Error from './_error';

interface Posts {
  blogs: Content[];
  totalCount: number;
}

const paginateNum = config.paginateNum;

const Search: React.FC = () => {
  const [queryString, setQueryString] = React.useState<string>('');
  const [searchResult, setSearchResult] = React.useState<string>('');
  const [param, setParam] = React.useState<string>('');
  const [posts, setPosts] = React.useState<Posts>({
    blogs: [],
    totalCount: 0,
  });

  const { siteTitle } = config.siteInfo;

  // 検索クエリを取得
  const router = useRouter();
  const { query } = router.query;

  // この部分を追加
  useEffect(() => {
    // idがqueryで利用可能になったら処理される
    if (router.asPath !== router.route) {
      // 例: React・React/2
      setQueryString(query as string);
    }
  }, [router]);

  useEffect(() => {
    const main = async () => {
      if (queryString) {
        setParam(`search?query=${queryString}`);
        setSearchResult(queryString.replace(/\/[0-9]+$/, ''));

        let currentPaginateNum = 1;
        let searchWord: string;

        // ２ページ目以降の場合に行う処理
        if (queryString.match(/[0-9]+$/)) {
          const queryParamNum = queryString.match(/[0-9]+$/) as string[];
          currentPaginateNum = parseInt(queryParamNum[0]);

          const searchQuery = queryString.replace(/\/[0-9]$/, '');
          searchWord = encodeURI(searchQuery as string);
        } else {
          // matchの戻り値がnullの場合はパラメータに設定された文字列をそのままエンコードする
          searchWord = encodeURI(queryString as string);
        }

        const offset = currentPaginateNum * paginateNum - paginateNum;

        const header = getRequestHeader();
        const res = await fetch(
          `${process.env.ENDPOINT}/blogs?q=${searchWord}&offset=${offset}&limit=${paginateNum}&orders=-createdAt`,
          header
        );
        const data = await res.json();

        setPosts({
          blogs: data.contents,
          totalCount: data.totalCount,
        });

        // 検索クエリがない・空の配列が返ってきた時は検索失敗と判定する
        if (!posts.blogs.length || !queryString) return <Error statusCode={404} />;
      }
    };

    main();
  }, [queryString]);

  return (
    <Layout>
      <div id="blog-list">
        <H2>{searchResult}の検索結果</H2>
        {posts.blogs.map((blog) => (
          <BlogCard key={blog.id}>
            <PostThumbnail>
              <LazyLoadImage src={blog.thumbnail.url} alt="thumbnail" effect="blur" />
            </PostThumbnail>
            <PostInfo>
              <TimeStamp>
                <time itemProp="dateCreated" dateTime={`${dateFormat(blog.createdAt)}`}>
                  {dateFormat(blog.createdAt)}
                </time>
              </TimeStamp>
              <H3>
                <Link href="/blogs/[id]" as={`/blogs/${blog.id}`}>
                  <a>{blog.title}</a>
                </Link>
              </H3>
              <CategoryLabel>
                カテゴリー：
                <Link href="/category/[id]" as={`/category/${blog.category_field.id}`}>
                  <a>{blog.category_field.name}</a>
                </Link>
              </CategoryLabel>
              <TagArea>
                {blog.tag_field.map((tag) => (
                  <TagLabel key={tag.id}>
                    <Link href="/tags/[id]" as={`/tags/${tag.id}`}>
                      <a>{tag.name}</a>
                    </Link>
                  </TagLabel>
                ))}
              </TagArea>
            </PostInfo>
          </BlogCard>
        ))}
      </div>
    </Layout>
  );
};

export default Search;
