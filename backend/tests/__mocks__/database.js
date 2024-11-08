// tests/mocks/dbMock.js
const db = {
    user_controller: {
        getPasswordByEmail: jest.fn(),
        getPasswordByUsername: jest.fn(),
    },
};

module.exports = db;
