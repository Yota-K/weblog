interface Config {
  siteInfo: {
    siteTitle: string;
    defaultDescription: string;
  };
  twitterUrl: string;
  githubUrl: string;
  paginateNum: number;
}

export const config: Config = {
  siteInfo: {
    siteTitle: 'カルキチのブログ',
    defaultDescription: '駆け出しウェブエンジニアカルキチ副島が運営するウェブ系の技術をメインに書くブログです。',
  },
  twitterUrl: 'https://twitter.com/karukichi_yah',
  githubUrl: 'https://github.com/Yota-K',
  paginateNum: 5,
};
