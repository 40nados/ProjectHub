const request = require('supertest');
const { app, server } = require('../app');
const jwt = require('jsonwebtoken');
const db = require('../config/database'); // Importa o módulo original

jest.mock('../config/database'); // Aplica o mock
jest.mock('jsonwebtoken');

afterAll((done) => {
    server.close(done); // Fecha o servidor após os testes
});

describe('POST /login', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Limpa mocks antes de cada teste
    });

    it('Deve retornar um token de acesso e status 200 quando o login for bem-sucedido com EMAIL', async () => {
        // Mock da função getPasswordByEmail
        db.user_controller.getPasswordByEmail.mockImplementation((email) => {
            console.log(`Mock chamado com email: ${email}`);
            if (email === 'test@example.com') {
                return Promise.resolve({
                    id: '123',
                    email: 'test@example.com',
                    password: 'password',
                });
            }
            return Promise.resolve(null);
        });

        // Mock do jwt.sign
        jwt.sign.mockImplementation((payload, secret, options) => {
            console.log(`jwt.sign chamado com payload: ${JSON.stringify(payload)}`);
            return 'mockedAccessToken';
        });

        const response = await request(app)
            .post('/login')
            .send({ username: 'test@example.com', password: 'password' });

        console.log('Resposta do teste:', response.body);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('accessToken');
        expect(response.body).toHaveProperty('id', '123');
    });
});
