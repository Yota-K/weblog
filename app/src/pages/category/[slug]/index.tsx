import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';

import Breadcrumb from '@/components/Breadcrumb';
import Layout from '@/components/Layout';
import Paginate from '@/components/Paginate';
import PostThumbnail from '@/components/PostThumbnail';
import Seo from '@/components/Seo';

import { config } from '@/config/app';

import { fetchArticlesPage } from '@/lib/fetch-articles-page';
import { fetchTaxonomiesData } from '@/lib/fetch-taxonomies-page';

import { Content } from '@/types/content';
import { TaxonomyPaths } from '@/types/taxonomy';

import { BlogCard, PostInfo } from '@/share/BlogCard';
import { CategoryLabel } from '@/share/CategoryLabel';
import { H2, H3 } from '@/share/Heading';
import { TagArea } from '@/share/TagArea';
import { TagLabel } from '@/share/TagLabel';
import { TimeStamp } from '@/share/TimeStamp';

import { dateFormat } from '@/utils/date-format';

type Props = {
  contents: Content[];
  categoryName: string;
  categorySlug: string;
  totalCount: number;
};

const paginateNum = config.paginateNum;

const CategoryPage: NextPage<Props> = ({ contents, categoryName, categorySlug, totalCount }) => {
  const { siteTitle } = config.siteInfo;

  const paginateType = `category/${categorySlug}`;

  return (
    <Layout>
      <Seo title={`${categoryName}｜${siteTitle}`} />
      <div id="categories">
        <Breadcrumb pageTitle={categoryName} />
        <H2>カテゴリー：{categoryName}</H2>
        {contents.map((content) => (
          <BlogCard key={content.id}>
            <PostThumbnail thumbnailUrl={content.thumbnail.url} width="308" height="173" />
            <PostInfo>
              <TimeStamp>
                <time itemProp="dateCreated" dateTime={`${dateFormat(content.createdAt)}`}>
                  {dateFormat(content.createdAt)}
                </time>
              </TimeStamp>
              <H3>
                <Link href="/blogs/[id]" as={`/blogs/${content.id}`}>
                  <a>{content.title}</a>
                </Link>
              </H3>
              <CategoryLabel>
                カテゴリー：
                <Link href="/category/[id]" as={`/category/${content.category_field.id}`}>
                  <a>{content.category_field.name}</a>
                </Link>
              </CategoryLabel>
              <TagArea>
                {content.tag_field.map((tag) => (
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
  const data = await fetchTaxonomiesData<TaxonomyPaths>('category', 'id,posts.id');

  const results = data.contents;
  const paths = results.map((post) => `/category/${post.id}`);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context?.params?.slug;

  const data = await fetchArticlesPage(0, paginateNum, `category_field[equals]${slug}`);

  const contents = data.contents;
  const categoryName = contents[0].category_field.name;
  const categorySlug = contents[0].category_field.id;
  const totalCount = data.totalCount;

  return {
    props: {
      contents,
      categoryName,
      categorySlug,
      totalCount,
    },
  };
};

export default CategoryPage;
