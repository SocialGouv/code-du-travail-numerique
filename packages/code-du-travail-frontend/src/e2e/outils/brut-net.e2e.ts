import { test, expect } from "@playwright/test";
import { expectTitleAndMetaDescriptionEqual } from "../helpers";

test.describe("Outil - Salaire brut/net", () => {
  test("Valider que le simulateur s'affiche correctement dans l'iframe", async ({
    page,
  }) => {
    const EXTERNAL_SCRIPT_URL =
      "https://mon-entreprise.urssaf.fr/simulateur-iframe-integration.js";

    await page.route(EXTERNAL_SCRIPT_URL, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/javascript",
        body: `(() => {
  const root = document.currentScript && document.currentScript.parentElement;
  if (!root) return;
  const iframe = document.createElement('iframe');
  iframe.id = 'simulateurEmbauche';
  root.appendChild(iframe);
})();`,
      });
    });

    const routeFulfilled = page.waitForResponse(
      (resp) => resp.url() === EXTERNAL_SCRIPT_URL && resp.status() === 200
    );

    await page.goto("/outils/simulateur-embauche");
    await expectTitleAndMetaDescriptionEqual(
      page,
      "Simulateur - Calcul du salaire brut/net - Code du travail numérique",
      "Réalisez vos conversions et calculs de salaire (brut en net, net en brut, net après impôt, heures supplémentaires et coût total employeur) avec notre simulateur."
    );

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Calculer le salaire brut/net",
      })
    ).toBeVisible();

    await routeFulfilled;

    await expect(
      page.locator("script#script-simulateur-embauche")
    ).toHaveAttribute("src", EXTERNAL_SCRIPT_URL, { timeout: 30_000 });

    await expect(page.locator("iframe#simulateurEmbauche")).toBeAttached({
      timeout: 30_000,
    });
  });
});
