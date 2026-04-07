import { test, expect } from "@playwright/test";

test.describe("Article code du travail", () => {
  test("je vois une page article code du travail", async ({ page }) => {
    await page.goto("/code-du-travail/l2312-1");
    await expect(page).toHaveTitle("L2312-1 - Code du travail numérique");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("L2312-1");
    await expect(
      page.getByRole("link", { name: "Code du travail", exact: true })
    ).toHaveAttribute(
      "href",
      "https://www.legifrance.gouv.fr/affichCodeArticle.do;?idArticle=LEGIARTI000036262407&cidTexte=LEGITEXT000006072050"
    );
    await expect(page.locator("body")).toContainText(
      "Les attributions du comité social et économique des entreprises de moins de cinquante salariés sont définies par la section 2 du présent chapitre."
    );
    await expect(page.locator("body")).toContainText("NOTA");
    await expect(page.locator("body")).toContainText(
      "Conformément à l'article 9 I de l'ordonnance n° 2017-1386 du 22 septembre 2017, les présentes dispositions entrent en vigueur à la date d'entrée en vigueur des décrets pris pour leur application, et au plus tard le 1er janvier 2018."
    );
  });
});
