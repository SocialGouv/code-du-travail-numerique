async function batchPromise(list, size, callback) {
  let results = [];
  let nbBatch = 0;
  for (items of batch(list, size)) {
    const values = await Promise.all(
      items.map((item, i) => callback(item, i + nbBatch * size, list))
    );
    nbBatch += 1;
    results = [...results, ...values];
  }
  return results;
}

function batch(items, size) {
  return range(0, items.length, size).map(val => {
    return items.slice(val, val + size);
  });
}

function range(start, end, size = 1) {
  return Array.from(
    { length: Math.ceil((end - start) / size) },
    (_, i) => start + i * size
  );
}

function times(size) {
  return Array.from({ length: size }, (_, i) => i);
}

module.exports = {
  times,
  range,
  batch,
  batchPromise
};
