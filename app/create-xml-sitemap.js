/* eslint-disable */
const axios = require('axios');
require('dotenv').config();

const { SitemapStream } = require('sitemap');
const { createWriteStream } = require('fs');
const path = require('path');
const host = 'https://karukichi-blog.netlify.app';
/* eslint-disable */

// sitemap.xmlのオプション
const sitemapOptions = {
  hostname: host,
  lastmodDateOnly: true, // print date not time
  xmlns: {
    news: false,
    image: false,
    video: false,
    custom: [
      'xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"',
      'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"',
    ],
  },
};

// 記事のスラッグをAPI経由で取得
const getUrlByApi = async () => {
  const header = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };

  const res = await axios.get(
    `${process.env.ENDPOINT}/blogs?fields=id,updatedAt&limit=9999&?orders=-publishedAt`,
    header
  );

  const contents = await res.data.contents;

  return contents.map((item) => {
    const updatedAt = item.updatedAt;
    const lastmod = updatedAt.replace(/T.+$/g, '');

    return {
      url: `${host}/${item.id}`,
      lastmod: lastmod,
    };
  });
};

// メインの処理
(async () => {
  try {
    const sitemapStream = new SitemapStream(sitemapOptions);

    // 書き込み用のファイルを開く
    if (process.env.IS_NETLIFY) {
      console.info('sitemap.xmlの生成：Netlifyで実行します。');
      sitemapStream.pipe(createWriteStream(path.resolve('./out/sitemap.xml')));
    } else {
      console.info('sitemap.xmlの生成：開発環境で実行します。');
      sitemapStream.pipe(createWriteStream(path.resolve('./public/sitemap.xml')));
    }

    const urls = await getUrlByApi();
    const getRecentlyLastMod = urls[0].lastmod;

    // 静的ページのrouteを処理
    sitemapStream.write({
      url: '/',
      lastmod: getRecentlyLastMod,
    });

    // apiデータが必要な動的なrouteを処理
    urls.forEach((url) => sitemapStream.write(url));

    sitemapStream.end();

    console.info('sitemap.xmlの生成に成功しました');
  } catch (er) {
    const { status, statusText } = er.respose;

    console.error(`HTTP Status: ${status} ${statusText}`);
    console.error('sitemap.xmlの生成に失敗しました');
  }
})();
