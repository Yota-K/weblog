import cheerio from 'cheerio';
import hljs from 'highlight.js';
import MarkdownIt from 'markdown-it';
import { NextComponentType, NextPageContext, GetServerSideProps } from 'next';
import Link from 'next/link';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { config } from '../../config/app';

import { Content } from '../../interfaces/content';
import { RecordType } from '../../interfaces/record-type';

import { dateFormat } from '../../scripts/date-format';

import { ShareArea, MyContent } from '../../share/blog';
import { CategoryLabel } from '../../share/CategoryLabel';
import { getApiKey } from '../../scripts/get-api-key';
import { H1 } from '../../share/Heading';
import { TagArea } from '../../share/TagArea';
import { TagLabel } from '../../share/TagLabel';
import { TimeStamp } from '../../share/TimeStamp';

import Breadcrumb from '../components/Breadcrumb';
import Head from '../components/Head';
import Layout from '../components/Layout';
import Toc from '../components/Toc';
import SocialLinks from '../components/SocialLinks';

interface Props {
  blog: Content;
  toc: {
    id: string;
    text: string;
    type: string;
  }[];
  body: string;
  draftKey: string;
}

const Preview: NextComponentType<NextPageContext, RecordType, Props> = ({ blog, toc, body, draftKey }) => {
  const { siteTitle } = config.siteInfo;
  const { siteUrl } = config.siteInfo;
  const url = `${siteUrl}blogs/${blog.id}`;

  const reciveBreadcrumb = {
    categoryId: blog.category_field.id,
    categoryName: blog.category_field.name,
    blogTitle: blog.title,
  };

  console.log(reciveBreadcrumb);
  console.log(draftKey);

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
        <Breadcrumb blogPageInfo={reciveBreadcrumb} draftKey={draftKey} />
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const key = getApiKey();

  const { secret, id, draftKey } = context.query;

  // 編集中の記事URLとdraftKeyが設定されていない場合を考慮
  if (secret !== process.env.SECRET_KEY || id === undefined || draftKey === undefined) {
    return {
      notFound: true,
    };
  }

  const res = await fetch(`${process.env.ENDPOINT}/blogs/${id}?draftKey=${draftKey}`, key);
  const blog = await res.json();

  const $ = cheerio.load(blog.body, { _useHtmlParser2: true });

  const headings = $('h2, h3').toArray();

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
      draftKey,
    },
  };
};

export default Preview;
