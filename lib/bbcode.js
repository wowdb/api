const Ya = require('ya-bbcode')

class BBCode {
  constructor() {
    this.parser = new Ya()
  }

  parse(data) {
    const { parser } = this

    return parser.parse(data)
  }
}

module.exports = new BBCode()
