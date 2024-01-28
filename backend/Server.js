require('dotenv').config();

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors'); // Add this line
const workout=require('./routes/workouts')

const app = express();
const server = http.createServer(app);
const io = socketIO(server,{
  cors: {
    origin:'http://localhost:3000/chat',
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

  // Handle message events
  socket.on('send-message', (data) => {
    // Broadcast the message to all connected clients
    io.emit('receive-message', data);
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
