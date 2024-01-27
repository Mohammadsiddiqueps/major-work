const mongoose = require('mongoose');

// const messageSchema = new mongoose.Schema({
//   sender: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Login',
//   },
//   content: {
//     type: String,
//     required: true,
//   },
//   timestamp: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const chatSchema = new mongoose.Schema({
//   participants: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Login',
//     },
//   ],
//   messages: [messageSchema],
// });

const loginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // Reference to Chat schema
  // chats: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Chat',
  //   },
  // ],
});

const Login = mongoose.model('Login', loginSchema);
// const Chat = mongoose.model('Chat', chatSchema);

module.exports = Login ;
