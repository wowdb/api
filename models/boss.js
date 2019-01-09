const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  description: String,
  id: Number,
  journalId: Number,
  name: String,
  zoneId: Number
})

schema.index({
  id: 1
})
schema.index({
  name: 'text'
})

class Boss {
  static search(query) {
    return this.find({
      $text: {
        $search: query
      }
    }).exec()
  }
}

schema.loadClass(Boss)

module.exports = mongoose.model('Boss', schema)
