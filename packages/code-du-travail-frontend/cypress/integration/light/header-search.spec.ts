describe("Header Search", () => {
  beforeEach(() => {
    // Visiter la page d'accueil avant chaque test
    cy.visit("/");
  });

  it("should redirect to /recherche when submitting the header search form", () => {
    // Ouvrir le modal de recherche dans l'en-tête
    // Utiliser un sélecteur plus général pour trouver le bouton de recherche
    cy.get(".fr-header__tools").click();

    // Attendre que le modal de recherche soit visible
    cy.get(".fr-header__search").should("be.visible");

    // Trouver le champ de recherche dans le modal
    cy.get(".fr-header__search input").as("searchInput");

    // Taper "congé" dans le champ de recherche
    cy.get("@searchInput").type("congé");

    // Appuyer sur Entrée pour soumettre le formulaire
    cy.get("@searchInput").type("{enter}");
    cy.get("@searchInput").type("{enter}");

    // Vérifier que l'URL a été mise à jour correctement
    cy.url().should("include", "/recherche?query=cong%C3%A9");

    // Vérifier que la page de résultats de recherche est affichée
    cy.contains("h1", "Recherche").should("exist");
  });

  it("should redirect to /recherche when clicking the search button in the header search", () => {
    // Ouvrir le modal de recherche dans l'en-tête
    cy.get(".fr-header__tools").click();

    // Attendre que le modal de recherche soit visible
    cy.get(".fr-header__search").should("be.visible");

    // Trouver le champ de recherche dans le modal
    cy.get(".fr-header__search input").as("searchInput");

    // Taper "congé" dans le champ de recherche
    cy.get("@searchInput").type("congé");

    // Cliquer sur le bouton de recherche
    cy.get(".fr-header__search button[type='submit']").dblclick();

    // Vérifier que l'URL a été mise à jour correctement
    cy.url().should("include", "/recherche?query=cong%C3%A9");

    // Vérifier que la page de résultats de recherche est affichée
    cy.contains("h1", "Recherche").should("exist");
  });
  it("should show 'retraite' in autocomplete suggestions when typing 'rét'", () => {
    // Ouvrir le modal de recherche dans l'en-tête
    cy.get(".fr-header__tools").click();

    // Attendre que le modal de recherche soit visible
    cy.get(".fr-header__search").should("be.visible");

    // Trouver le champ de recherche dans le modal
    cy.get(".fr-header__search input").as("searchInput");

    // Taper "rét" dans le champ de recherche
    cy.get("@searchInput").type("rét");

    // Attendre que les suggestions d'autocomplétion apparaissent
    // La liste de suggestions est un élément ul
    cy.get(".fr-header__search ul").should("be.visible");

    // Vérifier que "retraite" apparaît dans les suggestions
    // Les suggestions sont des éléments li dans la liste ul
    cy.get(".fr-header__search ul li")
      .contains("retraite", { matchCase: false })
      .should("be.visible");
  });
});
