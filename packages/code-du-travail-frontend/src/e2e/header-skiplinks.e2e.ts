import { test, expect } from "@playwright/test";

test.describe("Header", () => {
  test("doit afficher les liens d'évitement", async ({ page }) => {
    await page.goto("/mentions-legales");

    // The skiplinks container uses DSFR :focus-within to reveal links
    const skipLinksContainer = page.locator("[id^=fr-skiplinks]");
    const firstSkipLink = skipLinksContainer.locator("a").first();

    await expect(skipLinksContainer).not.toBeVisible();

    await page.keyboard.press("Tab");
    await expect(skipLinksContainer).toBeVisible();
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
    await expect(skipLinksContainer).not.toBeVisible();

    await page.keyboard.press("Tab");
    await expect(page.locator(":focus")).toHaveText(
      "Trouver les services près de chez moi"
    );
  });
});
