const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  icon: String,
  points: Number
})

schema.index({
  title: 'text',
  description: 'text'
})

class Achievement {
  static search(query, skip = 0, limit = 10) {
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

schema.loadClass(Achievement)

module.exports = mongoose.model('Achievement', schema)
