import { test, expect } from "@playwright/test";
import { expectIndexable, expectCanonicalUrlEqual } from "./helpers";

test.describe("Pages informations", () => {
  test("je vois une page info classique", async ({ page }) => {
    await page.goto(
      "/information/metallurgie-lessentiel-de-la-nouvelle-convention-collective"
    );
    await expectIndexable(page);
    await expectCanonicalUrlEqual(
      page,
      "/information/metallurgie-lessentiel-de-la-nouvelle-convention-collective"
    );
    await expect(page).toHaveTitle(
      /Métallurgie\s*:\s*l.essentiel de la nouvelle convention collective - Code du travail numérique/
    );
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /Découvrez l.essentiel de la convention collective nationale de la métallurgie/
    );
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "essentiel de la nouvelle convention collective"
    );
    await expect(page.locator("body")).toContainText(
      "Le 1er janvier 2024, la nouvelle convention collective nationale de la métallurgie remplace les 76 conventions collectives territoriales et les conventions collectives nationales."
    );
  });
});
