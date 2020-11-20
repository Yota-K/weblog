import { NextComponentType, NextPageContext, GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { config } from '../../../../config/app';

import { Content } from '../../../../interfaces/content';
import { RecordType } from '../../../../interfaces/record-type';
import { BuildTaxonomyPaginateList } from '../../../../interfaces/taxonomy';

import { dateFormat } from '../../../../scripts/date-format';
import { generateBuildPaginatePath } from '../../../../scripts/generate-build-paginate-path';
import { getRequestHeader } from '../../../../scripts/get-request-header';

import { BlogCard, PostThumbnail, PostInfo } from '../../../../share/BlogCard';
import { CategoryLabel } from '../../../../share/CategoryLabel';
import { H2, H3 } from '../../../../share/Heading';
import { TagArea } from '../../../../share/TagArea';
import { TagLabel } from '../../../../share/TagLabel';
import { TimeStamp } from '../../../../share/TimeStamp';

import Breadcrumb from '../../../components/Breadcrumb';
import Head from '../../../components/Head';
import Layout from '../../../components/Layout';
import Paginate from '../../../components/Paginate';

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
        <Breadcrumb categoryPageTitle={categoryName} />
        <H2>カテゴリー：{categoryName}</H2>
        {categories.map((blog) => (
          <BlogCard key={blog.id}>
            <PostThumbnail>
              <LazyLoadImage src={`${blog.thumbnail.url}`} alt="thumbnail" effect="blur" />
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

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.ENDPOINT}/taxonomy?fields=categories.id,categories.posts&limit=9999`, header);
  const data = await res.json();

  const contents: BuildTaxonomyPaginateList[] = data.categories;
  const resultAry = generateBuildPaginatePath(contents);

  const paths = resultAry.map((path) => ({
    params: { slug: path.params.slug, id: path.params.id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context?.params?.slug;
  const id = context?.params?.id as string;

  const offset = parseInt(id) * paginateNum - paginateNum;

  const params = `?filters=category_field[equals]${slug}&offset=${offset}&limit=${paginateNum}`;
  const res = await fetch(`${process.env.ENDPOINT}/blogs${params}`, header);
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
