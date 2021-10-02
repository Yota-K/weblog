import { NextPage, GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

import { config } from '@/config/app';

import { Sitemap } from '@/interfaces/sitemap';

import { getApiKey } from '@/utils/get-api-key';

import { colorObj } from '@/share/variables';

import Breadcrumb from '@/components/Breadcrumb';
import Seo from '@/components/Seo';
import Layout from '@/components/Layout';

interface Props {
  contents: Sitemap[];
}

const BlogSitemap: NextPage<Props> = ({ contents }) => {
  const { siteTitle } = config.siteInfo;
  const pageTitle = 'サイトマップ';
  const title = `${siteTitle}｜${pageTitle}`;

  return (
    <Layout>
      <Seo title={title} />
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
            <PostList>
              <ul>
                {content.posts.map((post) => (
                  <li key={post.id}>
                    <Link href="/blogs/[id]" as={`/blogs/${post.id}`}>
                      <a>{post.title}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </PostList>
          </ul>
        ))}
      </SitemapDiv>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const key = getApiKey();

  const params = `?fields=id,name,posts.id,posts.createdAt,posts.title&limit=9999`;
  const res = await fetch(`${process.env.ENDPOINT}/category${params}`, key);
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
      contents,
    },
  };
};

const SitemapDiv = styled.div`
  margin: 30px 0 0 18px;

  ul {
    margin-bottom: 20px;

    a {
      color: ${colorObj.baseBlue};
    }
  }
`;

const PostList = styled.li`
  list-style: none;

  ul {
    margin-left: 20px;

    li {
      line-height: 190%;
    }
  }
`;

export default BlogSitemap;
