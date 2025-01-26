describe('Easy React Challenge Tests', () => {
  it('should render header component', () => {
    cy.get('#header-component').should('exist');
  });
  it('should toggle message display', () => {
    cy.get('#toggle-button').click();
    cy.get('.message').should('be.visible');
    cy.get('#toggle-button').click();
    cy.get('.message').should('not.be.visible');
  });
  it('should display the name entered in the input form', () => {
    cy.get('#input-form input').type('John Doe');
    cy.get('#input-form button').click();
    cy.get('.display-name').should('contain', 'John Doe');
  });
});