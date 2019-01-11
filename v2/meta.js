const {
  CharacterClass,
  CharacterRace,
  Expansion,
  FAQ,
  ItemClass
} = require('../models')

module.exports = {
  method: 'GET',
  url: '/meta',
  async handler() {
    const [
      characterClasses,
      characterRaces,
      expansions,
      faq,
      itemClasses
    ] = await Promise.all([
      CharacterClass.find(),
      CharacterRace.find(),
      Expansion.find(),
      FAQ.find().sort({
        order: 1
      }),
      ItemClass.find()
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
