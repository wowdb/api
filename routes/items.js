const { Comments } = require('../lib')
const { Item } = require('../models')

module.exports = {
  method: 'GET',
  url: '/items/:id',
  async handler(request) {
    const {
      params: { id }
    } = request

    const item = await Item.findOne({
      id
    })

    const comments = await Comments.fetch(id, 'item')

    return {
      item,
      comments
    }
  }
}
