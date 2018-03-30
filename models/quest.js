const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  id: Number,
  title: String,
  category: String,
  level: Number,
  reqLevel: Number
})

schema.index({
  title: 'text',
  category: 'text'
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
