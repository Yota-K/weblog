import React from 'react';
import { NextComponentType, NextPageContext } from 'next';
import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { API } from '../../api/api';
import { TagJson } from '../../interfaces/taxonomy';
import Head from '../../components/Head';
import Layout from '../../components/Layout';
import { dateFormat } from '../../scripts/date-format';

import { H2, H3 } from '../../share/Heading';
import { BlogCard, PostThumbnail, PostInfo } from '../../share/BlogCard';
import { CategoryLabel } from '../../share/CategoryLabel';
import { TagArea } from '../../share/TagArea';
import { TagLabel } from '../../share/TagLabel';
import { TimeStamp } from '../../share/TimeStamp';

interface Props {
    tags: TagJson;
}

const Tags: NextComponentType<NextPageContext, {}, Props> = ({ tags }) => {
    return (
        <Layout>
            <Head title={`${tags.name}｜カルキチのブログ`} />
            <div id="tags">
            <H2>タグ：{tags.name}</H2>
            {tags.posts.map(blog => 
                <BlogCard key={blog.id}>
                    <PostThumbnail>
                        <LazyLoadImage
                            src={`${blog.thumbnail.url}`}
                            alt='thumbnail'
                            effect="blur"
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

Tags.getInitialProps = async (context: any) => {
    const url = API.BASE_URL;
    const {id} = context.query;
    const api = new API();
    const data = await api.getTags(url, id);

    data.posts.sort((a,b) => (a.createdAt < b.createdAt ? 1 : -1));

    return {tags: data};
};

export default Tags;
