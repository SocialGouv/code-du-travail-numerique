const openHeaderSearchModal = () => {
  // On desktop we have #fr-header-search-button-desktop.
  // On mobile we have #fr-header-search-button.
  cy.get("body").then(($body) => {
    const desktopBtn = $body.find("#fr-header-search-button-desktop");
    if (desktopBtn.length) {
      cy.get("#fr-header-search-button-desktop").click();
    } else {
      cy.get("#fr-header-search-button").click();
    }
  });

  cy.get("#search-modal").should("be.visible");
};

describe("Header Search", () => {
  beforeEach(() => {
    // Visiter la page d'accueil avant chaque test
    cy.visit("/");
  });

  it("should redirect to /recherche when clicking 'Voir tous les résultats' in the header search modal", () => {
    openHeaderSearchModal();

    cy.get("#search-modal").within(() => {
      cy.get("#search-modal-autocomplete").as("searchInput");
      cy.get("@searchInput").type("congé");
      cy.contains("button", "Voir tous les résultats").click();
    });

    cy.url().should("include", "/recherche?query=cong%C3%A9");
    cy.contains("h1", "Rechercher").should("exist");
  });

  it("should show 'retraite' in autocomplete suggestions when typing 'rét' in the header search modal", () => {
    openHeaderSearchModal();

    cy.get("#search-modal").within(() => {
      cy.get("#search-modal-autocomplete").as("searchInput");
      cy.get("@searchInput").type("rét");

      // Suggestions listbox is always present; ensure we have options.
      cy.get("#search-modal-autocomplete-listbox")
        .find("li[role='option']")
        .contains("retraite", { matchCase: false })
        .should("be.visible");
    });
  });
});
