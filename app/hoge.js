require('dotenv').config();
const fs = require('fs');

(async () => {
  console.log(process.env.API_KEY);
  console.log(process.env.ENDPOINT);
  const searchJSON = { x: 5, y: 6 };
  fs.writeFileSync('./out/search.json', JSON.stringify(searchJSON, null, 2));
})();
