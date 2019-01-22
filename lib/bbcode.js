const Search = require('./search')

class BBCode {
  constructor() {
    this.objects = []

    this.rules = [
      {
        regex: /\[br\]/gi,
        replace: `<br>`
      },
      {
        regex: /\[hr\]/gi,
        replace: `<hr>`
      },
      {
        regex: /\[url=(.\S+?)\](.+?)\[\/url]/gi,
        replace: `<a href="$1">$2</a>`
      },
      {
        regex: /\[url\](.+?)\[\/url]/gi,
        replace: `<a href="$1">$1</a>`
      },
      {
        regex: /\[url=(.+?)\s(.+?)\](.+?)\[\/url]/gi,
        replace: `<a href="$1">$3</a>`
      },
      {
        regex: /\[(achievement|item|quest|npc|spell|zone)=[\d]+(.*?)]/gi,
        replace: match => {
          const [type, id] = match
            .substr(1, match.length - 2)
            .split(' ')
            .shift()
            .split('=')

          const key = type === 'npc' ? 'boss' : type

          return this.build(key, Number(id))
        }
      },
      {
        regex: /\[(b|code|i|li|ol|pre|s|small|sub|sup|table|td|tr|u|ul)(.*?)\]/gs,
        replace: match => {
          const tag = match
            .substring(1, match.length - 1)
            .split(' ')
            .shift()

          switch (tag) {
            case 'b':
              return '<strong>'

            case 's':
              return '<del>'

            case 'u':
              return '<ins>'

            default:
              return `<${tag}>`
          }
        }
      },
      {
        regex: /\[\/(b|code|i|li|ol|pre|s|small|sub|sup|table|td|tr|u|ul)\]/gs,
        replace: match => {
          const tag = match
            .substring(1, match.length - 1)
            .split(' ')
            .shift()

          switch (tag) {
            case 'b':
              return '<strong>'

            case 's':
              return '<del>'

            case 'u':
              return '<ins>'

            default:
              return `<${tag}>`
          }
        }
      }
    ]
  }

  parse(data) {
    data = data.replace(/</g, '&lt;')
    data = data.replace(/>/g, '&gt;')

    return this.rules.reduce(
      (data, { regex, replace }) =>
        data.replace(regex, replace === 'function' ? replace() : replace),
      data
    )
  }

  async extract(data) {
    const matches = data.match(
      /\[(achievement|item|quest|npc|spell|zone)=[\d]+(.*?)]/gi
    )

    if (!matches) {
      return
    }

    matches.reduce((data, match) => {
      const [type, id] = match
        .substr(1, match.length - 2)
        .split(' ')
        .shift()
        .split('=')

      const key = type === 'npc' ? 'boss' : type

      if (!data[key]) {
        data[key] = []
      }

      data[key].push(Number(id))

      return data
    }, {})

    const objects = await Search.lookup(matches)

    this.objects.push(...objects)
  }

  build(type, id) {
    const object = this.objects.find(
      object => object.type === type && object.id === id
    )

    type = type === 'boss' ? 'npc' : type

    if (object) {
      const { name } = object

      return `<a href="https://www.wowhead.com/${type}=${id}">${name}</a>`
    }

    return `<a href="https://www.wowhead.com/${type}=${id}">Unknown ${type}</a>`
  }
}

module.exports = new BBCode()
