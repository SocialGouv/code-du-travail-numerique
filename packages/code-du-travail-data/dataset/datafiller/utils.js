const sortByKey = key => (a, b) => a[key].localeCompare(b[key]);

const getVariants = row => {
  const others =
    (row.variants && row.variants.split("\n").map(variant => variant.trim())) ||
    [];
  const variants = [row.title.replace("-", " ")].concat(others);
  return [...new Set(variants)];
};

module.exports = {
  sortByKey,
  getVariants
};
