import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import Breadcrumb from '@/components/Breadcrumb';
import Seo from '@/components/Seo';
import Layout from '@/components/Layout';
import { config } from '@/config/app';
import { Sitemap } from '@/types/sitemap';
import { colorObj } from '@/share/variables';
import { getStaticProps } from './index.hook';

type Props = {
  contents: Sitemap[];
};

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
                {content.name}
              </Link>
            </li>
            <PostList>
              <ul>
                {content.posts.map((post) => (
                  <li key={post.id}>
                    <Link href="/blogs/[id]" as={`/blogs/${post.id}`}>
                      {post.title}
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

export { getStaticProps };
