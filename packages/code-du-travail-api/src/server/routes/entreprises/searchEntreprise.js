const pre = "<b><u>";
const post = "</b></u>";

// we remove deduplicate tokens to compose company's label
const formatLabel = (naming) => {
  const labelTokens = naming
    .join(" ")
    .split(" ")
    .map((n) => ({
      fmt: n,
      raw: n.replace(pre, "").replace(post, "").trim().toUpperCase(),
    }))
    .reduce((acc, curr) => {
      if (!acc.map(({ raw }) => raw).includes(curr.raw)) {
        acc.push(curr);
      }
      return acc;
    }, []);

  return labelTokens.map(({ fmt }) => fmt).join(" ");
};

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
    activitePrincipale,
    idcc,
    convention,
    siret,
    naming,
  },
  highlight,
}) => {
  const label =
    highlight && highlight.naming
      ? formatLabel(highlight.naming)
      : formatLabel(naming.split(" "));

  // take first by priority
  const simpleLabel = [
    denominationUniteLegale,
    denominationUsuelle1UniteLegale,
    denominationUsuelle2UniteLegale,
    denominationUsuelle3UniteLegale,
    nomUniteLegale,
    nomUsageUniteLegale,
  ].find((l) => l);

  return {
    activitePrincipale,
    closed: false,
    codePostalEtablissement,
    convention,
    denominationUniteLegale,
    denominationUsuelle1UniteLegale,
    denominationUsuelle2UniteLegale,
    denominationUsuelle3UniteLegale,
    id: siren,
    // conventions: [{ idcc }],
    idcc: parseInt(idcc),
    label,
    nomUniteLegale,
    nomUsageUniteLegale,
    simpleLabel,
    siren,
    siret,
    type: "entreprise",
    ville: [codePostalEtablissement, libelleCommuneEtablissement]
      .filter((e) => e)
      .join(" "),
  };
};

const size = 50;

const rank_feature = { boost: 10, field: "trancheEffectifsUniteLegale" };

const collapse = {
  field: "siren",
};

export const entrepriseSearchBody = (query, address, withIdcc) => ({
  collapse,
  highlight: {
    fields: {
      naming: { post_tags: [post], pre_tags: [pre] },
    },
  },
  query: {
    bool: {
      filter: [{ term: { withIdcc } }],
      must: [
        {
          bool: {
            should: [
              { fuzzy: { naming: { boost: 0.6, value: query } } },
              { match: { naming: query } },
            ],
          },
        },
      ],
      // must: [{ match: { naming: query } }],
      should: [
        { rank_feature },
        {
          match: {
            cp: {
              boost: 0.2,
              query: address ? address.replace(/\D/g, "") : "",
            },
          },
        },
        {
          match: { address },
        },
        {
          match: {
            ville: {
              boost: 0.2,
              query,
            },
          },
        },
      ],
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
