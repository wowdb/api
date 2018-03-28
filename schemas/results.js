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
              },
              itemLevel: {
                type: 'number'
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
              },
              reqLevel: {
                type: 'number'
              }
            }
          }
        }
      }
    }
  }
}
