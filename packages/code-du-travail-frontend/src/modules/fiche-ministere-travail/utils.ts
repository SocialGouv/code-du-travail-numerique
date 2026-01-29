export const normalizeHeadingsToH2 = (html: string): string => {
  // Transform h3, h4, h5, h6 to h2 to ensure content always starts with h2
  return html.replace(
    /<h([3-6])(\s[^>]*)?>|<\/h([3-6])>/gi,
    (match, openLevel, attrs, closeLevel) => {
      if (closeLevel) {
        return "</h2>";
      }
      return `<h2${attrs || ""}>`;
    }
  );
};
