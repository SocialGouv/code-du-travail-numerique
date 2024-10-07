import { getRouteBySource } from "@socialgouv/cdtn-utils";
// merge by one of each

export const merge = (res1, res2, max_result) => {
  //  simple array concat
  // return [...res1.hits, ...res2.hits].sort(sortByScore);

  // interleave results
  const res: any = [];
  Array.from({
    length: max_result,
  }).forEach((x, i) => {
    if (res1.length > i) res.push(res1[i]);
    if (res2.length > i) res.push(res2[i]);
  });
  return res;
};

// Remove Duplicates
export const predicateFn = ({ _source: { source, slug } }) =>
  `${getRouteBySource(source) || source}/${slug}`;

export const removeDuplicate = (arr, predicate = predicateFn) =>
  arr.flatMap((a, index) => {
    if (arr.find((item, i) => predicate(item) === predicate(a) && i < index)) {
      return [];
    } else {
      return a;
    }
  });

export const mergeDuplicate = (arr, predicate = predicateFn) => {
  return arr.flatMap((a, index) => {
    const prevItem = arr.find(
      (item, i) => predicate(item) === predicate(a) && i < index,
    );
    if (prevItem) {
      prevItem._source.algo = "both";
      return [];
    } else {
      return a;
    }
  });
};

export const mergePipe = (a, b, max_result) => {
  const res = merge(a, b, a.length + b.length);
  return mergeDuplicate(res).slice(0, max_result);
};
