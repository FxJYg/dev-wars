describe('To-Do List App', () => {

    beforeEach(() => {
      // Visit the app before each test
      cy.visit('/');
    });
  
    it('should add tasks to the list', () => {
      const task = 'Buy groceries';
      
      // Type a task in the input field
      cy.get('input[type="text"]').type(task);
      
      // Click the "Add Task" button (assuming it has a button with the text "Add")
      cy.get('button').contains('Add').click();
      
      // Check if the task is added to the list
      cy.get('ul').should('contain', task);
    });
  
    it('should mark tasks as completed', () => {
      const task = 'Buy milk';
      
      // Add the task
      cy.get('input[type="text"]').type(task);
      cy.get('button').contains('Add').click();
  
      // Mark the task as completed (assuming there's a checkbox next to each task)
      cy.get('ul li')
        .contains(task)
        .parent()
        .find('input[type="checkbox"]')
        .check();
      
      // Verify that the task is marked as completed (the checkbox is checked)
      cy.get('ul li')
        .contains(task)
        .parent()
        .find('input[type="checkbox"]')
        .should('be.checked');
    });
  
    it('should delete tasks from the list', () => {
      const task = 'Clean the house';
      
      // Add the task
      cy.get('input[type="text"]').type(task);
      cy.get('button').contains('Add').click();
      
      // Delete the task (assuming there is a delete button next to the task)
      cy.get('ul li')
        .contains(task)
        .parent()
        .find('button')
        .contains('Delete')
        .click();
      
      // Verify that the task has been deleted
      cy.get('ul').should('not.contain', task);
    });
  
  });