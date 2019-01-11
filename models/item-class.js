const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    class: Number,
    name: String,
    subclasses: [
      {
        subclass: Number,
        name: String
      }
    ]
  },
  {
    collection: 'item_classes'
  }
)

module.exports = mongoose.model('ItemClass', schema)
