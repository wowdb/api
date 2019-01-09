const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  category: String,
  id: Number,
  level: Number,
  reqLevel: Number,
  title: String
})

schema.index({
  id: 1
})
schema.index({
  title: 'text'
})

class Quest {
  static search(query) {
    return this.find({
      $text: {
        $search: query
      }
    }).exec()
  }
}

schema.loadClass(Quest)

module.exports = mongoose.model('Quest', schema)
