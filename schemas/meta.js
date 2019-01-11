module.exports = {
  response: {
    200: {
      type: 'object',
      properties: {
        characterClasses: {
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
              powerType: {
                type: 'string'
              }
            }
          }
        },
        characterRaces: {
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
              side: {
                type: 'string'
              }
            }
          }
        },
        expansions: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: {
                type: 'number'
              },
              name: {
                type: 'string'
              }
            }
          }
        },
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
        },
        itemClasses: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              class: {
                type: 'number'
              },
              name: {
                type: 'string'
              },
              subclasses: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    name: {
                      type: 'string'
                    },
                    subclass: {
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
