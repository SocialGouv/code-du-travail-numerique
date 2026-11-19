import { test, expect } from "@playwright/test";

test.describe("Outils - Texte SEO sous le simulateur brut/net", () => {
  // The meta title is checked in brut-net.e2e.ts.
  test("affiche le sommaire et les H2 ancrés", async ({ page }) => {
    await page.goto("/outils/simulateur-embauche");

    const region = page.getByRole("region", { name: "En savoir plus" });
    const heading = region.getByRole("heading", {
      level: 2,
      name: "Brut ou net : quelle différence ?",
    });
    await expect(heading).toBeVisible();
    await expect(heading).toHaveAttribute("id", "difference-brut-net");

    await region
      .getByRole("navigation")
      .getByRole("link", { name: "Comment convertir le brut en net ?" })
      .click();
    await expect(page).toHaveURL(/#convertir-brut-net$/);

    await expect(
      region.locator('a[href^="/code-du-travail/"]').first()
    ).toBeVisible();
    await expect(page.locator("script#jsonld-tool-faq")).toHaveCount(1);
  });
});
