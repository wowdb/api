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

    body = body.replace(/\[([\w-]+)=(\d+) domain=(\w+)\]/g, '[$1=$2,$3]')

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
        open: attr => {
          const [id, domain = 'www'] = attr.split(',')

          return `<a href="https://${domain}.wowhead.com/${type}=${id}">${get(
            meta,
            `${id}.name_enus`
          )}</a>`
        },
        type: 'replace'
      })
    )

    const other = ['azerite-essence-power', 'azerite-essence']

    other.forEach(type =>
      parser.registerTag(type, {
        open: attr => {
          const [id, domain = 'www'] = attr.split(',')

          return `<a href="https://${domain}.wowhead.com/${type}=${id}">${get(
            meta,
            `${id}.name_enus`
          )}</a>`
        },
        type: 'replace'
      })
    )

    body = body
      .replace(/\[url=(.*?)\](.*?)\[\/url\]/g, '<a href="$1">$2</a>')
      .replace(/\[url=(.*?)\]/g, '<a href="$1">$1</a>')

    const parsed = parser.parse(body)

    const content = parsed
      .replace(/<br\/>/g, '<br>')
      .replace(/br><li/g, 'li')
      .replace(/li><br/g, 'li')

    return linkifyHtml(content, {
      className: '',
      target: undefined
    })
  }
}

export const bbcode = new BBCode()
