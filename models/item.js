const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  icon: String,
  itemLevel: Number
})

schema.index({
  name: 'text'
})

class Item {
  static search(query, skip = 0, limit = 10) {
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
