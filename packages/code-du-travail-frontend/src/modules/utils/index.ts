export const getBaseUrl = (url: string) => {
  return url.replace(/\?.*$/, "");
};
