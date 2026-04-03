import { test, expect } from "@playwright/test";

test.describe("Header", () => {
  test("doit afficher les liens d'évitement", async ({ page }) => {
    await page.goto("/mentions-legales");

    // The skiplinks container uses DSFR :focus-within to reveal links
    const firstSkipLink = page.locator("[id^=fr-skiplinks] a").first();

    // Before tabbing, the first skip link should not be focused
    await expect(firstSkipLink).not.toBeFocused();

    await page.keyboard.press("Tab");
    await expect(firstSkipLink).toBeFocused();
    await expect(firstSkipLink).toHaveAttribute("href", "#main");

    await page.keyboard.press("Tab");
    await expect(page.locator(":focus")).toHaveAttribute(
      "href",
      "#fr-header-main-navigation"
    );

    await page.keyboard.press("Tab");
    const href3 = await page.locator(":focus").getAttribute("href");
    expect(href3).toMatch(/^#fr-header-search-button(-desktop)?$/);

    await page.keyboard.press("Tab");
    await expect(page.locator(":focus")).toHaveAttribute("href", "#more-info");

    await page.keyboard.press("Enter");

    await page.keyboard.press("Tab");
    await expect(page.locator(":focus")).toHaveText(
      "Trouver les services près de chez moi"
    );
  });
});
