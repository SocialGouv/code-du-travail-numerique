const numCompare = (a, b) => {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
};

const sortByKey = key => (a, b) =>
  typeof a[key] === "number"
    ? numCompare(a[key], b[key])
    : `${a[key]}`.localeCompare(`${b[key]}`);

const getVariants = row => {
  const others =
    (row.variants && row.variants.split("\n").map(variant => variant.trim())) ||
    [];
  const variants = [row.title && row.title.replace("-", " ")]
    .concat(others)
    .filter(Boolean);
  return [...new Set(variants)];
};

const isFixableUrl = url =>
  Boolean(
    url.match(/^\/fiche-service-public\//) ||
      url.match(/^\/fiche-ministere-travail\//)
  );

module.exports = {
  sortByKey,
  getVariants,
  isFixableUrl
};
