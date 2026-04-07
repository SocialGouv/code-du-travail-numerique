import { test, expect } from "@playwright/test";

const GITHUB_PAGES_BASE =
  "https://socialgouv.github.io/code-du-travail-numerique";

test.describe("Widgets externes", () => {
  test("Widget - Préavis de licenciement (legacy)", async ({ page }) => {
    await page.goto(`${GITHUB_PAGES_BASE}/preavis-licenciement-legacy`);
    const iframe = page.frameLocator("iframe");
    await expect(
      iframe.getByText("Calculer le préavis de licenciement")
    ).toBeVisible();
  });

  test("Widget - Préavis de licenciement", async ({ page }) => {
    await page.goto(`${GITHUB_PAGES_BASE}/preavis-licenciement`);
    const iframe = page.frameLocator("iframe");
    await expect(
      iframe.getByText("Calculer le préavis de licenciement")
    ).toBeVisible();
  });

  test("Widget - Trouver sa convention collective (legacy)", async ({
    page,
  }) => {
    await page.goto(
      `${GITHUB_PAGES_BASE}/trouver-sa-convention-collective-legacy`
    );
    const iframe = page.frameLocator("iframe");
    await expect(
      iframe.getByText("Trouver sa convention collective")
    ).toBeVisible();
    await iframe
      .getByLabel("Nom de votre entreprise ou numéro Siren/Siret")
      .fill("carrefour");
    await iframe.getByRole("button", { name: /Rechercher|submit/i }).click();
    await iframe.getByText("CARREFOUR HYPERMARCHES").click();
    await iframe
      .getByText(
        "Commerce de détail et de gros à prédominance alimentaire IDCC 2216"
      )
      .click();
  });

  test("Widget - Trouver sa convention collective", async ({ page }) => {
    await page.goto(`${GITHUB_PAGES_BASE}/trouver-sa-convention-collective`);
    const iframe = page.frameLocator("iframe");
    await expect(
      iframe.getByText("Trouver sa convention collective")
    ).toBeVisible();
    await iframe
      .getByLabel("Nom de votre entreprise ou numéro Siren/Siret")
      .fill("carrefour");
    await iframe.getByRole("button", { name: /Rechercher|submit/i }).click();
    await iframe.getByText("CARREFOUR HYPERMARCHES").click();
    await iframe
      .getByText(
        "Commerce de détail et de gros à prédominance alimentaire IDCC 2216"
      )
      .click();
  });

  test("Widget - Préavis de démission (legacy)", async ({ page }) => {
    await page.goto(`${GITHUB_PAGES_BASE}/preavis-demission-legacy`);
    const iframe = page.frameLocator("iframe");
    await expect(
      iframe.getByText("Calculer le préavis de démission")
    ).toBeVisible();
  });

  test("Widget - Préavis de démission", async ({ page }) => {
    await page.goto(`${GITHUB_PAGES_BASE}/preavis-demission`);
    const iframe = page.frameLocator("iframe");
    await expect(
      iframe.getByText("Calculer le préavis de démission")
    ).toBeVisible();
  });

  test("Widget - Indemnité de licenciement (legacy)", async ({ page }) => {
    await page.goto(`${GITHUB_PAGES_BASE}/indemnite-licenciement-legacy`);
    const iframe = page.frameLocator("iframe");
    await expect(
      iframe.getByText("Calculer l'indemnité de licenciement")
    ).toBeVisible();
  });

  test("Widget - Indemnité de licenciement", async ({ page }) => {
    await page.goto(`${GITHUB_PAGES_BASE}/indemnite-licenciement`);
    const iframe = page.frameLocator("iframe");
    await expect(
      iframe.getByText("Calculer l'indemnité de licenciement")
    ).toBeVisible();
  });

  test("Widget - Préavis de retraite", async ({ page }) => {
    await page.goto(`${GITHUB_PAGES_BASE}/preavis-retraite`);
    const iframe = page.frameLocator("iframe");
    await expect(
      iframe.getByText("Calculer le préavis de départ à la retraite")
    ).toBeVisible();
  });

  test("Widget - Préavis de retraite (legacy)", async ({ page }) => {
    await page.goto(`${GITHUB_PAGES_BASE}/preavis-retraite-legacy`);
    const iframe = page.frameLocator("iframe");
    await expect(
      iframe.getByText("Calculer le préavis de départ à la retraite")
    ).toBeVisible();
  });

  test("Widget - Moteur de recherche (legacy)", async ({ page }) => {
    await page.goto(`${GITHUB_PAGES_BASE}/recherche-legacy`);
    const iframe = page.frameLocator("iframe");
    await expect(
      iframe.getByText(
        "Trouvez les réponses à vos questions en droit du travail"
      )
    ).toBeVisible();
  });

  test("Widget - Moteur de recherche", async ({ page }) => {
    await page.goto(`${GITHUB_PAGES_BASE}/recherche`);
    const iframe = page.frameLocator("iframe");
    await expect(
      iframe.getByText(
        "Trouvez les réponses à vos questions en droit du travail"
      )
    ).toBeVisible();
  });

  test("Widget - Indemnité de précarité (legacy)", async ({ page }) => {
    await page.goto(`${GITHUB_PAGES_BASE}/indemnite-precarite-legacy`);
    const iframe = page.frameLocator("iframe");
    await expect(
      iframe.getByText("Calculer l'indemnité de précarité")
    ).toBeVisible();
  });

  test("Widget - Indemnité de précarité", async ({ page }) => {
    await page.goto(`${GITHUB_PAGES_BASE}/indemnite-precarite`);
    const iframe = page.frameLocator("iframe");
    await expect(
      iframe.getByText("Calculer l'indemnité de précarité")
    ).toBeVisible();
  });

  test("Widget - Modèles de courrier (legacy)", async ({ page }) => {
    await page.goto(`${GITHUB_PAGES_BASE}/modeles-legacy`);
    const iframe = page.frameLocator("iframe");
    await expect(
      iframe.getByText("LUTTE CONTRE LE HARCELEMENT SEXUEL")
    ).toBeVisible();
  });

  test("Widget - Modèles de courrier", async ({ page }) => {
    await page.goto(`${GITHUB_PAGES_BASE}/modeles`);
    const iframe = page.frameLocator("iframe");
    await expect(
      iframe.getByText("LUTTE CONTRE LE HARCELEMENT SEXUEL")
    ).toBeVisible();
  });

  test("Widget - Procédure de licenciement (legacy)", async ({ page }) => {
    await page.goto(`${GITHUB_PAGES_BASE}/procedure-licenciement-legacy`);
    const iframe = page.frameLocator("iframe");
    await expect(
      iframe.getByText("Comprendre sa procédure de licenciement")
    ).toBeVisible();
  });

  test("Widget - Procédure de licenciement", async ({ page }) => {
    await page.goto(`${GITHUB_PAGES_BASE}/procedure-licenciement`);
    const iframe = page.frameLocator("iframe");
    await expect(
      iframe.getByText("Comprendre sa procédure de licenciement")
    ).toBeVisible();
  });

  test("Widget - Indemnité de rupture conventionnelle (legacy)", async ({
    page,
  }) => {
    await page.goto(
      `${GITHUB_PAGES_BASE}/indemnite-rupture-conventionnelle-legacy`
    );
    const iframe = page.frameLocator("iframe");
    await expect(
      iframe.getByText("Calculer l'indemnité de rupture conventionnelle")
    ).toBeVisible();
  });

  test("Widget - Indemnité de rupture conventionnelle", async ({ page }) => {
    await page.goto(`${GITHUB_PAGES_BASE}/indemnite-rupture-conventionnelle`);
    const iframe = page.frameLocator("iframe");
    await expect(
      iframe.getByText("Calculer l'indemnité de rupture conventionnelle")
    ).toBeVisible();
  });
});
