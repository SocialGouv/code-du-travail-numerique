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

// ugly remove duplicates objects on key (scrores will be different), if anoyne see optimization
const removeDuplicate = arr => {
  const seen = [];
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    if (!seen.includes(arr[i].key)) {
      seen.push(arr[i].key);
      res.push(arr[i]);
    }
  }
  return res;
};

exports.merge = merge;
exports.addKey = addKey;
exports.removeDuplicate = removeDuplicate;
