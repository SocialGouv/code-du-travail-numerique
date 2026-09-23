import { splitContentAtFirstAccordion } from "../contributionUtils";

describe("splitContentAtFirstAccordion", () => {
  it("sépare l'introduction du premier accordéon de premier niveau", () => {
    const content =
      "<p>Intro</p><p>Suite intro</p><details><summary>A</summary><div><details><summary>Imbriqué</summary></details></div></details><details><summary>B</summary></details>";

    expect(splitContentAtFirstAccordion(content)).toEqual({
      intro: "<p>Intro</p><p>Suite intro</p>",
      rest: "<details><summary>A</summary><div><details><summary>Imbriqué</summary></details></div></details><details><summary>B</summary></details>",
    });
  });

  it("reconnaît un accordéon avec attributs", () => {
    const content =
      '<p>Intro</p><details class="details"><summary>A</summary></details>';

    expect(splitContentAtFirstAccordion(content).intro).toBe("<p>Intro</p>");
  });

  it("sans accordéon, ne retire rien du contenu", () => {
    expect(splitContentAtFirstAccordion("<p>Texte</p>")).toEqual({
      intro: "",
      rest: "<p>Texte</p>",
    });
  });

  it("contenu qui commence par un accordéon : introduction vide", () => {
    const content = "<details><summary>A</summary></details>";

    expect(splitContentAtFirstAccordion(content)).toEqual({
      intro: "",
      rest: content,
    });
  });
});
