const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  zoneId: Number,
  journalId: Number
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
