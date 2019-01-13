const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  creatureId: Number,
  icon: String,
  isAquatic: Boolean,
  isFlying: Boolean,
  isGround: Boolean,
  isJumping: Boolean,
  itemId: Number,
  name: String,
  qualityId: Number,
  spellId: Number
})

module.exports = mongoose.model('Mount', schema)
