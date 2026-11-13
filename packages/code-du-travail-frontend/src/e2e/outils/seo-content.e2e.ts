import { test, expect } from "@playwright/test";

const tools = [
  {
    path: "/outils/simulateur-embauche",
    title: "Comment passer d'un salaire brut à un salaire net ?",
  },
  {
    path: "/outils/preavis-demission",
    title: "Quelle est la durée du préavis en cas de démission ?",
  },
  {
    path: "/outils/indemnite-precarite",
    title: "Qu'est-ce que la prime de précarité en fin de CDD ?",
  },
  {
    path: "/outils/indemnite-rupture-conventionnelle",
    title:
      "Quel est le montant minimum de l'indemnité de rupture conventionnelle ?",
  },
  {
    path: "/outils/convention-collective",
    title: "Comment trouver sa convention collective ?",
  },
  {
    path: "/outils/indemnite-retraite",
    title: "Quel est le montant de l'indemnité de départ à la retraite ?",
  },
  {
    path: "/outils/preavis-licenciement",
    title: "Quelle est la durée du préavis en cas de licenciement ?",
  },
  {
    path: "/outils/preavis-retraite",
    title: "Quel préavis respecter pour un départ à la retraite ?",
  },
];

test.describe("Outils - Texte SEO sous le simulateur", () => {
  for (const tool of tools) {
    test(`affiche le texte SEO sur ${tool.path}`, async ({ page }) => {
      await page.goto(tool.path);
      const section = page.getByRole("region", { name: tool.title });
      await expect(
        section.getByRole("heading", { level: 2, name: tool.title })
      ).toBeVisible();
      await expect(
        section.locator('a[href^="/code-du-travail/"]').first()
      ).toBeVisible();
      await expect(page.locator("script#jsonld-tool-faq")).toHaveCount(1);
    });
  }

  test("n'affiche le texte SEO qu'à la première étape", async ({ page }) => {
    await page.goto("/outils/indemnite-rupture-conventionnelle");
    await expect(page.locator("#tool-seo-content-title")).toBeVisible();

    await page.getByRole("button", { name: "Commencer" }).click();

    await expect(page.getByTestId("stepper")).toContainText("Étape 2");
    await expect(page.locator("#tool-seo-content-title")).toHaveCount(0);
  });
});
