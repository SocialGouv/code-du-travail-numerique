import { addGlossary } from "../addGlossary";

jest.mock("@socialgouv/datafiller-data/data/glossary.json", () => [
  {
    title: "Disposition",
    abbrs: "",
    variants: ["dispositions"],
    definition:
      "<p>Phrase ou ensemble de phrases d'un accord, d'une convention collective, d'une loi.</p>",
  },
  {
    title: "Convention Collective",
    abbrs: "cc",
    variants: [],
    definition: "<p>Cette phrase ne doit pas apparaîte</p>",
  },
]);

describe("addGlossary", () => {
  test("should return a formated html with web components tooltip", () => {
    const htmlContent =
      "<p>voici une convention collective et un web component mais aussi dispositions, ceci est un test</p>";
    expect(addGlossary(htmlContent)).toEqual(
      `<p>voici une <webcomponent-tooltip-cc>convention collective</webcomponent-tooltip-cc> et un web component mais aussi <webcomponent-tooltip content="Phrase%20ou%20ensemble%20de%20phrases%20d'un%20accord,%20d'une%20convention%20collective,%20d'une%20loi.">dispositions</webcomponent-tooltip>, ceci est un test</p>`
    );
  });
});
