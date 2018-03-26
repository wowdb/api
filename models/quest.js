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

schema.loadClass(Quest)

module.exports = mongoose.model('Quest', schema)
