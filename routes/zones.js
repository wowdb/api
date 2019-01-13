const { Comments } = require('../lib')
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
    })

    const comments = await Comments.fetch(id, 'zone')

    return {
      zone,
      comments
    }
  }
}
