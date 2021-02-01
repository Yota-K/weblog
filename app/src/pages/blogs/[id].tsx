import cheerio from 'cheerio';
import hljs from 'highlight.js';
import MarkdownIt from 'markdown-it';
import { NextComponentType, NextPageContext, GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { config } from '../../../config/app';

import { Content } from '../../../interfaces/content';
import { PageSlug } from '../../../interfaces/page-slug';
import { RecordType } from '../../../interfaces/record-type';

import { dateFormat } from '../../../scripts/date-format';

import { ShareArea, MyContent } from '../../../share/blog';
import { CategoryLabel } from '../../../share/CategoryLabel';
import { getApiKey } from '../../../scripts/get-api-key';
import { H1 } from '../../../share/Heading';
import { TagArea } from '../../../share/TagArea';
import { TagLabel } from '../../../share/TagLabel';
import { TimeStamp } from '../../../share/TimeStamp';

import Breadcrumb from '../../components/Breadcrumb';
import Head from '../../components/Head';
import Layout from '../../components/Layout';
import Toc from '../../components/Toc';
import SocialLinks from '../../components/SocialLinks';

interface Props {
  blog: Content;
  toc: {
    id: string;
    text: string;
    type: string;
  }[];
  body: string;
}

const Blog: NextComponentType<NextPageContext, RecordType, Props> = ({ blog, toc, body }) => {
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
      <Head
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
          <LazyLoadImage
            className="eyecatch"
            width="100%"
            height="auto"
            src={blog.thumbnail.url}
            alt="thumbnail"
            effect="blur"
          />
          <Toc toc={toc} />
          <div className="post" dangerouslySetInnerHTML={{ __html: body }}></div>
        </MyContent>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const key = getApiKey();

  const res = await fetch(`${process.env.ENDPOINT}/blogs?fields=id&limit=9999`, key);
  const data = await res.json();

  const slugAry: PageSlug[] = data.contents;
  const paths = slugAry.map((post) => `/blogs/${post.id}`);

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const key = getApiKey();

  const id = context?.params?.id;

  const res = await fetch(`${process.env.ENDPOINT}/blogs/${id}`, key);
  const blog = await res.json();

  const $ = cheerio.load(blog.body, { _useHtmlParser2: true });

  const headings = $('h2, h3').toArray();

  // MEMO: ライブラリのバージョンをあげたら、コンパイルエラーが発生するようになった
  const toc = headings.map((data: any) => ({
    id: data.attribs.id,
    text: data.children[0].data,
    type: data.name,
  }));

  $('pre > code').each((i, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass('hljs');
  });

  return {
    props: {
      blog: blog,
      toc: toc,
      body: $.html(),
    },
  };
};

export default Blog;
