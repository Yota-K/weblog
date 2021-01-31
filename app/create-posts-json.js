/* eslint-disable */
const axios = require('axios');
require('dotenv').config();
const fs = require('fs');
/* eslint-disable */

(async () => {
  try {
    const key = {
      headers: { 'X-API-KEY': process.env.API_KEY },
    };

    const res = await axios.get(
      `${process.env.ENDPOINT}/blogs?fields=id,title,tag_field.name&limit=9999&?orders=-publishedAt`,
      key
    );

    const searchJSON = await res.data.contents;

    // 書き込み処理を行う
    if (process.env.IS_NETLIFY) {
      console.info('検索用JSONの生成：Netlifyで実行します。');
      fs.writeFileSync('./public/search.json', JSON.stringify(searchJSON));
    } else {
      console.info('検索用JSONの生成：開発環境で実行します。');
      fs.writeFileSync('./public/search.json', JSON.stringify(searchJSON));
    }

    console.info('検索用のJSONの生成に成功しました');
  } catch (er) {
    const { status, statusText } = er.respose;

    console.error(`HTTP Status: ${status} ${statusText}`);
    console.error('検索用のJSONの生成に失敗しました');
  }
})();
