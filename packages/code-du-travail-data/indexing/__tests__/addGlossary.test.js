import { addGlossary } from "../addGlossary";

jest.mock("@socialgouv/datafiller-data/data/glossary.json", () => [
  {
    title: "Disposition",
    abbrs: "",
    variants: ["dispositions"],
    definition:
      "<p>Phrase ou ensemble de phrases d'un accord, d'une convention collective, d'une loi.</p>",
  },
]);

describe("addGlossary", () => {
  test("should return a formated html with web components tooltip", () => {
    const htmlContent =
      "<p>La loi du 5 septembre 2018 «&nbsp;pour la liberté de choisir son avenir professionnel&nbsp;» modifie certaines dispositions relatives à l’apprentissage, notamment l’âge limite d’entrée, les modalités de réduction de contrat, les cas de rupture anticipée, les conditions minimales pour devenir maître d’apprentissage.</p>";
    expect(addGlossary(htmlContent)).toEqual(
      `<p>La loi du 5 septembre 2018 «&nbsp;pour la liberté de choisir son avenir professionnel&nbsp;» modifie certaines <webcomponent-tooltip content="Phrase%20ou%20ensemble%20de%20phrases%20d'un%20accord,%20d'une%20convention%20collective,%20d'une%20loi.">dispositions</webcomponent-tooltip> relatives à l’apprentissage, notamment l’âge limite d’entrée, les modalités de réduction de contrat, les cas de rupture anticipée, les conditions minimales pour devenir maître d’apprentissage.</p>`
    );
  });
});
