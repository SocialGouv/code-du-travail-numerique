import { SOURCES } from "@socialgouv/cdtn-sources";

import { fetchCovisits } from "../monolog";

const testDoc = {
  slug: "activite-partielle-chomage-partiel",
  source: SOURCES.SHEET_MT,
};

jest.mock("@socialgouv/cdtn-monolog", () => ({
  Queries: () => ({
    getCovisitLinks: (path) => {
      if (
        path == "fiche-ministere-travail/activite-partielle-chomage-partiel"
      ) {
        return Promise.resolve({ links: [] });
      } else {
        return Promise.reject();
      }
    },
  }),
}));

describe("Test covisits are added if available.", () => {
  test("should add covisites to item", () =>
    expect(fetchCovisits(testDoc)).resolves.toMatchSnapshot());

  test("should not fail with other item", () =>
    expect(
      fetchCovisits({ slug: "fake", source: SOURCES.SHEET_MT })
    ).resolves.toMatchSnapshot());
});
