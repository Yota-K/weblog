export const dateFormat = (createdAt: string): string => {
  const reg = new RegExp('T.+');
  const date = createdAt.replace(reg, '');
  const formatDate = date.replace(/-/g, '/');

  return formatDate;
};
