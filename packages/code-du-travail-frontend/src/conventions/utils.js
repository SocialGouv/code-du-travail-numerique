export const sortByIntOrdre = (
  { data: { intOrdre: intOrdreA } },
  { data: { intOrdre: intOrdreB } }
) => {
  return intOrdreA - intOrdreB;
};
