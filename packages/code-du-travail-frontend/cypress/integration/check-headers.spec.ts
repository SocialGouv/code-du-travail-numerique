describe("Check security headers", () => {
  it("should contains security headers", () => {
    cy.request({
      method: "GET",
      url: "/",
    }).then((response) => {
      expect(response.status).to.equal(200);

      expect(response.headers["x-robots-tag"]).to.equal(
        "noindex, nofollow, nosnippet"
      );
      expect(response.headers["x-content-type-options"]).to.equal("nosniff");
      expect(response.headers["x-frame-options"]).to.equal("DENY");
    });
  });

  it("should contains security headers but x-frame-options", () => {
    cy.request({
      method: "GET",
      url: "/widgets/preavis-retraite",
    }).then((response) => {
      expect(response.status).to.equal(200);

      expect(response.headers["x-robots-tag"]).to.equal(
        "noindex, nofollow, nosnippet"
      );
      expect(response.headers["x-content-type-options"]).to.equal("nosniff");
      expect(response.headers["x-frame-options"]).to.be.undefined;
    });
    cy.request({
      method: "GET",
      url: "/widget.html",
    }).then((response) => {
      expect(response.status).to.equal(200);

      expect(response.headers["x-robots-tag"]).to.equal(
        "noindex, nofollow, nosnippet"
      );
      expect(response.headers["x-content-type-options"]).to.equal("nosniff");
      expect(response.headers["x-frame-options"]).to.be.undefined;
    });
  });
});
