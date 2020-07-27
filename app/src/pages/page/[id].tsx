import React from 'react';
import { NextComponentType, NextPageContext, GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { API } from '../../../api/api';
import { RecordType } from '../../../interfaces/record-type';
import { Content } from '../../../interfaces/blog';
import Head from '../../components/Head';
import Layout from '../../components/Layout';
import Paginate from '../../components/Paginate';
import { dateFormat } from '../../../scripts/date-format';
import { getRequestHeader } from '../../../scripts/get-request-header';
import { paginateAry } from '../../../scripts/generate-paginate-ary';

import { H3 } from '../../../share/Heading';
import { BlogCard, PostThumbnail, PostInfo } from '../../../share/BlogCard';
import { CategoryLabel } from '../../../share/CategoryLabel';
import { TagArea } from '../../../share/TagArea';
import { TagLabel } from '../../../share/TagLabel';
import { TimeStamp } from '../../../share/TimeStamp';

interface Props {
  blogs: Content[];
  totalCount: number;
}

const Page: NextComponentType<NextPageContext, RecordType, Props> = ({ blogs, totalCount }) => {
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
        <Paginate paginateType={paginateType} paginate={paginate} />
      </div>
    </Layout>
  );
};

const header = getRequestHeader();

// export const getStaticPaths: GetStaticPaths = async () => {
//
// };

Page.getInitialProps = async (context: any) => {
  const id = context.query.id;
  const url = API.BASE_URL;
  const api = new API();
  const data = await api.getBlog(url, id);
  return {
    blogs: data.blogs,
    totalCount: data.totalCount,
  };
};

export default Page;
