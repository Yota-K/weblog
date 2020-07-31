module.exports = {
  env: {
    access_key: process.env.API_KEY,
  },
  exportPathMap: async function () {
    const paths = {
      '/': { page: '/' },
    };
    return paths;
  },
};
