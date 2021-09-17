import { NextComponentType, NextPageContext, GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';

import { config } from '../../config/app';

import { Content } from '../../interfaces/content';
import { RecordType } from '../../interfaces/record-type';

import { dateFormat } from '../../utils/date-format';
import { getApiKey } from '../../utils/get-api-key';

import { BlogCard, PostInfo } from '../../share/BlogCard';
import { CategoryLabel } from '../../share/CategoryLabel';
import { H3 } from '../../share/Heading';
import { TagArea } from '../../share/TagArea';
import { TagLabel } from '../../share/TagLabel';
import { TimeStamp } from '../../share/TimeStamp';

import Seo from '../components/Seo';
import Layout from '../components/Layout';
import Paginate from '../components/Paginate';
import PostThumbnail from '../components/PostThumbnail';

interface Props {
  blogs: Content[];
  totalCount: number;
}

const paginateNum = config.paginateNum;

const Home: NextComponentType<NextPageContext, RecordType, Props> = ({ blogs, totalCount }) => {
  const { siteTitle } = config.siteInfo;

  const paginateType = 'page';

  return (
    <Layout>
      <Seo title={siteTitle} />
      <div id="blog-list">
        {blogs.map((blog) => (
          <BlogCard key={blog.id}>
            <PostThumbnail thumbnailUrl={blog.thumbnail.url} width="308" height="173" />
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

export const getStaticProps: GetStaticProps = async () => {
  const key = getApiKey();

  const res = await fetch(`${process.env.ENDPOINT}/blogs?offset=0&limit=${paginateNum}`, key);
  const data = await res.json();

  return {
    props: {
      blogs: data.contents,
      totalCount: data.totalCount,
    },
  };
};

export default Home;
