module.exports = {
  target: 'serverless',
  env: {
    API_KEY: process.env.API_KEY,
    ENDPOINT: process.env.ENDPOINT,
    RECAPTCHA_KEY: process.env.RECAPTCHA_KEY,
  },
  eslint: {
    // ビルド時にチェックを実行しない
    // falseの状態だと、エラーではなく警告でもビルドが通らなくなる
    // リントエラー解消したら消す。
    ignoreDuringBuilds: true,
    dirs: ['share/', 'src/components/', 'src/pages/', 'src/lib/', 'utils/'],
  },
  webpack: (config, { dev }) => {
    // Docker環境で動かしているため、ポーリングの設定を行う
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 200,
      };
    }

    return config;
  },
};
