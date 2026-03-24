import { expect, test } from "@playwright/test";

test.describe("Header Search", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  const openHeaderSearchModal = async (page) => {
    // On desktop we have #fr-header-search-button-desktop.
    // On mobile we have #fr-header-search-button.
    const desktopBtn = await page
      .locator("#fr-header-search-button-desktop")
      .count();

    if (desktopBtn > 0) {
      await page.locator("#fr-header-search-button-desktop").click();
    } else {
      await page.locator("#fr-header-search-button").click();
    }

    await expect(page.locator("#search-modal")).toBeVisible();
  };

  test("should redirect to /recherche when clicking 'Voir tous les résultats' in the header search modal", async ({
    page,
  }) => {
    await openHeaderSearchModal(page);

    const searchModal = page.locator("#search-modal");
    const searchInput = searchModal.locator("#search-modal-autocomplete");

    await searchInput.fill("congé");
    await searchModal
      .getByRole("button", { name: "Voir tous les résultats" })
      .click();

    await expect(page).toHaveURL(/\/recherche\?query=cong%C3%A9/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Recherche" })
    ).toBeVisible();
  });

  test("should show 'retraite' in autocomplete suggestions when typing 'rét' in the header search modal", async ({
    page,
  }) => {
    await openHeaderSearchModal(page);

    const searchModal = page.locator("#search-modal");
    const searchInput = searchModal.locator("#search-modal-autocomplete");

    await searchInput.fill("rét");

    // Suggestions listbox is always present; ensure we have options.
    const suggestionsList = searchModal.locator(
      "#search-modal-autocomplete-listbox"
    );
    const optionWithRetraite = suggestionsList.locator(
      "li[role='option']:has-text('retraite')"
    );

    await expect(optionWithRetraite.first()).toBeVisible();
  });

  test("should show the definition if present in glossary", async ({
    page,
  }) => {
    await openHeaderSearchModal(page);

    const searchModal = page.locator("#search-modal");
    const searchInput = searchModal.locator("#search-modal-autocomplete");

    await searchInput.fill("arret de travail");
    await searchInput.press("Enter");

    await expect(searchModal).toContainText(
      "Période pendant laquelle le salarié cesse de travailler en raison de son état de santé"
    );
  });
});
