import { expect, test } from "@playwright/test";

test.describe("Pages integration convention collective", () => {
  test("should display iframe convention collective", async ({ page }) => {
    await page.goto("/integration/convention-collective");

    const iframe = page.frameLocator(
      'iframe[src*="/widgets/convention-collective"]'
    );

    await expect(
      iframe.getByRole("heading", {
        level: 1,
        name: "Trouver sa convention collective",
      })
    ).toBeVisible();

    const inputSiret = iframe.getByLabel(
      "Nom de votre entreprise ou numéro Siren/Siret"
    );

    await inputSiret.fill("carrefour");

    await iframe.getByRole("button", { name: "Rechercher" }).click();

    await iframe.getByText("CARREFOUR HYPERMARCHES", { exact: true }).click();
    await iframe
      .getByText("Commerce de détail et de gros à prédominance alimentaire")
      .click();
  });
});
