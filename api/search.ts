import { NowRequest, NowResponse } from '@now/node'

import { wowhead } from '../lib'

export default async (
  request: NowRequest,
  response: NowResponse
): Promise<void> => {
  const { classic, query } = request.query

  const results = await wowhead.search(query as string, classic === 'true')

  response.json(results)
}
