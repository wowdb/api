const { fetchComments } = require('../lib')
const { Pet } = require('../models')

module.exports = {
  method: 'GET',
  url: '/pets/:id',
  async handler(request) {
    const {
      params: { id }
    } = request

    const pet = await Pet.findOne({
      creatureId: id
    }).select({
      _id: 0
    })

    const comments = await fetchComments(id, 'npc')

    return {
      pet,
      comments
    }
  }
}
