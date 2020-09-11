import { useRouter } from 'next/router';

export const pathNameChecker = (pageType: string): RegExpMatchArray | null | undefined => {
  const router = useRouter();
  const path = router.asPath;

  let result;

  switch (pageType) {
    case 'blog':
      result = path.match(/\/blogs\/.+$/g);
      break;
    case 'category':
      result = path.match(/\/category\/.+$/g);
      break;
    case 'tag':
      result = path.match(/\/tags\/.+$/g);
      break;
    default:
  }

  return result;
};
