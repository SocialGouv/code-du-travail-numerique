/** @jest-environment node */

import {
  getRootThemes,
  getBySlugThemes,
} from "../service";

describe("Themes", () => {
  it("getAllThemes", async () => {
    const result = await getRootThemes(["title", "slug", "children"]);
    expect(result).toMatchSnapshot();
  });

  it("getBySlugThemes", async () => {
    const result = await getBySlugThemes("embauche-et-contrat-de-travail");
    expect(result).toMatchSnapshot();
  });
});
