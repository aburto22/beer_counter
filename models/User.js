const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  user:  String,
  counter: Number
});

module.exports = mongoose.model('User', userSchema);