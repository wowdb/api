const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  creatureId: Number,
  family: String,
  icon: String,
  name: String,
  qualityId: Number
})

module.exports = mongoose.model('Pet', schema)
