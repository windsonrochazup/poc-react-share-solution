/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      dataCy(value: string): Chainable<Element>
    }
  }
}

import './commands'
