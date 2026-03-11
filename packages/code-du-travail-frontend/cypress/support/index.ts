// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import "./commands";
import "./errors";
import "cypress-real-events";

Cypress.on("window:before:load", (win) => {
  // Hide cookie consent banner in tests
  win.localStorage.setItem("cdtn-cookie-consent-given", "true");

  // Use to force A/B Testing version in test
  /*
  const url = new URL(win.location.href);
  if (!url.searchParams.has("pk_ab_test")) {
    url.searchParams.set("pk_ab_test", "original");
    win.history.replaceState({}, "", url.toString());
  }
   */
});

// in cypress/support/index.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      urlEqual(path: string): Chainable<Element>;

      canonicalUrlEqual(path: string): Chainable<Element>;

      checkNoIndex(): Chainable<Element>;

      isIndexable(): Chainable<Element>;

      titleAndMetaDescriptionEqual(
        title: string,
        description: string
      ): Chainable<Element>;

      selectByLabel(label: string): Chainable<Element>;

      findByLabel(label: string): Chainable<Element>;
    }
  }
}
