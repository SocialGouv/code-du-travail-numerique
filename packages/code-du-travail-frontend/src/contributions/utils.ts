export const removeCCNumberFromSlug = (slug: string): string =>
  slug.split("-").slice(1).join("-");
