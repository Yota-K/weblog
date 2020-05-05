// const withTypescript = require('@zeit/next-typescript');
// const path = require('path');
// const Dotenv = require('dotenv-webpack');
// 
// module.exports = withTypescript(
//     webpack(config => {
//         config.plugins = [
//             new Dotenv({
//                 path: path.join(__dirname, '.env'),
//                 systemvars: true
//             })
//         ]
//     })
// );
require('dotenv').config();

module.exports = {
    env: {
        access_key: process.env.API_KEY,
    },
};
