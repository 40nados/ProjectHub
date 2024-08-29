const jwt = {
    sign: jest.fn().mockReturnValue('mockedAccessToken'),
};

module.exports = jwt;
