const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  description: String,
  icon: String,
  id: Number,
  points: Number,
  title: String
})

module.exports = mongoose.model('Achievement', schema)
