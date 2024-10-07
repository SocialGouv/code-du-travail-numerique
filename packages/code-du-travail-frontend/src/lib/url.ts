import { BUCKET_URL, BUCKET_DEFAULT_FOLDER } from "../config";

export const toUrl = (file: string): string => {
  if (!file) return "";
  const index = file.lastIndexOf("/");
  const filename = index !== -1 ? file.substring(index + 1) : file;
  return `${BUCKET_URL}/${BUCKET_DEFAULT_FOLDER}/${filename}`;
};

export const removeQueryParameters = (url: string): string => {
  const index = url.indexOf("?");
  return index !== -1 ? url.substring(0, index) : url;
};

export const getSourceUrlFromPath = (
  path: string | undefined,
  paramName = "src_url",
): string | null => {
  if (!path) return null;
  const url = new URL(!path.startsWith("https://") ? "https://" + path : path);
  return url.searchParams.get(paramName);
};
