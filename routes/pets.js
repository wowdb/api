const { Comments } = require('../lib')
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
    })

    const comments = await Comments.fetch(id, 'npc')

    return {
      pet,
      comments
    }
  }
}
