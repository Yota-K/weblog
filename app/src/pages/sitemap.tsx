import { NextPage, GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

import { config } from '../../config/app';

import { Sitemap } from '../../interfaces/sitemap';

import { getRequestHeader } from '../../scripts/get-request-header';

import { colorObj } from '../../share/variables';

import Breadcrumb from '../components/Breadcrumb';
import Head from '../components/Head';
import Layout from '../components/Layout';

interface Props {
  contents: Sitemap[];
}

const BlogSitemap: NextPage<Props> = ({ contents }) => {
  const { siteTitle } = config.siteInfo;
  const pageTitle = 'サイトマップ';
  const title = `${siteTitle}｜${pageTitle}`;

  return (
    <Layout>
      <Head title={title} />
      <Breadcrumb pageTitle={pageTitle} />
      <h1>{pageTitle}</h1>
      <SitemapDiv>
        {contents.map((content) => (
          <ul key={content.id}>
            <li>
              <Link href="/category/[id]" as={`/category/${content.id}`}>
                <a>{content.name}</a>
              </Link>
            </li>
            <ul>
              {content.posts.map((post) => (
                <li key={post.id}>
                  <Link href="/blogs/[id]" as={`/blogs/${post.id}`}>
                    <a>{post.title}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </ul>
        ))}
      </SitemapDiv>
    </Layout>
  );
};

const header = getRequestHeader();

export const getStaticProps: GetStaticProps = async () => {
  const params = `?fields=id,name,posts.id,posts.createdAt,posts.title&limit=9999`;
  const res = await fetch(`${process.env.ENDPOINT}/category${params}`, header);
  const data = await res.json();

  const contents: Sitemap[] = data.contents;
  contents.map((blog) => {
    const posts = blog.posts;
    posts.sort((a, b) => {
      return a.createdAt < b.createdAt ? 1 : -1;
    });
  });

  return {
    props: {
      contents: contents,
    },
  };
};

const SitemapDiv = styled.div`
  margin-top: 30px;
  ul {
    margin-bottom: 20px;
    a {
      color: ${colorObj.baseBlue};
    }
    ul {
      margin-left: 20px;
      li {
        line-height: 190%;
      }
    }
  }
`;

export default BlogSitemap;
