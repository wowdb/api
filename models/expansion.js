const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  id: Number,
  name: String
})

module.exports = mongoose.model('Expansion', schema)
