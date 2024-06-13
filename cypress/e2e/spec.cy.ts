describe('Signup Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('Visits the initial project page', () => {
    cy.contains('Sign up');
  });

  it('should have only one navigation item', () => {
    cy.get('nav .navigation-link').should('have.length', 1);
  });

  it('should show error if fields are not filled correctly', () => {
    cy.get('#firstName').type('ab');
    cy.get('#email').type('invalidemail');
    cy.get('#password').type('123');
    cy.get('form').submit();


    cy.get('.error-message').should('be.visible');
  });
  it('should submit form and redirect to Home page if fields are filled correctly', () => {
    cy.get('#firstName').type('Prakhar'); 
    cy.get('#lastName').type('Shukla'); 
    cy.get('#email').type('test@test.com');
    cy.get('#password').type('Test12345');
    cy.get('form').submit();

    cy.url().should('eq', 'http://localhost:4200/home');
    cy.get('nav .navigation-link').should('have.length', 2);
  });
})
