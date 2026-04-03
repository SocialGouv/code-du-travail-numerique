import { test, expect } from "@playwright/test";
import { expectNoIndex, expectCanonicalUrlEqual } from "./helpers";

const widgets = [
  {
    path: "/widgets/indemnite-licenciement",
    title: "Calculer l'indemnité de licenciement",
    canonicalPath: "/outils/indemnite-licenciement",
  },
  {
    path: "/widgets/procedure-licenciement",
    title: "Comprendre sa procédure de licenciement",
    canonicalPath: "/outils/procedure-licenciement",
  },
  {
    path: "/widgets/indemnite-precarite",
    title: "Calculer l'indemnité de précarité",
    canonicalPath: "/outils/indemnite-precarite",
  },
  {
    path: "/widgets/preavis-demission",
    title: "Calculer le préavis de démission",
    canonicalPath: "/outils/preavis-demission",
  },
  {
    path: "/widgets/preavis-licenciement",
    title: "Calculer le préavis de licenciement",
    canonicalPath: "/outils/preavis-licenciement",
  },
  {
    path: "/widgets/preavis-retraite",
    title: "Calculer le préavis de départ à la retraite",
    canonicalPath: "/outils/preavis-retraite",
  },
  {
    path: "/widgets/indemnite-rupture-conventionnelle",
    title: "Calculer l'indemnité de rupture conventionnelle",
    canonicalPath: "/outils/indemnite-rupture-conventionnelle",
  },
  {
    path: "/widgets/modeles-de-courriers/9a6cf1b40c",
    title: "Lettre de démission",
    canonicalPath: "/modeles-de-courriers/lettre-de-demission",
  },
  {
    path: "/widgets/search",
    title: "Trouvez les réponses à vos questions en droit du travail",
    canonicalPath: "/recherche",
  },
  {
    path: "/widgets/convention-collective",
    title: "Trouver sa convention collective",
    canonicalPath: "/outils/convention-collective",
  },
];

test.describe("Widgets - Chargement local", () => {
  for (const widget of widgets) {
    test(`devrait charger le widget ${widget.path}`, async ({ page }) => {
      await page.goto(widget.path);
      await expectNoIndex(page);
      await expectCanonicalUrlEqual(page, widget.canonicalPath);
      await expect(page.getByText(widget.title).first()).toBeVisible();
    });
  }

  test("Vérification du lien de téléchargement du modèle de lettre de démission", async ({
    page,
  }) => {
    await page.goto("/widgets/modeles-de-courriers/9a6cf1b40c");
    const link = page.getByRole("link", {
      name: "Télécharger le Modèle de lettre - Lettre de démission",
    });
    await expect(link).toHaveAttribute(
      "href",
      /\/preview\/default\/lettre_de_demission\.docx$/
    );
  });

  test("Page widget preavis de retraite", async ({ page }) => {
    await page.goto("/widgets/preavis-retraite");
    await expect(page.getByText("Étape").first()).toBeVisible();
    await expect(
      page.getByText("Calculer le préavis de départ à la retraite").first()
    ).toBeVisible();
    await expect(
      page
        .getByText(
          "Ce simulateur vous permet de calculer la durée de préavis à respecter en cas de départ ou de mise à la retraite"
        )
        .first()
    ).toBeVisible();

    await page.getByRole("button", { name: "Commencer" }).click();
    await expect(
      page.getByText("Qui est à l'origine du départ en retraite ?")
    ).toBeVisible();
  });

  test("Page widget preavis de licenciement", async ({ page }) => {
    await page.goto("/widgets/preavis-licenciement");
    await expect(page.getByText("Étape").first()).toBeVisible();
    await expect(
      page.getByText("Calculer le préavis de licenciement").first()
    ).toBeVisible();
    await expect(
      page
        .getByText(
          "Ce simulateur permet de calculer la durée du préavis accordée au salarié en cas de licenciement"
        )
        .first()
    ).toBeVisible();

    await page.getByRole("button", { name: "Commencer" }).click();
    await expect(
      page.getByText(
        "Le licenciement est-il dû à une faute grave (ou lourde) ?"
      )
    ).toBeVisible();
  });
});
