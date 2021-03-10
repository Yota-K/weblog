export const contactApiEndpoint = () => {
  if (process.env.NEXT_STAGING_ENV === 'staging') {
    return 'https://62ywjv9wti.execute-api.ap-northeast-1.amazonaws.com/dev/send-mail';
  } else if (process.env.NEXT_PROD_ENV === 'prod') {
    return 'https://3b1ej2urge.execute-api.ap-northeast-1.amazonaws.com/prod/send-mail';
  } else {
    return 'http://0.0.0.0:9000/dev/send-mail';
  }
};
