const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  description: String,
  id: Number,
  isDungeon: Boolean,
  isRaid: Boolean,
  location: mongoose.Schema.Types.Mixed,
  name: String
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
