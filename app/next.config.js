module.exports = {
  env: {
    API_KEY: process.env.API_KEY,
    ENDPOINT: process.env.ENDPOINT,
  },
  exportPathMap: async function () {
    const paths = {
      '/': { page: '/' },
    };
    return paths;
  },
};
