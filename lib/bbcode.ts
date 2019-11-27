import linkifyHtml from 'linkifyjs/html'
import { get } from 'lodash'
import YaBBCode from 'ya-bbcode'

import { WowheadMeta } from '../types'

class BBCode {
  parse(body: string, meta: WowheadMeta): string {
    const parser = new YaBBCode()

    parser
      .registerTag('ol', {
        close: '</ol>',
        open: () => `<ol>`,
        type: 'replace'
      })
      .registerTag('ul', {
        close: '</ul>',
        open: () => `<ul>`,
        type: 'replace'
      })
      .registerTag('li', {
        close: '</li>',
        open: () => `<li>`,
        type: 'replace'
      })

    const normal = [
      'achievement',
      'pet-ability',
      'bfa-champion',
      'building',
      'champion',
      'class',
      'currency',
      'faction',
      'follower',
      'pet',
      'icondb',
      'item-set',
      'item',
      'mission',
      'affix',
      'npc',
      'object',
      'order-advancement',
      'outfit',
      'quest',
      'race',
      'resource',
      'ship',
      'skill',
      'spell',
      'storyline',
      'threat',
      'title',
      'transmog-set',
      'event',
      'zone'
    ]

    normal.forEach(type =>
      parser.registerTag(type, {
        open: attr =>
          `<a href="https://wowhead.com/${type}=${attr}">${get(
            meta,
            `${attr}.name_enus`
          )}</a>`,
        type: 'replace'
      })
    )

    const other = ['azerite-essence-power', 'azerite-essence']

    other.forEach(type =>
      parser.registerTag(type, {
        open: attr =>
          `<a href="https://wowhead.com/${type}/${attr}">${get(
            meta,
            `${attr}.name_enus`
          )}</a>`,
        type: 'replace'
      })
    )

    const data = parser.parse(body)

    return linkifyHtml(data, {
      className: '',
      target: undefined
    })
  }
}

export const bbcode = new BBCode()
