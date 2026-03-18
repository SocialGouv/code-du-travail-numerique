import { expect, test } from "@playwright/test";

const openHeaderAgreementModal = async (page: any) => {
  const desktopBtn = page.locator("#fr-header-agreement-button-desktop");
  const mobileBtn = page.locator("#fr-header-agreement-button");

  if (await desktopBtn.isVisible().catch(() => false)) {
    await desktopBtn.focus();
    await page.keyboard.press("Enter");
  } else {
    await mobileBtn.focus();
    await page.keyboard.press("Enter");
  }

  await expect(page.locator("#agreement-modal")).toBeVisible({
    timeout: 5000,
  });

  // Wait for the modal's focus management to settle
  // (it focuses the close button after 100ms)
  await page.waitForTimeout(300);
};

test.describe("Header agreement selector", () => {
  test("should allow selecting an agreement, show selected view with actions, and persist in localStorage", async ({
    page,
  }) => {
    // Only clear the convention key, keep cookie consent from global setup
    await page.addInitScript(() => {
      window.localStorage.removeItem("convention");
    });

    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    await openHeaderAgreementModal(page);

    // Ensure the autocomplete input is visible within the modal
    const input = page.locator(
      "#agreement-modal #header-agreement-search-autocomplete"
    );
    await expect(input).toBeVisible();

    // Click and focus the input, then type
    await input.click();
    await expect(input).toBeFocused();
    await input.pressSequentially("2247", { delay: 150 });

    // Wait for the search to fully resolve (IDCC 2247 returns exactly 1 result)
    await expect(
      page.locator("#agreement-modal ul[role='listbox'] li")
    ).toHaveCount(1, { timeout: 15000 });

    await page.waitForTimeout(300);

    // Click the result
    await page
      .locator("#agreement-modal ul[role='listbox'] li")
      .first()
      .click();

    // Verify the selection was persisted to localStorage
    const convention = await page.evaluate(() =>
      window.localStorage.getItem("convention")
    );
    expect(convention).toContain('"num":2247');

    // After selection, the modal should show the selected agreement view
    await expect(
      page
        .locator("#agreement-modal")
        .getByText("Convention collective sélectionnée :")
    ).toBeVisible();

    await expect(
      page.locator("#agreement-modal").getByText("Entreprises de courtage")
    ).toBeVisible();

    await expect(
      page
        .locator("#agreement-modal")
        .getByRole("button", { name: "Supprimer" })
    ).toBeVisible();
    await expect(
      page.locator("#agreement-modal").getByRole("button", { name: "Modifier" })
    ).toBeVisible();
    await expect(
      page
        .locator("#agreement-modal")
        .getByRole("button", { name: "Fermer", exact: true })
    ).toBeVisible();

    // Check the selected agreement card displays the agreement info
    const agreementCard = page.locator(
      "#agreement-modal [data-testid='header-selected-agreement-card']"
    );
    await expect(agreementCard).toBeVisible();
    await expect(agreementCard).toContainText("2247");

    // If the agreement has a slug, a link to the convention page should exist
    const agreementLink = agreementCard.locator("a");
    if (await agreementLink.isVisible().catch(() => false)) {
      await expect(agreementLink).toHaveAttribute(
        "href",
        /\/convention-collective\//
      );
    }

    // Test Supprimer
    await page
      .locator("#agreement-modal")
      .getByRole("button", { name: "Supprimer" })
      .click();

    await expect(page.locator("#agreement-modal")).not.toBeVisible();

    const conventionAfterDelete = await page.evaluate(() =>
      window.localStorage.getItem("convention")
    );
    expect(conventionAfterDelete).toBeNull();
  });
});
