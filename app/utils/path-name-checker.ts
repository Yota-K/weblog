import { useRouter } from 'next/router';

// 記事ページかどうかのチェックを行う
export const pathNameChecker = () => {
  const router = useRouter();
  const path = router.asPath;

  return /\/blogs\/.+$/g.test(path);
};
