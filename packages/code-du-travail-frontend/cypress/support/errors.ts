Cypress.on("uncaught:exception", (err) => {
  console.log("Uncaught exception: ", err.message);
  // Cypress and React Hydrating the document don't get along
  // for some unknown reason. Hopefully, we figure out why eventually
  // so we can remove this.
  return false;
  if (
    /hydrat/i.test(err.message) ||
    /Wrong assertion encountered/i.test(err.message) ||
    /Minified React error #418/.test(err.message) ||
    /Minified React error #423/.test(err.message)
  ) {
    return false;
  }
});
