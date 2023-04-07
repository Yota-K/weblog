const withLinaria = require('next-linaria');

module.exports = withLinaria({
  // target: 'serverless',
  eslint: {
    // ビルド時にチェックを実行しない
    // falseの状態だと、エラーではなく警告でもビルドが通らなくなる
    // リントエラー解消したら消す。
    ignoreDuringBuilds: true,
    dirs: ['share/', 'src/components/', 'src/pages/', 'src/lib/', 'utils/'],
  },
  webpack(config, { dev }) {
    // Docker環境で動かしているため、ポーリングの設定を行う
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 200,
      };
    }
    return config;
  },
  swcMinify: false,
  // page.tsxという拡張子以外ページとして認識しないようにする
  pageExtensions: ['page.tsx'],
});
