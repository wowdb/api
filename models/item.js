const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  description: String,
  icon: String,
  id: Number,
  itemLevel: Number,
  name: String,
  requiredLevel: Number
})

schema.set('toJSON', {
  transform(doc, ret) {
    ret.quality = doc.quality
  }
})

class Item {
  static search(query) {
    return this.find({
      $text: {
        $search: query
      }
    }).exec()
  }

  get quality() {
    const quality = this.getValue('quality')

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

schema.loadClass(Item)

module.exports = mongoose.model('Item', schema)
