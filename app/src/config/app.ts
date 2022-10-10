export const config = {
  siteInfo: {
    siteTitle: 'カルキチのブログ',
    siteUrl: 'https://karukichi-blog.netlify.app/',
    defaultDescription: 'カルキチ副島が運営するウェブ系の技術について執筆しているブログです。',
    ogpImage:
      'https://images.microcms-assets.io/protected/ap-northeast-1:4e1ce5b7-3cdc-47cb-b3a0-9c403488fea6/service/karukichi-tech-blog/media/top-ogp.png',
    serviceDomain: 'karukichi-tech-blog',
    endpoint: {
      blogs: 'blogs',
      category: 'category',
      tags: 'tags',
    },
  },
  headerNavLinks: [
    {
      title: 'フロントエンド',
      link: '/category/front-end',
    },
    {
      title: 'バックエンド',
      link: '/category/back-end',
    },
    {
      title: 'その他もろもろ',
      link: '/category/others',
    },
    {
      title: 'サイトマップ',
      link: '/sitemap',
    },
    {
      title: 'お問い合わせ',
      link: '/contact',
    },
  ],
  urls: {
    twitterUrl: 'https://twitter.com/karukichi_yah',
    githubUrl: 'https://github.com/Yota-K',
    profileUrl: 'https://karukichi.gatsbyjs.io/',
  },
  contactApiSettings: {
    prod: {
      host: 'karukichi-blog.netlify.app',
      endpoint: 'https://3b1ej2urge.execute-api.ap-northeast-1.amazonaws.com/prod/send-mail',
    },
    stg: {
      host: 'staging--karukichi-blog.netlify.app',
      endpoint: 'https://mlrwxvphj2.execute-api.ap-northeast-1.amazonaws.com/dev/send-mail',
    },
    local: {
      endpoint: 'http://0.0.0.0:9000/dev/send-mail',
    },
  },
  paginateNum: 5,
} as const;
