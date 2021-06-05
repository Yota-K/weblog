import { BuildTaxonomyPaginateList } from '../interfaces/taxonomy';
import { config } from '../config/app';

export const generateBuildPaginatePath = (contents: BuildTaxonomyPaginateList[]) => {
  const paginateNum = config.paginateNum;

  const slugAry: {
    slug: string;
    count: number;
  }[] = [];

  // 以下のようなオブジェクトを持った配列を生成する
  // 例：front-endカテゴリーの記事が11記事以上、15記事以下の場合
  // [
  //   {slug: 'front-end', count: 1},
  //   {slug: 'front-end', count: 2},
  //   {slug: 'front-end', count: 3},
  // ],
  contents.forEach((content) => {
    // 各カテゴリ・タグに属する投稿の数
    const postLength = content.posts.length;

    let totalCount: number;

    if (postLength <= paginateNum) {
      // 記事数の合計が5記事以下の場合はページネーションは不要なので1を代入する
      totalCount = 1;
    } else {
      totalCount = Math.ceil(postLength / paginateNum);
    }

    slugAry.push({
      slug: content.id,
      count: totalCount,
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
  const paramsAry = slugAry.map((el) => {
    const count = el.count;

    return [...new Array(count)].map((_, i) => ({
      params: { slug: el.slug, id: ++i },
    }));
  });

  console.info(paramsAry);

  // reduceで二次元配列を一次元配列に変換
  const resultAry = paramsAry.reduce((prev, current) => {
    return [...prev, ...current];
  }, []);

  console.info(resultAry);

  return resultAry;
};
