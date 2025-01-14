const express = require('express');
const routes = express.Router();

//Middlewares
const authenticateJWT = require('../middlewares/auth');
const validate = require('../middlewares/handleValidation');
const { createUserValidation, updateUserValidation } = require('../middlewares/userValidation');
const { imageUpload } = require('../middlewares/imageUpload');

//Controllers
const { user_controller } = require('../config/database');

routes.use(authenticateJWT);

//ROUTES
routes.get('/user', async (req, res) => {
    const result = await user_controller.listAllUsers();
    res.send(result);
});

routes.get('/user/:id', async (req, res) => {
    const result = await user_controller.getUserById(req.params.id);
    if (result) {
        if (result.error) {
            res.status(result.status).json(result);
        }
        res.send(result);
    } else res.status(404).json({ error: 'User not found' });
});

routes.post('/user', createUserValidation(), validate, async (req, res) => {
    const result = await user_controller.createUser(req.body);
    if (result.error) res.status(result.status).json(result);
    else res.send(result);
});

routes.patch(
    '/user/:id',
    updateUserValidation(),
    validate,
    imageUpload.single('imageUrl'),
    async (req, res) => {
        req.body.user_photo = req.file?.location || '';
        const result = await user_controller.patchUser(req.params.id, req.body);
        if (result.error) res.status(result.status).json(result);
        else res.send(result);
    }
);

routes.delete('/user/:id', async (req, res) => {
    const result = await user_controller.deleteUser(req.params.id);
    if (result) {
        if (result.error) {
            res.status(result.status).json(result);
        }
        res.status(200).json({ message: 'User Deleted Succesfully!' });
    } else res.status(404).json({ error: 'User not found' });
});

//Rotas para follow user - Comentando para ficar separado a minha atualização

routes.post('/user/follow/:id', user_controller.followUser);

routes.delete('/user/follow/:id', user_controller.unfollowUser);

routes.get('/user/following/:id', user_controller.getFollowing);

routes.get('/user/followers/:id', user_controller.getFollowers);

module.exports = routes;
