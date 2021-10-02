import { NextRouter } from 'next/router';

// 記事ページかどうかのチェックを行う
export const pathNameChecker = (router: NextRouter) => {
  const path = router.asPath;
  return /\/blogs\/.+$/g.test(path);
};
