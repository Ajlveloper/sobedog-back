const { Dog, Temperament } = require("../../src/db")
const { expect } = require('chai');

describe('Model Testing', () => {
 
  describe('Dog model',  () => {
    beforeEach(async () => {
      await Dog.sync({ force: true });
    });
    describe('Verificar de la raza', () => {
      it('No debe crearse la raza con un solo atributo', (done) => {
         Dog.create({
          name: 'Max',
         }).then(() => done('No debería crearse la raza')).catch(() => done());
      });
      it('Si se crea con solo el peso, no debería permitirse', (done) => {
        Dog.create({
          weight_min: '14',
        })
        .then(() => done('No debería crearse la raza'))
        .catch(() => done());
      });
    });
  })
  describe('Temperament model', () => {
    beforeEach(async () => {
      await Temperament.sync({ force: true });
    });
        it('No se puede crear con valores nulos', (done) => {
        Temperament.create({
          name: null,
        })
        .then(() => done('No debería crearse el/los temperamentos'))
        .catch(() => done());
      });
      it('El name debe ser solo de un tioo de dato string', ()  =>{
        expect(typeof Temperament.name).equal("string")
      })
    });
})