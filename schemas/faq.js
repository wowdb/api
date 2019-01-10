module.exports = {
  response: {
    200: {
      type: 'object',
      properties: {
        faq: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              question: {
                type: 'string'
              },
              answer: {
                type: 'string'
              }
            }
          }
        }
      }
    }
  }
}
