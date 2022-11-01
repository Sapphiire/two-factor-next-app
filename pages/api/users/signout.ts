import type { NextApiRequest, NextApiResponse } from 'next'

import { COOKIE_NAME } from '~/lib/auth/constants'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader(
        'Set-Cookie',
        `${COOKIE_NAME}=; Max-Age=0; SameSite=Strict; HttpOnly; Path=/`
    )
        .status(200)
        .json({ message: 'Success' })
}

export default handler
