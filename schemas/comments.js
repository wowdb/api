module.exports = {
  response: {
    200: {
      type: 'object',
      properties: {
        comments: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: {
                type: 'number'
              },
              user: {
                type: 'string'
              },
              body: {
                type: 'string'
              },
              date: {
                type: 'string'
              },
              rating: {
                type: 'number'
              },
              replies: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'number'
                    },
                    user: {
                      type: 'string'
                    },
                    body: {
                      type: 'string'
                    },
                    date: {
                      type: 'string'
                    },
                    rating: {
                      type: 'number'
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
