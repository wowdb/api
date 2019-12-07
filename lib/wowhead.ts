import axios from 'axios'
import { orderBy } from 'lodash'

import {
  WowheadComment,
  WowheadMeta,
  WowheadResult,
  WowheadResults
} from '../types'
import { bbcode } from './bbcode'
import { skills } from './data'

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
          ).map(data => ({
            ...data,
            ...meta[data.id]
          })) as WowheadResult[]

          console.log(JSON.stringify(data, null, 2))

          return {
            data: data.map(
              ({
                cat,
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
                reagents,
                skill
              }) => ({
                description,
                icon,
                id,
                level,
                name: name && name.replace('%s', '<Name>'),
                namealliance,
                namehorde,
                pieces:
                  pieces &&
                  pieces
                    .map(id => meta[id])
                    .map(({ icon }) => ({
                      icon
                    })),
                points,
                portraitalliance,
                portraithorde,
                quality,
                reagents:
                  reagents &&
                  reagents
                    .map(([id, quantity]) => ({
                      ...meta[id],
                      quantity
                    }))
                    .map(({ icon, quantity }) => ({
                      icon,
                      quantity
                    })),
                skill: cat === 11 && skill && skills[skill[0]]
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
  ): Promise<{
    comments: WowheadComment[]
    title: string
  }> {
    let separator = '='

    if (
      ['azerite-essence', 'azerite-essence-power', 'storyline'].includes(type)
    ) {
      separator = '/'
    }

    const { data } = await axios.get<string>(
      `https://${
        classic ? 'classic' : 'www'
      }.wowhead.com/${type}${separator}${id}`
    )

    const lines = data.split('\n')

    const meta = this.meta(lines)

    const info = lines.find(line => line.includes('g_pageInfo'))

    let title = ''

    if (info) {
      if (info.includes('"name"')) {
        const json = JSON.parse(info.trim().slice(17, -1))

        title = json.name
      } else {
        const matches = info.match(/name: "(.*?)"/)

        if (matches) {
          title = matches[1]
        }
      }
    }

    const comments = lines.find(line => line.indexOf('var lv_comments0') === 0)

    if (comments) {
      const json = JSON.parse(comments.slice(19, -1)) as WowheadComment[]

      return {
        comments: json.map(({ id, body, user, rating, date, replies }) => {
          return {
            body: bbcode.parse(body, meta),
            comments:
              replies &&
              replies.map(
                ({ commentid, body, username, rating, creationdate }) => ({
                  body: bbcode.parse(body, meta),
                  date: creationdate,
                  id: commentid,
                  rating,
                  user: username
                })
              ),
            date,
            id,
            rating,
            user
          }
        }),
        title
      }
    }

    return {
      comments: [],
      title
    }
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
