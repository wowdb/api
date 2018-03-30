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
  static search(query, skip = 0, limit = 20) {
    return this.find({
      $text: {
        $search: query
      }
    })
      .skip(skip)
      .limit(limit)
      .exec()
  }
}

schema.loadClass(Boss)

module.exports = mongoose.model('Boss', schema)
