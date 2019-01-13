const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  description: String,
  icon: String,
  id: Number,
  itemLevel: Number,
  name: String,
  quality: Number,
  requiredLevel: Number
})

module.exports = mongoose.model('Item', schema)
