import { TaxonomyAry } from '../interfaces/taxonomy';
import { paginateAry } from './generate-paginate-ary';

interface ResultPathAry {
  params: {
    slug: string;
    id: number;
  };
}

export const generateBuildPaginatePath = (contents: TaxonomyAry[], paginateNum: number): ResultPathAry[] => {
  const slugAry: {
    slug: string;
    count: number;
  }[] = [];

  // 以下のようなオブジェクトを持った配列を生成する
  // [
  //  {slug: 'front-end': count: 2}
  // ]
  contents.forEach((content) => {
    const postLength = content.posts.length;
    const count = paginateAry(postLength);

    let totalCount;
    const countLength = count.length;

    if (countLength <= paginateNum) {
      // 記事数の合計が5記事以下の場合はページネーションは不要なので1を代入する
      totalCount = 1;
    } else {
      totalCount = Math.ceil(countLength / paginateNum);
    }

    slugAry.push({
      slug: content.id,
      count: totalCount,
    });
  });

  // 二次元配列を生成する
  // [
  //   [
  //     {params: {slug: 'front-end', id: 1}},
  //     {params: {slug: 'front-end', id: 2}},
  //   ],
  //   [
  //     {params: {slug: 'front-end', id: 1}},
  //   ],
  // ]
  const pathAry = slugAry.map((tag) => {
    const count = tag.count;

    return [...new Array(count)].map((_, i) => ({
      params: { slug: tag.slug, id: ++i },
    }));
  });

  // reduceで二次元配列を一次元配列に変換
  const resultAry = pathAry.reduce((prev, current) => {
    return [...prev, ...current];
  }, []);

  return resultAry;
};
