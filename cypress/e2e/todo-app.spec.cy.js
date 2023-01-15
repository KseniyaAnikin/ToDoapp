/// <reference types="cypress" />
describe('App TODO', ()=> {
  beforeEach(()=> {
    cy.visit('http://localhost:5000');
  });

  it.only('Дело успешно создаётся', ()=>{
    cy.get('input').type('новое дело');
    cy.contains('Добавить дело').click();
    cy.get('ul li:first-child').should('contain.text', 'Новое дело');
  });
  it('Дело успешно удаляется', ()=>{});
  it('Дело успешно отмечается как сделланное или нет', ()=>{});
})