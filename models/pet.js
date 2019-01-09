const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  creatureId: Number,
  family: String,
  icon: String,
  name: String
})

schema.index({
  id: 1
})
schema.index({
  name: 'text'
})

schema.set('toJSON', {
  transform(doc, ret) {
    ret.quality = doc.quality

    return ret
  }
})

class Pet {
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

schema.loadClass(Pet)

module.exports = mongoose.model('Pet', schema)
