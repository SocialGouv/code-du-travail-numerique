export function pluralize(labels, nb) {
  let index = Math.max(0, nb);
  if (nb > 1) {
    index = "other";
  }
  return labels[index].replace(/#{}/, nb);
}
