require('dotenv').config();

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors'); // Add this line
const workout=require('./routes/workouts');
const Message = require('./messageschema');

const app = express();
const server = http.createServer(app);
const io = socketIO(server,{
  cors: {
    origin:'http://localhost:3000',
    methods :['GET','POST']
  }
});
 
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

// Middleware and routes
app.use(cors()); // Move this line above express.json()
app.use(express.json());
app.use('/',workout)

// Connecting to MongoDB
mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the Database');
  })
  .catch((error) => {
    console.error('MongoDB Connection Error:', error);
  });

// Socket.io setup
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);



  socket.on('get-messages', async (email) => {
    try {
      // Retrieve messages from the database based on the user's email
      const messages = await Message.find({
        $or: [{ receiver: email }, { sender: email }]
      }).sort({ timestamp: 1 });

      // Emit the retrieved messages back to the client
      socket.emit('room-messages', messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  });

  // Handle message events
  socket.on('message-room', async (sender, content, receiver, time, date) => {
    const newMessage = new Message({ sender, content, receiver, time, date });
    await newMessage.save();
  
    // Concatenate sender's and receiver's email addresses to form a unique room name
    const room = `${sender.email}-${receiver.email}`;
  
    const messages = await Message.find({
      $or: [
        { receiver: sender.email }, // Include messages sent to the sender
        { sender: receiver.email } // Include messages sent by the receiver
      ]
    }).sort({ timestamp: 1 });
  
    io.to(room).emit('room-messages', messages); // Emit to the unique room
    console.log("created new message");
  });
  

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
