export const dateFormat = (createdAt: string) => {
    const reg = new RegExp('T0.+');
    const date = createdAt.replace(reg, "");
    const formatDate = date.replace(/-/g, "\/");
    return formatDate;
};
