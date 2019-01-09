module.exports = {
  response: {
    200: {
      type: 'object',
      properties: {
        results: {
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
              itemLevel: {
                type: 'number'
              },
              points: {
                type: 'number'
              },
              quality: {
                type: 'string'
              },
              requiredLevel: {
                type: 'number'
              },
              type: {
                type: 'string'
              }
            }
          }
        },
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
        mounts: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              spellId: {
                type: 'number'
              },
              creatureId: {
                type: 'number'
              },
              itemId: {
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
        npcs: {
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
        pets: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              creatureId: {
                type: 'number'
              },
              name: {
                type: 'string'
              },
              family: {
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
              },
              reqLevel: {
                type: 'number'
              }
            }
          }
        },
        zones: {
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
        }
      }
    }
  }
}
