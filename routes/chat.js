// chat.js
const socketIo = require('socket.io');
const ChatMessage = require('../models/Chat');

module.exports = (server) => {
  const io = socketIo(server, { path: '/chat' }); 

  io.on('connection', (socket) => {
    console.log('User connected to chat');

    socket.on('chat message', (message) => {
      // Save the message to MongoDB
      const chatMessage = new ChatMessage({ text: message });
      chatMessage.save();

      // Broadcast the message to all connected clients in the '/chat' namespace
      io.emit('chat message', message);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected from chat');
    });
  });
};
