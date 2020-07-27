import React from 'react';
import { NextComponentType, NextPageContext, GetStaticProps } from 'next';
import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import Head from '../components/Head';
import Layout from '../components/Layout';
import Paginate from '../components/Paginate';
import { RecordType } from '../../interfaces/record-type';
import { Content } from '../../interfaces/blog';
import { dateFormat } from '../../scripts/date-format';
import { paginateAry } from '../../scripts/generate-paginate-ary';
import { getRequestHeader } from '../../scripts/get-request-header';

import { H3 } from '../../share/Heading';
import { BlogCard, PostThumbnail, PostInfo } from '../../share/BlogCard';
import { CategoryLabel } from '../../share/CategoryLabel';
import { TagArea } from '../../share/TagArea';
import { TagLabel } from '../../share/TagLabel';
import { TimeStamp } from '../../share/TimeStamp';

interface Props {
  blogs: Content[];
  totalCount: number;
}

const Home: NextComponentType<NextPageContext, RecordType, Props> = ({ blogs, totalCount }) => {
  const siteTitle = 'カルキチのブログ';

  const paginateType = 'page';
  const paginate = paginateAry(totalCount);

  return (
    <Layout>
      <Head title={siteTitle} />
      <div id="blog-list">
        {blogs.map((blog) => (
          <BlogCard key={blog.id}>
            <PostThumbnail>
              <LazyLoadImage src={blog.thumbnail.url} alt="thumbnail" effect="blur" />
            </PostThumbnail>
            <PostInfo>
              <TimeStamp>{dateFormat(blog.createdAt)}</TimeStamp>
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
                {blog.tag_field.map((tag: any) => (
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
        <Paginate paginateType={paginateType} paginate={paginate} />
      </div>
    </Layout>
  );
};

const header = getRequestHeader();

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${process.env.ENDPOINT}/blogs?offset=0&limit=5`, header);
  const data = await res.json();
  return {
    props: {
      blogs: data.contents,
      totalCount: data.totalCount,
    },
  };
};

export default Home;
