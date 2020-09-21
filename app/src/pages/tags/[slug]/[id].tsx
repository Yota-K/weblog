import { NextComponentType, NextPageContext, GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { config } from '../../../../config/app';

import { Content } from '../../../../interfaces/blog';
import { RecordType } from '../../../../interfaces/record-type';
import { TaxonomyAry } from '../../../../interfaces/taxonomy';

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
  tags: Content[];
  tagName: string;
  tagSlug: string;
  totalCount: number;
}

const paginateNum = config.paginateNum;

const Tags: NextComponentType<NextPageContext, RecordType, Props> = ({ tags, tagName, tagSlug, totalCount }) => {
  const { siteTitle } = config.siteInfo;

  const paginateType = `tags/${tagSlug}`;

  return (
    <Layout>
      <Head title={`${tagName}｜${siteTitle}`} />
      <div id="categories">
        <Breadcrumb tagPageTitle={tagName} />
        <H2>タグ：{tagName}</H2>
        {tags.map((blog) => (
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
        <Paginate paginateType={paginateType} paginateNum={paginateNum} totalCount={totalCount} />
      </div>
    </Layout>
  );
};

const header = getRequestHeader();

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.ENDPOINT}/taxonomy?fields=tags.id,tags.posts&limit=9999`, header);
  const data = await res.json();

  const contents: TaxonomyAry[] = data.tags;
  const resultAry = generateBuildPaginatePath(contents, paginateNum);

  const paths = resultAry.map((path) => ({
    params: { slug: path.params.slug, id: path.params.id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context?.params?.slug;
  const id = context?.params?.id as string;

  const offset = parseInt(id) * paginateNum - paginateNum;

  const params = `?filters=tags[contains]${slug}&offset=${offset}&limit=${paginateNum}`;
  const res = await fetch(`${process.env.ENDPOINT}/blogs${params}`, header);
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

export default Tags;
