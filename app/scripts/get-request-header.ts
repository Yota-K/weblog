import { RequestHeader } from '../interfaces/request-header';

export const getRequestHeader = (): RequestHeader => {
  const key = {
    headers: {
      'X-API-KEY': process.env.API_KEY || '',
    },
  };

  return key;
};
