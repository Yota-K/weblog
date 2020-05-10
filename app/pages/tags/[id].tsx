import React from 'react';
import { NextComponentType, NextPageContext } from "next";
import Link from 'next/link';

import { API } from '../../api/api';
import Head from '../../components/Head';
import Layout from '../../components/Layout';
import { TagJson } from '../../interfaces/tag';
import { dateFormat } from '../../scripts/date-format';

import { H2, H3 } from '../../styled-components/atoms/Heading';
import { BlogCard } from '../../styled-components/organisms/BlogCard';
import { TagArea } from '../../styled-components/organisms/TagArea';
import { TagLabel } from '../../styled-components/atoms/TagLabel';
import { TimeStamp } from '../../styled-components/atoms/TimeStamp';

interface Props {
    tags: TagJson;
}

const Tags: NextComponentType<NextPageContext, {}, Props> = ({ tags }) => {
    return (
        <Layout>
            <Head title={`${tags.name}｜カルキチのブログ`} />
            <div id="tags">
            <H2>{tags.name}</H2>
            {tags.posts.map(blog => 
                <BlogCard key={blog.id}>
                    <H3><Link href="/blogs/[id]" as={`/blogs/${blog.id}`}>
                        <a>{blog.title}</a>
                    </Link></H3>
                    <TagArea>
                        {blog.tag_field[0].tags.map(tag => 
                            <TagLabel key={tag.id}>
                                <Link href="/tags/[id]" as={`/tags/${tag.id}`}><a>{tag.name}</a></Link>
                            </TagLabel>
                        )}
                    </TagArea>
                    <TimeStamp>{dateFormat(blog.createdAt)}</TimeStamp>
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
    return {tags: data};
}

export default Tags;
