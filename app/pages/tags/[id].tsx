import React from 'react';
import { NextComponentType, NextPageContext } from "next";
import { useRouter } from 'next/router';
import Link from 'next/link';

import { API } from '../../api/api';
import Head from '../../components/Head';
import Layout from '../../components/Layout';
import { BlogJson } from '../../interfaces/blog';
import { TagJson } from '../../interfaces/tag';
import { dateFormat } from '../../scripts/date-format';

import { BlogCard } from '../../styled-components/organisms/BlogCard';
import { H2, H3 } from '../../styled-components/atoms/Heading';
import { TagArea } from '../../styled-components/organisms/TagArea';
import { TagLabel } from '../../styled-components/atoms/TagLabel';

interface Props {
    blogs: BlogJson[];
}

const Tags: NextComponentType<NextPageContext, {}, Props> = ({ blogs }) => {
    const getTagId = () => {
        const router = useRouter();
        const path = router.asPath;
        const reg = new RegExp('\/tags\/');
        const formatPath = path.replace(reg, "");
        return formatPath;
    }

    const getTagList = () => {
        return blogs.map(blog => 
            blog.tags.find(el => {
                if (el.id === getTagId()) return el.name;
            })
        );
    }

    const tagname = () => {
        const tags: (TagJson | undefined)[] = getTagList()!;
        const tagname = tags[0]!.name;
        return tagname;
    }

    return (
        <Layout>
            <Head title={`${tagname()}｜カルキチのブログ`} />
            <div id="tags">
            <H2>{tagname()}</H2>
            {blogs.map((blog) => 
                <BlogCard key={blog.id}>
                    <H3><Link href="/blogs/[id]" as={`/blogs/${blog.id}`}>
                        <a>{blog.title}</a>
                    </Link></H3>
                    <TagArea>
                        {blog.tags.map(tag => 
                            <TagLabel key={tag.id}>
                                <Link href="/tags/[id]" as={`/tags/${tag.id}`}><a>{tag.name}</a></Link>
                            </TagLabel>
                        )}
                    </TagArea>
                    <span className="timestamp">{dateFormat(blog.createdAt)}</span>
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
    const data = await api.getTags(url, id)
    return {blogs: data};
}

export default Tags;
