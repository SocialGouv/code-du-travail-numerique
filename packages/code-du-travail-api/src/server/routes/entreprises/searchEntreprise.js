export const mapHit = ({
  _source: {
    siren,
    denominationUniteLegale,
    libelleCommuneEtablissement,
    codePostalEtablissement,
    nomUniteLegale,
    nomUsageUniteLegale,
    denominationUsuelle1UniteLegale,
    denominationUsuelle2UniteLegale,
    denominationUsuelle3UniteLegale,
    idcc,
    siret,
  },
}) => ({
  closed: false,
  conventions: [{ idcc }],
  id: siren,
  label: Array.from(
    new Set([
      denominationUniteLegale,
      denominationUsuelle1UniteLegale,
      denominationUsuelle2UniteLegale,
      denominationUsuelle3UniteLegale,
      nomUniteLegale,
      nomUsageUniteLegale,
      codePostalEtablissement,
      libelleCommuneEtablissement,
    ])
  )
    .filter((f) => f)
    .join(" "),
  siren,
  siret,
  type: "entreprise",
});

export const entrepriseSearchBody = (query) => ({
  collapse: {
    field: "siren",
  },
  query: {
    bool: {
      must: [{ match: { rawText: query } }],
      should: [
        { rank_feature: { boost: 10, field: "trancheEffectifsUniteLegale" } },
      ],
    },
  },
});
