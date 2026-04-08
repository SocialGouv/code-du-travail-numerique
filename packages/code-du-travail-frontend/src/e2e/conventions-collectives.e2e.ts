import { expect, test } from "@playwright/test";

test.describe("Conventions collectives", () => {
  test.describe("Page principale", () => {
    test("je vois la liste de toutes les cc", async ({ page }) => {
      await page.goto("/");
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        "Bienvenue sur le Code du travail numérique"
      );

      await page
        .locator("#fr-header-main-navigation a", {
          hasText: "Conventions collectives",
        })
        .click();

      await expect(page).toHaveURL("/convention-collective");

      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        "Votre convention collective"
      );
      await expect(page.locator("body")).toContainText(
        "Les conventions collectives présentées sont les plus représentatives en termes de nombre de salariés"
      );
      await expect(page.locator("#content a")).toHaveCount(49);

      await page.locator("#content a").first().click();

      await expect(page).toHaveURL(
        "/convention-collective/2941-aide-accompagnement-soins-et-services-a-domicile-bad"
      );
    });
  });

  test.describe("Page d'une convention collective", () => {
    test('je vois les "contributions" et les "articles"', async ({ page }) => {
      await page.goto(
        "/convention-collective/2941-aide-accompagnement-soins-et-services-a-domicile-bad"
      );

      await expect(page.locator("#frequent-questions")).toBeAttached();
      await expect(page.locator("#frequent-questions h2")).toHaveText(
        "Questions-réponses fréquentes"
      );

      await expect(
        page.locator("#frequent-questions .fr-accordion__btn")
      ).toHaveCount(10);

      await expect(
        page.locator("#frequent-questions .fr-accordion__btn").first()
      ).toContainText("Congés");

      await page
        .locator("#frequent-questions .fr-accordion__btn")
        .first()
        .click();

      await expect(page.locator("#frequent-questions-list-0")).toBeAttached();

      const items = await page.locator("#frequent-questions-list-0 li").count();
      expect(items).toBeGreaterThan(1);

      await expect(page.locator("#agreement-articles")).toBeAttached();

      await expect(page.locator("#agreement-articles h2")).toHaveText(
        "Articles de la convention collective"
      );

      const articles = await page
        .locator("#agreement-articles .fr-accordion__title")
        .count();
      expect(articles).toBeGreaterThan(3);

      await expect(
        page.locator("#agreement-articles .fr-accordion__title").first()
      ).toHaveText("Salaires minima hiérarchiques");

      const agreemmentsArticles = await page
        .locator("#agreement-articles a")
        .count();

      await expect(agreemmentsArticles).toBeGreaterThan(49);

      await page.locator("#frequent-questions-list-0 a").first().click();

      await expect(page).toHaveURL(
        "/contribution/les-conges-pour-evenements-familiaux/2941-aide-accompagnement-soins-et-services-a-domicile-bad"
      );
    });
  });

  test.describe("Redirections", () => {
    test("je suis redirigé vers la cc si je mets seulement l'idcc dans l'url", async ({
      page,
    }) => {
      await page.goto("/convention-collective/0029");
      await expect(page).toHaveURL(
        "/convention-collective/29-hospitalisation-privee-etablissements-prives-dhospitalisation-de-soins-d"
      );
    });

    test("je suis redirigé vers la cc si je mets l'idcc en 4 chiffres", async ({
      page,
    }) => {
      await page.goto("/convention-collective/0650");
      await expect(page).toHaveURL("/convention-collective/3248-metallurgie");
    });

    test("je suis redirigé vers la cc si je mets l'idcc en 3 chiffres", async ({
      page,
    }) => {
      await page.goto("/convention-collective/650");
      await expect(page).toHaveURL("/convention-collective/3248-metallurgie");
    });

    test("je suis redirigé vers la cc si je mets l'idcc en 4 chiffres et deux zeros", async ({
      page,
    }) => {
      await page.goto("/convention-collective/0054");
      await expect(page).toHaveURL("/convention-collective/3248-metallurgie");
    });

    test("je ne dois pas être redirigé s'il n'y a pas de redirection", async ({
      request,
    }) => {
      const response = await request.get("/convention-collective/007");
      expect(response.status()).toBe(404);
    });
  });

  test.describe("Validation des balises noindex", () => {
    const NO_INDEX_TAG = '<meta name="robots" content="noindex, nofollow"/>';

    test("les cc non traités ont une balise noindex", async ({ request }) => {
      const response = await request.get(
        "/convention-collective/5021-statut-de-la-fonction-publique-territoriale"
      );
      const body = await response.text();
      expect(body).toContain(NO_INDEX_TAG);
    });

    test("les cc traités n'ont pas de balise noindex", async ({ request }) => {
      const response = await request.get(
        "/convention-collective/3236-industrie-et-services-nautiques"
      );
      const body = await response.text();
      expect(body).not.toContain(NO_INDEX_TAG);
    });
  });

  test.describe("Recherche legifrance", () => {
    test("je peux faire une recherche par mots clés", async ({ page }) => {
      await page.goto("/convention-collective/2941");

      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        "Aide, accompagnement, soins et services à domicile (BAD)"
      );

      await expect(page.locator('form[role="search"]')).toBeAttached();

      const searchInput = page.locator("#search-agreement");
      await expect(searchInput).toBeVisible();

      await searchInput.fill("congés");

      // Override window.open to capture the call args
      await page.evaluate(() => {
        (window as any).__openCalls = [];
        window.open = function (...args: any[]) {
          (window as any).__openCalls.push(args);
          return null;
        } as typeof window.open;
      });

      await searchInput.press("Enter");

      // Give time for the window.open call
      await page.waitForTimeout(500);

      const openCalls = await page.evaluate(
        () => (window as any).__openCalls as [string, string, string][]
      );

      expect(openCalls).toHaveLength(1);
      const [url, target, features] = openCalls[0];
      expect(target).toBe("_blank");
      expect(features).toBe("noopener,noreferrer");

      const expectedParams = new URLSearchParams({
        rawQuery: "congés",
        idcc: "2941",
        tab_selection: "kali",
        searchField: "ALL",
        query: "congés",
        searchType: "ALL",
        typePagination: "DEFAUT",
        sortValue: "PERTINENCE",
        pageSize: "10",
        page: "1",
      });

      const expectedUrl = `https://www.legifrance.gouv.fr/search/kali?${expectedParams.toString()}`;
      expect(url).toBe(expectedUrl);
    });
  });
});
