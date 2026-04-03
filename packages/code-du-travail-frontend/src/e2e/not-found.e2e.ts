import { test, expect } from "@playwright/test";

test.describe("Not found", () => {
  test("page should show valid page to user", async ({ page }) => {
    const response = await page.goto("/banane");
    expect(response?.status()).toBe(404);
    await expect(page.locator("main")).toContainText("Erreur 404");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Page non trouvée"
    );

    const homeLink = page.getByRole("link", { name: "Page d'accueil" });
    await expect(homeLink).toHaveAttribute("href", "/");
  });

  test.describe("page should return 404 if does not exist", () => {
    const fragments = [
      "/outils",
      "/fiche-ministere-travail",
      "/fiche-service-public",
      "/code-du-travail",
      "/contribution",
      "/convention-collective",
      "/dossiers",
      "/glossaire",
      "/information",
      "/modeles-de-courriers",
      "/themes",
      "/widgets",
      "/integration",
      "",
    ];

    for (const fragment of fragments) {
      test(`page: ${fragment}/banane`, async ({ request }) => {
        const response = await request.get(`${fragment}/banane`);
        expect(response.status()).toBe(404);
      });
    }

    test("page /widgets/simulateur-embauche should return 404", async ({
      request,
    }) => {
      const response = await request.get("/widgets/simulateur-embauche");
      expect(response.status()).toBe(404);
    });
  });
});
