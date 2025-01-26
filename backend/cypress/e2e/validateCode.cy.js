describe('Easy React Challenge', () => {
  it('Counter should increment on button click', () => {
    cy.get('#counter-1').find('button').click();
    cy.get('#counter-1').contains('Count: 1');
  });

  it('Current time updates every second', () => {
    cy.get('#time-2').should('exist');
    cy.wait(2000); // wait 2 seconds
    cy.get('#time-2').should('not.be.empty');
  });

  it('Background color changes with color picker', () => {
    cy.get('#color-picker-3').find('input[type="color"]').invoke('val', '#ff0000').trigger('change');
    cy.get('body').should('have.css', 'background-color', 'rgb(255, 0, 0)');
  });

  it('Text input should echo value', () => {
    const inputValue = 'Hello, World!';
    cy.get('#text-echo-4').find('input').type(inputValue);
    cy.get('#text-echo-4').contains(inputValue);
  });
});