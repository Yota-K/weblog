import React from 'react';
import { NextComponentType, NextPageContext, GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { paginateNum } from '../../../../config/paginate-num';

import { RecordType } from '../../../../interfaces/record-type';
import { Content } from '../../../../interfaces/blog';

import { dateFormat } from '../../../../scripts/date-format';
import { getRequestHeader } from '../../../../scripts/get-request-header';

import Head from '../../../components/Head';
import Layout from '../../../components/Layout';
import Breadcrumb from '../../../components/Breadcrumb';
import Paginate from '../../../components/Paginate';

import { H2, H3 } from '../../../../share/Heading';
import { BlogCard, PostThumbnail, PostInfo } from '../../../../share/BlogCard';
import { CategoryLabel } from '../../../../share/CategoryLabel';
import { TagArea } from '../../../../share/TagArea';
import { TagLabel } from '../../../../share/TagLabel';
import { TimeStamp } from '../../../../share/TimeStamp';

interface Props {
  tags: Content[];
  tagName: string;
  tagSlug: string;
  totalCount: number;
}

const offsetNum = paginateNum['count'];

const Tags: NextComponentType<NextPageContext, RecordType, Props> = ({ tags, tagName, tagSlug, totalCount }) => {
  const paginateType = `tags/${tagSlug}`;

  return (
    <Layout>
      <Head title={`${tagName}｜カルキチのブログ`} />
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
        <Paginate paginateType={paginateType} offsetNum={offsetNum} totalCount={totalCount} />
      </div>
    </Layout>
  );
};

const header = getRequestHeader();

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.ENDPOINT}/taxonomy?fields=tags.id,tags.posts&limit=9999`, header);
  const data = await res.json();
  const contents: any = data.tags;

  const tagAry: {
    slug: string;
    count: number;
  }[] = [];

  contents.forEach((content: any) => {
    const postLength = content.posts.length;
    const count = [...new Array(postLength).keys()].map((i) => ++i);
    const totalCount = Math.floor(count.length / offsetNum) + 1;

    tagAry.push({
      slug: content.id,
      count: totalCount,
    });
  });

  const pathAry = tagAry.map((tag) => {
    const count = tag.count;

    return [...new Array(count)].map((_, i) => ({
      params: { slug: tag.slug, id: ++i },
    }));
  });

  const resultAry = pathAry.reduce((prev, current) => {
    return [...prev, ...current];
  }, []);

  const paths = resultAry.map((path) => ({
    params: { slug: path.params.slug, id: path.params.id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context?.params?.slug;
  let id: any = context?.params?.id;
  id = id * offsetNum - offsetNum;

  const params = `filters=tags[contains]${slug}&offset=${id}&limit=${offsetNum}`;
  const res = await fetch(`${process.env.ENDPOINT}/blogs?${params}`, header);
  const data = await res.json();

  const contents = data.contents;

  // ページに一致するタグを探す
  const findTag = contents[0].tag_field.find((tag: any) => tag.id === slug);

  const tagName = findTag.name;
  const tagSlug = findTag.id;
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
