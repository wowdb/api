declare module 'ya-bbcode' {
  class Parser {
    parse(data: string): string

    registerTag(
      tag: string,
      options: {
        close?: string
        open(attributes: string): string
        type: string
      }
    ): void
  }

  export = Parser
}
