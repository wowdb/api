const { fetchComments } = require('../lib')
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
    }).select({
      _id: 0
    })

    const comments = await fetchComments(id, 'item')

    return {
      item,
      comments
    }
  }
}
