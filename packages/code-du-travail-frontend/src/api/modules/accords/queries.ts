export const ACCORDS_MAX_RESULTS = 5;

export const getAccordsBySiret = (siret: string) => {
  return {
    _source: [
      "id",
      "title",
      "dateDepot",
      "dateEffet",
      "dateFin",
      "conformeVersionIntegrale",
      "themes",
    ],
    query: {
      bool: {
        filter: [{ term: { siret } }],
      },
    },
    sort: [{ dateDepot: { order: "desc" } }],
    size: ACCORDS_MAX_RESULTS,
    track_total_hits: true,
  };
};
