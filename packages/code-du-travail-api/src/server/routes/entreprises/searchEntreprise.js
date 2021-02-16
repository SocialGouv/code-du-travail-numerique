const pre = "<b><u>";
const post = "</b></u>";

// we remove CP and deduplicate tokens to compose company's label
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

  return (
    labelTokens
      .map(({ fmt }) => fmt)
      // remove CodePostal
      .slice(0, labelTokens.length - 1)
      .join(" ")
  );
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
    idcc,
    siret,
    naming,
  },
  highlight,
}) => {
  const label =
    highlight && highlight.naming
      ? formatLabel(highlight.naming)
      : formatLabel(naming.split(" "));

  return {
    closed: false,
    codePostalEtablissement,
    conventions: [{ idcc }],
    denominationUniteLegale,
    denominationUsuelle1UniteLegale,
    denominationUsuelle2UniteLegale,
    denominationUsuelle3UniteLegale,
    id: siren,
    label,
    nomUniteLegale,
    nomUsageUniteLegale,
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

export const entrepriseSearchBody = (query) => ({
  collapse,
  highlight: {
    fields: {
      naming: { post_tags: [post], pre_tags: [pre] },
    },
  },
  query: {
    bool: {
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
        // {
        // match: { cp: { boost: 0.2, query: query.replace(/\D/g, "") } },
        // },
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
