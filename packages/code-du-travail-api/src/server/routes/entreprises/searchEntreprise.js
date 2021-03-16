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
    siret,
    address,
    naming,
  },
  inner_hits,
  highlight,
}) => {
  const label = formatLabel(naming.split(" "));

  const highlightLabel =
    highlight && highlight.naming ? formatLabel(highlight.naming) : label;

  const matching = inner_hits.matchingEtablissements.hits.total.value;

  const conventions = inner_hits.matchingEtablissements.hits.hits.reduce(
    (acc, { fields: { convention, idcc } }) => {
      const o = {
        num: parseInt(idcc),
        shortTitle: convention ? convention[0] : "",
      };
      if (!acc.has(o.num)) {
        acc.set(o.num, o);
      }
      return acc;
    },
    new Map()
  );

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
    conventions: Array.from(conventions.values()),
    etablissements: parseInt(etablissements),
    highlightLabel,
    id: siren,
    label,
    matching,
    simpleLabel,
    siren,
    siret,
  };
};

const size = 20;

const rank_feature = { boost: 10, field: "trancheEffectifsUniteLegale" };

const collapse = (withAllConventions) => ({
  field: "siren",
  inner_hits: {
    _source: false,
    docvalue_fields: ["idcc", "convention"],
    name: "matchingEtablissements",
    size: withAllConventions ? 10000 : 1,
  },
});

const addressFilter = (address) =>
  address
    ? [
        {
          match: {
            cp: {
              query: address ? address.replace(/\D/g, "") : "",
            },
          },
        },
        {
          match: {
            ville: {
              query: address,
            },
          },
        },
      ]
    : [{ match_all: {} }];

const entrepriseSearchBody = (
  query,
  address,
  // return convention of every etablissements associated to the main company
  withAllConventions,
  // only search for etablissements with convention attached
  withIdcc = true
) => ({
  collapse: collapse(withAllConventions),
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
            should: addressFilter(address),
          },
        },
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
      should: [{ rank_feature }],
    },
  },
  size,
});

module.exports = {
  entrepriseSearchBody,
  mapHit,
};
