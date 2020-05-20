import React from 'react';
import styled from 'styled-components';
import { NextComponentType, NextPageContext } from 'next';
import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import MarkdownIt from 'markdown-it';
import cheerio from 'cheerio';
import hljs from 'highlight.js'

import { API } from '../../api/api';
import Head from '../../components/Head';
import Layout from '../../components/Layout';
import SocialLinks from '../../components/SocialLinks';
import { BlogJson } from '../../interfaces/blog';
import { dateFormat } from '../../scripts/date-format';

import { colorObj } from '../../share/variables';
import { device } from '../../share/media-query';
import { H1 } from '../../share/Heading';
import { CategoryLabel } from '../../share/CategoryLabel';
import { TagArea } from '../../share/TagArea';
import { TagLabel } from '../../share/TagLabel';
import { TimeStamp } from '../../share/TimeStamp';

interface Props {
    blog: BlogJson;
    body: string;
}

const Blog: NextComponentType<NextPageContext, {}, Props> = ({ blog, body }) => {
    const url = `https://karukichi-blog.netlify.app/blogs/${blog.id}`;
    const md = new MarkdownIt({
        html: true
    });

    return (
        <Layout>
            <Head 
                title={`${blog.title}｜カルキチのブログ`} 
                description={blog.description}
                thumbnail={blog.thumbnail.url}
            />
            <div id="blog">
                <TimeStamp>{dateFormat(blog.createdAt)}</TimeStamp>
                <H1>{blog.title}</H1>
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
                <ShareArea>
                    <SocialLinks url={url} />
                </ShareArea>
                <Content>
                    <LazyLoadImage
                        className="eyecatch"
                        width="100%"
                        height="auto"
                        src={blog.thumbnail.url}
                        alt="thumbnail"
                        effect="blur"
                    />
                    <div className="post" dangerouslySetInnerHTML={{ __html: body}}></div>
                </Content>
            </div>
        </Layout>
    );
}

const ShareArea = styled.div`
    button {
        margin-right: 8px;
    }
`

const Content = styled.div`
    margin-top: 35px;
    min-height: 800px;
    word-break: break-all;
    .eyecatch {
        margin: -20px 0 60px;
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
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
            content: "";
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
        font-size: 18px;
        line-height: 35px;
    }
    img {
        width: 100%;
        height: auto;
        margin: 30px 0;
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
    }
    ul, ol {
        margin: 25px 0;
        padding: 0.5em 0.5em 0.5em 2em;
        background: #f1f1f1;
        border: 1px solid ${colorObj.borderGray};
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
            font-size: 14px;
            line-height: 2.2;
        }
    }
`

Blog.getInitialProps = async (context: any) => {
    const url:string = API.BASE_URL;
    const {id} = context.query;
    const api = new API();
    const blog = await api.getPost(url, id);

    const $ = cheerio.load(blog.body, { _useHtmlParser2: true });
    $('pre > code').each((i, elm):void => {
        const result = hljs.highlightAuto($(elm).text());
        $(elm).html(result.value);
        $(elm).addClass('hljs');
    });

    return {
        blog: blog,
        body: $.html(),
    };
};

export default Blog;
