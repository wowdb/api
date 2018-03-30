const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: String,
  icon: String,
  spellId: Number,
  creatureId: Number,
  itemId: Number,
  isGround: Boolean,
  isFlying: Boolean,
  isAquatic: Boolean,
  isJumping: Boolean
})

schema.index({
  name: 'text'
})

class Mount {
  static search(query) {
    return this.find({
      $text: {
        $search: query
      }
    }).exec()
  }

  get quality() {
    const quality = this.getValue('qualityId')

    switch (quality) {
      case 0:
        return 'poor'

      case 1:
        return 'uncommon'

      case 2:
        return 'common'

      case 3:
        return 'rare'

      case 4:
        return 'epic'

      case 5:
        return 'legendary'

      case 6:
        return 'artifact'

      case 7:
        return 'heirloom'
    }
  }
}

schema.loadClass(Mount)

module.exports = mongoose.model('Mount', schema)
