const { body } = require('express-validator');

const createUserValidation = () => {
    return [
        body('username')
            .isString()
            .withMessage('Username is required!')
            .isLength({ min: 3 })
            .withMessage('Username must be at least 3 characters long.'),
        body('email')
            .isString()
            .withMessage('Email is required!')
            .isEmail()
            .withMessage('Email must be valid!'),
        body('password')
            .isString()
            .withMessage('Password is required!')
            .isLength({ min: 5 })
            .withMessage('Password must be at least 5 characters long.'),
        body('language').notEmpty().withMessage('Language is required!'),
    ];
};

const loginUserValidation = () => {
    return [
        body('username').isString().withMessage('User/Email is required!'),
        body('password')
            .notEmpty()
            .withMessage('Password is required!')
            .isString()
            .withMessage('Password is required!'),
    ];
};

const updateUserValidation = () => {
    return [
        body('username')
            .optional()
            .isString()
            .withMessage('Username is required!')
            .isLength({ min: 3 })
            .withMessage('Username must be at least 3 characters long.'),
        body('email')
            .optional()
            .isString()
            .withMessage('Email is required!')
            .isEmail()
            .withMessage('Emais must be valid!'),
        body('password')
            .optional()
            .isString()
            .withMessage('Password is required!')
            .isLength({ min: 5 })
            .withMessage('Password must be at least 5 characters long.'),
        body('language').optional().notEmpty().withMessage('Language is required!'),
        body('description')
            .optional()
            .isString()
            .withMessage('')
            .isLength({ min: 5 })
            .withMessage('Language is required!'),
    ];
};

module.exports = {
    createUserValidation,
    loginUserValidation,
    updateUserValidation,
};
