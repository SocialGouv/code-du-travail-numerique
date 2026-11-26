import { test, expect } from "@playwright/test";

test.describe("Outils - Texte SEO sous le simulateur brut/net", () => {
  // The meta title is checked in brut-net.e2e.ts.
  test("affiche le sommaire et les H2 ancrés", async ({ page }) => {
    await page.goto("/outils/simulateur-embauche");

    const region = page.getByRole("region", { name: "En savoir plus" });
    const heading = region.getByRole("heading", {
      level: 2,
      name: "Salaire brut ou salaire net : quelle est la différence ?",
    });
    await expect(heading).toBeVisible();
    await expect(heading).toHaveAttribute("id", "difference-brut-net");

    await region
      .getByRole("navigation")
      .getByRole("link", {
        name: "Un même salaire brut donne-t-il toujours le même salaire net ?",
      })
      .click();
    await expect(page).toHaveURL(/#meme-brut-meme-net$/);

    await region.getByRole("button", { name: "Références" }).click();
    await expect(
      region.getByRole("link", { name: "Article R3243-1" })
    ).toHaveAttribute("href", "/code-du-travail/r3243-1");
    await expect(page.locator("script#jsonld-tool-faq")).toHaveCount(1);
  });
});
