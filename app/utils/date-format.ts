export const dateFormat = (createdAt: string) => {
  const date = createdAt.replace(/T.+$/g, '');
  return date;
};
