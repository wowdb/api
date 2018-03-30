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
  static search(query) {
    return this.find({
      $text: {
        $search: query
      }
    }).exec()
  }
}

schema.loadClass(Zone)

module.exports = mongoose.model('Zone', schema)
