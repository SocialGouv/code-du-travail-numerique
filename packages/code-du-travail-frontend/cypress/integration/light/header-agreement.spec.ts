const openHeaderAgreementModal = () => {
  // We use trigger("click") because DSFR tooltip JS intercepts regular Cypress clicks.
  cy.get("body").then(($body) => {
    const desktopBtn = $body.find("#fr-header-agreement-button-desktop");
    if (desktopBtn.length) {
      cy.get("#fr-header-agreement-button-desktop").trigger("click");
    } else {
      cy.get("#fr-header-agreement-button").trigger("click");
    }
  });

  cy.get("#agreement-modal").should("be.visible");
};

const typeInAgreementSearch = (text: string) => {
  cy.get("#header-agreement-search-autocomplete").clear().type(text, {
    delay: 150,
  });
};

describe("Header agreement selector", () => {
  it("should allow selecting an agreement, show selected view with actions, and persist in localStorage", () => {
    cy.visit("/", {
      // Ensure the test starts from a clean persisted agreement state.
      onBeforeLoad(win) {
        win.localStorage.clear();
      },
    });
    cy.findByRole("heading", { level: 1 }).should("be.visible");
    openHeaderAgreementModal();

    typeInAgreementSearch("2247");

    // Wait for the search to fully resolve (IDCC 2247 returns exactly 1 result)
    cy.get("#agreement-modal ul[role='listbox'] li", { timeout: 15000 }).should(
      "have.length",
      1
    );

    cy.wait(300);

    // Click the result
    cy.get("#agreement-modal ul[role='listbox'] li").first().click();

    // Verify the selection was persisted to localStorage
    cy.window()
      .its("localStorage")
      .invoke("getItem", "convention")
      .should("include", '"num":2247');

    // After selection, the modal should show the selected agreement view
    // Note: data-testid attributes are stripped in production builds,
    // so we use content-based selectors instead
    cy.get("#agreement-modal")
      .contains("Convention collective sélectionnée :")
      .should("exist");

    cy.get("#agreement-modal")
      .contains("Entreprises de courtage")
      .should("exist");

    cy.get("#agreement-modal").contains("button", "Supprimer").should("exist");
    cy.get("#agreement-modal").contains("button", "Modifier").should("exist");
    cy.get("#agreement-modal").contains("button", "Fermer").should("exist");

    cy.get("#agreement-modal")
      .contains("Entreprises de courtage")
      .closest("[role='region']")
      .find("a")
      .should("have.attr", "href")
      .and("include", "/convention-collective/");

    // Test Supprimer
    cy.get("#agreement-modal").contains("button", "Supprimer").click();

    cy.get("#agreement-modal").should("not.be.visible");
    cy.window()
      .its("localStorage")
      .invoke("getItem", "convention")
      .should("be.null");
  });
});
