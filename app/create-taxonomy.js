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

    const res = await axios.get(`https://${process.env.ENDPOINT}.microcms.io/api/v1/taxonomy`, key);

    const categories = await res.data.categories;
    const tags = await res.data.tags;
    const json = {
      categories,
      tags,
    };

    // 書き込み処理を行う
    console.info('カテゴリー・タグのJSONを生成します');
    fs.writeFileSync('./public/taxonomy.json', JSON.stringify(json));

    console.info('カテゴリー・タグのJSONの生成に成功しました');
  } catch (er) {
    const { status, statusText } = er.respose;

    console.error(`HTTP Status: ${status} ${statusText}`);
    console.error('カテゴリー・タグのJSONの生成に失敗しました');
  }
})();
