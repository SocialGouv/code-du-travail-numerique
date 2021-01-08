import getConfig from "next/config";

const {
  publicRuntimeConfig: { AZURE_BASE_URL, AZURE_CONTAINER },
} = getConfig();

export function toUrl(file) {
  try {
    const [filename] = file.match(/[^/]+$/);
    return `${AZURE_BASE_URL}/${AZURE_CONTAINER}/${filename}`;
  } catch (error) {
    return file;
  }
}
