import {
  getAllThemes,
  getAllThemesAndSubThemes,
  getBySlugThemes,
} from "../service";

describe("Themes", () => {
  it("getAllThemes", async () => {
    const result = await getAllThemes();
    expect(result).toMatchSnapshot();
  });

  it("getAllThemesAndSubThemes", async () => {
    const result = await getAllThemesAndSubThemes();
    expect(result).toMatchSnapshot();
  });

  it("getBySlugThemes", async () => {
    const result = await getBySlugThemes("embauche-et-contrat-de-travail");
    expect(result).toMatchSnapshot();
  });
});
