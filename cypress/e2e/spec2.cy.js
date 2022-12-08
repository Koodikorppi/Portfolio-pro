/* eslint-disable no-undef */
/* eslint-disable jest/valid-expect */
/// <reference types="cypress" />
require('dotenv').config()

describe('Login and change header name and test text editor', () => {

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

   it('should add section and test text editor', () => {
      cy.get('.plus_icon').click()
      cy.contains(' Text').click()
      cy.get('.ql-editor.ql-blank').type('test');
      cy.get('[value=2]').click()
      //press again to disable
      cy.get('[value=2]').click()

      //text font selector
      //cy.get('[aria-controls=ql-picker-options-0]').click()
      //cy.get('[value=serif]').click()

      //text size selector
      //cy.get('[aria-controls=ql-picker-options-1]').click()
      //cy.get('[value=small]').click()

      cy.get('.ql-bold').click()
      cy.get('.ql-editor').type(' bold test')
      cy.get('.ql-italic').click()
      cy.get('.ql-editor').type(' italic test')

      cy.get('[value=ordered]').click()
      cy.get('.ql-editor').type(' ordered list test{enter}').type('second line')
      cy.get("[value= '+1']").click()
      cy.get("[value= '+1']").click()
      cy.get("[value= '-1']").click()

      cy.get('[value=bullet]').click()
      cy.get('.ql-editor').type(' bullet list test{enter}').type('second line')
      cy.get("[value= '+1']").click()
      cy.get("[value= '+1']").click()
      cy.get("[value= '-1']").click()
   })
})

