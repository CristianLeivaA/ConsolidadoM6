const chai = require('chai');
const chaiHttp = require('chai-http')
const server = require('../index')

chai.use(chaiHttp);

describe('Testing server routes', () => {
    it('Ruta para (/) sea codigo 200', () => {
        let respuesta = chai.request(server).get('/');
        respuesta.end((error, data) => {
            chai.assert.equal(
                data.status,
                200,
                'Codigo de status no coincide con 200'
            )
        });
    });
    it('Ruta para (/animes) sea codigo 200', () => {
        let respuesta = chai.request(server).get('/animes');
        respuesta.end((error, data) => {
            chai.assert.equal(
                data.status,
                200,
                'Codigo de status no coincide con 200'
            )
        });
    });
    it('Testing rutas not found with GET method.', () => {
        let respuesta = chai.request(server).get('/testRoute');
        respuesta.end((error, data) => {
            chai.assert.equal(
                data.text,
                `Ruta GET no encontrada.`,
                'No cumple con ruta not found'
            );
        });
    });
    it('Testing rutas not found with POST method.', () => {
        let respuesta = chai.request(server).post('/testRoute');
        respuesta.end((error, data) => {
            chai.assert.equal(
                data.text,
                `Ruta POST no encontrada.`,
                'No cumple con ruta not found'
            );
        });
    });
    server.close()
    it('Testing rutas not found with PUT method.', () => {
        let respuesta = chai.request(server).put('/testRoute');
        respuesta.end((error, data) => {
            chai.assert.equal(
                data.text,
                `Ruta PUT no encontrada.`,
                'No cumple con ruta not found'
            );
        });
    });
    server.close()
    it('Testing rutas not found with DELETE method.', () => {
        let respuesta = chai.request(server).delete('/testRoute');
        respuesta.end((error, data) => {
            chai.assert.equal(
                data.text,
                `Ruta DELETE no encontrada.`,
                'No cumple con ruta not found'
            );
        });
    });
    server.close()
});