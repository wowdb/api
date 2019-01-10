const { FAQ } = require('../models')
const { faq } = require('../schemas')

module.exports = {
  method: 'GET',
  schema: faq,
  url: '/faq',
  async handler() {
    const faq = await FAQ.find().sort({
      order: 1
    })

    return {
      faq
    }
  }
}
