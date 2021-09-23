import getConfig from "next/config";

const {
  publicRuntimeConfig: { AZURE_BASE_URL, AZURE_CONTAINER },
} = getConfig();

export function toUrl(fileName: string): string {
  try {
    const [filename] = fileName.match(/[^/]+$/);
    return `${AZURE_BASE_URL}/${AZURE_CONTAINER}/${filename}`;
  } catch (error) {
    return file;
  }
}

export const removeQueryParameters = (url: string): string => {
  const index = url.indexOf("?");
  return index !== -1 ? url.substring(0, index) : url;
};
