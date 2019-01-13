const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  category: String,
  id: Number,
  level: Number,
  reqLevel: Number,
  title: String
})

module.exports = mongoose.model('Quest', schema)
