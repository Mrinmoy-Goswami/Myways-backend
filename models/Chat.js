const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  text: {
   type: String,
  required:true
  }
},{timestamps:true})

module.exports = mongoose.model('Chat', chatSchema);