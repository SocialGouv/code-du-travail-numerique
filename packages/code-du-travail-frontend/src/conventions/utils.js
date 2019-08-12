export const sortByIntOrdre = (a, b) => {
  if (a.intOrdre < b.intOrdre) {
    return -1;
  }
  if (a.intOrdre > b.intOrdre) {
    return 1;
  }
  return 0;
};
