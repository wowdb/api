const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  description: String,
  icon: String,
  id: Number,
  points: Number,
  title: String
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
