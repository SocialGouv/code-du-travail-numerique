import { test, expect } from "@playwright/test";

test.describe("Outils - Texte SEO sous le simulateur brut/net", () => {
  test("affiche le titre officiel et les H2 ancrés", async ({ page }) => {
    await page.goto("/outils/simulateur-embauche");

    await expect(page).toHaveTitle(
      "Simulateur officiel - Calcul du salaire brut en net"
    );

    const region = page.getByRole("region", { name: "En savoir plus" });
    const heading = region.getByRole("heading", {
      level: 2,
      name: "Quelle est la différence entre salaire brut et salaire net ?",
    });
    await expect(heading).toBeVisible();
    await expect(heading).toHaveAttribute("id", "difference-salaire-brut-net");

    await region
      .getByRole("navigation")
      .getByRole("link", { name: "Comment convertir un salaire brut en net ?" })
      .click();
    await expect(page).toHaveURL(/#calculer-salaire-net$/);

    await expect(
      region.locator('a[href^="/code-du-travail/"]').first()
    ).toBeVisible();
    await expect(page.locator("script#jsonld-tool-faq")).toHaveCount(1);
  });
});
