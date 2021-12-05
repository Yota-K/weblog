import MarkdownIt from 'markdown-it';
import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';

import Breadcrumb from '@/components/Breadcrumb';
import Layout from '@/components/Layout';
import PostThumbnail from '@/components/PostThumbnail';
import Seo from '@/components/Seo';
import SocialLinks from '@/components/SocialLinks';
import Toc from '@/components/Toc';

import { config } from '@/config/app';

import { fetchBlogPage } from '@/lib/fetch-blog-page';

import { ShareArea, MyContent, PostDiv } from '@/share/blog';
import { CategoryLabel } from '@/share/CategoryLabel';
import { H1 } from '@/share/Heading';
import { TagArea } from '@/share/TagArea';
import { TagLabel } from '@/share/TagLabel';
import { TimeStamp } from '@/share/TimeStamp';

import { Content } from '@/types/content';

import { dateFormat } from '@/utils/date-format';
import { parseHtml } from '@/utils/parse-html';

type Props = {
  blog: Content;
  toc: {
    id: string;
    text: string;
    type: string;
  }[];
  body: string;
};

const Blog: NextPage<Props> = ({ blog, toc, body }) => {
  const { siteTitle } = config.siteInfo;
  const { siteUrl } = config.siteInfo;
  const url = `${siteUrl}blogs/${blog.id}`;

  const reciveBreadcrumb = {
    categoryId: blog.category_field.id,
    categoryName: blog.category_field.name,
    blogTitle: blog.title,
  };

  // eslint-disable-next-line
  const md = new MarkdownIt({
    html: true,
  });

  return (
    <Layout>
      <Seo
        title={`${blog.title}｜${siteTitle}`}
        url={url}
        description={blog.description}
        thumbnail={blog.thumbnail.url}
      />
      <div id="blog">
        <Breadcrumb blogPageInfo={reciveBreadcrumb} />
        <TimeStamp>
          <time itemProp="dateCreated" dateTime={`${dateFormat(blog.createdAt)}`}>
            {dateFormat(blog.createdAt)}
          </time>
        </TimeStamp>
        <H1>{blog.title}</H1>
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
        <ShareArea>
          <SocialLinks url={url} />
        </ShareArea>
        <MyContent>
          <PostThumbnail className="post-thumbnail" thumbnailUrl={blog.thumbnail.url} width="100%" height="auto" />
          <Toc toc={toc} />
          <PostDiv dangerouslySetInnerHTML={{ __html: body }}></PostDiv>
        </MyContent>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { blogPaths } = fetchBlogPage();
  const paths = await blogPaths();

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context?.params?.id as string;

  const { blogData } = fetchBlogPage();
  const blog = await blogData(id);

  const { toc, body } = parseHtml(blog);

  return {
    props: {
      blog,
      toc,
      body,
    },
  };
};

export default Blog;
