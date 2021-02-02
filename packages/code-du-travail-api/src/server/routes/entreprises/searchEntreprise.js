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
  codePostalEtablissement,
  conventions: [{ idcc }],
  denominationUniteLegale,
  denominationUsuelle1UniteLegale,
  denominationUsuelle2UniteLegale,
  denominationUsuelle3UniteLegale,
  id: siren,
  label: Array.from(
    new Set([
      denominationUniteLegale,
      denominationUsuelle1UniteLegale,
      denominationUsuelle2UniteLegale,
      denominationUsuelle3UniteLegale,
      nomUniteLegale,
      nomUsageUniteLegale,
    ])
  )
    .filter((f) => f)
    .join(" "),
  nomUniteLegale,
  nomUsageUniteLegale,
  siren,
  siret,
  type: "entreprise",
  ville: [codePostalEtablissement, libelleCommuneEtablissement]
    .filter((e) => e)
    .join(" "),
});

const size = 50;

const rank_feature = { boost: 10, field: "trancheEffectifsUniteLegale" };

const collapse = {
  field: "siren",
};

export const entrepriseSearchBody = (query) => ({
  collapse,
  query: {
    bool: {
      must: [{ match: { naming: query } }],
      should: [{ rank_feature }, { match: { villeCp: query } }],
    },
  },
  size,
});

export const entrepriseAddressSearchBody = (query) => ({
  collapse: {
    field: "siren",
  },
  query: {
    bool: {
      must: [{ match: { address: query } }],
      should: [{ rank_feature }, { match: { villeCp: query } }],
    },
  },
  size,
});
