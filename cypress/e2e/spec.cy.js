/* eslint-disable no-undef */
/* eslint-disable jest/valid-expect */
/// <reference types="cypress" />
describe('empty spec', () => {
  it('passes', () => {
    cy.visit('/')
    cy.get('#username');
    cy.get('#password');
    // cy.get('[data-cy=login_submit_btn]').click();

    cy.get('[data-cy=switch_to_signup_btn]').click();
    cy.get('#username');
    cy.get('#email');
    cy.get('#password');
    cy.get('#password');

    // cy.get('[data-cy=signup_submit_btn]').click();

    cy.get('[data-cy=switch_to_login_btn]').click();
    cy.get('#username');
    cy.get('#password');


  })
})