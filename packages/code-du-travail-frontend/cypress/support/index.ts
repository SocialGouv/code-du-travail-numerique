/* eslint-disable */

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

// in cypress/support/index.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.canonicalUrlEqual("/contribution/quelle-peut-etre-la-duree-maximale-dun-cdd")
       */
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
