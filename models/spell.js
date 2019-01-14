const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  castTime: String,
  description: String,
  icon: String,
  id: Number,
  name: String,
  range: String
})

module.exports = mongoose.model('Spell', schema)
