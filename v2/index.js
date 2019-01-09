const achievements = require('./achievements')
const bosses = require('./bosses')
const items = require('./items')
const mounts = require('./mounts')
const pets = require('./pets')
const quests = require('./quests')
const zones = require('./zones')

const search = require('./search')

module.exports = (fastify, options, next) => {
  fastify.route(achievements)
  fastify.route(bosses)
  fastify.route(items)
  fastify.route(mounts)
  fastify.route(pets)
  fastify.route(quests)
  fastify.route(zones)

  fastify.route(search)

  next()
}
