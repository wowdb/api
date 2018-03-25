module.exports = {
  response: {
    200: {
      type: 'object',
      properties: {
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: {
                type: 'number'
              },
              name: {
                type: 'string'
              },
              icon: {
                type: 'string'
              },
              quality: {
                type: 'string'
              }
            }
          }
        }
      }
    }
  }
}
