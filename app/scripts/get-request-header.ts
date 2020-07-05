export const getRequestHeader = () => {
  const key = {
    headers: {
      'X-API-KEY': process.env.API_KEY || '',
    },
  };
  return key;
};
