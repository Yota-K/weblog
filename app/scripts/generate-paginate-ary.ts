export const paginateAry = (totalCount: number) => {
    return [...new Array(totalCount).keys()].map(i => ++i);
};
