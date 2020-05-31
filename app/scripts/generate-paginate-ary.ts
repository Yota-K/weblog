export const paginateAry = (totalCount: number): number[] => {
  return [...new Array(totalCount).keys()].map((i) => ++i);
};
