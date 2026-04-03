import { test, expect } from "@playwright/test";

test.describe("Pages integration", () => {
  test("should display iframe moteur de recherche", async ({ page }) => {
    await page.goto("/integration/moteur-recherche");

    const iframe = page.frameLocator("iframe");
    await expect(
      iframe.locator("label").filter({
        hasText: "Trouvez les réponses à vos questions en droit du travail",
      })
    ).toBeVisible({ timeout: 10_000 });
    await iframe.locator("#button-search").click();
  });

  test("should display iframe modèle de courrier", async ({ page }) => {
    await page.goto("/integration/modeles-de-courriers");

    const iframe = page.frameLocator("iframe");
    await expect(iframe.getByText(/harcèlement sexuel/i).first()).toBeVisible({
      timeout: 10_000,
    });
  });

  test("should display iframe indemnité licenciement", async ({ page }) => {
    await page.goto("/integration/indemnite-licenciement");

    const iframe = page.frameLocator("iframe");
    await expect(
      iframe.getByText("Calculer l'indemnité de licenciement")
    ).toBeVisible();
  });

  test("should display iframe préavis de démission", async ({ page }) => {
    await page.goto("/integration/preavis-demission");

    const iframe = page.frameLocator("iframe");
    await expect(
      iframe.getByText("Calculer le préavis de démission")
    ).toBeVisible();
  });

  test("should display iframe indemnité de précarité", async ({ page }) => {
    await page.goto("/integration/indemnite-precarite");

    const iframe = page.frameLocator("iframe");
    await expect(
      iframe.getByText("Calculer l'indemnité de précarité")
    ).toBeVisible();
  });

  test("should display iframe préavis de licenciement", async ({ page }) => {
    await page.goto("/integration/preavis-licenciement");

    const iframe = page.frameLocator("iframe");
    await expect(
      iframe.getByText("Calculer le préavis de licenciement")
    ).toBeVisible();
  });

  test("should display iframe préavis de retraite", async ({ page }) => {
    await page.goto("/integration/preavis-retraite");

    const iframe = page.frameLocator("iframe");
    await expect(
      iframe.getByText("Calculer le préavis de départ à la retraite")
    ).toBeVisible();
  });

  test("should display iframe procédure de licenciement", async ({ page }) => {
    await page.goto("/integration/procedure-licenciement");

    const iframe = page.frameLocator("iframe");
    await expect(
      iframe.getByText("Comprendre sa procédure de licenciement")
    ).toBeVisible();
  });
});
