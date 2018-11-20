const express = require('express');
const socketIo = require('socket.io');

const app = express();
const server = app.listen(3000);

app.use(express.static('public'));

const io = socketIo(server);

io.on('connection', (socket) => {
  socket.on('click', (color) => io.emit('click', color));
});
