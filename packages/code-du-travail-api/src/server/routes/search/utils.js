// merge by one of each

const merge = (res1, res2, max_result) => {
  //  simple array concat
  // return [...res1.hits, ...res2.hits].sort(sortByScore);

  // interleave results
  const res = [];
  Array.from({
    length: max_result
  }).forEach((x, i) => {
    if (res1.length > i) res.push(res1[i]);
    if (res2.length > i) res.push(res2[i]);
  });
  return res;
};

// add a key to make results comparable

const addKey = res =>
  res.map(a => ({ ...a, key: a._source.source + a._source.slug }));

// Remove Duplicates

const removeDuplicate = arr =>
  Object.values(
    arr.reduce((values, current) => ({ ...values, [current.key]: current }), {})
  );

exports.merge = merge;
exports.addKey = addKey;
exports.removeDuplicate = removeDuplicate;
