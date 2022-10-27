describe("Sitemap", () => {
  it("should be visible", () => {
    cy.request({
      url: "/sitemap.xml",
      method: "GET",
    }).then((response) => {
      expect(response.status).to.equal(200);

      expect(response.body).to.contains(
        "<loc>https://code.travail.gouv.fr/</loc>"
      );
    });
  });
});
