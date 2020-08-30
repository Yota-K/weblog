import { TaxonomyAry } from '../interfaces/taxonomy';

interface ResultPathAry {
  params: {
    slug: string;
    id: number;
  };
}

export const generateBuildPaginatePath = (contents: TaxonomyAry[], offsetNum: number): ResultPathAry[] => {
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
    const count = [...new Array(postLength).keys()].map((i) => ++i);

    let totalCount;
    const countLength = count.length;

    if (countLength <= offsetNum) {
      totalCount = 1;
    } else {
      totalCount = Math.floor(countLength / offsetNum) + 1;
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
