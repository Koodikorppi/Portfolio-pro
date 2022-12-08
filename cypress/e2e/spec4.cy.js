/* eslint-disable no-undef */
/* eslint-disable jest/valid-expect */
/// <reference types="cypress" />
require('dotenv').config()

describe('Login, write some text and delete all sections', () => {

   it('should login', () => {
      cy.visit('/')
      
      let username = Cypress.env('ROBOT_USERNAME')
      let password = Cypress.env('ROBOT_PASSWORD')

      cy.get('#username').type(username);
      cy.get('#password').type(password);

      cy.get('[data-cy=login_submit_btn]').click();

   })

   it('should change section header name', () => {
      cy.get('.presentation')
      .find('button')
      .click()

      cy.get('.section-header').type('test');
   })

   it('should add two sections with some text and delete all sections', () => {
      cy.get('.plus_icon').click()
      cy.contains(' Text').click()
      cy.get('.ql-editor.ql-blank').type('test');
      cy.get('[value=2]').click()

      //second section
      cy.get('.plus_icon').click()
      cy.contains(' Text').click()
      cy.get('.ql-editor.ql-blank').type('test2');
      

      //delete whole thing
      cy.contains('Delete').click()
   })

})
