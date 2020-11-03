import cheerio from 'cheerio';
import hljs from 'highlight.js';
import MarkdownIt from 'markdown-it';
import { NextComponentType, NextPageContext, GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import styled from 'styled-components';

import { config } from '../../../config/app';

import { Content } from '../../../interfaces/content';
import { PageSlug } from '../../../interfaces/page-slug';
import { RecordType } from '../../../interfaces/record-type';

import { dateFormat } from '../../../scripts/date-format';

import { CategoryLabel } from '../../../share/CategoryLabel';
import { getRequestHeader } from '../../../scripts/get-request-header';
import { H1 } from '../../../share/Heading';
import { device } from '../../../share/media-query';
import { TagArea } from '../../../share/TagArea';
import { TagLabel } from '../../../share/TagLabel';
import { TimeStamp } from '../../../share/TimeStamp';
import { colorObj } from '../../../share/variables';

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
        <TimeStamp>{dateFormat(blog.createdAt)}</TimeStamp>
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

const ShareArea = styled.div`
  button {
    margin-right: 8px;
  }
`;

const MyContent = styled.div`
  margin-top: 35px;
  min-height: 800px;
  word-break: break-all;
  .eyecatch {
    margin: -20px 0 30px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
  h2 {
    margin: 20px 0;
    padding: 0.4rem;
    background: #b8d0f5;
    border-radius: 3px;
    font-size: 1.6rem;
    letter-spacing: 0.4px;
    font-size: 1.4rem;
    ${device.mobileM} {
      font-size: 1.4rem;
    }
    ${device.mobileS} {
      font-size: 1.4rem;
    }
  }
  h3 {
    position: relative;
    margin: 20px 0;
    padding-bottom: 5px;
    border-bottom: 2px solid ${colorObj.borderGray};
    &::after {
      position: absolute;
      bottom: -2px;
      left: 0;
      content: '';
      width: 30%;
      border-bottom: 2px solid ${colorObj.baseBlue};
    }
    font-size: 1.4rem;
    ${device.mobileM} {
      font-size: 1.2rem;
    }
  }
  a {
    color: blue;
    text-decoration: underline;
    font-weight: 600;
    &:hover {
      color: red;
      transition: all 0.4s;
    }
  }
  p {
    font-size: 1.1rem;
    line-height: 1.9;
    ${device.mobileS} {
      font-size: 1rem;
    }
    code {
      border: 1px solid #ddd;
      background-color: #eee;
      color: #333;
      margin: 0 2px;
      padding: 0.1em 0.4em;
    }
  }
  img {
    width: 100%;
    height: auto;
    margin: 30px 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
  ul,
  ol {
    margin: 25px 0;
    padding: 0.5em 0.5em 0.5em 2em;
    background: #fffbf4;
    border: 2px solid #f3a6c3;
    border-radius: 3px;
    li {
      font-weight: 600;
      line-height: 1.9;
    }
  }
  blockquote {
    margin: 25px 0;
    padding: 12px;
    background: #ddd;
    border-radius: 3px;
    line-height: 1.9;
  }
  pre {
    margin: 20px 0;
    border-radius: 3px;
    overflow-x: scroll;
    code {
      font-size: 0.9rem;
      line-height: 2.2;
    }
  }
  iframe {
    margin 12px 0;
  }
`;

const header = getRequestHeader();

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.ENDPOINT}/blogs?fields=id&limit=9999`, header);
  const data = await res.json();

  const slugAry: PageSlug[] = data.contents;
  const paths = slugAry.map((post) => `/blogs/${post.id}`);

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context?.params?.id;
  const res = await fetch(`${process.env.ENDPOINT}/blogs/${id}`, header);
  const blog = await res.json();

  const $ = cheerio.load(blog.body, { _useHtmlParser2: true });

  const headings = $('h2, h3').toArray();
  const toc = headings.map((data) => ({
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
