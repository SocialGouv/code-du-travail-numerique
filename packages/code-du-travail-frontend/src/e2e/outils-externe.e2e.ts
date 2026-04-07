import { test, expect } from "@playwright/test";

test.describe("Outil externe", () => {
  test("l'outil egapro est référencé sur notre site", async ({ page }) => {
    await page.goto("/recherche?query=egapro");

    const link = page.getByRole("link", { name: "Index Egapro" });
    await expect(link).toHaveAttribute(
      "href",
      "https://egapro.travail.gouv.fr/"
    );
  });
});
