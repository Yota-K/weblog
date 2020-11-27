import { NextComponentType, NextPageContext, GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { config } from '../../config/app';

import { Content } from '../../interfaces/content';
import { RecordType } from '../../interfaces/record-type';

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

interface Props {
  blogs: Content[];
  totalCount: number;
}

const paginateNum = config.paginateNum;

const Search: NextComponentType<NextPageContext, RecordType, Props> = ({ blogs, totalCount }) => {
  const { siteTitle } = config.siteInfo;

  // 検索クエリを取得
  const router = useRouter();
  const { query } = router.query;

  // 空の配列が返ってくる時は検索失敗と判定する
  if (!blogs.length || !query) return <Error statusCode={404} />;

  const queryString = query as string;
  const replacementQuery = queryString.replace(/\/[0-9]+$/, '');

  const paginateType = 'search';

  return (
    <Layout>
      <Head title={siteTitle} />
      <div id="blog-list">
        <H2>{replacementQuery}の検索結果</H2>
        {blogs.map((blog) => (
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
        <Paginate paginateType={paginateType} totalCount={totalCount} />
      </div>
    </Layout>
  );
};

const header = getRequestHeader();

export const getServerSideProps: GetServerSideProps = async (context) => {
  // React・React/2
  const { query } = context.query;
  const queryString = query as string;

  let currentPaginateNum = 1;
  let encodeString: string;

  // ページネーション２ページ目以降の場合
  if (queryString.match(/[0-9]+$/)) {
    const queryParamNum = queryString.match(/[0-9]+$/) as string[];
    currentPaginateNum = parseInt(queryParamNum[0]);

    const searchQuery = queryString.replace(/\/[0-9]$/, '');
    encodeString = encodeURI(searchQuery as string);
  } else {
    // matchの戻り値がnullの場合はパラメータに設定された文字列をそのままエンコードする
    encodeString = encodeURI(queryString as string);
  }

  const offset = currentPaginateNum * paginateNum - paginateNum;

  const res = await fetch(
    `${process.env.ENDPOINT}/blogs?q=${encodeString}&offset=${offset}&limit=${paginateNum}&orders=-createdAt`,
    header
  );
  const data = await res.json();

  return {
    props: {
      blogs: data.contents,
      totalCount: data.totalCount,
    },
  };
};

export default Search;
