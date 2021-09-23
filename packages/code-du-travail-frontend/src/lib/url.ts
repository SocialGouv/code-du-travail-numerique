import getConfig from "next/config";

const {
  publicRuntimeConfig: { AZURE_BASE_URL, AZURE_CONTAINER },
} = getConfig();

export function toUrl(file?: any): any {
  try {
    const [filename] = file.match(/[^/]+$/);
    return `${AZURE_BASE_URL}/${AZURE_CONTAINER}/${filename}`;
  } catch (error) {
    return file;
  }
}

export const removeQueryParameters = (url: string): string => {
  const index = url.indexOf("?");
  return index !== -1 ? url.substring(0, index) : url;
};
