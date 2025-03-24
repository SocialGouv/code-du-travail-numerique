export function getIdConvention(url: string): string | null {
  if (!url) return null;

  try {
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);
    return params.get("idConvention");
  } catch (error) {
    return null;
  }
}
