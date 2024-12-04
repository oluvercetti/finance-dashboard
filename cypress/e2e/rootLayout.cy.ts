describe('RootLayout', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    it('should load the page with correct metadata', () => {
        cy.title().should('eq', 'Horizon');
        cy.get('meta[name="description"]').should('have.attr', 'content', 'Horizon is a modern banking platform for the future.');
        cy.get('link[rel="icon"]').should('have.attr', 'href', '/icons/logo.svg');
    });
});