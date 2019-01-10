const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    answer: String,
    order: Number,
    question: String
  },
  {
    collection: 'faq'
  }
)

module.exports = mongoose.model('FAQ', schema)
