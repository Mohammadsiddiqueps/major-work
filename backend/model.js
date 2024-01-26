const mongoose = require('mongoose');

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
  chatRooms: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatRoom',
  }],

  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
});

const Login = mongoose.model('Login', loginSchema);

module.exports = Login;
