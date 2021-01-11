export const getRequestHeader = () => {
  return {
    headers: {
      'X-API-KEY': process.env.API_KEY || '',
    },
  };
};
