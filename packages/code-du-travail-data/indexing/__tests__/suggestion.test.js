import {
  createIndex,
  indexDocumentsBatched,
  deleteOldIndex
} from "../es_client.utils";

import { populate_suggestions } from "../suggestion";

jest.mock("../es_client.utils");

const INDEX_NAME = process.env.SUGGEST_INDEX_NAME;
const BUFFER_SIZE = process.env.BUFFER_SIZE;

const testCasesN = 12;

describe("populate_suggestion", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  test("should create suggestionIndex", async () => {
    await populate_suggestions("client");
    expect(createIndex).toHaveBeenCalledTimes(1);

    expect(createIndex.mock.calls[0][0].client).toBe("client");
    expect(
      createIndex.mock.calls[0][0].indexName.startsWith(`${INDEX_NAME}-`)
    ).toBe(true);
  });
  test("should pushSuggestion", async () => {
    await populate_suggestions("client");
    expect(indexDocumentsBatched).toHaveBeenCalledTimes(
      Math.ceil(testCasesN / BUFFER_SIZE)
    );
    expect(indexDocumentsBatched.mock.calls[0][0].client).toBe("client");
    expect(
      indexDocumentsBatched.mock.calls[0][0].indexName.startsWith(
        `${INDEX_NAME}-`
      )
    ).toBe(true);
    expect(indexDocumentsBatched.mock.calls[0][0].documents)
      .toMatchInlineSnapshot(`
      Array [
        Object {
          "ranking": "320",
          "title": "préavis",
        },
        Object {
          "ranking": "82",
          "title": "urgent",
        },
        Object {
          "ranking": "4",
          "title": "déduction",
        },
        Object {
          "ranking": "136",
          "title": "avertissement",
        },
        Object {
          "ranking": "2",
          "title": "démission-indemnisation",
        },
      ]
    `);
    expect(indexDocumentsBatched.mock.calls[1][0].documents)
      .toMatchInlineSnapshot(`
      Array [
        Object {
          "ranking": "790",
          "title": "retraite",
        },
        Object {
          "ranking": "296",
          "title": "renseignements",
        },
        Object {
          "ranking": "6",
          "title": "ferie",
        },
        Object {
          "ranking": "68",
          "title": "déplacement",
        },
        Object {
          "ranking": "2",
          "title": "rensegnement",
        },
      ]
    `);
    expect(indexDocumentsBatched.mock.calls[2][0].documents)
      .toMatchInlineSnapshot(`
      Array [
        Object {
          "ranking": "2",
          "title": "elena",
        },
        Object {
          "ranking": "2",
          "title": "contractuelle",
        },
      ]
    `);
  });
});
/**
 * 
 SUGGEST_INDEX_NAME=suggest-index SUGGEST_FILE=/Users/remim/dev/cdtn/code-du-travail-numeriqu/packages/code-du-travail-data/indexing/__tests__/suggestion_data_test.txt
 */
