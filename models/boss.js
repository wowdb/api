const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  description: String,
  id: Number,
  journalId: Number,
  name: String,
  zoneId: Number
})

module.exports = mongoose.model('Boss', schema)
