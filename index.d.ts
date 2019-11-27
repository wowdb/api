declare module 'ya-bbcode' {
  class Parser {
    constructor(config?: {
      cleanUnmatchable?: boolean
      newline?: boolean
      paragraph?: boolean
    })

    parse(data: string): string

    registerTag(
      tag: string,
      options: {
        close?: string
        open(attributes: string, content?: string): string
        type: 'replace' | 'content'
      }
    ): this
  }

  export = Parser
}
