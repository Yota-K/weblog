import { createClient } from 'microcms-js-sdk';
import { config } from '@/config/app';

const { serviceDomain } = config.siteInfo;

export const client = createClient({
  serviceDomain,
  apiKey: process.env.API_KEY || '',
});
