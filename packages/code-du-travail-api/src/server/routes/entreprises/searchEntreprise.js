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

const mapHit = ({
  _source: {
    siren,
    denominationUniteLegale,
    nomUniteLegale,
    nomUsageUniteLegale,
    denominationUsuelle1UniteLegale,
    denominationUsuelle2UniteLegale,
    denominationUsuelle3UniteLegale,
    activitePrincipale,
    etablissements,
    idcc,
    convention,
    siret,
    address,
    naming,
  },
  highlight,
}) => {
  const label = formatLabel(naming.split(" "));

  const highlightLabel =
    highlight && highlight.naming ? formatLabel(highlight.naming) : label;

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
    address,
    convention,
    etablissements,
    highlightLabel,
    id: siren,
    idcc: parseInt(idcc),
    label,
    simpleLabel,
    siren,
    siret,
  };
};

const size = 50;

const rank_feature = { boost: 10, field: "trancheEffectifsUniteLegale" };

const collapse = {
  field: "siren",
};

const entrepriseSearchBody = (query, address = "", withIdcc = true) => ({
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
              { match: { siret: query } },
              { match: { siren: query } },
            ],
          },
        },
      ],
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

module.exports = {
  entrepriseSearchBody,
  mapHit,
};
