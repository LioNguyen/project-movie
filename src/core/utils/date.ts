export const getYear = (d: string) => {
  const date = new Date(d);

  return date.getFullYear();
};
