const { Comments } = require('../lib')
const { Spell } = require('../models')

module.exports = {
  method: 'GET',
  url: '/spells/:id',
  async handler(request) {
    const {
      params: { id }
    } = request

    const spell = await Spell.findOne({
      id
    })

    const comments = await Comments.fetch(id, 'spell')

    return {
      spell,
      comments
    }
  }
}
