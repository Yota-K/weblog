import { NextComponentType, NextPageContext, GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';

import { config } from '../../../../config/app';

import { Content } from '../../../../interfaces/content';
import { RecordType } from '../../../../interfaces/record-type';
import { BuildTaxonomyPaginateList } from '../../../../interfaces/taxonomy';

import { dateFormat } from '../../../../utils/date-format';
import { generateBuildPaginatePath } from '../../../../utils/generate-build-paginate-path';
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
  tags: Content[];
  tagName: string;
  tagSlug: string;
  totalCount: number;
}

const paginateNum = config.paginateNum;

const TagPage: NextComponentType<NextPageContext, RecordType, Props> = ({ tags, tagName, tagSlug, totalCount }) => {
  const { siteTitle } = config.siteInfo;

  const paginateType = `tags/${tagSlug}`;

  return (
    <Layout>
      <Head title={`${tagName}｜${siteTitle}`} />
      <div id="categories">
        <Breadcrumb pageTitle={tagName} />
        <H2>タグ：{tagName}</H2>
        {tags.map((blog) => (
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

  const res = await fetch(`${process.env.ENDPOINT}/taxonomy?fields=tags.id,tags.posts&limit=9999`, key);
  const data = await res.json();

  const contents: BuildTaxonomyPaginateList[] = data.tags;
  const resultAry = generateBuildPaginatePath(contents);

  const paths = resultAry.map((path) => ({
    params: { slug: path.params.slug, id: path.params.id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const key = getApiKey();

  const slug = context?.params?.slug;
  const id = context?.params?.id as string;

  const offset = parseInt(id) * paginateNum - paginateNum;

  const params = `?filters=tag_field[contains]${slug}&offset=${offset}&limit=${paginateNum}`;
  const res = await fetch(`${process.env.ENDPOINT}/blogs${params}`, key);
  const data = await res.json();

  const contents: Content[] = data.contents;

  // ページに一致するタグを探す
  const findTag = contents[0].tag_field.find((tag) => tag.id === slug);

  const tagName = findTag?.name;
  const tagSlug = findTag?.id;
  const totalCount = data.totalCount;

  return {
    props: {
      tags: contents,
      tagName: tagName,
      tagSlug: tagSlug,
      totalCount: totalCount,
    },
  };
};

export default TagPage;
