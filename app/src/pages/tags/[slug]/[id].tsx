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
import { TaxonomyIdsAndRelatedPosts } from '@/types/taxonomy';

import { BlogCard, PostInfo } from '@/share/BlogCard';
import { CategoryLabel } from '@/share/CategoryLabel';
import { H2, H3 } from '@/share/Heading';
import { TagArea } from '@/share/TagArea';
import { TagLabel } from '@/share/TagLabel';
import { TimeStamp } from '@/share/TimeStamp';

import { dateFormat } from '@/utils/date-format';
import { generateBuildPaginatePath } from '@/utils/generate-build-paginate-path';

type Props = {
  contents: Content[];
  tagName: string;
  tagSlug: string;
  totalCount: number;
};

const paginateNum = config.paginateNum;

const TagPage: NextPage<Props> = ({ contents, tagName, tagSlug, totalCount }) => {
  const { siteTitle } = config.siteInfo;

  const paginateType = `tags/${tagSlug}`;

  return (
    <Layout>
      <Seo title={`${tagName}｜${siteTitle}`} />
      <div id="categories">
        <Breadcrumb pageTitle={tagName} />
        <H2>タグ：{tagName}</H2>
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
  const data = await fetchTaxonomiesData<TaxonomyIdsAndRelatedPosts>('tags', 'id,posts.id');
  const results = generateBuildPaginatePath(data.contents);

  const paths = results.map((path) => ({
    params: {
      slug: path.params.slug,
      id: path.params.id.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context?.params?.slug;
  const id = context?.params?.id as string;
  const offset = parseInt(id) * paginateNum - paginateNum;

  const data = await fetchArticlesPage(offset, paginateNum, `tag_field[contains]${slug}`);
  const contents = data.contents;

  // ページに一致するタグを探す
  const findTag = contents[0].tag_field.find((tag) => tag.id === slug);

  const tagName = findTag?.name;
  const tagSlug = findTag?.id;
  const totalCount = data.totalCount;

  return {
    props: {
      contents,
      tagName,
      tagSlug,
      totalCount,
    },
  };
};

export default TagPage;
