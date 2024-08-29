//Requires
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/database');
const jwt = require('jsonwebtoken');
const { sendVerificationEmail } = require('./config/email');
const { generateVerificationToken } = require('./utils/jwtEmail');
require('dotenv').config();

//Routes
const message_routes = require('./routes/message_routes');
const user_routes = require('./routes/user_routes');
const chat_routes = require('./routes/chat_routes');
const photo_routes = require('./routes/photo_routes');
const audio_routes = require('./routes/audio_routes');
const publication_routes = require('./routes/publication_routes');

//Middlewares
const authenticateJWT = require('./middlewares/auth');
const { loginUserValidation, createUserValidation } = require('./middlewares/userValidation');
const validate = require('./middlewares/handleValidation');

// const http = require('http');
// const socketIo = require('socket.io');

//Servers Configs
const app = express();
const port = 8081;

//const server = http.createServer(app);
// const io = socketIo(server);

//body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CORS
app.use(cors());

//Socket
/* io.on('connection', (socket) => {
//   console.log('Novo cliente conectado:', socket.id);

//   socket.on('joinRoom', (room) => {
//     socket.join(room);
//     console.log(`Cliente ${socket.id} entrou na sala ${room}`);
//   });

//   socket.on('message', (data) => {
//     const { room, message } = data;
//     io.to(room).emit('message', { id: socket.id, message });
//   });

//   socket.on('disconnect', () => {
//     console.log('Cliente desconectado:', socket.id);
//   });
// }); */

//ROUTES

app.get('/', authenticateJWT, (req, res) => {
    res.send({ message: 'Hello World!', user: req.user, headers: req.headers });
});

app.post('/register', createUserValidation(), validate, async (req, res) => {
    try {
        // Criando usuário e guardando na variável seus dados
        const result = await db.user_controller.createUser(req.body);

        if (result.error) {
            // Se o resultado contém um erro (e-mail já registrado)
            return res.status(result.status).json({ message: result.error });
        }

        const user = result;

        // Gerando token para o usuário criado
        const verificationToken = generateVerificationToken(user);

        // Envia o e-mail de verificação com o token gerado
        await sendVerificationEmail(user.email, verificationToken);

        // Também pode retornar um token de acesso, se necessário
        const accessToken = jwt.sign({ user: user.username }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        // Responde com o token de acesso e uma mensagem para verificar o e-mail
        res.json({
            accessToken,
            id: user.id,
            message: 'Usuário criado com sucesso! Verifique seu e-mail para ativar a conta.',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar o usuário.' });
    }
});

// Rota de verificação de e-mail
app.get('/verify-email', async (req, res) => {
    const token = req.query.token;

    if (!token) {
        return res.status(400).json({ message: 'Token de verificação é necessário.' });
    }

    // Verifica o token de verificação de e-mail
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(400).json({ message: 'Token inválido ou expirado.' });
        }

        // Busca o usuário pelo ID decodificado no token
        const user = await db.user_controller.getUserById(decoded.userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        // Atualiza o status do model do usuário "verificado".
        user.emailVerified = true;
        await user.save();

        res.status(200).json({ message: 'E-mail verificado com sucesso!' });
    });
});

//Reenviar verificação de email caso necessário
app.post('/resend-verification', async (req, res) => {
    const { email } = req.body;

    try {
        if (!email) {
            return res.status(400).json({ message: 'E-mail é obrigatório.' });
        }

        const user = await db.user_controller.getUserByEmail(email);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        // Se TRUE é porque ja está verificado, então não segue com o processo de reenvio, evitando requests atoa
        if (user.emailVerified) {
            return res.status(400).json({ message: 'Este e-mail já foi verificado.' });
        }

        // Verifica quando foi enviado o último e-mail de verificação
        const now = new Date();
        const timeSinceLastEmail = now - user.lastVerificationEmailSent;

        // Permite novo envio somente após 15 minutos
        if (user.lastVerificationEmailSent && timeSinceLastEmail < 900000) {
            return res
                .status(429)
                .json({ message: 'Aguarde 15 minutos antes de solicitar novamente.' });
        }

        const verificationToken = generateVerificationToken(user);

        // Atualiza o campo `lastVerificationEmailSent` com esse novo envio solicitado pelo usuario
        user.lastVerificationEmailSent = now;
        await user.save();

        // Envia o e-mail de verificação
        await sendVerificationEmail(user.email, verificationToken);

        res.json({ message: 'Um novo e-mail de verificação foi enviado.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao reenviar o e-mail de verificação.' });
    }
});

app.post('/login', loginUserValidation(), validate, async (req, res) => {
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const username = req.body.username;
    let user;
    if (isValidEmail(username)) {
        console.log('email');
        user = await db.user_controller.getPasswordByEmail(username);
        console.log(user);
    } else {
        console.log('user');
        user = await db.user_controller.getPasswordByUsername(username);
    }

    if (!user || req.body.password != user.password) {
        res.status(404).json({ message: 'User or Password not right' });
    } else {
        // Gera um token com o payload (por exemplo, o nome do usuário)
        const accessToken = jwt.sign({ user: username }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ accessToken, id: user.id });
    }
});

// Ta no fim do arquivo porque debugou, ent fds
app.use(message_routes);
app.use(user_routes);
app.use(chat_routes);
app.use(photo_routes);
app.use(audio_routes);
app.use(publication_routes);

db.connectToDatabase()
    .then(() => {
        console.log('Connecting MongoDb...');
        app.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}`);
        });
    })
    .catch((erro) => {
        console.log(`Erro ao conectar ao banco de dados: ${erro}`);
    });

const server = app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
/*const server = app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
*/
module.exports = { app, server };

// Testando Pull Request on GitHub Versão 4 -------
