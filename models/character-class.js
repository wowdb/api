const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  id: Number,
  name: String,
  powerType: String
})

module.exports = mongoose.model('CharacterClass', schema)
