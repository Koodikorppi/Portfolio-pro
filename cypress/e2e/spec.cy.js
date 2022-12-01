/* eslint-disable no-undef */
/* eslint-disable jest/valid-expect */
/// <reference types="cypress" />

const ROBOT_USERNAME='testrobot'
const ROBOT_PASSWORD='Testrobot@ttack'

describe('Login', () => {

   it('should login', () => {
      cy.visit('/')

      // find login form
      cy.get('#username');
      cy.get('#password');

      // find signup form
      cy.get('[data-cy=switch_to_signup_btn]').click();
      cy.get('#username');
      cy.get('#email');
      cy.get('#password');
      cy.get('#password');

      // use login form
      cy.get('[data-cy=switch_to_login_btn]').click();
      cy.get('#username').type(ROBOT_USERNAME);
      cy.get('#password').type(ROBOT_PASSWORD);
      cy.get('[data-cy=login_submit_btn]').click();

   })

})
describe('Test sidebar', () => {
   it('should find sidebar items', () => {
      // find and click sidebar buttons
      const arr = ['account', 'cog', 'paragraph', 'text', 'layouts', 'colors']
      arr.forEach(element => {
         cy.get(`img[src*="${element}"]`).click()
      });
   
   })
})

describe('Test layouts', () => {
   it('should change page layout', () => {
      // open and check layouts panel
      cy.get(`img[src*="layouts"]`).click()
      const arr = ['grid', 'photos', 'videos', 'slides']
      arr.forEach(element => {
         cy.get(`img[src*="${element}"]`).click()
         cy.get('.ButtonUnstyled-root').contains('No').click()
      });
   
   })
})