import * as React from 'react';
import { NextComponentType, NextPageContext } from "next";
import Link from 'next/link';
import MarkdownIt from 'markdown-it';

import Head from '../../components/Head';
import Layout from '../../components/Layout';
import { API } from '../../api/api';
import { BlogJson } from '../../interfaces/blog';
import { dateFormat } from '../../scripts/date-format';

import { H1 } from '../../styled-components/atoms/Heading';
import { TimeStamp } from '../../styled-components/atoms/TimeStamp';
import { TagArea } from '../../styled-components/organisms/TagArea';
import { TagLabel } from '../../styled-components/atoms/TagLabel';
import { Content } from '../../styled-components/Content';

interface Props {
    blog: BlogJson;
}

const Blog: NextComponentType<NextPageContext, {}, Props> = ({ blog }) => {
    const md = new MarkdownIt({
        html: true
    });

    return (
        <Layout>
            <Head 
                title={blog.title} 
                description={blog.description}
            />
            <div id="blog">
                <H1 fontsize={'2.4rem'}>{blog.title}</H1>
                <TagArea>
                    {blog.tags.map(tag => 
                        <TagLabel key={tag.id}>
                            <Link href="/tags/[id]" as={`/tags/${tag.id}`}><a>{tag.name}</a></Link>
                        </TagLabel>
                    )}
                </TagArea>
                <TimeStamp>{dateFormat(blog.createdAt)}</TimeStamp>
                <Content>
                    <div className="post" dangerouslySetInnerHTML={{ __html: `${blog.body}`}}></div>
                </Content>
            </div>
        </Layout>
    );
}

Blog.getInitialProps = async (context: any) => {
    const url:string = API.BASE_URL;
    const {id} = context.query;
    const api = new API();
    const blog = await api.getPost(url, id);
    return {blog};
}

export default Blog;
