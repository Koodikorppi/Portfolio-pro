/* eslint-disable no-undef */
/* eslint-disable jest/valid-expect */
/// <reference types="cypress" />
require('dotenv').config()

describe('Login', () => {

   it('should login', () => {
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

      let username = Cypress.env('ROBOT_USERNAME')
      let password = Cypress.env('ROBOT_PASSWORD')

      cy.get('[data-cy=switch_to_login_btn]').click();
      cy.get('#username').type(username);
      cy.get('#password').type(password);

      cy.get('[data-cy=login_submit_btn]').click();

   })
})