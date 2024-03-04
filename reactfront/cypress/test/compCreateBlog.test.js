describe('CompCreateBlog Test', () => {
    it('allows a user to create a new blog post', () => {
        // Visitar la página donde se encuentra el componente CompCreateBlog
        cy.visit('/ruta-a-compcreateblog');

        // Asegúrate de que los elementos del formulario estén presentes
        cy.get('input[label="Titulo"]').as('TitleInput');
        cy.get('input[label="Comentario"]').as('ContentInput');

        // Simular la entrada del usuario
        cy.get('@TitleInput').type('Mi Nuevo Post');
        cy.get('@ContentInput').type('Este es el contenido de mi nuevo post.');

        // Enviar el formulario
        cy.get('form').submit();
    });
});
