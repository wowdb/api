module.exports = {
  response: {
    200: {
      type: 'object',
      properties: {
        achievements: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: {
                type: 'number'
              },
              title: {
                type: 'string'
              },
              icon: {
                type: 'string'
              },
              points: {
                type: 'number'
              }
            }
          }
        },
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
        },
        quests: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: {
                type: 'number'
              },
              title: {
                type: 'string'
              }
            }
          }
        }
      }
    }
  }
}
