import { generateWidgetScript } from "../widgetTemplate";

describe("generateWidgetScript", () => {
  it("remplace __HOST__ par l'URL du site", () => {
    const script = generateWidgetScript("https://code.travail.gouv.fr");
    expect(script).not.toContain("__HOST__");
    expect(script).toContain('"https://code.travail.gouv.fr/widgets/search"');
  });

  it("ignore le slash final de l'URL", () => {
    const script = generateWidgetScript("https://code.travail.gouv.fr/");
    expect(script).toContain('"https://code.travail.gouv.fr/widgets/search"');
    expect(script).not.toContain("gouv.fr//widgets");
  });
});
