const axios = require('axios');
require('dotenv').config();
const fs = require('fs');

(async () => {
  const header = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };

  const res = await axios.get(
    `${process.env.ENDPOINT}/blogs?fields=id,title,tag_field.name&limit=9999&?orders=-publishedAt`,
    header
  );
  const searchJSON = await res.data.contents;

  // 書き込み処理を行う
  process.env.IS_NETLIFY === 'netlify'
    ? fs.writeFileSync('./out/search.json', JSON.stringify(searchJSON))
    : fs.writeFileSync('./public/search.json', JSON.stringify(searchJSON));

  console.info('検索用のJSONの生成に成功しました');
})();
