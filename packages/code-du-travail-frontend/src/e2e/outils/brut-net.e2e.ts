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
    { nodeValue: 2253.9028125, unit: euros("mois") },
    { nodeValue: 2875, unit: euros("mois") },
  ],
};

/** La même simulation demandée en période annuelle, pour 34 500 €/an brut. */
const ANNUAL_FIXTURE = {
  evaluate: [
    { nodeValue: 45609.57, unit: euros("an") },
    { nodeValue: 34500, unit: euros("an") },
    { nodeValue: 27046.8337, unit: euros("an") },
    { nodeValue: 25547.8338, unit: euros("an") },
    { nodeValue: 5.3, unit: { numerators: ["%"], denominators: [] } },
    { nodeValue: 2253.9028125, unit: euros("mois") },
    { nodeValue: 2875, unit: euros("mois") },
  ],
};

/**
 * L'appel part directement du navigateur : c'est donc le domaine URSSAF qu'on
 * stube, et non une route interne.
 *
 * Le préchargement du SMIC, lui, se fait côté serveur pendant le SSR et échappe
 * à `page.route` : le seuil des messages contextuels est donc celui du **vrai**
 * SMIC net du jour (~1 456 €/mois, seuil à ~1 602 €). Les deux fixtures de
 * message ci-dessous sont choisies loin de ce seuil pour rester valables à
 * travers une revalorisation.
 */
const stubUrssaf = (page: Page, body: unknown = FIXTURE, status = 200) =>
  page.route(EVALUATE_URL, (route) =>
    route.fulfill({
      status,
      contentType: "application/json",
      body: JSON.stringify(body),
    })
  );

/**
 * Stub qui répond dans l'unité demandée, après un délai.
 *
 * Le délai est le sujet du test, pas un artifice : c'est pendant qu'il court que
 * l'écran peut mentir, en montrant des montants qui ne correspondent plus à ce
 * que le libellé annonce ou en effaçant une saisie en attente de réponse.
 */
const stubUrssafSlow = (page: Page, delayMs: number) =>
  page.route(EVALUATE_URL, async (route) => {
    const payload = JSON.parse(route.request().postData() ?? "{}");
    const annual = payload.expressions?.[0]?.unité === "€/an";

    await new Promise((resolve) => setTimeout(resolve, delayMs));
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(annual ? ANNUAL_FIXTURE : FIXTURE),
    });
  });

/** Le nom accessible d'un champ DSFR concatène son label et son `hintText`. */
const amountField = (page: Page, accessibleName: RegExp) =>
  page.getByRole("textbox", { name: accessibleName });

/*
 * Pas de `getByTestId` dans ce fichier : le build de production supprime les
 * `data-testid` (next.config.mjs, `reactRemoveProperties`) et l'e2e tourne
 * contre la review app, pas contre un build local. On cible donc les rôles et
 * les noms accessibles — ce que l'usager et le lecteur d'écran voient.
 */
const contextualMessage = (page: Page, key: "minimum" | "primes") =>
  page.getByRole("link", {
    name:
      key === "minimum"
        ? "Vérifiez votre salaire minimum"
        : "Vérifiez les primes prévues par votre convention collective",
    exact: true,
  });

const urssafLink = (page: Page) =>
  page.getByRole("link", { name: /Une simulation plus détaillée/ });

const errorAlert = (page: Page) =>
  page.getByRole("heading", { name: "Service temporairement indisponible" });

const informationsAlert = (page: Page) =>
  page.getByRole("heading", { name: "Informations", exact: true });

/** Le bloc de cartes, repéré par la liste qui contient la première d'entre elles. */
const deepDiveList = (page: Page) =>
  page.getByRole("list").filter({
    has: page.getByRole("link", { name: /Quel est le salaire minimum/ }),
  });

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
    await expect(contextualMessage(page, "primes")).toBeVisible();
    await expect(contextualMessage(page, "minimum")).toHaveCount(0);
  });

  test("bascule les montants en annuel", async ({ page }) => {
    await stubUrssaf(page, ANNUAL_FIXTURE);
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

    // Le simulateur URSSAF ne sait lire qu'un montant mensuel : lui passer les
    // 34 500 €/an affichés l'ouvrirait sur un brut douze fois trop élevé.
    const href = await urssafLink(page).getAttribute("href");
    expect(
      new URL(href as string).searchParams.get(
        "salarié . contrat . salaire brut"
      )
    ).toBe("2875€/mois");
  });

  test("garde les montants à l'écran quand l'usager tape la virgule décimale", async ({
    page,
  }) => {
    // « 1 867, » n'est pas un montant parsable, mais c'est l'état normal du
    // champ au moment où l'on écrit un salaire en français. Tout effacer à cet
    // instant ferait clignoter les trois autres montants et le message
    // contextuel à chaque décimale tapée.
    await stubUrssaf(page);
    await page.goto(PAGE_URL);

    const brut = amountField(page, /^Salaire brut/);
    await brut.fill("1867");
    await expect
      .poll(async () =>
        digits(await amountField(page, /Coût total employeur/).inputValue())
      )
      .toBe("3800,80");

    await brut.press("End");
    await brut.press(",");

    await expect(brut).toHaveValue("1867,");
    expect(
      digits(await amountField(page, /Coût total employeur/).inputValue())
    ).toBe("3800,80");
    await expect(contextualMessage(page, "primes")).toBeVisible();
  });

  test("n'affiche jamais un montant mensuel sous le libellé annuel", async ({
    page,
  }) => {
    // Le suffixe et le `hintText` basculent au clic ; la réponse annuelle
    // n'arrive qu'un debounce et un aller-retour plus tard. Entre les deux,
    // aucun montant ne doit rester affiché sous la nouvelle unité.
    await stubUrssafSlow(page, 2_000);
    await page.goto(PAGE_URL);

    await amountField(page, /^Salaire brut/).fill("2875");
    await expect
      .poll(async () =>
        digits(await amountField(page, /Coût total employeur/).inputValue())
      )
      .toBe("3800,80");

    await page.getByText("Montant annuel", { exact: true }).click();

    await expect(page.getByText("€ par an").first()).toBeVisible();
    for (const label of [
      /Coût total employeur/,
      /^Salaire brut/,
      /Salaire net avant impôt/,
      /Salaire net après impôt/,
    ]) {
      expect(await amountField(page, label).inputValue()).toBe("");
    }

    await expect
      .poll(
        async () =>
          digits(await amountField(page, /Coût total employeur/).inputValue()),
        { timeout: 10_000 }
      )
      .toBe("45609,57");
  });

  test("garde la saisie quand l'usager quitte le champ avant la réponse", async ({
    page,
  }) => {
    // Taper un montant puis faire Tab aussitôt arrive avant la fin du debounce :
    // reprendre la valeur formatée des résultats, encore vides, viderait le
    // champ sous les yeux de l'usager.
    await stubUrssafSlow(page, 3_000);
    await page.goto(PAGE_URL);

    const brut = amountField(page, /^Salaire brut/);
    await brut.fill("3000");
    await brut.press("Tab");

    await expect(brut).not.toBeFocused();
    await expect(brut).toHaveValue("3000");
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
        { nodeValue: 1470.31, unit: euros("mois") },
        { nodeValue: 1875, unit: euros("mois") },
      ],
    });
    await page.goto(PAGE_URL);

    await amountField(page, /^Salaire brut/).fill("1875");

    const message = contextualMessage(page, "minimum");
    await expect(message).toBeVisible();
    await expect(message).toHaveAttribute(
      "href",
      "/contribution/quel-est-le-salaire-minimum"
    );
    // Exclusivité mutuelle des deux messages.
    await expect(contextualMessage(page, "primes")).toHaveCount(0);
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

    const link = urssafLink(page);
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

  test("pointe vers les trois contenus à approfondir", async ({ page }) => {
    await stubUrssaf(page);
    await page.goto(PAGE_URL);

    // La maquette ne met pas de titre au-dessus du bloc : on cible la liste par
    // sa première carte plutôt que par un intertitre qui n'existe pas.
    const hrefs = await deepDiveList(page)
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

    const brut = amountField(page, /^Salaire brut/);
    await brut.fill("2875");

    await expect(errorAlert(page)).toBeVisible();
    // L'alerte se pose au-dessus des champs : ils restent montés, avec le focus
    // et la saisie en cours. Les démonter couperait la frappe.
    await expect(brut).toBeFocused();
    await expect(brut).toHaveValue("2875");
    await expect(page.getByRole("textbox")).toHaveCount(4);
    // Le reste de la page reste rendu et interactif.
    await expect(informationsAlert(page)).toBeVisible();
    await expect(urssafLink(page)).toBeVisible();
    await expect(deepDiveList(page)).toBeVisible();
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

  test("ne présente aucune violation d'accessibilité en état d'erreur", async ({
    page,
  }) => {
    // L'état d'erreur ajoute un titre dans le DOM : scanner le seul état nominal
    // laissait passer un saut de niveau depuis le `h1` de la page.
    await stubUrssaf(page, { message: "boom" }, 500);
    await page.goto(PAGE_URL);

    await amountField(page, /^Salaire brut/).fill("2875");
    await expect(errorAlert(page)).toBeVisible();

    const { violations } = await scanPage(page, "simulateur brut/net — erreur");
    expect(violations).toEqual([]);
  });
});
