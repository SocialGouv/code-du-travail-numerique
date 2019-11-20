// ensure data from datafiller is parsed correctly and urls resolved using ES

const requetes = [
  {
    refs: [
      {
        url: "/code-du-travail/l1221-3",
        title: "Article L1221-3",
        position: 5
      },
      {
        url:
          "/fiche-service-public/conclusion-du-contrat-de-travail-a-duree-determinee-cdd",
        title:
          "Conclusion du contrat de travail \u00e0 dur\u00e9e d\u00e9termin\u00e9e (CDD)",
        position: 2
      },
      {
        url: "/fiche-service-public/fiche-3",
        title: "Fiche 3",
        position: 4
      },
      {
        url: "/fiche-service-public/fiche-2",
        title: "Fiche 2",
        position: 5
      },
      {
        url:
          "https://www.telerc.travail.gouv.fr/RuptureConventionnellePortailPublic/jsp/site/Portal.jsp?page_id=14",
        valid: true
      },
      {
        url: "/some-unknown-source/test",
        valid: true
      }
    ],
    title: "title1",
    position: 1,
    parent: null,
    id: "theme1",
    last_modified: 1574180872936,
    variants: "known-query1\nknown-query2"
  },
  {
    refs: [
      {
        url: "/code-du-travail/l3221-3",
        title: "Article L3221-3",
        valid: true
      },
      {
        url: "/themes/theme1",
        title: "Thématique",
        valid: true
      },
      {
        url:
          "/fiche-ministere-travail/le-salaire-quelles-sont-les-modalites-de-paiement",
        title: "Le salaire : quelles sont les modalités de paiement ?",
        valid: true
      }
    ],
    title: "title2",
    parent: "theme1",
    variants: "known-query3\nknown-query4",
    position: 2,
    id: "theme2",
    last_modified: 1574247674241
  },
  {
    refs: [
      {
        url: "/code-du-travail/l3221-3",
        title: "Article L3221-3",
        valid: true
      },
      {
        url: "/themes/theme1",
        title: "Thématique",
        valid: true
      },
      {
        url:
          "/fiche-ministere-travail/le-salaire-quelles-sont-les-modalites-de-paiement",
        title: "Le salaire : quelles sont les modalités de paiement ?",
        valid: true
      }
    ],
    title: "title3",
    parent: "theme2",
    position: 3,
    id: "theme3",
    last_modified: 1574244054799,
    variants: "known-query5\nknown-query6"
  },
  {
    refs: [
      {
        url: "/code-du-travail/l3221-3",
        title: "Article L3221-3"
      },
      {
        url: "/themes/theme1",
        title: "Thématique"
      },
      {
        url:
          "/fiche-ministere-travail/le-salaire-quelles-sont-les-modalites-de-paiement",
        title: "Le salaire : quelles sont les modalités de paiement ?"
      }
    ],
    theme: "theme4",
    title: "title4",
    parent: "theme1",
    variants: "known-query7\nknown-query8",
    position: 4,
    id: "3ede72c7-8918-4a71-9e32-14c121bff82c",
    last_modified: 1574263880955
  }
];

const getBaseUrl = url =>
  url.replace(/^(https?:\/\/[^/]+)\//, "/").split("?")[0];

const FETCH_SAMPLES = {
  "/kinto/v1/buckets/datasets/collections/themes/records": () => ({
    data: requetes
  }),
  "/code_du_travail_numerique/_search": (url, { body } = {}) => ({
    hits: {
      hits: [
        {
          _source: {
            slug: JSON.parse(body).query.bool.must.match.slug.query
          }
        }
      ]
    }
  })
};

const mockResponse = (url, options) =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => FETCH_SAMPLES[getBaseUrl(url)](url, options)
  });

jest.mock("node-fetch", () => mockResponse);

const fetchThemes = require("../fetch-themes");

test("convert datafiller data from API", async () => {
  const result = await fetchThemes();
  expect(result).toMatchSnapshot();
});
