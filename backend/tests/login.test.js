const request = require('supertest');
const { app, server } = require('../app');
const jwt = require('jsonwebtoken');
const db = require('../config/database'); // Importa o módulo original (será mockado)

jest.mock('../config/database'); // Mocka o database
jest.mock('jsonwebtoken'); // Mocka o jwt

describe('POST /login', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Limpa os mocks antes de cada teste
    });

    it('Deve retornar um token de acesso e status 200 quando o login for bem-sucedido com EMAIL', async () => {
        // Mock do controlador getPasswordByEmail
        db.user_controller.getPasswordByEmail.mockImplementation((email) => {
            if (email === 'test@example.com') {
                return Promise.resolve({
                    id: '123',
                    email: 'test@example.com',
                    password: 'password', // Senha fictícia
                });
            }
            return Promise.resolve(null); // Simule o caso de usuário não encontrado
        });

        // Mock do jwt.sign
        jwt.sign.mockImplementation(() => {
            return 'mockedAccessToken'; // Retorna um token fictício
        });

        // Faz uma requisição POST para a rota /login
        const response = await request(app)
            .post('/login')
            .send({ username: 'test@example.com', password: 'password' });

        // Verifica a resposta
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('accessToken');
        expect(response.body).toHaveProperty('id', '123');
    });

    it('Deve retornar erro 404 quando o login falhar com EMAIL incorreto', async () => {
        // Mock da função getPasswordByEmail para retornar null (usuário não encontrado)
        db.user_controller.getPasswordByEmail.mockImplementation((email) => {
            return Promise.resolve(null);
        });

        const response = await request(app)
            .post('/login')
            .send({ username: 'wrongemail@example.com', password: 'password' });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'User or Password not right');
    });

    // Teste para o login com username
    it('Deve retornar um token de acesso e status 200 quando o login for bem-sucedido com USERNAME', async () => {
        // Mock do controlador getPasswordByUsername
        db.user_controller.getPasswordByUsername.mockImplementation((username) => {
            if (username === 'testuser') {
                return Promise.resolve({
                    id: '456',
                    username: 'testuser',
                    password: 'password', // Senha fictícia
                });
            }
            return Promise.resolve(null); // Simule o caso de usuário não encontrado
        });

        // Mock do jwt.sign
        jwt.sign.mockImplementation(() => {
            return 'mockedAccessToken'; // Retorna um token fictício
        });

        const response = await request(app)
            .post('/login')
            .send({ username: 'testuser', password: 'password' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('accessToken');
        expect(response.body).toHaveProperty('id', '456');
    });
});
