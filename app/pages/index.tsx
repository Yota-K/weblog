import React from 'react';
import { NextComponentType, NextPageContext } from 'next';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { API } from '../api/api';
import Head from '../components/Head';
import Layout from '../components/Layout';
import { BlogJson } from '../interfaces/blog';
import { dateFormat } from '../scripts/date-format';

import { H2, H3 } from '../share/Heading';
import { BlogCard, PostThumbnail, PostInfo } from '../share/BlogCard';
import { CategoryLabel } from '../share/CategoryLabel';
import { TagArea } from '../share/TagArea';
import { TagLabel } from '../share/TagLabel';
import { TimeStamp } from '../share/TimeStamp';

interface Props {
    blogs: BlogJson[];
}

const Home: NextComponentType<NextPageContext, {}, Props> = ({ blogs }) => {
    const siteTitle = 'カルキチのブログ';

    return (
        <Layout>
            <Head title={siteTitle} />
            <div id="blog-list">
            <H2>記事一覧</H2>
            {blogs.map(blog =>
                <BlogCard key={blog.id}>
                    <PostThumbnail>
                        <LazyLoadImage
                            src={blog.thumbnail.url}
                            alt='thumbnail'
                            effect='blur'
                        />
                    </PostThumbnail>
                    <PostInfo>
                        <TimeStamp>{dateFormat(blog.createdAt)}</TimeStamp>
                        <H3><Link href="/blogs/[id]" as={`/blogs/${blog.id}`}>
                            <a>{blog.title}</a>
                        </Link></H3>
                        <CategoryLabel>
                            カテゴリー：
                            <Link href="/category/[id]" as={`/category/${blog.category_field.id}`}>
                                <a>{blog.category_field.name}</a>
                            </Link>
                        </CategoryLabel>
                        <TagArea>
                            {blog.tag_field.map((tag: any) => 
                                <TagLabel key={tag.id}>
                                    <Link href="/tags/[id]" as={`/tags/${tag.id}`}><a>{tag.name}</a></Link>
                                </TagLabel>
                            )}
                        </TagArea>
                    </PostInfo>
                </BlogCard>
            )}
            </div>
        </Layout>
    );
}

export async function getStaticProps() {
    const url = API.BASE_URL;
    const api = new API();
    const data = await api.getBlog(url);
    return {
        props: {
            blogs: data
        }
    }
};

export default Home;
