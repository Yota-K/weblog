export const contactApiEndpoint = () => {
  if (process.env.NEXT_STAGING_ENV === 'staging') {
    return process.env.STG_CONTACT_ENDPOINT || '';
  } else if (process.env.NEXT_PROD_ENV === 'prod') {
    return process.env.PROD_CONTACT_ENDPOINT || '';
  } else {
    return 'http://0.0.0.0:9000/dev/send-mail';
  }
};
