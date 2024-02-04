const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  sender: String,
  content: String,
  receiver: String,
  time: String,
  date: String
})

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message