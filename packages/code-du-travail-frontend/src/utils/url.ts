export const getCanonicalUrl = (url: string): string => {
  return url.replace(/\/\d+-/g, "/");
};
