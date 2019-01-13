const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  description: String,
  id: Number,
  isDungeon: Boolean,
  isRaid: Boolean,
  location: mongoose.Schema.Types.Mixed,
  name: String
})

module.exports = mongoose.model('Zone', schema)
