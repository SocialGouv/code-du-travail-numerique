import { expect, Page, test } from "@playwright/test";
import { expectTitleAndMetaDescriptionEqual, scanPage } from "../helpers";

const EVALUATE_URL = "https://mon-entreprise.urssaf.fr/api/v1/evaluate";
const PAGE_URL = "/outils/simulateur-embauche";

const euros = (denominator: "mois" | "an") => ({
  numerators: ["€"],
  denominators: [denominator],
});

/**
 * Valeurs mesurées sur l'API URSSAF pour 2 875 €/mois brut, dans l'ordre des
 * expressions demandées par `buildUrssafPayload`.
 */
const FIXTURE = {
  evaluate: [
    { nodeValue: 3800.7975, unit: euros("mois") },
    { nodeValue: 2875, unit: euros("mois") },
    { nodeValue: 2253.9028125, unit: euros("mois") },
    { nodeValue: 2128.9861458, unit: euros("mois") },
    { nodeValue: 5.3, unit: { numerators: ["%"], denominators: [] } },
    { nodeValue: 1867.0166666, unit: euros("mois") },
    { nodeValue: 2253.9028125, unit: euros("mois") },
  ],
};

/**
 * L'appel part directement du navigateur : c'est donc le domaine URSSAF qu'on
 * stube, et non une route interne.
 *
 * Le préchargement du SMIC, lui, se fait côté serveur pendant le SSR et échappe
 * à `page.route`. C'est précisément pourquoi chaque évaluation client renvoie
 * elle aussi le SMIC net : le message contextuel reste pilotable depuis ce stub.
 */
const stubUrssaf = (page: Page, body: unknown = FIXTURE, status = 200) =>
  page.route(EVALUATE_URL, (route) =>
    route.fulfill({
      status,
      contentType: "application/json",
      body: JSON.stringify(body),
    })
  );

/** Le nom accessible d'un champ DSFR concatène son label et son `hintText`. */
const amountField = (page: Page, accessibleName: RegExp) =>
  page.getByRole("textbox", { name: accessibleName });

const digits = (value: string) => value.replace(/[\s  ]/g, "");

test.describe("Outil - Salaire brut/net", () => {
  test("calcule les quatre montants à partir du salaire brut", async ({
    page,
  }) => {
    await stubUrssaf(page);
    await page.goto(PAGE_URL);

    // Enjeu SEO : c'est le premier contenu du site en audience, le titre et la
    // meta-description ne doivent pas bouger avec le passage en UI native.
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

    await amountField(page, /^Salaire brut/).fill("2875");

    await expect
      .poll(async () =>
        digits(await amountField(page, /Coût total employeur/).inputValue())
      )
      .toBe("3800,80");
    expect(
      digits(await amountField(page, /Salaire net avant impôt/).inputValue())
    ).toBe("2253,90");
    expect(
      digits(await amountField(page, /Salaire net après impôt/).inputValue())
    ).toBe("2128,99");

    await expect(
      page.getByText(/Taux de référence pour une personne célibataire/)
    ).toContainText("5,3 %");

    // Net (2 253,90 €) largement au-dessus du SMIC net majoré de 10 % : c'est
    // le message « primes », et lui seul.
    await expect(
      page.getByTestId("brut-net-message-primes-conventionnelles")
    ).toBeVisible();
    await expect(
      page.getByTestId("brut-net-message-salaire-minimum")
    ).toHaveCount(0);
  });

  test("bascule les montants en annuel", async ({ page }) => {
    await stubUrssaf(page, {
      evaluate: [
        { nodeValue: 45609.57, unit: euros("an") },
        { nodeValue: 34500, unit: euros("an") },
        { nodeValue: 27046.8337, unit: euros("an") },
        { nodeValue: 25547.8338, unit: euros("an") },
        { nodeValue: 5.3, unit: { numerators: ["%"], denominators: [] } },
        { nodeValue: 1867.0166666, unit: euros("mois") },
        { nodeValue: 2253.9028125, unit: euros("mois") },
      ],
    });
    await page.goto(PAGE_URL);

    // Le DSFR masque l'`<input type="radio">` derrière son label : c'est le
    // label qu'un usager clique, et le seul élément cliquable pour Playwright.
    await page.getByText("Montant annuel", { exact: true }).click();
    await expect(
      page.getByRole("radio", { name: "Montant annuel" })
    ).toBeChecked();

    await amountField(page, /^Salaire brut/).fill("34500");

    await expect
      .poll(async () =>
        digits(await amountField(page, /Coût total employeur/).inputValue())
      )
      .toBe("45609,57");
    await expect(page.getByText("€ par an").first()).toBeVisible();
  });

  test("affiche le message « salaire minimum » près du SMIC", async ({
    page,
  }) => {
    await stubUrssaf(page, {
      evaluate: [
        { nodeValue: 2478.86, unit: euros("mois") },
        { nodeValue: 1875, unit: euros("mois") },
        { nodeValue: 1470.31, unit: euros("mois") },
        { nodeValue: 1470.31, unit: euros("mois") },
        { nodeValue: 0, unit: { numerators: ["%"], denominators: [] } },
        { nodeValue: 1455.99, unit: euros("mois") },
        { nodeValue: 1470.31, unit: euros("mois") },
      ],
    });
    await page.goto(PAGE_URL);

    await amountField(page, /^Salaire brut/).fill("1875");

    const message = page.getByTestId("brut-net-message-salaire-minimum");
    await expect(message).toBeVisible();
    await expect(message).toHaveAttribute(
      "href",
      "/contribution/quel-est-le-salaire-minimum"
    );
    // Exclusivité mutuelle des deux messages.
    await expect(
      page.getByTestId("brut-net-message-primes-conventionnelles")
    ).toHaveCount(0);
  });

  test("propose un lien prérempli vers le simulateur URSSAF", async ({
    page,
  }) => {
    await stubUrssaf(page);
    await page.goto(PAGE_URL);

    await amountField(page, /^Salaire brut/).fill("2875");
    await expect
      .poll(async () =>
        digits(await amountField(page, /Coût total employeur/).inputValue())
      )
      .toBe("3800,80");

    const link = page.getByTestId("brut-net-lien-urssaf");
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");

    const href = await link.getAttribute("href");
    const url = new URL(href as string);
    expect(url.origin + url.pathname).toBe(
      "https://mon-entreprise.urssaf.fr/simulateurs/salaire-brut-net"
    );
    expect(url.searchParams.get("salarié . contrat . salaire brut")).toBe(
      "2875€/mois"
    );
    expect(url.searchParams.get("salarié . contrat")).toBe("'CDI'");
    expect(url.searchParams.get("unité")).toBe("€/mois");
  });

  test("pointe vers les trois contenus « Pour approfondir »", async ({
    page,
  }) => {
    await stubUrssaf(page);
    await page.goto(PAGE_URL);

    const hrefs = await page
      .getByRole("heading", { name: "Pour approfondir" })
      .locator("xpath=following-sibling::ul[1]")
      .getByRole("link")
      .evaluateAll((links) => links.map((link) => link.getAttribute("href")));

    expect(hrefs).toEqual([
      "/infographie/quel-est-le-salaire-minimum",
      "/contribution/quel-est-le-salaire-minimum",
      "/convention-collective",
    ]);
  });

  test("affiche une alerte sans casser la page quand l'API tombe", async ({
    page,
  }) => {
    await stubUrssaf(page, { message: "boom" }, 500);
    await page.goto(PAGE_URL);

    await amountField(page, /^Salaire brut/).fill("2875");

    await expect(page.getByTestId("brut-net-erreur")).toBeVisible();
    // Le reste de la page reste rendu et interactif.
    await expect(page.getByTestId("brut-net-informations")).toBeVisible();
    await expect(page.getByTestId("brut-net-lien-urssaf")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Pour approfondir" })
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Réessayer" })).toBeVisible();
  });

  test("place la période au-dessus des montants en mobile", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await stubUrssaf(page);
    await page.goto(PAGE_URL);

    const periode = await page
      .getByRole("group", { name: "Période de calcul" })
      .boundingBox();
    const coutTotal = await amountField(
      page,
      /Coût total employeur/
    ).boundingBox();

    expect(periode?.y).toBeLessThan(coutTotal?.y as number);
  });

  test("ne présente aucune violation d'accessibilité", async ({ page }) => {
    await stubUrssaf(page);
    await page.goto(PAGE_URL);

    await amountField(page, /^Salaire brut/).fill("2875");
    await expect
      .poll(async () =>
        digits(await amountField(page, /Coût total employeur/).inputValue())
      )
      .toBe("3800,80");

    const { violations } = await scanPage(page, "simulateur brut/net");
    expect(violations).toEqual([]);
  });
});
