const axios = require('axios');
require('dotenv').config();

module.exports = {
    exportPathMap: async function() {
        const paths = {
            '/': {page: '/'},
        };

        // const headers = {
        //     headers: {'X-API-KEY': process.env.API_KEY}
        // };

        // const blogRes = await axios.get(
        //     `https://karukichi-tech-blog.microcms.io/api/v1/blogs`,
        //     headers,
        // );
        // const tagRes = await axios.get(
        //     `https://karukichi-tech-blog.microcms.io/api/v1/tags`,
        //     headers,
        // );
        // const blogs = blogRes.data.contents;
        // blogs.forEach(blog => {
        //     paths[`/blogs/${blog.id}`] = {page: '/blogs/[id]', query: {id: blog.id}};
        // });

        // const tags = tagRes.data.contents;
        // tags.forEach(tag => {
        //     paths[`/tags/${tag.id}`] = {page: '/tags/[id]', query: {id: tag.id}};
        // })

        return paths;
    },
    env: {
        access_key: process.env.API_KEY,
    },
};
