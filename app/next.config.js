const axios = require('axios');
require('dotenv').config();

module.exports = {
    env: {
        access_key: process.env.API_KEY,
    },
    exportPathMap: async function() {
        const paths = {
            '/': {page: '/'},
        };

        const headers = {
            headers: {'X-API-KEY': process.env.API_KEY}
        };

        const blogRes = await axios.get(
            `https://karukichi-tech-blog.microcms.io/api/v1/blogs`,
            headers,
        );
        const tagRes = await axios.get(
            `https://karukichi-tech-blog.microcms.io/api/v1/tags`,
            headers,
        );

        const blogs = blogRes.data.contents;
        for (blog of blogs) {
            paths[`/blogs/${blog.id}`] = {page: '/blogs/[id]', query: {id: blog.id}};
        }

        const tags = tagRes.data.contents;
        for (tag of tags) {
            paths[`/tags/${tag.id}`] = {page: '/tags/[id]', query: {id: tag.id}};
        }

        return paths;
    },
};
