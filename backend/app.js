//Requires
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./database");
const message_routes = require('./routes/message_routes');
const user_routes = require('./routes/user_routes');
const chat_routes = require('./routes/chat_routes');
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

app.get("/user", (req, res) => {
  res.send({ user: "user" });
});

app.get("/messenger/:id", (req, res) => {
  res.send({ page: "messenger", id: req.params.id });
});

app.post("/image", (req, res) => {
  res.send({ todo: "S3" });
});

db.connectToDatabase()
  .then(() => {
    console.log("MongoDb contectado...")
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch((erro) => {
    console.log(`Erro ao conectar ao banco de dados: ${erro}`);
  });

// Testando Pull Request on GitHub Versão 4 ---
