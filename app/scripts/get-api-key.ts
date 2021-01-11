export const getApiKey = () => {
  return {
    headers: {
      'X-API-KEY': process.env.API_KEY || '',
    },
  };
};
