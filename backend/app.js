//Requires
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./config/database");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { loginUserValidation } = require("./middlewares/userValidation");
const validate = require("./middlewares/handleValidation");

//Routes
const message_routes = require("./routes/message_routes");
const user_routes = require("./routes/user_routes");
const chat_routes = require("./routes/chat_routes");
const photo_routes = require("./routes/photo_Routes");
const audio_routes = require("./routes/audio_routes");
const publication_routes = require("./routes/publication_routes");

//Middlewares
const authenticateJWT = require("./middlewares/auth");

// const http = require('http');
// const socketIo = require('socket.io');

//Servers Configs
const app = express();
const port = 8081;

// const server = http.createServer(app);
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
app.use(message_routes);
app.use(user_routes);
app.use(chat_routes);
app.use(photo_routes);
app.use(audio_routes);
app.use(publication_routes);

app.get("/", authenticateJWT, (req, res) => {
  res.send({ message: "Hello World!", user: req.user, headers: req.headers });
});

app.post("/register", async (req, res) => {
  const user = await db.user_controller.createUser(req.body);
  // Gera um token com o payload (por exemplo, o nome do usuário)
  const accessToken = jwt.sign(
    { user: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.json({ accessToken });
});

app.post("/login", loginUserValidation(), validate, async (req, res) => {
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
  }
  else {
    console.log('user');
    user = await db.user_controller.getPasswordByUsername(username);
  }

  if (!user || req.body.password != user.password) {
    res.status(401).json({ message: "User or Password not right" });
  } else {
    // Gera um token com o payload (por exemplo, o nome do usuário)
    const accessToken = jwt.sign({ user: username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ accessToken });
  }
});

db.connectToDatabase()
  .then(() => {
    console.log("Connecting MongoDb...");
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch((erro) => {
    console.log(`Erro ao conectar ao banco de dados: ${erro}`);
  });

// Testando Pull Request on GitHub Versão 4 ---
