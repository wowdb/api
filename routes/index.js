const meta = require('./meta')
const search = require('./search')

const achievements = require('./achievements')
const bosses = require('./bosses')
const items = require('./items')
const mounts = require('./mounts')
const pets = require('./pets')
const quests = require('./quests')
const spells = require('./spells')
const zones = require('./zones')

module.exports = (fastify, options, next) => {
  fastify.route(meta)
  fastify.route(search)

  fastify.route(achievements)
  fastify.route(bosses)
  fastify.route(items)
  fastify.route(mounts)
  fastify.route(pets)
  fastify.route(quests)
  fastify.route(spells)
  fastify.route(zones)

  next()
}
