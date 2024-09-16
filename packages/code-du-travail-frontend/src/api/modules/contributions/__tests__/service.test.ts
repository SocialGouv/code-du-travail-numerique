/** @jest-environment node */

import {
  getByIdsContributions,
  getGenericContributionsGroupByThemes,
} from "../service";

describe("Contributions", () => {
  it("getGenericContributions", async () => {
    const result = await getGenericContributionsGroupByThemes();
    expect(result).toMatchSnapshot();
  });

  it("getByIdsContributions", async () => {
    const result = await getByIdsContributions(["eba7a4592f"]);
    expect(result).toMatchSnapshot();
  });
});
