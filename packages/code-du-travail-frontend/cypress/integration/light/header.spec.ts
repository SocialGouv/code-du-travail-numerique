describe("Header", () => {
  it("doit afficher les liens d'évitement", () => {
    cy.visit("/mentions-legales");
    cy.get("[id^=fr-skiplinks]").as("skipLink").should("not.be.visible");

    // Verify all skip links exist with correct hrefs
    cy.get("@skipLink").find('a[href="#main"]').should("exist");
    cy.get("@skipLink")
      .find('a[href="#fr-header-main-navigation"]')
      .should("exist");
    cy.get("@skipLink")
      .find("a")
      .filter(
        '[href="#fr-header-search-button"], [href="#fr-header-search-button-desktop"]'
      )
      .should("have.length.gte", 1);
    cy.get("@skipLink").find('a[href="#more-info"]').should("exist");

    // Focus the first skip link and verify the container becomes visible
    cy.get("@skipLink").find('a[href="#main"]').focus();
    cy.get("@skipLink").should("be.visible");
    cy.focused().should("have.attr", "href", "#main");

    // Verify clicking a skip link navigates to the target
    cy.get("@skipLink").find('a[href="#more-info"]').click({ force: true });
    cy.get("#more-info").should("exist");
  });
});
