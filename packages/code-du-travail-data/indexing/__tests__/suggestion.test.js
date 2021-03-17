import {
  createIndex,
  indexDocumentsBatched,
} from "@socialgouv/cdtn-elasticsearch";

import { populateSuggestions } from "../suggestion";

jest.mock("@socialgouv/cdtn-elasticsearch");

const INDEX_NAME = process.env.SUGGEST_INDEX_NAME;
const BUFFER_SIZE = process.env.BUFFER_SIZE;

const testCasesCount = 25;

describe("populate_suggestion", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should create suggestionIndex", async () => {
    await populateSuggestions("client", INDEX_NAME);
    expect(createIndex).toHaveBeenCalledTimes(1);

    expect(createIndex.mock.calls[0][0].client).toBe("client");
    expect(createIndex.mock.calls[0][0].indexName).toBe(INDEX_NAME);
  });

  test("should pushSuggestion", async () => {
    await populateSuggestions("client", INDEX_NAME);
    expect(indexDocumentsBatched).toHaveBeenCalledTimes(
      Math.ceil(testCasesCount / BUFFER_SIZE)
    );
    expect(indexDocumentsBatched.mock.calls[0][0].client).toBe("client");
    expect(createIndex.mock.calls[0][0].indexName).toBe(INDEX_NAME);
    expect(indexDocumentsBatched.mock.calls[0][0].documents)
      .toMatchInlineSnapshot(`
      Array [
        Object {
          "ranking": 2,
          "title": "heures supplémentaire quand sont-ils payé",
        },
        Object {
          "ranking": 553,
          "title": "heures supplémentaires",
        },
        Object {
          "ranking": 2,
          "title": "heures de modulation en cas de démission",
        },
        Object {
          "ranking": 61,
          "title": "heures de nuit",
        },
        Object {
          "ranking": 4,
          "title": "heures rentrée scolaire",
        },
        Object {
          "ranking": 91,
          "title": "heures complémentaires",
        },
        Object {
          "ranking": 2,
          "title": "heures supplémentaires maximum",
        },
        Object {
          "ranking": 2,
          "title": "licenciement cause inaptitude physique et droit au chomage stagiaire de l'education nationale",
        },
        Object {
          "ranking": 2,
          "title": "licenciement suite changement de syndic",
        },
        Object {
          "ranking": 2,
          "title": "licenciement économique et délégué du personnel",
        },
      ]
    `);
    expect(indexDocumentsBatched.mock.calls[1][0].documents)
      .toMatchInlineSnapshot(`
      Array [
        Object {
          "ranking": 2,
          "title": "licenciement suite à un refus de changement d'horraires",
        },
        Object {
          "ranking": 2,
          "title": "licenciement contrat à temps partiel indemnité de congés payés",
        },
        Object {
          "ranking": 2,
          "title": "licenciement abusive ou proposition de rupture conventionnelle",
        },
        Object {
          "ranking": 10,
          "title": "licenciement sans contrat",
        },
        Object {
          "ranking": 6,
          "title": "licenciement et clause de non concurrence",
        },
        Object {
          "ranking": 2,
          "title": "licenciement économique après 8 mois d'ancienneté contrat cdi",
        },
        Object {
          "ranking": 2,
          "title": "licenciement économique et reprise",
        },
        Object {
          "ranking": 2,
          "title": "licenciement pendant un procès au prud'homme",
        },
        Object {
          "ranking": 2,
          "title": "licenciement inapte handicap",
        },
        Object {
          "ranking": 2,
          "title": "licenciement économique indemnité de congé payé",
        },
      ]
    `);
    expect(indexDocumentsBatched.mock.calls[2][0].documents)
      .toMatchInlineSnapshot(`
      Array [
        Object {
          "ranking": 2,
          "title": "licenciement économique contrat aidé",
        },
        Object {
          "ranking": 2,
          "title": "licenciement ou rupture du contrat de travail",
        },
        Object {
          "ranking": 2,
          "title": "licenciement représentant du personnel",
        },
        Object {
          "ranking": 2,
          "title": "licenciement après 2 ans de maladie",
        },
        Object {
          "ranking": 2,
          "title": "licenciement pendant arrêt maladie 5 mois pour dépression",
        },
      ]
    `);
  });
});
/**
 *
 SUGGEST_INDEX_NAME=suggest-index SUGGEST_FILE=/Users/remim/dev/cdtn/code-du-travail-numeriqu/packages/code-du-travail-data/indexing/__tests__/suggestion_data_test.txt
 */
