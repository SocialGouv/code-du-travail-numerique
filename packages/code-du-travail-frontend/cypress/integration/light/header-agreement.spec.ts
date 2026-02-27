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
  // Click to focus first, wait for Downshift's focus handler, then type
  cy.get("#agreement-modal input[type='text']").first().click();
  cy.wait(500);
  cy.get("#agreement-modal input[type='text']")
    .first()
    .type(text, { delay: 100 });
};

describe("Header agreement selector", () => {
  beforeEach(() => {
    // Suppress uncaught exceptions from third-party scripts (e.g., Matomo/analytics)
    cy.on("uncaught:exception", () => false);
  });

  it("should allow selecting an agreement, show selected view with actions, and persist in localStorage", () => {
    cy.visit("/");
    cy.wait(2000);
    openHeaderAgreementModal();

    typeInAgreementSearch("2247");

    // Wait for autocomplete results and select one
    cy.get("#agreement-modal ul[role='listbox'] li", { timeout: 10000 })
      .contains("Entreprises de courtage d'assurances", { matchCase: false })
      .click();

    // After selection, the modal shows the selected CC view
    cy.get(
      "#agreement-modal [data-testid='header-selected-agreement-card']"
    ).should("contain", "Entreprises de courtage");

    // Should show the new subtitle
    cy.get("#agreement-modal")
      .contains("Convention collective sélectionnée :")
      .should("exist");

    // Should have 3 buttons
    cy.get("#agreement-modal").contains("button", "Supprimer").should("exist");
    cy.get("#agreement-modal").contains("button", "Modifier").should("exist");
    cy.get("#agreement-modal").contains("button", "Fermer").should("exist");

    // The CC name should be a clickable link
    cy.get("#agreement-modal [data-testid='header-selected-agreement-card']")
      .find("a")
      .should("have.attr", "href")
      .and("include", "/convention-collective/");

    // Close the modal
    cy.get("#agreement-modal").contains("button", "Fermer").click();

    cy.get("#agreement-modal").should("not.be.visible");
    cy.window()
      .its("localStorage")
      .invoke("getItem", "convention")
      .should("include", '"num":2247');

    // Reload and ensure header shows a selected CC (via stored value)
    cy.reload();
    cy.get("body").then(($body) => {
      const desktopBtn = $body.find("#fr-header-agreement-button-desktop");
      if (desktopBtn.length) {
        cy.get("#fr-header-agreement-button-desktop").should("contain", "2247");
      } else {
        cy.get("#fr-header-agreement-button").should("contain", "2247");
      }
    });

    // Re-open the modal to test Supprimer
    openHeaderAgreementModal();
    cy.get("#agreement-modal").contains("button", "Supprimer").click();

    cy.get("#agreement-modal").should("not.be.visible");
    cy.window()
      .its("localStorage")
      .invoke("getItem", "convention")
      .should("be.null");
  });
});
