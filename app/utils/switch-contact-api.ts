// ホスト名を取得して、ホスト名で分岐させる
export const contactApiEndpoint = () => {
  const host = location.host;

  if (host === 'karukichi-blog.netlify.app') {
    return 'https://3b1ej2urge.execute-api.ap-northeast-1.amazonaws.com/prod/send-mail';
  } else if (host === 'staging--karukichi-blog.netlify.app') {
    return 'https://mlrwxvphj2.execute-api.ap-northeast-1.amazonaws.com/dev/send-mail';
  } else {
    return 'http://0.0.0.0:9000/dev/send-mail';
  }
};
