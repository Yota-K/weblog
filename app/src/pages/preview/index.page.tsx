import MarkdownIt from 'markdown-it';
import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import Layout from '@/components/Layout';
import PostThumbnail from '@/components/PostThumbnail';
import Seo from '@/components/Seo';
import SocialLinks from '@/components/SocialLinks';
import Toc from '@/components/Toc';
import { config } from '@/config/app';
import { ShareArea, MyContent, PostDiv } from '@/share/blog';
import { CategoryLabel } from '@/share/CategoryLabel';
import { H1 } from '@/share/Heading';
import { TagArea } from '@/share/TagArea';
import { TagLabel } from '@/share/TagLabel';
import { TimeStamp } from '@/share/TimeStamp';
import { dateFormat } from '@/utils/date-format';
import { Props, getServerSideProps } from './index.hook';

const Preview: NextPage<Props> = ({ blog, toc, body, draftKey }) => {
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
            {blog.category_field.name}
          </Link>
        </CategoryLabel>
        <TagArea>
          {blog.tag_field.map((tag) => (
            <TagLabel key={tag.id}>
              <Link href="/tags/[id]" as={`/tags/${tag.id}`}>
                {tag.name}
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

export default Preview;

export { getServerSideProps };
