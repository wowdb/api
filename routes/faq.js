const { faq } = require('../data')

module.exports = {
  method: 'GET',
  url: '/faq',
  async handler() {
    return {
      faq
    }
  }
}
