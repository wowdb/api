const {
  CharacterClass,
  CharacterRace,
  Expansion,
  Faq,
  ItemClass
} = require('../models')
const { meta } = require('../schemas')

module.exports = {
  method: 'GET',
  schema: meta,
  url: '/meta',
  async handler() {
    const [
      characterClasses,
      characterRaces,
      expansions,
      itemClasses,
      faq
    ] = await Promise.all([
      CharacterClass.find(),
      CharacterRace.find(),
      Expansion.find(),
      ItemClass.find(),
      Faq.find().sort({
        order: 1
      })
    ])

    return {
      characterClasses,
      characterRaces,
      expansions,
      faq,
      itemClasses
    }
  }
}
