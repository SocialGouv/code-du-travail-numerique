import getConfig from "next/config";

import { MappingReplacement } from "../constants";

const {
  publicRuntimeConfig: { AZURE_BASE_URL, AZURE_CONTAINER },
} = getConfig();

export const toUrl = (file: string): string => {
  if (!file) return "";
  const index = file.lastIndexOf("/");
  const filename = index !== -1 ? file.substring(index + 1) : file;
  return `${AZURE_BASE_URL}/${AZURE_CONTAINER}/${filename}`;
};

export const removeQueryParameters = (url: string): string => {
  const index = url.indexOf("?");
  return index !== -1 ? url.substring(0, index) : url;
};

export const urlIdccReplacement = (url: string): string => {
  return url;
};
