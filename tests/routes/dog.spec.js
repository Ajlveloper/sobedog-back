/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai")
const session = require("supertest-session")
const app = require("../../src/app")
const { conn } = require("../../src/db")

const agent = session(app)

describe("Dogs routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Can't reach DB", err)
    })
  )

describe('/dogs',() => {
  it('GET responde status 200', () => {
    return agent
      .get('/dogs')
      .expect((res) => {
        expect(res.status).equal(200)})
  }).timeout(10000)
  it('Los nombres son string', () => {
    return agent 
      .get('/dogs') 
      .expect((res) => {
        expect(typeof res.body[0].name).equal('string'); 
      });
  }).timeout(10000)
})
describe('/dogsQ?name=query', () => {
  it('GET responde con status 200 si hay coincidencia por el nombre que se pasa por query', () => {
    return agent 
      .get('/dogsQ?name=Afghan Hound') 
      .expect((res) => {
        expect(res.status).equal(200)}); 
      }).timeout(10000)
  it('Si coincide el nombre correctamente que se pasa por query el length del array no estaría vacío',  () => {
    return agent 
      .get('/dogsQ?name=Alaskan Husky') 
      .expect((res) => {
        expect(res.body.length).equal(1); 
      });
  }).timeout(5000)
})
describe('/dogs/:idRaza', () => {
  it('GET responde con status 200 si la raza se logro encontrar',  () => {
    return agent 
      .get('/dogs/65') 
      .expect((res) => {
        expect(res.status).equal(200)}); 
      }).timeout(10000);
  it('GET responde con 404 si el perro no se encontró',  () => {
    return agent 
      .get('/dogs/3')
      .expect((res) => {
        expect(res.text).equal('dog not found'); 
      });
  }).timeout(10000)
})
describe('/temperaments', () => {
  it('GET responde con 200 al enviar todos los temperamentos', () => {
    return agent 
      .get('/temperaments') 
      .expect((res) => {
        expect(res.status).equal(200)}); 
      }).timeout(10000);
  })
});