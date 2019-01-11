const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    side: String
  },
  {
    collection: 'character_races'
  }
)

module.exports = mongoose.model('CharacterRace', schema)
