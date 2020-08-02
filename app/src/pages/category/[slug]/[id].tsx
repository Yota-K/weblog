import React from 'react';
import { NextComponentType, NextPageContext, GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { RecordType } from '../../../../interfaces/record-type';
import { CategoryJson } from '../../../../interfaces/taxonomy';
import { PageSlug } from '../../../../interfaces/page-slug';
import Head from '../../../components/Head';
import Layout from '../../../components/Layout';
import Breadcrumb from '../../../components/Breadcrumb';
import { dateFormat } from '../../../../scripts/date-format';
import { getRequestHeader } from '../../../../scripts/get-request-header';

import { H2, H3 } from '../../../../share/Heading';
import { BlogCard, PostThumbnail, PostInfo } from '../../../../share/BlogCard';
import { CategoryLabel } from '../../../../share/CategoryLabel';
import { TagArea } from '../../../../share/TagArea';
import { TagLabel } from '../../../../share/TagLabel';
import { TimeStamp } from '../../../../share/TimeStamp';

interface Props {
  categories: CategoryJson;
}

const Categories: NextComponentType<NextPageContext, RecordType, Props> = ({ categories }) => {
  categories.posts.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));

  return (
    <Layout>
      <Head title={`${categories.name}｜カルキチのブログ`} />
      <div id="categories">
        <Breadcrumb categoryPageTitle={categories.name} />
        <H2>カテゴリー：{categories.name}</H2>
        {categories.posts.map((blog) => (
          <BlogCard key={blog.id}>
            <PostThumbnail>
              <LazyLoadImage src={`${blog.thumbnail.url}`} alt="thumbnail" effect="blur" />
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
      </div>
    </Layout>
  );
};

const header = getRequestHeader();

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.ENDPOINT}/category?fields=id&limit=9999`, header);
  const data = await res.json();
  const slugAry: PageSlug[] = data.contents;
  const paths = slugAry.map((post) => `/category/${post.id}`);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context?.params?.slug;
  const res = await fetch(`${process.env.ENDPOINT}/category/${id}?depth=2`, header);
  const data = await res.json();
  return {
    props: {
      categories: data,
    },
  };
};

export default Categories;
