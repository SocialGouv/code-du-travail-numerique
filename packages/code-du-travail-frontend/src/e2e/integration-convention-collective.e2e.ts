import { expect, test } from "@playwright/test";

test.describe("Pages integration convention collective", () => {
  test("should display iframe convention collective", async ({ page }) => {
    const frameNavigationPromise = page.waitForEvent("framenavigated", (f) =>
      f.url().includes("/widgets/convention-collective")
    );

    await page.goto("/integration/convention-collective");

    // Attendre que l'iframe soit chargée et hydratée
    const widgetFrame = await frameNavigationPromise;
    await widgetFrame.waitForLoadState("networkidle");

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

    await inputSiret.pressSequentially("45132133500023");

    await iframe.getByRole("button", { name: "Rechercher" }).click();
    await iframe.getByText("SIRET: 45132133500023").click();
    await iframe
      .getByText("Commerce de détail et de gros à prédominance alimentaire")
      .click();
  });
});
