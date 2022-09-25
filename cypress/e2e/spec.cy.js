/* eslint-disable no-undef */
/* eslint-disable jest/valid-expect */
/// <reference types="cypress" />
describe('empty spec', () => {
  it('passes', () => {
    cy.visit('/')
    cy.get('a').should('contain', 'Learn React');
  })
})