const { body } = require('express-validator');

const publicationInsertValidation = () => {
    return [
        body('title')
            .not()
            .equals('undefined')
            .withMessage('Title is required!')
            .isString()
            .withMessage('Title is required!')
            .isLength({ min: 3 })
            .withMessage('Title must be at least 3 characters long.'),
    ];
};

const publicationUpdateValidation = () => {
    return [
        body('title')
            .isString()
            .withMessage('Title is required!')
            .isLength({ min: 3 })
            .withMessage('Title must be at least 3 characters long.'),
    ];
};

const commentValidation = () => {
    return [body('comment').isString().withMessage('Comment is required')];
};

module.exports = {
    publicationInsertValidation,
    publicationUpdateValidation,
    commentValidation,
};
