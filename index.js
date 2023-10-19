const express = require('express');
const mongoose = require('mongoose')
const authRoute = require('./routes/auth')
const dotenv = require('dotenv')
const cors = require('cors')
const Socket = require('./routes/chat')
const socketIo = require('socket.io');
const Chat = require('./models/Chat')



const app = new express();
const PORT = 4000;

dotenv.config();
app.use(express.json());
app.use(cors());


//Connecting to database
mongoose.connect(process.env.MONGO).then(console.log("Database connected !")).catch((err)=>console.log(err));


//Controllers and Routes
app.use('/auth',authRoute)
app.use('/chat',Socket)

 app.listen(PORT,()=>{
    console.log("Server Started !")
})

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('User connected');
  
    socket.on('chat message', (message) => {
     
      const chatMessage = new Chat({ text: message });
      Chat.save();
  
     
      io.emit('chat message', message);
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });