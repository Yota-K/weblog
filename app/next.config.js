const axios = require('axios'); // eslint-disable-line

module.exports = {
  env: {
    access_key: process.env.API_KEY,
  },
  exportPathMap: async function () {
    const paths = {
      '/': { page: '/' },
    };

    const headers = {
      headers: { 'X-API-KEY': process.env.API_KEY },
    };

    const blogRes = await axios.get(`https://karukichi-tech-blog.microcms.io/api/v1/blogs`, headers);
    const tagRes = await axios.get(`https://karukichi-tech-blog.microcms.io/api/v1/tags`, headers);
    const categoryRes = await axios.get(`https://karukichi-tech-blog.microcms.io/api/v1/category`, headers);

    // ページネーションのビルド設定
    const totalCount = blogRes.data.totalCount;
    const defaultParams = 0;

    const totalCountAry = [...new Array(totalCount).keys()].map((i) => ++i);
    let offsetParamsAry = [defaultParams];
    for (const num of totalCountAry) {
      if (num % 5 === 0) offsetParamsAry.push(num);
    }

    offsetParamsAry.forEach((page, i) => {
      axios.get(`https://karukichi-tech-blog.microcms.io/api/v1/blogs?offset=${page}&limit=10`, headers);
      // ページネーションは1から始まるため
      const pageNum = ++i;
      paths[`/page/${pageNum}`] = { page: '/page/[id]', query: { id: pageNum } };
    });

    // const blogs = blogRes.data.contents;
    // for (const blog of blogs) {
    //   paths[`/blogs/${blog.id}`] = { page: '/blogs/[id]', query: { id: blog.id } };
    // }

    const tags = tagRes.data.contents;
    for (const tag of tags) {
      paths[`/tags/${tag.id}`] = { page: '/tags/[id]', query: { id: tag.id } };
    }

    const categories = categoryRes.data.contents;
    for (const category of categories) {
      paths[`/category/${category.id}`] = { page: '/category/[id]', query: { id: category.id } };
    }

    return paths;
  },
};
