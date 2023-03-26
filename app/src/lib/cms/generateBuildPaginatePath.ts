import { BuildTaxonomyPaginateList } from '@/types/taxonomy';
import { config } from '@/config/app';

type Result = {
  params: {
    id: number;
    slug: string;
  };
}[];

type SlugAly = {
  slug: string;
  count: number;
};

export const generateBuildPaginatePath = (contents: BuildTaxonomyPaginateList[]): Result => {
  const { paginateNum } = config;

  // 以下のようなオブジェクトを持った配列を生成する
  // 例：front-endカテゴリーの記事が11記事以上、15記事以下の場合
  // [
  //   {slug: 'front-end', count: 1},
  //   {slug: 'front-end', count: 2},
  //   {slug: 'front-end', count: 3},
  // ],
  const slugAry: SlugAly[] = [];
  contents.forEach((e) => {
    const { id, posts } = e;

    // 各カテゴリ・タグに属する投稿の数
    const postLength = posts.length;

    // 記事数が
    let count = 1;

    if (paginateNum < postLength) {
      // - 6記事の場合・・・6 / 5 = 1
      // - 11記事の場合・・・11 / 5 = 2
      count = Math.ceil(postLength / paginateNum);
    }

    slugAry.push({
      slug: id,
      count,
    });
  });
  console.info(slugAry);

  // 二次元配列を生成する
  // [
  //   [
  //     {params: {slug: 'front-end', id: 1}},
  //     {params: {slug: 'front-end', id: 2}},
  //   ],
  //   [
  //     {params: {slug: 'back-end', id: 1}},
  //   ],
  // ]
  const paramsAry = slugAry.map((e) => {
    const { count, slug } = e;
    return [...new Array(count)].map((_, i) => ({
      params: { slug, id: ++i },
    }));
  });
  console.info(paramsAry);

  // 二次元配列を一次元配列に変換
  const result = paramsAry.flat();
  console.info(result);

  return result;
};
