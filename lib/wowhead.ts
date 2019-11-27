import axios from 'axios'
import { orderBy } from 'lodash'

import {
  WowheadComment,
  WowheadMeta,
  WowheadResult,
  WowheadResults
} from '../types'
import { bbcode } from './bbcode'

class Wowhead {
  async search(query: string, classic = false): Promise<WowheadResults[]> {
    const { data } = await axios.get<string>(
      `https://${classic ? 'classic' : 'www'}.wowhead.com/search?q=${query}`
    )

    const lines = data.split('\n')

    const meta = this.meta(lines)

    const results = lines
      .filter(line => line.indexOf('new Listview') === 0)
      .map(line => {
        const matches = line.match(
          /template: '([a-z\-]+)', id: '([a-z\-]+)'(.*?)data: \[(.*?)\]}\)/
        )

        if (matches) {
          const [, template, type, , content] = matches

          const data = orderBy(
            JSON.parse(`[${content}]`),
            'searchpopularity',
            'desc'
          ) as WowheadResult[]

          return {
            data: data.map(
              ({
                description,
                icon,
                id,
                level,
                name,
                namealliance,
                namehorde,
                pieces,
                points,
                portraitalliance,
                portraithorde,
                quality,
                reagents
              }) => ({
                description,
                icon,
                id,
                level,
                name: name && name.replace('%s', '<Name>'),
                namealliance,
                namehorde,
                pieces: pieces && pieces.map(id => meta[id]),
                points,
                portraitalliance,
                portraithorde,
                quality,
                reagents:
                  reagents &&
                  reagents.map(([id, quantity]) => ({
                    ...meta[id],
                    quantity
                  }))
              })
            ),
            template,
            type
          }
        }
      })
      .filter(Boolean) as WowheadResults[]

    return orderBy(results, 'type', 'asc')
  }

  async comments(
    id: string,
    type: string,
    classic = false
  ): Promise<WowheadComment[]> {
    const { data } = await axios.get<string>(
      `https://${classic ? 'classic' : 'www'}.wowhead.com/${type}=${id}`
    )

    const lines = data.split('\n')

    const meta = this.meta(lines)

    const comments = lines.find(line => line.indexOf('var lv_comments0') === 0)

    if (comments) {
      const json = JSON.parse(comments.slice(19, -1)) as WowheadComment[]

      return json.map(({ id, body, user, rating, date, replies }) => {
        return {
          body: bbcode.parse(body, meta),
          date,
          id,
          rating,
          replies:
            replies &&
            replies.map(({ id, body, user, rating, date }) => ({
              body: bbcode.parse(body, meta),
              date,
              id,
              rating,
              user
            })),
          user
        }
      })
    }

    return []
  }

  meta(lines: string[]): WowheadMeta {
    return lines
      .filter(line => line.includes('WH.Gatherer.addData'))
      .map(line => {
        const matches = line.match(/WH\.Gatherer\.addData\(\d+, \d+, (.*?)\);/)

        if (matches) {
          const [, data] = matches

          return JSON.parse(data)
        }
      })
      .filter(Boolean)
      .reduce((meta, data) => {
        Object.entries(data).forEach(([key, value]) => (meta[key] = value))

        return meta
      }, {})
  }
}

export const wowhead = new Wowhead()
