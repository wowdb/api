const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  location: mongoose.Schema.Types.Mixed,
  isDungeon: Boolean,
  isRaid: Boolean
})

schema.index({
  name: 'text'
})

class Zone {
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

schema.loadClass(Zone)

module.exports = mongoose.model('Zone', schema)
