import { NowRequest, NowResponse } from '@now/node'

import { wowhead } from '../lib'

export default async (
  request: NowRequest,
  response: NowResponse
): Promise<void> => {
  const { classic, id, type } = request.query

  const comments = await wowhead.comments(
    id as string,
    type as string,
    classic === 'true'
  )

  response.json(comments)
}
