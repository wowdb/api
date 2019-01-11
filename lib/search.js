const Fuse = require('fuse.js')

const {
  Achievement,
  Boss,
  Item,
  Mount,
  Pet,
  Quest,
  Zone
} = require('../models')

class Search {
  constructor() {
    this.init()
  }

  async init() {
    const data = []

    const achievements = await Achievement.find().select({
      description: 1,
      icon: 1,
      id: 1,
      points: 1,
      title: 1
    })

    achievements.forEach(({ description, id, icon, points, title: name }) =>
      data.push({
        description,
        icon,
        id,
        name,
        points,
        type: 'achievement'
      })
    )

    const bosses = await Boss.find().select({
      description: 1,
      id: 1,
      name: 1
    })

    bosses.forEach(({ description, id, name }) =>
      data.push({
        description,
        id,
        name,
        type: 'boss'
      })
    )

    const items = await Item.find().select({
      icon: 1,
      id: 1,
      itemLevel: 1,
      name: 1,
      quality: 1,
      requiredLevel: 1
    })

    items.forEach(({ icon, id, itemLevel, name, quality, requiredLevel }) =>
      data.push({
        icon,
        id,
        itemLevel,
        name,
        quality,
        requiredLevel,
        type: 'item'
      })
    )

    const mounts = await Mount.find().select({
      icon: 1,
      spellId: 1,
      name: 1,
      qualityId: 1
    })

    mounts.forEach(({ icon, name, quality, spellId: id }) =>
      data.push({
        icon,
        id,
        name,
        quality,
        type: 'mount'
      })
    )

    const pets = await Pet.find().select({
      creatureId: 1,
      icon: 1,
      name: 1,
      qualityId: 1
    })

    pets.forEach(({ icon, name, quality, creatureId: id }) =>
      data.push({
        icon,
        id,
        name,
        quality,
        type: 'pet'
      })
    )

    const quests = await Quest.find().select({
      description: 1,
      id: 1,
      title: 1
    })

    quests.forEach(({ description, id, title: name }) =>
      data.push({
        description,
        id,
        name,
        type: 'quest'
      })
    )

    const zones = await Zone.find().select({
      description: 1,
      id: 1,
      name: 1
    })

    zones.forEach(({ description, id, name }) =>
      data.push({
        description,
        id,
        name,
        type: 'zone'
      })
    )

    this.client = new Fuse(data, {
      keys: ['name', 'description'],
      matchAllTokens: true,
      threshold: 0.2
    })
  }

  async search(query) {
    const { client } = this

    if (!client) {
      await this.sleep()

      return this.search(query)
    }

    return client.search(query)
  }

  sleep() {
    return new Promise(resolve => setTimeout(resolve, 100))
  }
}

module.exports = new Search()
