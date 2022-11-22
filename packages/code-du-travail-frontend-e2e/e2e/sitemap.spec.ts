/* eslint-disable jest/valid-expect */
describe("Sitemap", () => {
  it("should be visible", () => {
    cy.request({
      method: "GET",
      url: "/sitemap.xml",
    }).then((response) => {
      expect(response.status).to.equal(200);

      expect(response.body).to.contains(
        "<loc>https://code.travail.gouv.fr/</loc>"
      );
    });
  });
});
