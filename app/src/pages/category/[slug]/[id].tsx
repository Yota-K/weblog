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
  categories: Content[];
  categoryName: string;
  categorySlug: string;
  totalCount: number;
}

const offsetNum = paginateNum['count'];

const Categories: NextComponentType<NextPageContext, RecordType, Props> = ({
  categories,
  categoryName,
  categorySlug,
  totalCount,
}) => {
  const paginateType = `category/${categorySlug}`;

  return (
    <Layout>
      <Head title={`${categoryName}｜カルキチのブログ`} />
      <div id="categories">
        <Breadcrumb categoryPageTitle={categoryName} />
        <H2>カテゴリー：{categoryName}</H2>
        {categories.map((blog) => (
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
  const res = await fetch(`${process.env.ENDPOINT}/taxonomy?fields=categories.id,categories.posts&limit=9999`, header);
  const data = await res.json();
  const contents: any = data.categories;

  const categoryAry: {
    slug: string;
    count: number;
  }[] = [];

  // 以下のようなオブジェクトを持った配列を生成する
  // [
  //  {id: 'front-end': count: 2}
  // ]
  contents.forEach((content: any) => {
    const postLength = content.posts.length;
    const count = [...new Array(postLength).keys()].map((i) => ++i);
    const totalCount = Math.floor(count.length / offsetNum) + 1;

    categoryAry.push({
      slug: content.id,
      count: totalCount,
    });
  });

  // 二次元配列を生成する
  // [
  //   [
  //     {params: {slug: 'front-end', id: 1}},
  //     {params: {slug: 'front-end', id: 2}},
  //   ],
  //   [
  //     {params: {slug: 'front-end', id: 1}},
  //   ],
  // ]
  const pathAry = categoryAry.map((category) => {
    const count = category.count;
    return [...Array(count)].map((_, i) => ({
      params: { slug: category.slug, id: ++i },
    }));
  });

  // reduceで二次元配列を一次元配列に変換
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

  const params = `filters=category[contains]${slug}&offset=${id}&limit=${offsetNum}`;
  const res = await fetch(`${process.env.ENDPOINT}/blogs?${params}`, header);
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

export default Categories;
