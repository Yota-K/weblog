import { useRouter } from 'next/router';
import { PageTypes } from '../interfaces/page-types';

// オブジェクトのkeyを元にUnion型を生成する
type PageTypes = typeof PageTypes[keyof typeof PageTypes];

export const pathNameChecker = (pageType: PageTypes) => {
  const router = useRouter();
  const path = router.asPath;

  switch (pageType) {
    case PageTypes.blogs: {
      return /\/blogs\/.+$/g.test(path);
    }
    case PageTypes.category: {
      return /\/category\/.+$/g.test(path);
    }
    case PageTypes.tag: {
      return /\/tags\/.+$/g.test(path);
    }
    default: {
      const check: never = pageType; // eslint-disable-line no-unused-vars
    }
  }
};
