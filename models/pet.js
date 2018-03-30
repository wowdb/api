const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  creatureId: Number,
  name: String,
  family: String,
  icon: String
})

schema.index({
  name: 'text'
})

class Pet {
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

schema.loadClass(Pet)

module.exports = mongoose.model('Pet', schema)
