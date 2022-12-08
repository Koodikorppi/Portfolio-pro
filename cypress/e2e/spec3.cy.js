/* eslint-disable no-undef */
/* eslint-disable jest/valid-expect */
/// <reference types="cypress" />
require('dotenv').config()

describe('Login and change login layout', () => {

   it('should login', () => {
      cy.visit('/')
      
      let username = Cypress.env('ROBOT_USERNAME')
      let password = Cypress.env('ROBOT_PASSWORD')

      cy.get('#username').type(username);
      cy.get('#password').type(password);

      cy.get('[data-cy=login_submit_btn]').click();

   })

   it('should change layout', () => {
      cy.get('[alt=Layouts]').click()
      cy.contains('Side-scroller').click()
      cy.contains('Yes').click()

   })
})

