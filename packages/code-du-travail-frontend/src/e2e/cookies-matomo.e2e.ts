import { test, expect, type BrowserContext } from "@playwright/test";

// Aucun choix enregistré : le bandeau cookies s'affiche
test.use({ storageState: { cookies: [], origins: [] } });

const matomoCookies = async (context: BrowserContext) =>
  (await context.cookies())
    .map(({ name }) => name)
    .filter((name) => /^(_pk_|mtm_|matomo_)/.test(name));

test.describe("Cookies Matomo", () => {
  test("après « Tout refuser », la mesure continue sans aucun cookie", async ({
    page,
    context,
  }) => {
    // Les hits sont interceptés pour ne pas polluer les statistiques
    const hits: string[] = [];
    await context.route("**/matomo.php**", (route) => {
      hits.push(route.request().url());
      return route.fulfill({ status: 204 });
    });

    await page.goto("/");
    await page
      .getByRole("button", { name: "Refuser les cookies de suivi" })
      .click();

    await page.goto("/glossaire");
    await page.goto("/politique-confidentialite");

    await expect.poll(() => hits.length).toBeGreaterThan(0);
    expect(await matomoCookies(context)).toEqual([]);
  });
});
