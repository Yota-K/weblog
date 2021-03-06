import { NextComponentType, NextPageContext, GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';

import { config } from '../../../../config/app';

import { Content } from '../../../../interfaces/content';
import { RecordType } from '../../../../interfaces/record-type';
import { PageSlug } from '../../../../interfaces/page-slug';

import { dateFormat } from '../../../../utils/date-format';
import { getApiKey } from '../../../../utils/get-api-key';

import { BlogCard, PostInfo } from '../../../../share/BlogCard';
import { CategoryLabel } from '../../../../share/CategoryLabel';
import { H2, H3 } from '../../../../share/Heading';
import { TagArea } from '../../../../share/TagArea';
import { TagLabel } from '../../../../share/TagLabel';
import { TimeStamp } from '../../../../share/TimeStamp';

import Breadcrumb from '../../../components/Breadcrumb';
import Head from '../../../components/Head';
import Layout from '../../../components/Layout';
import Paginate from '../../../components/Paginate';
import PostThumbnail from '../../../components/PostThumbnail';

interface Props {
  categories: Content[];
  categoryName: string;
  categorySlug: string;
  totalCount: number;
}

const paginateNum = config.paginateNum;

const CategoryPage: NextComponentType<NextPageContext, RecordType, Props> = ({
  categories,
  categoryName,
  categorySlug,
  totalCount,
}) => {
  const { siteTitle } = config.siteInfo;

  const paginateType = `category/${categorySlug}`;

  return (
    <Layout>
      <Head title={`${categoryName}｜${siteTitle}`} />
      <div id="categories">
        <Breadcrumb pageTitle={categoryName} />
        <H2>カテゴリー：{categoryName}</H2>
        {categories.map((blog) => (
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

export const getStaticPaths: GetStaticPaths = async () => {
  const key = getApiKey();

  const res = await fetch(`${process.env.ENDPOINT}/category?fields=id&limit=9999`, key);
  const data = await res.json();

  const slugAry: PageSlug[] = data.contents;
  const paths = slugAry.map((post) => `/category/${post.id}`);

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const key = getApiKey();

  const slug = context?.params?.slug;

  const params = `?filters=category_field[equals]${slug}&limit=${paginateNum}`;
  const res = await fetch(`${process.env.ENDPOINT}/blogs${params}`, key);
  const data = await res.json();

  const contents = data.contents;
  const categoryName = contents[0].category_field.name;
  const categorySlug = contents[0].category_field.id;
  const totalCount = data.totalCount;

  return {
    props: {
      categories: contents,
      categoryName: categoryName,
      categorySlug: categorySlug,
      totalCount: totalCount,
    },
  };
};

export default CategoryPage;
