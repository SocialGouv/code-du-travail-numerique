describe("Redirects", () => {
  it("page: /convention-collective/650 should redirect to new meta", () => {
    cy.request({ method: "GET", url: "/convention-collective/650" }).then(
      (response) => {
        expect(response.redirects).to.exist;
        expect(response.redirects![0]).to.equal(
          "308: http://localhost:3000/convention-collective/3248-metallurgie"
        );
      }
    );
  });

  it("page: /convention-collective/650 should redirect to new meta", () => {
    cy.request({ method: "GET", url: "/convention-collective/650" }).then(
      (response) => {
        expect(response.redirects).to.exist;
        expect(response.redirects![0]).to.equal(
          "308: http://localhost:3000/convention-collective/3248-metallurgie"
        );
      }
    );
  });
});
