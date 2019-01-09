const { fetchComments } = require('../lib')
const { Zone } = require('../models')

module.exports = {
  method: 'GET',
  url: '/zones/:id',
  async handler(request) {
    const {
      params: { id }
    } = request

    const zone = await Zone.findOne({
      id
    }).select({
      _id: 0
    })

    const comments = await fetchComments(id, 'zone')

    return {
      zone,
      comments
    }
  }
}
