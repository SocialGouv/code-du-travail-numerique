async function batchPromise(list, size, callback, progress) {
  let results = [];
  for (items of batch(list, size)) {
    let values = await Promise.all(items.map(callback));
    results = results.concat(...values);
    if (progress) progress({ progress: results.length, total: list.length });
  }
  return results;
}

function batch(items, size) {
  return range(0, items.length, size).map(val => {
    return items.slice(val, val + size);
  });
}

function range(start, end, size) {
  return Array.from({ length: Math.ceil((end - start) / size) }).map(
    (_, i) => i * size
  );
}

module.exports = {
  range,
  batch,
  batchPromise
};
