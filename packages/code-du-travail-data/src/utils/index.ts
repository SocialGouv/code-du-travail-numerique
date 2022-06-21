function parseIdcc(idcc: string): number {
  return parseInt(idcc, 10);
}

function formatIdcc(num: number | string): string {
  return `0000${num}`.slice(-4);
}

// Extract external content url from Content tag markdown
function extractMdxContentUrl(
  markdown: string | null | undefined
): string | null | undefined {
  if (!markdown) return;
  // Check Content tag exist on markdown
  const contentTag = /<Content.*?href="([^"]+)".*?>/.exec(markdown);
  return contentTag?.[1]?.match(
    /\bhttps?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/gi
  )?.[0];
}

export { extractMdxContentUrl, formatIdcc, parseIdcc };
