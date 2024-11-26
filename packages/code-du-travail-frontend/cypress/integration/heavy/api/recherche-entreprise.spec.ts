describe("Outil - Trouver sa convention collective", () => {
  it("Recherche de convention collective par entreprise, validation de l'API", () => {
    cy.request({
      method: "GET",
      url: "api/enterprises?q=carrefour",
    }).then((response) => {
      expect(response.status).to.equal(200);

      expect(response.body.entreprises.length).to.be.gt(1);
      const carrefourBanqueItem = response.body.entreprises.find(
        (item) => item.label === "CARREFOUR BANQUE"
      );

      expect(carrefourBanqueItem).to.be.not.undefined;
      expect(carrefourBanqueItem.activitePrincipale).to.be.equal(
        "Autre distribution de crédit"
      );
      expect(carrefourBanqueItem.etablissements).to.be.gte(0);
      expect(carrefourBanqueItem.address).to.be.not.undefined;
      expect(carrefourBanqueItem.address).to.be.not.null;

      expect(carrefourBanqueItem.conventions.length).to.be.gte(1);
      expect(carrefourBanqueItem.conventions[0].num).to.be.equal(478);
      expect(carrefourBanqueItem.conventions[0].contributions).to.be.false;
      expect(carrefourBanqueItem.conventions[1].num).to.be.equal(2120);
      expect(carrefourBanqueItem.conventions[1].contributions).to.be.true;
    });
  });
});
