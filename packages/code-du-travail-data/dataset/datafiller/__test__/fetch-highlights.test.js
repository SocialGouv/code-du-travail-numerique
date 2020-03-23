// ensure data from datafiller is parsed correctly and urls resolved using ES

const highlights = [
  {
    refs: [
      {
        url: "/code-du-travail/l1221-3",
        title: "Article L1221-3",
        position: 5,
      },
      {
        url:
          "/fiche-service-public/conclusion-du-contrat-de-travail-a-duree-determinee-cdd",
        title:
          "Conclusion du contrat de travail \u00e0 dur\u00e9e d\u00e9termin\u00e9e (CDD)",
        position: 2,
      },
      {
        url: "/fiche-service-public/fiche-3",
        title: "Fiche 3",
        position: 4,
      },
      {
        url: "/fiche-service-public/fiche-2",
        title: "Fiche 2",
        position: 8,
      },
      {
        url:
          "https://www.telerc.travail.gouv.fr/RuptureConventionnellePortailPublic/jsp/site/Portal.jsp?page_id=14",
        position: 1,
      },
      {
        url: "/some-unknown-source/test",
        position: 3,
      },
    ],
    title: "title1",
  },
  {
    refs: [
      {
        url: "/code-du-travail/l3221-3",
        title: "Article L3221-3",
        position: 5,
      },
      {
        url: "/themes/theme1",
        title: "Thématique",
        position: 1,
      },
      {
        url:
          "/fiche-ministere-travail/le-salaire-quelles-sont-les-modalites-de-paiement",
        title: "Le salaire : quelles sont les modalités de paiement ?",
        position: 3,
      },
    ],
    title: "title2",
  },
];

const mockResponse = () =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => ({
      data: highlights,
    }),
  });

jest.mock("node-fetch", () => mockResponse);

const fetchHighlights = require("../fetch-highlights");

test("it should get all highlights", async () => {
  const results = await fetchHighlights();
  expect(results).toMatchSnapshot();
});

test("highlights refs should be sorted by position", async () => {
  const results = await fetchHighlights();
  expect(results[0].refs).toMatchSnapshot();
});
