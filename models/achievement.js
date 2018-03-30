const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  icon: String,
  points: Number
})

schema.index({
  title: 'text'
})

class Achievement {
  static search(query) {
    return this.find({
      $text: {
        $search: query
      }
    }).exec()
  }
}

schema.loadClass(Achievement)

module.exports = mongoose.model('Achievement', schema)
